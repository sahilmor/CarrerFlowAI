"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthenticated = true; // This should be replaced with actual auth logic

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Quiz", path: "/quiz" },
    ...(isAuthenticated
      ? [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Roadmap", path: "/roadmap" },
          { name: "Progress", path: "/progress" },
          { name: "RoadMap Dashboard", path: "/roadmap-dash" },
        ]
      : []),
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            CareerFlow
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm transition-colors ${
                pathname === link.path
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-fade-in">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-4 py-2 text-sm ${
                  pathname === link.path
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 pb-2">
              {!isAuthenticated && (
                <Button asChild size="sm" variant="secondary" className="w-full">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
