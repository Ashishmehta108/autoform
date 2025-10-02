"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plansData = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal use",
    features: [
      { text: "3 personas" },
      { text: "50 forms per month" },
      { text: "Basic form detection" },
      { text: "Email support" },
      { text: "Access to community resources" },
      { text: "Basic AI suggestions" },
      { text: "Limited browser compatibility" },
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$12",
    description: "Unlimited power for professionals",
    features: [
      { text: "Unlimited personas" },
      { text: "Unlimited forms" },
      { text: "Advanced AI matching" },
      { text: "Priority support" },
      { text: "Analytics dashboard" },
      { text: "Customizable AI templates" },
      { text: "Multi-browser support" },
      { text: "Auto-save form data" },
      { text: "Export and import personas" },
    ],
    cta: "Upgrade to Pro",
    isPopular: true,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 px-4 bg-neutral-900 border-t border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Simple Pricing
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Choose the plan that works for you
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
          {plansData.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "relative rounded-2xl p-8 flex flex-col border transition-colors duration-300",
                "shadow-inner bg-white dark:bg-zinc-900",
                plan.isPopular
                  ? "border-zinc-700 bg-zinc-900 text-zinc-100 shadow-2xl scale-[1.03]"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200"
              )}
            >
              <h3 className="text-xl font-semibold mb-3">{plan.name}</h3>
              <div className="text-4xl font-extrabold mb-2">
                {plan.price}
                <span className="text-lg font-medium text-zinc-400 dark:text-zinc-500 ml-1">
                  /month
                </span>
              </div>
              <p className="mb-6 text-zinc-500 dark:text-zinc-400">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm sm:text-base"
                  >
                    <Check
                      className={cn(
                        "w-5 h-5 mr-3 flex-shrink-0",
                        plan.isPopular
                          ? "text-zinc-200"
                          : "text-zinc-700 dark:text-zinc-300"
                      )}
                    />
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.isPopular ? "default" : "outline"}
                className={cn(
                  "w-full mt-auto cursor-pointer relative overflow-hidden transition-colors duration-300",
                  "shadow-inner"
                )}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-zinc-100/10 to-zinc-600/10 dark:from-zinc-900/10 dark:to-zinc-400/10 pointer-events-none" />
                <span className="relative z-10">{plan.cta}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
