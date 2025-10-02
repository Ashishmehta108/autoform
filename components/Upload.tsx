"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, UploadCloud } from "lucide-react";
import { UploadedFile } from "@/lib/types/persona.types";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DocumentUpload } from "iconsax-reactjs";

export function DocumentUploader({
  filesRef,
  isSubmitting,
  accept = false,
}: {
  filesRef: React.MutableRefObject<UploadedFile[]>;
  isSubmitting: boolean;
  accept?: boolean;
}) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [errorFiles, setErrorFiles] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsModalOpen(true);
      for (const file of acceptedFiles) {
        const index = files.length;
        setUploadingIndex(index);

        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch("/api/upload/single", {
            method: "POST",
            body: formData,
          });
          const result = await res.json();

          if (!res.ok) throw new Error(result.error || "Upload failed");

          setFiles((prev) => [
            ...prev,
            {
              file,
              preview: URL.createObjectURL(file),
              uploadedUrl: result.url,
            },
          ]);
        } catch (err) {
          console.error("Upload error:", err);
          setErrorFiles((prev) => [...prev, index]);
        } finally {
          setUploadingIndex(null);
        }
      }
      setIsModalOpen(false);
    },
    [files.length]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setErrorFiles((prev) => prev.filter((i) => i !== index));
    filesRef.current = files;
  };

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const acceptedFiles = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
    "text/plain": [".txt"],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    multiple: true,
  });

  return (
    <>
      <Card className="p-4 space-y-4">
        <Label className="text-base">Upload Documents</Label>

        <motion.div
          {...getRootProps()}
          className={`border border-dashed border-neutral-300 dark:border-neutral-700 p-6 rounded-md text-center cursor-pointer transition-colors ${
            isDragActive
              ? "bg-neutral-100 dark:bg-neutral-800"
              : "bg-neutral-50 dark:bg-neutral-900"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Drag & drop files here, or click to select
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            {accept
              ? "Accepted: image files"
              : "Accepted: .pdf, .doc, .docx, .txt"}
          </p>
        </motion.div>

        {files.length > 0 && (
          <CardContent className="space-y-2 max-h-60 overflow-y-auto">
            {files.map(({ file, uploadedUrl }, index) => (
              <motion.div
                key={index}
                className={`flex items-center justify-between p-2 rounded-md border ${
                  errorFiles.includes(index)
                    ? "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                    : "border-neutral-200 dark:border-neutral-700"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col text-sm w-full">
                  <span className="font-medium">{file.name}</span>
                  {errorFiles.includes(index) ? (
                    <div className="flex items-center text-xs text-red-500 mt-1 gap-1">
                      <Trash2 className="w-3 h-3" /> Upload failed
                    </div>
                  ) : uploadedUrl ? (
                    <a
                      href={uploadedUrl}
                      className="text-xs text-blue-600 dark:text-blue-400 mt-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  ) : (
                    <p className="text-xs text-neutral-500 mt-1">
                      Waiting to upload...
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </CardContent>
        )}
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md w-full p-6 flex flex-col items-center justify-center gap-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DocumentUpload className="w-5 h-5 text-neutral-700  dark:text-neutral-300" />
              Uploading file
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
              Please wait while your file is being uploaded
            </DialogDescription>
          </DialogHeader>

          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded overflow-hidden mt-2">
            <motion.div
              className="h-2 bg-rose-500 rounded"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
