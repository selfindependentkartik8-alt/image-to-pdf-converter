"use client";

import { useRef, useState } from "react";

type SelectedImage = {
  id: string;
  file: File;
  preview: string;
};

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<SelectedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const addImages = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setError("");
    setDownloadUrl(null);

    const files = Array.from(fileList).filter((file) => {
      const name = file.name.toLowerCase();

      return (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".png")
      );
    });

    if (files.length === 0) {
      setError("Please select JPG, JPEG or PNG images.");
      return;
    }

    const newImages: SelectedImage[] = files.map((file) => ({
      id:
        file.name +
        "-" +
        file.size +
        "-" +
        Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((old) => [...old, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((old) => {
      const image = old.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return old.filter((item) => item.id !== id);
    });

    setDownloadUrl(null);
  };

  const clearAll = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    setImages([]);
    setDownloadUrl(null);
    setError("");
  };

  const createPdf = async () => {
    if (images.length === 0) {
      setError("Please select at least one image.");
      return;
    }

    setLoading(true);
    setError("");
    setDownloadUrl(null);

    try {
      const formData = new FormData();

      for (const image of images) {
        formData.append("images", image.file);
      }

      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        throw new Error(
          result?.error || "Unable to create PDF."
        );
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("The generated PDF is empty.");
      }

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!downloadUrl) return;

    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = "images-to-pdf.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#3c2517] via-[#120b07] to-black text-white">

      {/* NAVBAR */}

      <nav className="mx-4 mt-5 rounded-3xl border border-[#b87333]/25 bg-black/80 px-4 py-4 backdrop-blur-xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#b87333]/30">
              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-bold">
                KrishAIWorks
              </p>

              <p className="text-[10px] text-zinc-500">
                AI Solutions That Work
              </p>
            </div>

          </div>

          <a
            href="#converter"
            className="rounded-xl border border-[#b87333]/30 bg-[#b87333]/10 px-4 py-2 text-xs text-[#d69a63]"
          >
            Follow
          </a>

        </div>

      </nav>

      {/* HERO */}

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-24">

        <div className="inline-flex rounded-full border border-[#b87333]/30 bg-[#b87333]/10 px-5 py-2 text-xs text-[#d69a63]">
          🖼️ Image To PDF Converter
        </div>

        <p className="mt-5 text-sm text-zinc-500">
          Built by{" "}
          <span className="text-[#d69a63]">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 text-5xl font-extrabold leading-tight sm:text-7xl">
          Turn Images.
          <br />
          <span className="text-[#d69a63]">
            Into One PDF.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-lg">
          Combine multiple JPG and PNG images into one
          clean PDF document in seconds.
        </p>

      </section>

      {/* TOOL */}

      <section
        id="converter"
        className="mx-auto max-w-5xl px-4 pb-24 sm:px-8"
      >

        <div className="rounded-[2rem] border border-[#b87333]/20 bg-black/85 p-5 sm:p-8">

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c88b58]">
            PDF Converter
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Select your images
          </h2>

          {/* IMPORTANT: REAL FILE INPUT */}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,.jpg,.jpeg,.png"
            multiple
            onChange={(event) => {
              addImages(event.target.files);
            }}
            className="hidden"
          />

          {/* UPLOAD BOX */}

          <div
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                inputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
            className="mt-7 flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-[#b87333]/40 bg-[#090604] px-6 py-10 text-center transition hover:border-[#b87333]/80 hover:bg-[#0e0906]"
          >

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#b87333]/25 bg-[#b87333]/10 text-4xl">
              🖼️
            </div>

            <h3 className="mt-6 text-lg font-bold">
              Choose Images
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Click anywhere in this box to select
              multiple JPG, JPEG or PNG images.
            </p>

            <span className="mt-6 rounded-xl bg-[#f3d3b5] px-6 py-3 text-sm font-bold text-black">
              + Choose Images
            </span>

            <p className="mt-4 text-[11px] text-zinc-700">
              Multiple files supported
            </p>

          </div>

          {/* IMAGE PREVIEWS */}

          {images.length > 0 && (

            <div className="mt-8">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Selected Images
                  </p>

                  <p className="mt-1 text-xs text-zinc-700">
                    {images.length}{" "}
                    {images.length === 1
                      ? "image"
                      : "images"}{" "}
                    selected
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-zinc-600 hover:text-[#d69a63]"
                >
                  Clear all
                </button>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                {images.map((image, index) => (

                  <div
                    key={image.id}
                    className="relative overflow-hidden rounded-2xl border border-[#b87333]/20 bg-[#060403]"
                  >

                    <img
                      src={image.preview}
                      alt={`Selected image ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />

                    <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/85 text-xs font-bold text-[#d69a63]">
                      {index + 1}
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/90 text-white hover:bg-red-600"
                    >
                      ×
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/85 px-3 py-2">
                      <p className="truncate text-[10px] text-zinc-400">
                        {image.file.name}
                      </p>
                    </div>

                  </div>

                ))}

              </div>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-4 w-full rounded-xl border border-dashed border-[#b87333]/30 py-3 text-xs text-[#d69a63] hover:bg-[#b87333]/10"
              >
                + Add More Images
              </button>

            </div>

          )}

          {/* ERROR */}

          {error && (

            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              ⚠️ {error}
            </div>

          )}

          {/* CREATE */}

          <button
            type="button"
            onClick={createPdf}
            disabled={loading || images.length === 0}
            className="mt-7 w-full rounded-2xl bg-[#f3d3b5] px-6 py-4 text-sm font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading
              ? "⏳ Creating PDF..."
              : "✨ Create PDF"}
          </button>

          {/* RESULT */}

          {downloadUrl && (

            <div className="mt-8 rounded-[1.75rem] border border-[#b87333]/25 bg-[#090604] p-5 sm:p-7">

              <span className="inline-block rounded-xl border border-[#b87333]/25 bg-[#b87333]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d69a63]">
                PDF Result
              </span>

              <h3 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                Your PDF Is Ready.
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-500">
                {images.length}{" "}
                {images.length === 1
                  ? "image has"
                  : "images have"}{" "}
                been successfully converted into one PDF.
              </p>

              <button
                type="button"
                onClick={downloadPdf}
                className="mt-6 w-full rounded-2xl bg-[#f3d3b5] px-6 py-4 text-sm font-bold text-black hover:bg-white"
              >
                📥 Download PDF
              </button>

            </div>

          )}

        </div>

      </section>

      {/* FEATURES */}

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-[#b87333]/10 bg-black/70 p-6">
            <div className="text-3xl">🖼️</div>

            <h3 className="mt-5 font-bold">
              Multiple Images
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Combine multiple images into one PDF.
            </p>
          </div>

          <div className="rounded-3xl border border-[#b87333]/10 bg-black/70 p-6">
            <div className="text-3xl">⚡</div>

            <h3 className="mt-5 font-bold">
              Fast
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Create your PDF in just a few seconds.
            </p>
          </div>

          <div className="rounded-3xl border border-[#b87333]/10 bg-black/70 p-6">
            <div className="text-3xl">📱</div>

            <h3 className="mt-5 font-bold">
              Mobile Friendly
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Works smoothly on phones and desktops.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-[#b87333]/10 px-5 py-10 text-center">

        <p className="font-bold">
          KrishAIWorks
        </p>

        <p className="mt-2 text-xs text-zinc-600">
          AI Solutions That Work
        </p>

      </footer>

    </main>
  );
}