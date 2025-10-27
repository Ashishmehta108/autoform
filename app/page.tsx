"use client";

import React from "react";

import Footer from "@/components/footer";
import CtaSection from "@/components/landing/CtaSection";
import { PricingSection } from "@/components/landing/Pricing";
import { TestimonialsSection } from "@/components/landing/Testimonials";
import { Navbar } from "@/components/landing/Navbar";
import { FeaturesSection } from "@/components/landing/Features";
import { HeroSection } from "@/components/landing/Hero";
import FAQSection from "@/components/landing/FAQSection";

export default function AutoFormLanding() {
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
