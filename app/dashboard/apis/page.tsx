"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff, Plus, Copy, Trash2, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { Key } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

interface ApiKey {
  id: string;
  createdAt: string;
  expiresAt?: string;
  revoked: boolean;
  dailyLimit: number;
  dailyUsageCount: number;
}

export default function ApiKeysSection() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const queryClient = useQueryClient();
  const [showKey, setShowKey] = useState(false);

  const { data, isLoading } = useQuery<ApiKey[]>({
    queryKey: ["apikeys", userId],
    queryFn: async () => {
      const res = await fetch(`/api/apikey?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch keys");
      return res.json();
    },
    enabled: !!userId,
  });

  // ✅ CREATE KEY — Optimistic
  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/apikey", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create API key");
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["apikeys", userId]);
      const prevKeys =
        queryClient.getQueryData<ApiKey[]>(["apikeys", userId]) || [];

      const tempKey: ApiKey = {
        id: "temp-" + Date.now(),
        createdAt: new Date().toISOString(),
        revoked: false,
        dailyLimit: 1000,
        dailyUsageCount: 0,
      };

      queryClient.setQueryData(["apikeys", userId], [...prevKeys, tempKey]);

      return { prevKeys };
    },
    onError: (err, _, ctx) => {
      toast.error("Failed to create API key");
      if (ctx?.prevKeys)
        queryClient.setQueryData(["apikeys", userId], ctx.prevKeys);
    },
    onSuccess: () => {
      toast.success("API key created!");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["apikeys", userId]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/apikey/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete API key");
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["apikeys", userId]);
      const prevKeys =
        queryClient.getQueryData<ApiKey[]>(["apikeys", userId]) || [];

      queryClient.setQueryData(
        ["apikeys", userId],
        (old?: ApiKey[]) => old?.filter((k) => k.id !== id) || []
      );

      return { prevKeys };
    },
    onError: (err, _, ctx) => {
      toast.error("Failed to delete key");
      if (ctx?.prevKeys)
        queryClient.setQueryData(["apikeys", userId], ctx.prevKeys);
    },
    onSuccess: () => toast.success("API key deleted!"),
    onSettled: () => queryClient.invalidateQueries(["apikeys", userId]),
  });

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Copied to clipboard!");
  };

  const canCreate = !data?.length;

  return (
    <div className="max-w-xl mx-auto">
      <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            <CardTitle className="text-lg font-semibold">API Key</CardTitle>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your API key — only one active key is allowed.
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-5">
            <Button
              disabled={!canCreate}
              onClick={() => {
                if (!canCreate) {
                  toast.warning("You already have an API key");
                  return;
                }
                createMutation.mutate();
              }}
              className={cn(
                "gap-2 transition-all shadow-sm",
                !canCreate &&
                  "opacity-60 cursor-not-allowed bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
              )}
            >
              <Plus className="w-4 h-4" />
              {canCreate ? "Generate API Key" : "Key Exists"}
            </Button>
          </div>

          <ScrollArea className="max-h-80 pr-2">
            {isLoading ? (
              <p className="text-sm text-neutral-500">Loading keys...</p>
            ) : data?.length ? (
              data.map((key) => (
                <div
                  key={key.id}
                  className="flex flex-col gap-3 p-4 mb-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 shadow-inner hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-mono text-sm text-neutral-800 dark:text-neutral-100 break-all">
                        {showKey ? key.id : key.id.replace(/.(?=.{4})/g, "•")}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Created: {new Date(key.createdAt).toLocaleDateString()}{" "}
                        | Expires:{" "}
                        {key.expiresAt
                          ? new Date(key.expiresAt).toLocaleDateString()
                          : "Never"}{" "}
                        | Limit: {key.dailyLimit} | Used: {key.dailyUsageCount}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-neutral-500 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300"
                      onClick={() => setShowKey((prev) => !prev)}
                    >
                      {showKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        key.revoked
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      )}
                    >
                      {key.revoked ? "Revoked" : "Active"}
                    </span>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(key.id)}
                        className="border-neutral-300 cursor-pointer dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        <Copy className="mr-1 h-4 w-4" /> Copy
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(key.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-900/60">
                <Key className="h-6 w-6 mb-2 text-neutral-500" />
                <p className="text-sm text-neutral-500">No API key yet.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
