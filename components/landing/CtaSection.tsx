"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "../FadeInSection";

export default function CtaSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <FadeInSection delay={0.2}>
          <Card className="p-10 shadow-sm border bg-muted/30">
            <CardContent className="pt-4">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Start auto-filling forms in seconds
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who save hours every week with AutoForm.
              </p>
              <Button size="lg" className="px-10 text-base cursor-pointer">
                Get Started for Free
              </Button>
            </CardContent>
          </Card>
        </FadeInSection>
      </div>
    </section>
  );
}
