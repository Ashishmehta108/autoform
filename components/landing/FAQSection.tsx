"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

import { faqs } from "./faq";
import { FadeInSection } from "../FadeInSection";

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection delay={0.2}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Everything you need to know about AutoForm
            </p>
          </div>
        </FadeInSection>

        <div className="space-y-3">
          <Accordion type="single"  collapsible>
            {faqs.map((faq, index) => (
              <div key={index}  className="cursor-pointer">

              <FadeInSection  key={index} delay={index * 0.08}>
                <AccordionItem
                  value={`faq-${index}`}
                  className="rounded-lg my-4 cursor-pointer border bg-muted/40 shadow-sm px-4"
                >
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </FadeInSection>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
