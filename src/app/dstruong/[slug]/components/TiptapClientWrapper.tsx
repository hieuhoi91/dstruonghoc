"use client";
import dynamic from "next/dynamic";

const Tiptap = dynamic(() => import("./Tiptap"), { ssr: false });

export default function TiptapClientWrapper({ content }: { content: string }) {
  return <Tiptap content={content} />;
}
