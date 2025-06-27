"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";

const editorStyles = `
  .ProseMirror {
    outline: none;
    min-height: 400px;
    padding: 1.5rem;
    line-height: 1.7;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 16px;
    color: #374151;
    background-color: #ffffff;
  }
  .ProseMirror p {
    margin: 0.75rem 0;
    color: #374151;
  }
  .ProseMirror h1 {
    font-size: 2.25rem;
    font-weight: 800;
    margin: 1.5rem 0 1rem 0;
    color: #111827;
    line-height: 1.2;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .ProseMirror h2 {
    font-size: 1.875rem;
    font-weight: 700;
    margin: 1.25rem 0 0.75rem 0;
    color: #1f2937;
    line-height: 1.3;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .ProseMirror h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
    color: #374151;
    line-height: 1.4;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .ProseMirror ul, .ProseMirror ol {
    margin: 0.75rem 0;
    padding-left: 1.75rem;
    color: #374151;
  }
  .ProseMirror li {
    margin: 0.375rem 0;
    line-height: 1.6;
  }
  .ProseMirror ul li {
    list-style-type: disc;
  }
  .ProseMirror ol li {
    list-style-type: decimal;
  }
  .ProseMirror strong {
    font-weight: 600;
    color: #111827;
  }
  .ProseMirror em {
    font-style: italic;
    color: #4b5563;
  }
  .ProseMirror u {
    text-decoration: underline;
    text-decoration-color: #3b82f6;
    text-decoration-thickness: 2px;
  }
  .ProseMirror table {
    border-collapse: collapse;
    margin: 1.5rem 0;
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }
  .ProseMirror th, .ProseMirror td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
    font-size: 14px;
  }
  .ProseMirror th {
    background-color: #f8fafc;
    font-weight: 600;
    color: #374151;
  }
  .ProseMirror img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .ProseMirror blockquote {
    border-left: 4px solid #3b82f6;
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    background-color: #f8fafc;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #4b5563;
    font-size: 1.1em;
  }
  .ProseMirror code {
    background-color: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.875rem;
    color: #dc2626;
    border: 1px solid #e2e8f0;
  }
  .ProseMirror pre {
    background-color: #1e293b;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
    border: 1px solid #334155;
  }
  .ProseMirror pre code {
    background-color: transparent;
    padding: 0;
    color: #e2e8f0;
    border: none;
    font-size: 0.875rem;
  }
  .ProseMirror:focus {
    outline: none;
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #9ca3af;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;

const Tiptap = ({
  content = "<p>Hello World! 🌎️</p>",
}: {
  content?: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      BulletList,
      OrderedList,
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      TextStyle,
      Color,
      FontFamily,
      Markdown.configure({
        html: false,
        tightLists: true,
        bulletListMarker: "-",
        linkify: true,
        breaks: true,
      }),
    ],
    content: "",
    editable: false, // Chỉ hiển thị, không cho phép chỉnh sửa
  });

  // Xử lý chuyển đổi markdown sang rich text
  useEffect(() => {
    if (editor && content) {
      // Kiểm tra xem content có phải là markdown không
      const isMarkdown =
        /^#{1,6}\s/.test(content.trim()) || // Headings
        /^\s*[-*+]\s/.test(content) || // Unordered lists
        /^\s*\d+\.\s/.test(content) || // Ordered lists
        /\*\*.*\*\*/.test(content) || // Bold
        /\*.*\*/.test(content) || // Italic
        /\[.*\]\(.*\)/.test(content) || // Links
        /^```/.test(content) || // Code blocks
        /^>\s/.test(content) || // Blockquotes
        /`.*`/.test(content); // Inline code

      if (isMarkdown) {
        // Nếu là markdown, parse và chuyển đổi sang HTML
        try {
          const htmlContent = editor.storage.markdown.parseMarkdown(content);
          editor.commands.setContent(htmlContent);
        } catch (error) {
          // Nếu lỗi parse markdown, hiển thị content gốc
          editor.commands.setContent(content);
        }
      } else {
        // Nếu không phải markdown, hiển thị trực tiếp
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <>
      <style>{editorStyles}</style>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow">
        <EditorContent editor={editor} className="min-h-[400px]" />
      </div>
    </>
  );
};

export default Tiptap;
