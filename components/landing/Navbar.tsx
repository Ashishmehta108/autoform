import { FileCheck, X, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-rose-500">AutoForm</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href={"/dashboard"}>
            <Button
              size="sm"
              className="bg-rose-500 hover:bg-rose-600 text-white hidden md:block cursor-pointer"
            >
              Get Started
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden px-4 py-4 border-t bg-background"
          >
            <div className="flex flex-col gap-4">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-muted-foreground hover:text-foreground text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Button
                size="sm"
                className="bg-rose-500 hover:bg-rose-600 text-white w-full mt-2"
              >
                Get Started
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
