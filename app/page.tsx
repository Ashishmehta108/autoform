"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  FileText,
  Zap,
  Check,
  Moon,
  Sun,
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

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];
import {
  Sparkles,
  Phone,
  Briefcase,
  CalendarCheck,
  CheckCircle,
} from "lucide-react";

import { useAnimation } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

export const AnimatedFormSVG = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const barControls = useAnimation();

  useEffect(() => {
    const loopAnimation = async () => {
      while (true) {
        await barControls.start({ y: 260, transition: { duration: 1.2 } });
        await barControls.start({ y: 80, transition: { duration: 1.2 } });
      }
    };
    loopAnimation();

    const timeout = setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full max-w-[500px]  mx-auto">
      <motion.svg
        viewBox="0 0 500 400"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        <motion.rect
          x="80"
          y="40"
          width="340"
          height="350"
          rx="16"
          className="fill-white flex flex-col items-center dark:fill-zinc-900 stroke-zinc-200 dark:stroke-zinc-700"
          strokeWidth="1.5"
        />

        {loading && (
          <>
            <motion.rect
              x="100"
              y="80"
              rx="4"
              ry="4"
              width="300"
              height="20"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect
              x="100"
              y="80"
              rx="4"
              ry="4"
              width="200"
              height="16"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect
              x="100"
              y="120"
              rx="4"
              ry="4"
              width="280"
              height="20"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect
              x="100"
              y="160"
              rx="4"
              ry="4"
              width="260"
              height="20"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </>
        )}

        {/* Moving Rose Bar */}
        {loading && (
          <motion.rect
            x="85"
            width="330"
            height="4"
            fill="url(#roseGradient)"
            initial={{ y: 80 }}
            animate={barControls}
          />
        )}

        {/* Success Check Animation */}
        {submitted && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          >
            <circle cx="250" cy="180" r="24" className="fill-green-500" />
            <motion.path
              d="M 242 180 L 248 186 L 260 172"
              stroke="white"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
};
const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-rose-500">AutoForm</span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            size="sm"
            className="bg-rose-500 hover:bg-rose-600 text-white hidden md:block"
          >
            Get Started
          </Button>
          {/* Mobile Toggle */}
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

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    content:
      "AutoForm saved me 5+ hours per week on job applications. The AI is incredibly accurate.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Freelancer",
    content:
      "Game changer for client onboarding forms. Multiple personas make it so easy to switch contexts.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "HR Director",
    content:
      "Our team uses AutoForm for all recruitment forms. It's become indispensable.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "How secure is my data?",
    answer:
      "All your persona data is encrypted and stored locally. We never store your personal information on our servers.",
  },
  {
    question: "Does it work on all websites?",
    answer:
      "AutoForm works on 95%+ of websites. Our AI continuously learns new form patterns to improve compatibility.",
  },
  {
    question: "Can I create different personas for different purposes?",
    answer:
      "Yes! Create unlimited personas for job applications, personal forms, business contexts, and more.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, our free plan includes 3 personas and 50 forms per month. No credit card required.",
  },
];

export default function AutoFormLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="mb-4">
                🎉 New: AI-Powered Form Detection
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                AutoForm: Fill Forms.{" "}
                <span className="text-rose-500">Faster.</span>{" "}
                <span className="text-rose-500">Smarter.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Stop wasting time on repetitive form filling. Let our AI-powered
                personas handle job applications, personal forms, and more with
                intelligent autofill technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-rose-500 hover:bg-rose-600 cursor-pointer text-white"
                  onClick={() => router.push("/dashboard")}
                >
                  Try Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="mr-2 w-4 h-4" /> Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Card className="p-8 shadow-none  border-none">
                <AnimatedFormSVG />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <FadeInSection delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">
                Three simple steps to automate your form filling
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((step, index) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <Card className="text-center p-8 h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <FadeInSection delay={1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to streamline your form filling experience
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
            ].map((feature, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-muted hover:border-rose-500/50">
                  <CardHeader className="pb-4">
                    <feature.icon className="w-8 h-8 text-rose-500 mb-2" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <FadeInSection delay={1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Users Say</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of satisfied users
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <Card className="p-6 h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
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

      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <FadeInSection delay={1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-xl text-muted-foreground">
                Choose the plan that works for you
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for personal use",
                features: [
                  "3 personas",
                  "50 forms per month",
                  "Basic form detection",
                  "Email support",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$12",
                description: "Unlimited power for professionals",
                features: [
                  "Unlimited personas",
                  "Unlimited forms",
                  "Advanced AI matching",
                  "Priority support",
                  "API access",
                  "Analytics dashboard",
                ],
                cta: "Start Pro Trial",
                popular: true,
              },
            ].map((plan, index) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <Card
                  className={`relative p-8 h-full ${
                    plan.popular ? "border-rose-500 shadow-lg scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-500">
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-rose-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="">
                    <Button
                      className={`w-full   cursor-pointer mt-8 ${
                        plan.popular ? "bg-rose-500 hover:bg-rose-600" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <FadeInSection delay={1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about AutoForm
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <Accordion type="single" className="" collapsible>
                  <AccordionItem value={`value ${index}`}>
                    <AccordionTrigger className="text-left cursor-pointer hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeInSection delay={1}>
            <Card className="p-12 shadow-none bg-rose-50/10">
              <CardContent className="pt-6">
                <h2 className="text-4xl font-bold mb-6">
                  Start auto-filling forms in seconds
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of users who save hours every week with
                  AutoForm
                </p>
                <Button
                  size="lg"
                  className="bg-rose-500 text-white hover:bg-rose-600 text-lg px-12"
                >
                  Get Started for Free
                </Button>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">AutoForm</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered form filling that saves you time and effort.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-muted-foreground">
                <Link href="#features" className="block hover:text-foreground">
                  Features
                </Link>
                <Link href="#pricing" className="block hover:text-foreground">
                  Pricing
                </Link>
                <Link href="#api" className="block hover:text-foreground">
                  API
                </Link>
                <Link href="#docs" className="block hover:text-foreground">
                  Documentation
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <Link href="#about" className="block hover:text-foreground">
                  About
                </Link>
                <Link href="#blog" className="block hover:text-foreground">
                  Blog
                </Link>
                <Link href="#careers" className="block hover:text-foreground">
                  Careers
                </Link>
                <Link href="#press" className="block hover:text-foreground">
                  Press
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground">
            <p>&copy; 2024 AutoForm. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#cookies" className="hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
