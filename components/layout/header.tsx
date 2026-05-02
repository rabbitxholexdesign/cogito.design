"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/about", label: "About" },
  { href: "/service", label: "Service" },
  { href: "/works", label: "Works" },
  { href: "/flow", label: "Flow" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl font-medium tracking-tight">
            cogito.design
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Button (Desktop) */}
          <div className="hidden lg:block">
            <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
              <Link href="/contact" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                お問い合わせ
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    お問い合わせ
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
