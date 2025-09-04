"use client"

import Link from "next/link"
import { CONTACT_INFO } from "@/lib/constants"
import { FaWhatsapp } from "react-icons/fa"

export default function WhatsappFloat() {
  return (
    <Link
      href={CONTACT_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      <span className="sr-only">Falar no WhatsApp</span>
      <div className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
        <FaWhatsapp className="text-white" size={28} />
      </div>
    </Link>
  )
}
