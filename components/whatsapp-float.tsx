import { CONTACT_INFO } from "@/lib/constants"
import { FaWhatsapp } from "react-icons/fa"

export default function WhatsappFloat() {
  return (
    <a
      href={CONTACT_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp em ${CONTACT_INFO.phoneDisplay}`}
      className="whatsapp-float fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
    >
      <span className="sr-only">Falar no WhatsApp</span>
      <span aria-hidden="true" className="whatsapp-float-ring" />
      <span
        aria-hidden="true"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105"
      >
        <FaWhatsapp className="h-7 w-7" />
      </span>
    </a>
  )
}
