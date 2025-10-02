"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginViaEmail } from "../../lib/actions/loginuser";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Google } from "iconsax-reactjs";
import { useRef, useState } from "react";
import { UploadedFile } from "@/lib/types/persona.types";
import { CloudinaryUploader } from "@/components/CloudinaryUploader";
import Link from "next/link";

const formViaEmailSchema = z.object({
  email: z.string().email(),
  image: z.string().optional().nullable(),
  password: z.string(),
});

export default function CreateUserForm() {
  const form = useForm<z.infer<typeof formViaEmailSchema>>({
    resolver: zodResolver(formViaEmailSchema),
    defaultValues: {
      email: "",
      image: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadRef = useRef<UploadedFile[]>([]);

  async function onSubmit(values: z.infer<typeof formViaEmailSchema>) {
    try {
      setIsSubmitting(true);

      // use uploaded image URL if present
      const uploadedImage = uploadRef.current?.[0]?.uploadedUrl;
      const payload = {
        ...values,
        image: uploadedImage || values.image, // fallback to manual input
      };

      const resp = await LoginViaEmail(payload);
      console.log(resp);

      toast("User created successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast("Failed to create user.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center bg-white dark:bg-neutral-900 justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="flex-1 h-11 gap-2 cursor-pointer"
              onClick={() => signIn("github")}
            >
              <Github className="h-5 w-5" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 gap-2 cursor-pointer"
              onClick={() => signIn("google")}
            >
              <Google className="fill-neutral-800 dark:text-neutral-100 dark:fill-neutral-100 w-5 h-5 text-neutral-800" />
              Google
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 text-sm text-muted-foreground bg-white dark:bg-neutral-900">
                OR
              </span>
            </span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image (optional)</FormLabel>
                    <FormControl>
                      <CloudinaryUploader
                        ref={uploadRef}
                        isSubmitting={isSubmitting}
                        accept={true}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full h-11 text-base"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
