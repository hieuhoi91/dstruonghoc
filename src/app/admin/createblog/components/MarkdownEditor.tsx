import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import OrderedList from '@tiptap/extension-ordered-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ChevronDown, Palette, Type } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Markdown } from 'tiptap-markdown';

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

type MarkdownEditorProps = {
  content: string;
  onContentChange: (content: string) => void;
};

const MarkdownEditor = ({ content, onContentChange }: MarkdownEditorProps, ref: React.Ref<any>) => {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [markdownValue, setMarkdownValue] = useState('');
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
      Markdown,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  useImperativeHandle(ref, () => ({
    getMarkdown: () => {
      if (isMarkdownMode) return markdownValue;
      return editor?.storage.markdown.getMarkdown() || '';
    }
  }), [isMarkdownMode, markdownValue, editor]);

  // Toggle between markdown and rich text mode
  const handleToggleMode = async () => {
    if (!editor) return;

    // Toggle trước để UI biết cần render chế độ gì
    const nextMode = !isMarkdownMode;
    setIsMarkdownMode(nextMode);

    if (!nextMode) {
      // Tức là chuyển từ Markdown về Rich Text
      editor.commands.setContent(
        editor.storage.markdown.parseMarkdown(markdownValue || "")
      );
    } else {
      // Chuyển từ Rich Text sang Markdown
      const markdown = editor.storage.markdown.getMarkdown();
      setMarkdownValue(markdown);
    }
  };

  if (!editor) return null;

  return (
    <>
      <style>{editorStyles}</style>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-300 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {!isMarkdownMode && (
              <>
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${editor.isActive('bold') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                  title="Bold"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M15.6 11.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 7.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                  </svg>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${editor.isActive('italic') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                  title="Italic"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
                  </svg>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${editor.isActive('underline') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                  title="Underline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
                  </svg>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`p-2.5 rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                        editor.isActive('heading', { level: 1 }) || 
                        editor.isActive('heading', { level: 2 }) || 
                        editor.isActive('heading', { level: 3 }) || 
                        editor.isActive('heading', { level: 4 }) || 
                        editor.isActive('heading', { level: 5 }) || 
                        editor.isActive('heading', { level: 6 }) 
                          ? 'bg-blue-500 text-white shadow-md' 
                          : 'hover:bg-gray-200 text-gray-700'
                      }`}
                      title="Heading"
                    >
                      <Type className="w-4 h-4" />
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem 
                      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : ''}
                    >
                      <span className="text-2xl font-bold mr-2">H1</span>
                      <span>Heading 1</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : ''}
                    >
                      <span className="text-xl font-bold mr-2">H2</span>
                      <span>Heading 2</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                      className={editor.isActive('heading', { level: 3 }) ? 'bg-blue-500 text-white' : ''}
                    >
                      <span className="text-lg font-bold mr-2">H3</span>
                      <span>Heading 3</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                      className={editor.isActive('heading', { level: 4 }) ? 'bg-blue-500 text-white' : ''}
                    >
                      <span className="text-base font-bold mr-2">H4</span>
                      <span>Heading 4</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                      className={editor.isActive('heading', { level: 5 }) ? 'bg-blue-500 text-white' : ''}
                    >
                      <span className="text-sm font-bold mr-2">H5</span>
                      <span>Heading 5</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                      className={editor.isActive('heading', { level: 6 }) ? 'bg-blue-500 text-white' : ''}
                    >
                      <span className="text-xs font-bold mr-2">H6</span>
                      <span>Heading 6</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <Select onValueChange={(value) => {
                  editor.chain().focus().setMark('textStyle', { fontFamily: value }).run();
                }}>
                  <SelectTrigger className="w-32 h-10">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Verdana">Verdana</SelectItem>
                    <SelectItem value="Courier New">Courier New</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => {
                  editor.chain().focus().setMark('textStyle', { fontSize: value }).run();
                }}>
                  <SelectTrigger className="w-20 h-10">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="24px">24px</SelectItem>
                    <SelectItem value="28px">28px</SelectItem>
                    <SelectItem value="32px">32px</SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="p-2.5 rounded-lg transition-all duration-200 hover:bg-gray-200 text-gray-700"
                      title="Text Color"
                    >
                      <Palette className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <div className="grid grid-cols-4 gap-1 p-2">
                      {[
                        { name: 'Black', value: '#000000' },
                        { name: 'Gray', value: '#6B7280' },
                        { name: 'Red', value: '#EF4444' },
                        { name: 'Orange', value: '#F97316' },
                        { name: 'Yellow', value: '#EAB308' },
                        { name: 'Green', value: '#22C55E' },
                        { name: 'Blue', value: '#3B82F6' },
                        { name: 'Purple', value: '#8B5CF6' },
                        { name: 'Pink', value: '#EC4899' },
                        { name: 'Brown', value: '#A16207' },
                        { name: 'Teal', value: '#14B8A6' },
                        { name: 'Indigo', value: '#6366F1' },
                      ].map((color) => (
                        <DropdownMenuItem
                          key={color.value}
                          onClick={() => {
                            editor.chain().focus().setMark('textStyle', { color: color.value }).run();
                          }}
                          className="p-1"
                        >
                          <div
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${editor.isActive('bulletList') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                  title="Bullet List"
                >
                  <span className="text-lg">•</span>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${editor.isActive('orderedList') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                  title="Numbered List"
                >
                  <span className="text-sm font-mono">1.</span>
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <button
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${editor.isActive('blockquote') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                  title="Quote"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${editor.isActive('code') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
                  title="Code"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 font-medium">
              {isMarkdownMode ? 'Markdown Mode' : 'Rich Text Mode'}
            </span>
            <button
              onClick={handleToggleMode}
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <span className="text-lg">{isMarkdownMode ? '📄' : '📝'}</span>
              <span className="font-medium">{isMarkdownMode ? 'Rich Text' : 'Markdown'}</span>
            </button>
          </div>
        </div>
        <div className="min-h-[400px]">
          {isMarkdownMode ? (
            <textarea
              className="w-full min-h-[400px] p-4 font-mono text-base bg-gray-50 border-0 outline-none resize-none"
              value={markdownValue}
              onChange={e => setMarkdownValue(e.target.value)}
              spellCheck={false}
              readOnly
            />
          ) : (
            <EditorContent editor={editor} className="min-h-[400px]" />
          )}
        </div>
      </div>
    </>
  );
};

export default forwardRef(MarkdownEditor); 