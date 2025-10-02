"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileCheck, Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/20 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-lg font-semibold">AutoForm</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              AI-powered form filling that saves you time and effort.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link
                href="#features"
                className="block hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="block hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link
                href="#about"
                className="block hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="#blog"
                className="block hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#careers"
                className="block hover:text-foreground transition-colors"
              >
                Careers
              </Link>
              <Link
                href="#press"
                className="block hover:text-foreground transition-colors"
              >
                Press
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Connect</h4>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; 2024 AutoForm. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
