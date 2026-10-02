"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { ToolbarButton } from "@/components/RichTextEditor";

// Adds a "fine print" variant: the page renders it as small monospace text.
const VariantParagraph = Paragraph.extend({
  addAttributes() {
    return {
      variant: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-variant"),
        renderHTML: (attributes) =>
          attributes.variant ? { "data-variant": attributes.variant } : {},
      },
    };
  },
});

function Divider() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />;
}

function Toolbar({ editor }: { editor: Editor }) {
  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const isFinePrint = editor.isActive("paragraph", { variant: "fine" });

  return (
    <div className="flex flex-wrap items-center gap-1 border border-gray-300 rounded-t-md bg-gray-50 p-2">
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Heading"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        label="Subheading"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        •—
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </ToolbarButton>

      <Divider />

      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={addLink}>
        Link
      </ToolbarButton>
      <ToolbarButton
        label="Small monospace text for the current paragraph"
        active={isFinePrint}
        onClick={() =>
          editor
            .chain()
            .focus()
            .setParagraph()
            .updateAttributes("paragraph", { variant: isFinePrint ? null : "fine" })
            .run()
        }
      >
        Fine print
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        ↺
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        ↻
      </ToolbarButton>
    </div>
  );
}

export default function PageEditor({
  slug,
  title,
  initialContent,
  viewHref,
}: {
  slug: string;
  title: string;
  initialContent: string;
  viewHref: string;
}) {
  const [html, setHtml] = useState(initialContent);
  const [savedHtml, setSavedHtml] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: false,
        link: false,
        underline: false,
        heading: { levels: [2, 3] },
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      VariantParagraph,
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "about-content min-h-[320px] px-4 py-3 focus:outline-none border border-t-0 border-gray-300 rounded-b-md bg-white",
      },
    },
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
      setMessage(null);
    },
  });

  const dirty = html !== savedHtml;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: html }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSavedHtml(html);
      setMessage({ kind: "success", text: "Saved. The page is updated." });
    } catch (err) {
      setMessage({
        kind: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <a
          href={viewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          View page ↗
        </a>
      </div>

      {editor ? (
        <div>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      ) : (
        <p className="text-sm text-gray-500">Loading editor…</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving || !dirty}
          className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {dirty && !message && (
          <span className="text-sm text-gray-500">Unsaved changes</span>
        )}
        {message && (
          <span
            className={`text-sm ${
              message.kind === "success" ? "text-green-700" : "text-red-600"
            }`}
          >
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}
