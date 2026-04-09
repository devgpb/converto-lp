# LP Tracking Endpoint

## Objetivo

Este documento define como a API externa do Converto deve receber, validar, normalizar e armazenar os eventos de tracking da home da LP. A LP envia apenas eventos mínimos para `POST /lp-events`, usando a mesma `NEXT_PUBLIC_API_URL` já adotada no projeto. O backend faz toda a persistência no Supabase.

Escopo inicial:

- página `/`
- eventos `lp_page_view`, `section_view`, `scroll_depth`, `cta_click`, `faq_open`, `gallery_interaction` e `dwell_time`
- armazenamento sem dados pessoais e sem identificadores persistentes
- deduplicação persistida em `localStorage` para evitar reenvio do mesmo evento ou marco já disparado

## Endpoint

- Método: `POST`
- Path: `/lp-events`
- Content-Type aceito: `application/json`
- Resposta esperada em sucesso: `202 Accepted`

Exemplo de request:

```json
{
  "event_name": "cta_click",
  "page": "/",
  "section": "final_cta",
  "cta_id": "finalcta_whatsapp",
  "scroll_bucket": null,
  "dwell_time_bucket": null,
  "referrer_host": "google.com",
  "device_type": "mobile",
  "screen_category": "sm",
  "occurred_at": "2026-04-08T12:00:00.000Z",
  "metadata": {
    "destination_host": "wa.me"
  }
}
```

## Estratégia de disparo

Antes de enviar um evento, a LP consulta um objeto JSON em `localStorage` com a chave `lp_tracking_sent_events`. Se o evento ou seu marco já estiver registrado, o envio é pulado.

Formato esperado do objeto:

```json
{
  "lp_page_view": true,
  "section_view": ["hero", "beneficios", "galeria"],
  "scroll_depth": ["25", "50"],
  "cta_click": ["header_testar_gratis", "finalcta_whatsapp"],
  "faq_open": true,
  "gallery_interaction": true,
  "dwell_time": ["0_10s", "10_30s"]
}
```

Regras de persistência por evento:

- `lp_page_view`: guarda `true` após o primeiro envio
- `section_view`: guarda a `section`
- `scroll_depth`: guarda o `scroll_bucket`
- `cta_click`: guarda o `cta_id`
- `faq_open`: guarda `true` após o primeiro envio
- `gallery_interaction`: guarda `true` após o primeiro envio
- `dwell_time`: guarda o `dwell_time_bucket`

Consequência prática:

- se `scroll_depth` com marco `50` já foi enviado antes, ele não é reenviado
- se `cta_click` com `finalcta_whatsapp` já foi enviado antes, ele não é reenviado
- FAQ e galeria só enviam uma vez, porque não têm marcos persistidos além do próprio evento
- `dwell_time` só envia buckets ainda não registrados no `localStorage`

## Contrato aceito

Campos do payload:

- `event_name`: obrigatório
- `page`: obrigatório, nesta fase somente `"/"`
- `section`: opcional
- `cta_id`: opcional
- `scroll_bucket`: opcional, valores permitidos `25`, `50`, `75`, `100`
- `dwell_time_bucket`: opcional, valores permitidos `0_10s`, `10_30s`, `30_60s`, `60_180s`, `180s_plus`
- `referrer_host`: opcional, somente hostname sem query string
- `device_type`: obrigatório, valores permitidos `mobile`, `tablet`, `desktop`
- `screen_category`: obrigatório, valores permitidos `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- `occurred_at`: obrigatório, ISO 8601
- `metadata`: obrigatório, objeto JSON simples

Allowlist de `event_name`:

- `lp_page_view`
- `section_view`
- `scroll_depth`
- `cta_click`
- `faq_open`
- `gallery_interaction`
- `dwell_time`

Allowlist inicial de `section`:

- `hero`
- `beneficios`
- `galeria`
- `recursos`
- `precos`
- `faq`
- `final_cta`

Exemplos de `cta_id` já usados pela LP:

- `header_testar_gratis`
- `mobile_header_testar_gratis`
- `hero_ver_como_funciona`
- `beneficios_comecar_gratis`
- `recursos_comecar_gratis`
- `recursos_ver_beneficios`
- `pricing_comecar_agora`
- `finalcta_testar_gratis`
- `finalcta_whatsapp`

Exemplos de `metadata` esperados por evento:

- `faq_open`: sem metadata obrigatória
- `gallery_interaction`: opcional `first_action`, informando qual foi a primeira interação observada
- `cta_click`: opcional `destination_host`

## Regras de validação e normalização

O backend deve:

- rejeitar requests sem `Content-Type: application/json`
- rejeitar `event_name` fora da allowlist
- rejeitar `page` fora da allowlist, inicialmente apenas `"/"`
- descartar chaves desconhecidas fora de `metadata`
- garantir que `metadata` seja um objeto raso com valores escalares
- normalizar `referrer_host` e qualquer host em `metadata.destination_host` para lowercase
- preencher `received_at` com o timestamp do servidor
- aplicar rate limit por IP no edge ou backend
- opcionalmente gerar um hash efêmero diário de `IP + user-agent reduzido` apenas para anti-abuso e deduplicação curta, sem persistir IP bruto

O backend não deve persistir:

- nome, email, telefone, CPF, CNPJ
- conteúdo de formulário
- IP bruto
- `user-agent` completo
- query strings completas
- qualquer identificador persistente do visitante

## Persistência no Supabase

Tabela bruta `lp_events`:

```sql
create extension if not exists pgcrypto;

