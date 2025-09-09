"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Mail, User, Lock, ArrowLeft } from "lucide-react"
import { API_URL } from "@/lib/api"

interface FormData {
  empresa: string
  emailEmpresa: string
  adminNome: string
  adminEmail: string
  senha: string
  cpf: string
  cnpj: string
}

export function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    empresa: "",
    emailEmpresa: "",
    adminNome: "",
    adminEmail: "",
    senha: "",
    cpf: "",
    cnpj: "",
  })
  const [accountType, setAccountType] = useState<"company" | "personal">("company")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const onlyDigits = (v: string) => v.replace(/\D/g, "")

  const maskCPF = (v: string) => {
    const d = onlyDigits(v).slice(0, 11)
    const p1 = d.slice(0, 3)
    const p2 = d.slice(3, 6)
    const p3 = d.slice(6, 9)
    const p4 = d.slice(9, 11)
    let out = p1
    if (p2) out += `.${p2}`
    if (p3) out += `.${p3}`
    if (p4) out += `-${p4}`
    return out
  }

  const maskCNPJ = (v: string) => {
    const d = onlyDigits(v).slice(0, 14)
    const p1 = d.slice(0, 2)
    const p2 = d.slice(2, 5)
    const p3 = d.slice(5, 8)
    const p4 = d.slice(8, 12)
    const p5 = d.slice(12, 14)
    let out = p1
    if (p2) out += `.${p2}`
    if (p3) out += `.${p3}`
    if (p4) out += `/${p4}`
    if (p5) out += `-${p5}`
    return out
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    let newValue = value
    if (field === "cpf") newValue = maskCPF(value)
    if (field === "cnpj") newValue = maskCNPJ(value)
    setFormData((prev) => ({ ...prev, [field]: newValue }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const cpfDigits = formData.cpf.replace(/\D/g, "")
    if (!formData.adminNome || !formData.adminEmail || !formData.senha || !cpfDigits) {
      setError("Preencha nome, email, senha e CPF")
      return
    }
    if (cpfDigits.length !== 11) {
      setError("CPF inválido")
      return
    }
    if (accountType === "company") {
      const cnpjDigits = formData.cnpj.replace(/\D/g, "")
      if (!formData.empresa || !formData.emailEmpresa || !cnpjDigits) {
        setError("Preencha os dados da empresa, incluindo CNPJ")
        return
      }
      if (cnpjDigits.length !== 14) {
        setError("CNPJ inválido")
        return
      }
    }

    setIsLoading(true)
    setError("")

    try {
      // First create tenant (para pessoal usamos dados do usuário)
      const tenantResponse = await fetch(`${API_URL}/tenants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: accountType === "company" ? formData.empresa : formData.adminNome,
          email: accountType === "company" ? formData.emailEmpresa : formData.adminEmail,
        }),
      })

      if (!tenantResponse.ok) {
        const data = await tenantResponse.json()
        const msg = (data && typeof data.error.error === "string" && data.error.error) || "Erro ao criar empresa"
        throw new Error(msg)
      
      }

      const tenant = await tenantResponse.json()
      try {
        if (tenant?.id) {
          localStorage.setItem("tenant_id", tenant.id)
          localStorage.setItem("account_type", accountType)
        }
      } catch {}

      // Then register admin user
      const authResponse = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant_id: tenant.id,
          email: formData.adminEmail,
          password: formData.senha,
          name: formData.adminNome,
          cpf: formData.cpf,
          ...(accountType === "company" ? { cnpj: formData.cnpj } : {}),
          account_type: accountType,
        }),
      })

      if (!authResponse.ok) {
        const data = await authResponse.json()
        console.log("data", data.error)
        const msg = data.error 
        throw new Error(msg)
      }

      // Navigate to checkout
      router.push("/checkout")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Criar sua conta</h1>
            <p className="text-muted-foreground">Preencha os dados para começar seu teste gratuito</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tipo de cadastro</CardTitle>
            <CardDescription>Escolha se é para você ou para sua empresa</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {/* Cards de seleção */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAccountType("personal")}
                    className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-shadow hover:shadow-md ${
                      accountType === "personal" ? "shadow-green-300 ring-2 ring-green-500" : ""
                    }`}
                  >
                    <User className="w-6 h-6" />
                    <span className="font-medium">Para mim</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("company")}
                    className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-shadow hover:shadow-md ${
                      accountType === "company" ? "shadow-green-300 ring-2 ring-green-500" : ""
                    }`}
                  >
                    <Building2 className="w-6 h-6" />
                    <span className="font-medium">Para minha empresa</span>
                  </button>
                </div>

                {accountType === "company" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="empresa" className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Nome da empresa
                      </Label>
                      <Input
                        id="empresa"
                        type="text"
                        placeholder="Digite o nome da sua empresa"
                        value={formData.empresa}
                        onChange={(e) => handleInputChange("empresa", e.target.value)}
                        required={accountType === "company"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailEmpresa" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email de contato da empresa
                      </Label>
                      <Input
                        id="emailEmpresa"
                        type="email"
                        placeholder="contato@suaempresa.com"
                        value={formData.emailEmpresa}
                        onChange={(e) => handleInputChange("emailEmpresa", e.target.value)}
                        required={accountType === "company"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cnpj" className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        CNPJ
                      </Label>
                      <Input
                        id="cnpj"
                        inputMode="numeric"
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpj}
                        onChange={(e) => handleInputChange("cnpj", e.target.value)}
                        required={accountType === "company"}
                      />
                    </div>
                  </>
                )}

                <div className="border-t pt-4">
                  <h3 className="font-medium text-foreground mb-4">Dados do administrador</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminNome" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nome completo
                      </Label>
                      <Input
                        id="adminNome"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.adminNome}
                        onChange={(e) => handleInputChange("adminNome", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adminEmail" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email do administrador
                      </Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.adminEmail}
                        onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        CPF
                      </Label>
                      <Input
                        id="cpf"
                        inputMode="numeric"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senha" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Senha
                      </Label>
                      <Input
                        id="senha"
                        type="password"
                        placeholder="Crie uma senha segura"
                        value={formData.senha}
                        onChange={(e) => handleInputChange("senha", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Continuar para pagamento"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="text-primary hover:underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  )
}
