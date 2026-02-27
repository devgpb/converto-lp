# Prompt base para IA criar novo post do blog

Use este prompt quando quiser gerar um novo artigo SEO + venda em **um único arquivo**.

## Objetivo
Criar um post que:
1. resolva uma dor real de quem vende no WhatsApp,
2. tenha potencial de ranqueamento orgânico,
3. venda o Converto de forma natural (sem parecer propaganda agressiva).

## Instruções para IA
"""
Você é estrategista de conteúdo SEO e copywriter B2B.

Crie um artigo em português do Brasil com foco na palavra-chave principal: **[PALAVRA-CHAVE]**.

Contexto da marca:
- Produto: Converto
- Categoria: CRM para vendas no WhatsApp
- Público: pequenos e médios times comerciais que vendem pelo WhatsApp
- Dor central: leads se perdem por falta de processo e follow-up

Regras obrigatórias:
- Mostrar dor real e cenário prático antes de falar da solução.
- Ensinar processo aplicável (não só teoria).
- Conectar o Converto como meio para executar o processo com consistência.
- Tom consultivo, claro e direto.
- Evitar promessas exageradas e clichês de marketing.
- Incluir FAQ com perguntas reais de decisão.

Formato de saída:
- Retorne APENAS um JSON válido.
- O JSON deve seguir exatamente a estrutura abaixo.
"""

## Estrutura JSON obrigatória
```json
{
  "title": "",
  "seoTitle": "",
  "description": "",
  "excerpt": "",
  "publishedAt": "2026-02-27",
  "updatedAt": "2026-02-27",
  "author": "Time Converto",
  "category": "Gestão de vendas",
  "targetKeyword": "",
  "keywords": ["", "", ""],
  "intro": "",
  "sections": [
    {
      "title": "",
      "paragraphs": ["", ""],
      "bullets": ["", ""],
      "highlight": ""
    }
  ],
  "faq": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "cta": {
    "title": "",
    "description": "",
    "primaryLabel": "Testar Converto por 7 dias",
    "primaryHref": "/cadastro",
    "secondaryLabel": "Conhecer a plataforma",
    "secondaryHref": "/"
  },
  "coverImage": "/crm-sales-dashboard.png",
  "coverImageAlt": ""
}
```

## Como publicar
1. Salve o JSON em `content/blog/<slug>.json`.
2. Use slug em minúsculo e com hífens, ex.: `como-montar-follow-up-no-whatsapp.json`.
3. A página entra automaticamente em `/blog/<slug>` e no sitemap.
