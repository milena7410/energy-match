import type React from "react"
import Link from "next/link"
import { Home, PlusCircle, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AccessibilityControls } from "@/components/accessibility-controls"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col h-full pb-12 border-r bg-background dark:bg-[rgb(31,41,55)]", className)}>
      <div className="flex-1 space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">Menu</h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100 dark:hover:bg-[rgb(41,51,65)]"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                <span>Início</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100 dark:hover:bg-[rgb(41,51,65)]"
            >
              <Link href="/novo-fornecedor">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Novo Fornecedor</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
        <AccessibilityControls />
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900 mt-4"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  )
}

