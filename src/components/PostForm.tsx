"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import RatingPicker from "@/components/RatingPicker";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

type PostData = {
  id?: string;
  title: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  city: string | null;
  sourceUrl: string | null;
  isReview: boolean;
  ratingType: string | null;
  ratingCount: number | null;
  published: boolean;
};

export default function PostForm({ initial }: { initial?: PostData }) {
  const router = useRouter();
  const isEditing = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [city, setCity] = useState(initial?.city ?? "Charlotte, NC");
  const [sourceUrl, setSourceUrl] = useState(initial?.sourceUrl ?? "");
  const [isReview, setIsReview] = useState(initial?.isReview ?? true);
  const [ratingType, setRatingType] = useState<"fire" | "knife" | null>(
    (initial?.ratingType as "fire" | "knife" | null) ?? null
  );
  const [ratingCount, setRatingCount] = useState<number | null>(
    initial?.ratingCount ?? null
  );
  const [published, setPublished] = useState(initial?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingCover(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setCoverImage(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleSave(publishOverride?: boolean) {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const body = {
        title,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        city: city || null,
        sourceUrl: sourceUrl || null,
        isReview,
        ratingType,
        ratingCount,
        published: publishOverride ?? published,
      };
      const url = isEditing ? `/api/posts/${initial!.id}` : "/api/posts";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error ?? "Save failed");
      }
      const saved = await res.json();
      if (!isEditing) {
        router.push(`/admin/posts/${saved.id}`);
      } else {
        setPublished(saved.published);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="text-2xl font-semibold text-gray-900 w-full focus:outline-none border-b border-transparent focus:border-gray-300 pb-1"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Cover image</label>
        <div className="flex items-center gap-3">
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImage}
              alt="Cover"
              className="h-16 w-16 object-cover rounded-md border border-gray-200"
            />
          )}
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={uploadingCover}
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50"
          >
            {uploadingCover
              ? "Uploading…"
              : coverImage
                ? "Change image"
                : "Upload image"}
          </button>
          {coverImage && (
            <button
              type="button"
              onClick={() => setCoverImage("")}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="hidden"
            onChange={handleCoverUpload}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="city" className="text-sm text-gray-700">
          City (optional, e.g. Charlotte, NC)
        </label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Charlotte, NC"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="sourceUrl" className="text-sm text-gray-700">
          Original Substack URL (optional)
        </label>
        <input
          id="sourceUrl"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://queencityhag.substack.com/p/..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isReview"
          type="checkbox"
          checked={isReview}
          onChange={(e) => setIsReview(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="isReview" className="text-sm text-gray-700">
          This is a full review (uncheck for a quick mention — the source
          link will read &quot;Read the newsletter&quot; instead of &quot;Read
          full review&quot;)
        </label>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">
          Final take rating (optional)
        </label>
        <RatingPicker
          ratingType={ratingType}
          ratingCount={ratingCount}
          onChange={(type, count) => {
            setRatingType(type);
            setRatingCount(count);
          }}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="excerpt" className="text-sm text-gray-700">
          Excerpt (optional)
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700 mb-1 block">Content</label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => handleSave(false)}
          disabled={saving}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving}
          className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {published ? "Update & keep published" : "Publish"}
        </button>
        {published && (
          <span className="text-sm text-green-700">● Published</span>
        )}
      </div>
    </div>
  );
}
