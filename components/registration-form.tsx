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
}

export function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    empresa: "",
    emailEmpresa: "",
    adminNome: "",
    adminEmail: "",
    senha: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.empresa || !formData.emailEmpresa || !formData.adminNome || !formData.adminEmail || !formData.senha) {
      setError("Todos os campos são obrigatórios")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API calls like the original Ionic component
      // First create tenant
      const tenantResponse = await fetch(`${API_URL}/tenants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.empresa,
          email: formData.emailEmpresa,
        }),
      })

      if (!tenantResponse.ok) {
        throw new Error("Erro ao criar empresa")
      }

      const tenant = await tenantResponse.json()
      try {
        if (tenant?.id) {
          localStorage.setItem("tenant_id", tenant.id)
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
        }),
      })

      if (!authResponse.ok) {
        throw new Error("Erro ao cadastrar usuário")
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
            <CardTitle className="text-xl">Informações da empresa</CardTitle>
            <CardDescription>Dados da sua empresa e do administrador principal</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
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
                    required
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
                    required
                  />
                </div>

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
