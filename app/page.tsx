"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import FAQSection from "@/components/landing/FAQSection";
import Link from "next/link";
import {
  User,
  FileText,
  Zap,
  Check,
  Menu,
  X,
  ArrowRight,
  Play,
  Github,
  Shield,
  FileCheck,
  Star,
  ChevronDown,
  Mail,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ModeToggle";

import { useAnimation } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import CtaSection from "@/components/landing/CtaSection";
import { PricingSection } from "@/components/landing/Pricing";
import { TestimonialsSection } from "@/components/landing/Testimonials";
import { Navbar } from "@/components/landing/Navbar";
import { FadeInSection } from "@/components/FadeInSection";
import { FeaturesSection } from "@/components/landing/Features";
import { HowItWorksSection } from "@/components/landing/HowitWork";
import { HeroSection } from "@/components/landing/Hero";

export default function AutoFormLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
