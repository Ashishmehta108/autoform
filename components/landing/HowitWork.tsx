"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, FileText, Zap } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Create Persona",
    description:
      "Define your digital personas with personal information, preferences, and context for different use cases.",
  },
  {
    icon: FileText,
    title: "Detect Form",
    description:
      "Our AI automatically detects form fields and understands the context of what information is needed.",
  },
  {
    icon: Zap,
    title: "Autofill",
    description:
      "Watch as your forms get filled instantly with the right information from the appropriate persona.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to automate your form filling
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card className="p-8 h-full rounded-2xl bg-white dark:bg-zinc-900 border border-muted/50 shadow-inner hover:shadow-md transition-shadow text-center">
              <CardHeader className="flex flex-col items-center">
                <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mt-2 text-sm sm:text-base">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
