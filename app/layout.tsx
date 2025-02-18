import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Comparador de Fornecedores de Energia",
  description: "Compare fornecedores de energia no Brasil",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex h-screen bg-green-50 dark:bg-green-900">
            <Sidebar className="w-64 flex-shrink-0" />
            <main className="flex-grow overflow-auto p-6">{children}</main>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'