import { CheckoutForm } from "@/components/checkout-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua assinatura do Converto.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <CheckoutForm />
    </div>
  )
}
