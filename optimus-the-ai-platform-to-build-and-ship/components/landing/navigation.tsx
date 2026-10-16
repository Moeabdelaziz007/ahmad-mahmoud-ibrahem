"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "./language-context";

const navLinks = [
  { name: "Support · الدعم", href: "#features" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isArabic, toggleLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? "top-4 left-4 right-4" 
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" aria-label={isArabic ? "العودة إلى الصفحة الرئيسية" : "Return to homepage"}>
            <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl" : "text-2xl"}`}>Recovery Path · طريق التعافي</span>
            <span className={`text-muted-foreground font-mono transition-all duration-500 ${isScrolled ? "text-[10px] mt-0.5" : "text-xs mt-1"}`}>TM</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="inline-flex size-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
              aria-label={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "التبديل إلى الوضع الداكن"}
            >
              {mounted && resolvedTheme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2 text-xs text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
              aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Languages className="size-3.5" aria-hidden="true" />
              {isArabic ? "English" : "العربية"}
            </button>
            <a href="/auth" className={`text-foreground/70 hover:text-foreground transition-all duration-500 ${isScrolled ? "text-xs" : "text-sm"}`}>
              {isArabic ? "تسجيل الدخول" : "Sign in"}
            </a>
            <Button
              size="sm"
              onClick={() => { window.location.href = "/auth"; }}
              className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
            >
              {isArabic ? "اطلب الدعم" : "Get support"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label={isArabic ? "فتح القائمة" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Bottom CTAs */}
          <div className="flex items-center justify-between border-t border-foreground/10 py-6">
            <span className="text-sm text-muted-foreground">{isArabic ? "الإعدادات" : "Preferences"}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/15"
                aria-label={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "التبديل إلى الوضع الداكن"}
              >
                {mounted && resolvedTheme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
              </button>
              <button type="button" onClick={toggleLanguage} className="rounded-full border border-foreground/15 px-4 py-2 text-sm" aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}>
                {isArabic ? "English" : "العربية"}
              </button>
            </div>
          </div>
          <div className={`flex gap-4 pt-8 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href="/auth">{isArabic ? "تسجيل الدخول" : "Sign in"}</a>
            </Button>
            <Button
              asChild
              className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href="/auth">{isArabic ? "ابدأ التعافي" : "Start recovery"}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
