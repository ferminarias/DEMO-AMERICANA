"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

// Simple icon component to replace lucide-react
const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const SECTION_IDS = [
  "universidad",
  "programas",
  "beneficios",
  "testimonios",
  "admisiones",
  "faq",
  "contacto",
]

const programs = [
  {
    title: "Licenciaturas",
    items: [
      { title: "Administración de Empresas", href: "#contacto" },
      { title: "Marketing Digital", href: "#contacto" },
      { title: "Ingeniería en Sistemas", href: "#contacto" },
      { title: "Psicología", href: "#contacto" },
    ],
  },
]

const masters = [
  {
    title: "Maestrías",
    items: [
      { title: "MBA", href: "#contacto" },
      { title: "Marketing Digital", href: "#contacto" },
      { title: "Recursos Humanos", href: "#contacto" },
      { title: "Finanzas", href: "#contacto" },
    ],
  },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          const topVisible = visible.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          )
          setActiveSection(topVisible.target.id)
        }
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0.1, 0.25, 0.5] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])


  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b shadow-sm"
          : "bg-blue-900/90 backdrop-blur-md border-b border-white/10",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-2 shadow-md">
            <Image
              src="/logo-ulinea.svg"
              alt="ULINEA Universidad"
              width={24}
              height={24}
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>
          <div className="flex flex-col">
            <div
              className={cn(
                "text-xl font-bold leading-tight transition-colors",
                isScrolled ? "text-ulinea-blue" : "text-white",
              )}
            >
              ULINEA
            </div>
            <div
              className={cn(
                "text-xs leading-tight transition-colors",
                isScrolled ? "text-muted-foreground" : "text-white/90",
              )}
            >
              UNIVERSIDAD
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#universidad" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isScrolled
                      ? "bg-background text-gray-700 hover:bg-gray-100 focus:ring-gray-400"
                      : "bg-blue-800/60 text-white hover:bg-blue-700/80 backdrop-blur-sm focus:ring-white/50",
                  )}
                  data-active={activeSection === "universidad" ? "true" : undefined}
                  aria-current={activeSection === "universidad" ? "page" : undefined}
                  aria-label="Ir a la sección La Universidad"
                >
                  La Universidad
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "transition-colors h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 data-[active=true]:bg-blue-700/90 data-[active=true]:text-white",
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400"
                    : "text-white hover:text-white bg-blue-800/60 hover:bg-blue-700/80 backdrop-blur-sm focus:ring-white/50",
                )}
                data-active={activeSection === "programas" ? "true" : undefined}
                aria-label="Ver programas de licenciaturas"
              >
                Licenciaturas
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md z-50 min-h-[200px]">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {programs[0].items.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href}>
                      Programa de {item.title.toLowerCase()}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "transition-colors h-10 px-4 py-2 rounded-md data-[active=true]:bg-blue-700/90 data-[active=true]:text-white",
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white hover:text-white bg-blue-800/60 hover:bg-blue-700/80 backdrop-blur-sm",
                )}
                data-active={activeSection === "programas" ? "true" : undefined}
              >
                Maestrías
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md z-50 min-h-[200px]">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {masters[0].items.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href}>
                      Maestría en {item.title}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "transition-colors h-10 px-4 py-2 rounded-md data-[active=true]:bg-blue-700/90 data-[active=true]:text-white",
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white hover:text-white bg-blue-800/60 hover:bg-blue-700/80 backdrop-blur-sm",
                )}
                data-active={activeSection === "programas" ? "true" : undefined}
              >
                Maestrías Europeas
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md z-50 min-h-[200px]">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  <ListItem title="MBA Europeo" href="#contacto">
                    Programa conjunto con universidades europeas
                  </ListItem>
                  <ListItem title="Master en Innovación" href="#contacto">
                    Especialización en innovación y emprendimiento
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

          {/* Admin external link */}
          <NavigationMenuItem>
            <Link href="https://v0-ulinea-website-build.vercel.app/admin/login" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isScrolled
                    ? "bg-background text-gray-700 hover:bg-gray-100"
                    : "bg-blue-800/60 text-white hover:bg-blue-700/80 backdrop-blur-sm",
                )}
              >
                Admin
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="flex items-center space-x-4">
          <button
            className={cn(
              "hidden shadow-lg md:inline-flex transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 rounded-md font-medium",
              isScrolled
                ? "bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-400"
                : "bg-white hover:bg-white/90 text-blue-900 backdrop-blur-sm border border-white/20 focus:ring-white/50",
            )}
            onClick={scrollToContact}
            aria-label="Solicitar información sobre programas"
          >
            Solicitar información
          </button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden p-2 rounded-md",
                  isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-white/90",
                )}
                aria-label="Abrir menú de navegación"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                  <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-1.5 shadow-md">
                    <Image
                      src="/logo-ulinea.svg"
                      alt="ULINEA Universidad"
                      width={20}
                      height={20}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div className="text-lg font-bold text-ulinea-blue">ULINEA</div>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    <Link href="#universidad" onClick={() => setIsOpen(false)}>
                      La Universidad
                    </Link>
                    <div className="flex flex-col space-y-2">
                      <div className="font-medium">Licenciaturas</div>
                      {programs[0].items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="pl-4 text-muted-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="font-medium">Maestrías</div>
                      {masters[0].items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="pl-4 text-muted-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                    <button
                      className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => {
                        scrollToContact()
                        setIsOpen(false)
                      }}
                    >
                      Solicitar información
                    </button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = ({ className, title, children, ...props }: { className?: string; title: string; children?: React.ReactNode; href: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-black focus:bg-blue-50 focus:text-black text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-black">{title}</div>
          {children && <p className="line-clamp-2 text-sm leading-snug text-gray-800">{children}</p>}
        </a>
      </NavigationMenuLink>
    </li>
  )
}
