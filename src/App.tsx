import { useState, useEffect } from "react"
import { Outlet } from "react-router"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        window.matchMedia("(prefers-color-scheme: dark)").matches ||
        document.documentElement.classList.contains("dark")
      )
    }
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Navigation */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Routed Content Area */}
      <main className="page-shell flex-1 pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}