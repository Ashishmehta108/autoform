"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { FadeInSection } from "../FadeInSection";

const testimonials = [
  {
    name: "Anjali Sharma",
    role: "Product Manager",
    content:
      "AutoForm has completely changed the way I fill forms. It's fast, accurate, and intuitive!",
    rating: 5,
  },
  {
    name: "Rohit Verma",
    role: "Freelancer",
    content:
      "I save hours every week thanks to AutoForm. Highly recommended for anyone dealing with forms.",
    rating: 4,
  },
  {
    name: "Priya Kapoor",
    role: "Startup Founder",
    content:
      "The AI suggestions are fantastic. My workflow is now smoother than ever!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-neutral-900">
      <div className="container max-w-7xl mx-auto">
        <FadeInSection delay={1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              What Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied users
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeInSection key={index} delay={index * 0.2}>
              <Card className="p-6 rounded-2xl shadow-inner h-full bg-white dark:bg-zinc-800 border border-muted/50">
                <CardContent className="pt-4 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 flex-1 text-sm sm:text-base">
                    "{testimonial.content}"
                  </p>

                  <div className="mt-auto">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
