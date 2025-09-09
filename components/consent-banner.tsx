"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { getConsent, setConsent } from "@/lib/consent"

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const prefs = getConsent()
    if (!prefs) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true })
    setVisible(false)
  }

  const save = () => {
    setConsent({ analytics, marketing })
    setVisible(false)
  }

  const rejectNonEssential = () => {
    setConsent({ analytics: false, marketing: false })
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <Card className="mx-auto max-w-3xl shadow-lg border-foreground/10">
        <CardContent className="p-4 md:p-6">
          <div className="md:flex md:items-start md:justify-between gap-6">
            <div className="space-y-2 md:flex-1">
              <h3 className="text-base font-semibold">Seu controle de privacidade</h3>
              <p className="text-sm text-muted-foreground">
                Usamos cookies e armazenamento local para operar o site (essenciais) e, com seu consentimento,
                para métricas (analytics) e marketing. Você pode gerenciar abaixo.
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-md border p-3">
                  <div className="font-medium text-sm">Essenciais</div>
                  <div className="text-xs text-muted-foreground">Sempre ativos</div>
                </div>
                <label className="rounded-md border p-3 flex items-start gap-3 cursor-pointer">
                  <Checkbox checked={analytics} onCheckedChange={(v) => setAnalytics(Boolean(v))} />
                  <div>
                    <div className="font-medium text-sm">Analytics</div>
                    <div className="text-xs text-muted-foreground">Ajuda a melhorar nossos serviços</div>
                  </div>
                </label>
                <label className="rounded-md border p-3 flex items-start gap-3 cursor-pointer">
                  <Checkbox checked={marketing} onCheckedChange={(v) => setMarketing(Boolean(v))} />
                  <div>
                    <div className="font-medium text-sm">Marketing</div>
                    <div className="text-xs text-muted-foreground">Conteúdos e ofertas relevantes</div>
                  </div>
                </label>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Consulte nossa Política de Privacidade para saber mais.
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col gap-2 w-full md:w-auto">
              <Button className="w-full" variant="default" onClick={acceptAll}>Aceitar tudo</Button>
              <Button className="w-full" variant="secondary" onClick={save}>Salvar preferências</Button>
              <Button className="w-full" variant="ghost" onClick={rejectNonEssential}>Recusar não essenciais</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