create table if not exists public.lp_events (
  id uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  occurred_at timestamptz not null,
  event_name text not null,
  page text not null,
  section text,
  cta_id text,
  scroll_bucket int,
  dwell_time_bucket text,
  referrer_host text,
  device_type text not null,
  screen_category text not null,
  metadata jsonb not null default '{}'::jsonb
);
```

Tabela agregada diária `lp_event_daily`:

```sql
create table if not exists public.lp_event_daily (
  event_date date not null,
  event_name text not null,
  page text not null,
  section text,
  cta_id text,
  device_type text,
  count int not null default 0,
  primary key (event_date, event_name, page, section, cta_id, device_type)
);
```

Exemplo de insert bruto:

```sql
insert into public.lp_events (
  occurred_at,
  event_name,
  page,
  section,
  cta_id,
  scroll_bucket,
  dwell_time_bucket,
  referrer_host,
  device_type,
  screen_category,
  metadata
) values (
  :occurred_at,
  :event_name,
  :page,
  :section,
  :cta_id,
  :scroll_bucket,
  :dwell_time_bucket,
  :referrer_host,
  :device_type,
  :screen_category,
  :metadata::jsonb
);
```

## Agregação

Regra recomendada:

- inserir sempre em `public.lp_events`
- agregar de forma assíncrona para `public.lp_event_daily`
- agrupar por `event_date`, `event_name`, `page`, `section`, `cta_id` e `device_type`

Exemplo de agregação:

```sql
insert into public.lp_event_daily (
  event_date,
  event_name,
  page,
  section,
  cta_id,
  device_type,
  count
)
select
  date(received_at) as event_date,
  event_name,
  page,
  section,
  cta_id,
  device_type,
  count(*) as count
from public.lp_events
where received_at >= now() - interval '2 days'
group by 1, 2, 3, 4, 5, 6
on conflict (event_date, event_name, page, section, cta_id, device_type)
do update set count = excluded.count;
```

## Índices recomendados

```sql
create index if not exists lp_events_received_at_idx on public.lp_events (received_at desc);
create index if not exists lp_events_event_name_idx on public.lp_events (event_name, received_at desc);
create index if not exists lp_events_page_section_idx on public.lp_events (page, section, received_at desc);
create index if not exists lp_events_cta_idx on public.lp_events (cta_id, received_at desc) where cta_id is not null;
create index if not exists lp_events_metadata_gin_idx on public.lp_events using gin (metadata);
```

## Retenção

- manter eventos brutos em `lp_events` por `30 dias`
- manter agregados em `lp_event_daily` por prazo longo
- executar limpeza recorrente dos dados brutos

Exemplo:

```sql
delete from public.lp_events
where received_at < now() - interval '30 days';
```

## Resposta da API

Resposta mínima recomendada:

```json
{
  "accepted": true
}
```

Status sugeridos:

- `202` para evento aceito
- `400` para payload inválido
- `415` para content type inválido
- `429` para rate limit
