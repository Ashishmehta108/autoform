"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Zap, Shield, FileCheck, Github, FileText } from "lucide-react";
import { FadeInSection } from "../FadeInSection";

const features = [
  {
    icon: User,
    title: "Multiple Personas",
    description:
      "Create unlimited personas for different contexts - work, personal, creative projects.",
  },
  {
    icon: Zap,
    title: "Instant Recognition",
    description:
      "AI-powered form detection works across all websites and applications automatically.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data stays secure with local storage and encrypted persona information.",
  },
  {
    icon: FileCheck,
    title: "Smart Matching",
    description:
      "Intelligent field mapping ensures the right information goes in the right place.",
  },
  {
    icon: Github,
    title: "Developer Friendly",
    description:
      "API access and integrations for custom workflows and enterprise solutions.",
  },
  {
    icon: FileText,
    title: "Form Analytics",
    description:
      "Track your form completion rates and optimize your persona effectiveness.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/20">
      <div className="container max-w-7xl mx-auto">
        <FadeInSection delay={1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to streamline your form filling experience
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <Card className="p-6 h-full rounded-2xl border border-muted/50 bg-white dark:bg-zinc-900 shadow-inner hover:shadow-md dark:hover:border-neutral-700/70 cursor-pointer transition-shadow">
                <CardHeader className="pb-4 flex flex-col items-start">
                  <feature.icon className="w-8 h-8 text-foreground/90 mb-3" />

                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
