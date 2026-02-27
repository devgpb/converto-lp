import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade | Converto",
  description: "Entenda como o Converto coleta, usa e protege seus dados.",
  alternates: { canonical: "/politica-de-privacidade" },
}

export default function PoliticaDePrivacidade() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Última atualização: 16 de fevereiro de 2026</p>
        <h1 className="text-3xl md:text-4xl font-bold">Política de Privacidade</h1>
        <p className="text-muted-foreground">
          Esta política explica como a Converto coleta, usa, compartilha e protege dados pessoais de clientes, prospects e visitantes.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. Quem somos</h2>
        <p className="text-muted-foreground">
          Converto é uma plataforma de CRM focada em vendas via WhatsApp. Operamos a partir do Brasil e atendemos clientes nacionais e internacionais.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Dados que coletamos</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Dados de conta: nome, email, telefone, empresa e cargo.</li>
          <li>Dados de uso: páginas acessadas, eventos no produto e configurações escolhidas.</li>
          <li>Dados de comunicação: mensagens trocadas com suporte e registros de atendimento.</li>
          <li>Dados de faturamento: informações para cobrança e notas fiscais.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Como usamos os dados</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Prestar e melhorar nossos serviços.</li>
          <li>Comunicar atualizações, suporte e cobranças.</li>
          <li>Garantir segurança, prevenir fraudes e cumprir obrigações legais.</li>
          <li>Realizar análises agregadas para melhoria de produto.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Compartilhamento</h2>
        <p className="text-muted-foreground">
          Compartilhamos dados apenas com provedores essenciais (hospedagem, analytics, faturamento, suporte) sob contratos de confidencialidade e proteção de dados. Não vendemos dados pessoais.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Retenção e segurança</h2>
        <p className="text-muted-foreground">
          Mantemos dados pelo tempo necessário para fornecer o serviço e cumprir exigências legais. Utilizamos criptografia em trânsito, backups e controles de acesso baseados em função.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Direitos dos titulares</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Acessar, corrigir ou excluir dados pessoais.</li>
          <li>Portabilidade e informação sobre compartilhamento.</li>
          <li>Revogar consentimentos quando aplicável.</li>
          <li>Registrar reclamação junto à ANPD ou autoridade local.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Cookies e rastreamento</h2>
        <p className="text-muted-foreground">
          Usamos cookies essenciais para login e cookies opcionais para analytics. Você pode ajustar preferências no navegador. Ferramentas de terceiros (ex.: analytics) podem definir cookies próprios.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Transferências internacionais</h2>
        <p className="text-muted-foreground">
          Quando dados saem do Brasil, aplicamos cláusulas contratuais padrão e exigimos garantias equivalentes de proteção.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">9. Crianças e adolescentes</h2>
        <p className="text-muted-foreground">
          O Converto não é destinado a menores de 13 anos. Não coletamos intencionalmente dados desse público.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">10. Atualizações da política</h2>
        <p className="text-muted-foreground">
          Podemos atualizar esta política periodicamente. Manteremos a data de revisão no topo desta página e comunicaremos mudanças relevantes aos usuários.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">11. Contato</h2>
        <p className="text-muted-foreground">
          Dúvidas ou solicitações sobre privacidade: converto-contato@gmail.com ou WhatsApp {"(87) 99135-8619"}.
        </p>
      </section>
    </main>
  )
}
