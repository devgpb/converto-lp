import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso | Converto",
  description: "Regras e condições de uso da plataforma Converto.",
  alternates: { canonical: "/termos-de-uso" },
}

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Termos de Uso</h1>
        <p className="text-muted-foreground mb-10">
          Válido a partir de 17 de fevereiro de 2026.
        </p>

        <div className="space-y-8 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              1. Quem somos
            </h2>
            <p>
              Converto é uma plataforma web que organiza negociações e
              follow-ups para empresas que vendem pelo WhatsApp. Estes termos
              regem o uso do site, do período de teste e dos planos pagos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              2. Aceite
            </h2>
            <p>
              Ao criar uma conta ou usar o serviço, você confirma que leu e
              concorda com estes Termos de Uso e com a
              <a
                className="text-primary font-semibold hover:underline"
                href="/politica-de-privacidade"
              >
                {" "}
                Política de Privacidade
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              3. Cadastro e acesso
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Você deve fornecer informações verdadeiras de contato e
                faturamento.
              </li>
              <li>
                Guarde suas credenciais em segurança; acessos feitos com sua
                conta são de sua responsabilidade.
              </li>
              <li>
                Podemos suspender ou encerrar contas que violem estes termos ou
                a lei.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              4. Teste gratuito
            </h2>
            <p>
              Oferecemos teste de 7 dias. Após o período, a assinatura é cobrada
              conforme o plano escolhido, salvo cancelamento antes do fim do
              teste.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              5. Pagamentos
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Planos são cobrados em periodicidade mensal, em reais (BRL).
              </li>
              <li>
                Falhas de pagamento podem resultar em suspensão até
                regularização.
              </li>
              <li>
                Valores podem ser ajustados com aviso prévio mínimo de 30 dias.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              6. Uso aceitável
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Não utilize o serviço para spam, fraude ou conteúdo ilegal.
              </li>
              <li>
                Respeite direitos de terceiros, incluindo dados pessoais e
                propriedade intelectual.
              </li>
              <li>
                Não tente burlar limitações técnicas, segurança ou cobrança.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              7. Dados e privacidade
            </h2>
            <p>
              Tratamos dados conforme descrito na nossa
              <a
                className="text-primary font-semibold hover:underline"
                href="/politica-de-privacidade"
              >
                {" "}
                Política de Privacidade
              </a>
              . Você é responsável por obter consentimentos dos seus clientes
              quando necessário.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              8. Suporte
            </h2>
            <p>
              Oferecemos suporte pelos canais indicados no site. Prazos de
              resposta podem variar conforme o plano.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              9. Limitação de responsabilidade
            </h2>
            <p>
              O serviço é fornecido "como está". Na máxima extensão permitida em
              lei, não nos responsabilizamos por perdas indiretas, lucro
              cessante ou danos resultantes de mau uso da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              10. Rescisão
            </h2>
            <p>
              Você pode cancelar a qualquer momento nas configurações ou pelos
              canais de suporte. Pagamentos já efetuados não são reembolsados,
              salvo disposição legal em contrário.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              11. Alterações
            </h2>
            <p>
              Podemos atualizar estes termos. Publicaremos a nova versão nesta
              página com a data de vigência. O uso contínuo após mudanças
              significa concordância com a versão vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              12. Contato
            </h2>
            <p>
              Dúvidas ou solicitações: converto-contato@gmail.com ou WhatsApp
              (87) 99135-8619.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
