"use client";

import Image from "next/image";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  thumbnail: string;
  images: string[];
  onThumbnailChange: (url: string) => void;
  onImagesChange: (urls: string[]) => void;
};

async function uploadFiles(files: FileList | File[]): Promise<string[]> {
  const list = Array.from(files);
  if (!list.length) return [];

  const body = new FormData();
  list.forEach((file) => body.append("files", file));

  const res = await fetch("/api/uploads", { method: "POST", body });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.urls as string[];
}

export function ImageUploader({
  thumbnail,
  images,
  onThumbnailChange,
  onImagesChange,
}: Props) {
  const thumbInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState("");

  async function handleThumbnail(files: FileList | null) {
    if (!files?.length) return;
    setUploadingThumb(true);
    setError("");
    try {
      const [url] = await uploadFiles([files[0]]);
      onThumbnailChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Thumbnail upload failed");
    } finally {
      setUploadingThumb(false);
      if (thumbInput.current) thumbInput.current.value = "";
    }
  }

  async function handleGallery(files: FileList | null) {
    if (!files?.length) return;
    setUploadingGallery(true);
    setError("");
    try {
      const urls = await uploadFiles(files);
      onImagesChange([...images, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gallery upload failed");
    } finally {
      setUploadingGallery(false);
      if (galleryInput.current) galleryInput.current.value = "";
    }
  }

  return (
    <div className="md:col-span-2 space-y-6 border border-[var(--line)] bg-page p-4">
      <div>
        <div className="label">Main photo (optional)</div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="relative h-40 w-full overflow-hidden bg-white sm:w-56">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="Thumbnail preview"
                fill
                className="object-cover"
                sizes="224px"
                unoptimized={thumbnail.startsWith("/uploads/")}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-ink/35">
                <ImagePlus className="h-8 w-8" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              ref={thumbInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleThumbnail(e.target.files)}
            />
            <button
              type="button"
              className="btn-primary"
              disabled={uploadingThumb}
              onClick={() => thumbInput.current?.click()}
            >
              {uploadingThumb ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploadingThumb ? "Uploading…" : "Upload thumbnail"}
            </button>
            {thumbnail && (
              <button
                type="button"
                className="border border-[var(--line)] bg-white px-3 py-2 text-sm"
                onClick={() => onThumbnailChange("")}
              >
                Remove thumbnail
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="label">More photos</div>
        <input
          ref={galleryInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => handleGallery(e.target.files)}
        />
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-blue/30 bg-white px-4 py-2 font-semibold text-navy"
          disabled={uploadingGallery}
          onClick={() => galleryInput.current?.click()}
        >
          {uploadingGallery ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploadingGallery ? "Uploading…" : "Upload gallery images"}
        </button>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {images.map((src) => (
              <div
                key={src}
                className="group relative aspect-[4/3] overflow-hidden bg-white"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="160px"
                  unoptimized={src.startsWith("/uploads/")}
                />
                <button
                  type="button"
                  aria-label="Remove image"
                  className="absolute right-2 top-2 bg-ink/80 p-1.5 text-white opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100"
                  onClick={() =>
                    onImagesChange(images.filter((item) => item !== src))
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
