import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Calculadora de IMC | Saúde e Bem-estar",
  description: "Calcule seu Índice de Massa Corporal de forma rápida. Ferramenta precisa e acessível.",
  keywords: ["IMC", "Saúde", "Calculadora", "Next.js"],
  authors: [{ name: "Rodrigo Costa" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}