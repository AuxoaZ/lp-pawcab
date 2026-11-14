"use client";

import React, { useState, useRef } from "react";
import { BsUpload, BsLink45Deg, BsX, BsCheckCircleFill, BsImage } from "react-icons/bs";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  helperText?: string;
  placeholder?: string;
}

export default function ImageField({
  label,
  value,
  onChange,
  helperText,
  placeholder = "https://... or /images/...",
}: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict client-side validation (< 1 MB)
    if (file.size > 1 * 1024 * 1024) {
      setUploadError(
        `File is ${(file.size / 1024 / 1024).toFixed(2)} MB. Maximum allowed size is 1.0 MB.`
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPEG, PNG, WEBP, SVG).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image to GitHub repository.");
      }

      // Use the raw GitHub URL or web relative path
      onChange(data.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {label}
        </label>
        {uploadSuccess && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <BsCheckCircleFill /> Uploaded & Committed to GitHub!
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Preview Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-800/80 border border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center group">
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/100x100/262626/a3a3a3?text=Image";
                }}
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition cursor-pointer text-xs"
                title="Clear image"
              >
                <BsX />
              </button>
            </>
          ) : (
            <div className="text-center p-2 text-neutral-500">
              <BsImage className="text-xl mx-auto mb-1 opacity-50" />
              <span className="text-[10px] uppercase font-bold tracking-wider">No Image</span>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="flex-1 space-y-2">
          {/* Direct URL input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              <BsLink45Deg className="text-base" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-9 pr-9 py-2 bg-neutral-900 border border-neutral-700/80 rounded-xl text-neutral-200 text-xs placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-pawcab-gold focus:border-pawcab-gold transition"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300 transition cursor-pointer"
              >
                <BsX className="text-base" />
              </button>
            )}
          </div>

          {/* Upload Button (< 1 MB) */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-xs font-medium text-neutral-200 transition cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-pawcab-gold"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Committing to GitHub...</span>
                </>
              ) : (
                <>
                  <BsUpload className="text-xs text-pawcab-gold" />
                  <span>Upload Local File (&le; 1 MB)</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-neutral-500">Auto-commits to GitHub repo</span>
          </div>

          {uploadError && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/40 p-2 rounded-lg leading-relaxed">
              {uploadError}
            </p>
          )}

          {helperText && <p className="text-[11px] text-neutral-500">{helperText}</p>}
        </div>
      </div>
    </div>
  );
}

