type FAQItem = {
  question: string
  answer: string
}

type FAQProps = {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground lg:text-5xl">Perguntas Frequentes</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">Tire todas as suas duvidas sobre o Converto</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {items.map((item) => (
            <details key={item.question} className="group rounded-lg border px-6 transition-all duration-300 hover:shadow-lg">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-semibold">
                <span>{item.question}</span>
                <span className="text-2xl text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="pb-5 text-base leading-relaxed text-muted-foreground">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
