"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { AnimatedFormSVG } from "../AnimatedFomSvg";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="pt-32 pb-20 px-4 bg-zinc-50 dark:bg-zinc-900">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              🎉 New: AI-Powered Form Detection
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 dark:from-zinc-100 to-zinc-600 dark:to-zinc-400">
              AutoForm: Fill Forms.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-700 dark:from-zinc-200 to-zinc-500 dark:to-zinc-400">
                Faster.
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-700 dark:from-zinc-200 to-zinc-500 dark:to-zinc-400">
                Smarter.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed max-w-lg">
              Stop wasting time on repetitive form filling. Let our AI-powered
              personas handle job applications, personal forms, and more with
              intelligent autofill technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-start">
              <Button
                size="lg"
                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                onClick={() => router.push("/dashboard")}
              >
                Try Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
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
            <Card className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-inner border border-zinc-200 dark:border-zinc-700">
              <AnimatedFormSVG />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
