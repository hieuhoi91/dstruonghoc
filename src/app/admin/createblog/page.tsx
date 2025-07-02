"use client";
import { Badge } from "@/components/ui/badge";
import { GoogleGenAI } from "@google/genai";
import { useRef, useState } from "react";
import { saveBlog } from "./actions";
import GeminiPromptInput from "./components/GeminiPromptInput";
import MarkdownEditor from "./components/MarkdownEditor";

// CSS styles for TipTap editor
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
  
  /* Focus styles */
  .ProseMirror:focus {
    outline: none;
  }
  
  /* Placeholder styles */
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #9ca3af;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;
const CreateBlog = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("Viết nội dung...");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [editorKey, setEditorKey] = useState(0); // Key để force re-render editor
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const editorRef = useRef<any>(null);
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [schoolAdmissionCriteria, setSchoolAdmissionCriteria] = useState("");
  const [schoolTuition, setSchoolTuition] = useState("");
  const [schoolDescribe, setSchoolDescribe] = useState("");
  const [schoolMajorPopular, setSchoolMajorPopular] = useState<string[]>([]);
  const [editingMajorIndex, setEditingMajorIndex] = useState<number | null>(
    null
  );
  const [editingMajorValue, setEditingMajorValue] = useState("");
  const [newMajor, setNewMajor] = useState("");
  const [schoolLogo, setSchoolLogo] = useState("");
  const [schoolWebsite, setSchoolWebsite] = useState("");
  const [schoolAdmissionPoint, setSchoolAdmissionPoint] = useState("");
  const [schoolShortName, setSchoolShortName] = useState("");
  const [schoolDormitory, setSchoolDormitory] = useState("");

  // Tạo slug từ schoolName
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/đ/g, "d")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
      .replace(/[^a-z0-9\s-]/g, "") // Chỉ giữ chữ cái, số, khoảng trắng và dấu gạch ngang
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, "-") // Loại bỏ dấu gạch ngang liên tiếp
      .trim();
  };

  const schoolSlug = generateSlug(schoolName);

  // Gọi Gemini API
  const handleGeminiPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setAiResponse("");
    setShowSuccessMessage(false);
    try {
      const apiKey = "AIzaSyDqiDa39WF1L96Z7fPCms1Z4j2c-lKyjWk";
      const ai = new GoogleGenAI({
        apiKey: apiKey,
      });
      const config = {
        thinkingConfig: {
          thinkingBudget: -1,
        },
        responseMimeType: "text/plain",
      };
      const model = "gemini-2.5-flash";
      const response = await ai.models.generateContent({
        model,
        config,
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Hãy cung cấp thông tin chi tiết và cập nhật mới nhất về trường ${prompt} theo cấu trúc JSON sau:
                      {
                        "school_name": "Tên trường",
                        "school_address": "Địa chỉ trường (chỉ ghi tỉnh/thành phố, không thêm chữ 'thành phố', ví dụ: Hồ Chí Minh, Hà Nội, Đà Nẵng, Hải Phòng, ...)",
                        "school_year": "Năm thành lập",
                        "school_type": "Loại hình trường (Công lập / Tư thục / Quốc tế)",
                        "school_describe": "1-2 câu mô tả ngắn gọn về trường",
                        "school_admission_criteria": "Chỉ tiêu tuyển sinh (khoảng cụ thể, ví dụ: 1000 - 1500), cần thông tin chính xác",
                        "school_tuition": "Học phí (khoảng cụ thể, ví dụ: 10 triệu - 15 triệu/năm hoặc/kỳ), cần thông tin chính xác",
                        "school_website": "Địa chỉ website chính thức của trường",
                        "school_admission_point": "Khoảng điểm chuẩn các ngành năm 2024 hoặc 2025 (nếu có)",
                        "school_short_name": "Mã trường đại học (ví dụ: HCMUS, HUST, ...)",
                        "school_dormitory": "Có ký túc xá không (Có/Không)",
                        "school_major_popular": ["Ngành 1", "Ngành 2", "Ngành 3", ...],
                        "details": "Giới thiệu chung:
                      - Tên đầy đủ, tên viết tắt
                      - Vị trí, các cơ sở
                      - Năm thành lập
                      - Loại hình trường (công lập/tư thục/quốc tế)
                      - Sứ mệnh, định hướng đào tạo hoặc triết lý giáo dục

                      Tin tức tuyển sinh mới nhất:
                      - Tiêu chí tuyển sinh năm nay
                      - Chỉ tiêu dự kiến
                      - Phương thức xét tuyển (thi tuyển, học bạ, ưu tiên, v.v.)
                      - Các tổ hợp môn xét tuyển
                      - Điểm chuẩn tất cả các ngành của trường năm 2024 hoặc 2025 (trình bày dạng bảng)

                      Chương trình đào tạo:
                      - Các hệ đào tạo: đại trà, chất lượng cao, liên kết quốc tế, văn bằng 2, liên thông
                      - Chương trình trao đổi sinh viên (nếu có)

                      Ngành học và lĩnh vực đào tạo:
                      - Các ngành đào tạo chính
                      - Ngành thế mạnh, đặc trưng hoặc “hot”
                      - Các lĩnh vực có liên kết quốc tế, cơ hội nghề nghiệp cao

                      Học phí & học bổng:
                      - Mức học phí cập nhật mới nhất (nếu có thể so sánh giữa các hệ thì càng tốt)
                      - Chính sách học bổng (theo điểm, theo hoàn cảnh, tài trợ doanh nghiệp, v.v.)

                      👉 Lưu ý:
                      - Nếu có thông tin mới nhất năm 2025 từ website chính thức của trường hoặc báo chí uy tín, hãy ưu tiên cập nhật.
                      - Chỉ cần trả về JSON, không kèm giải thích hay mô tả ngoài.
                      - Trong phần “details”, trình bày nội dung chi tiết như bài viết markdown SEO-friendly:
                        - Có đoạn mở đầu tóm tắt (để dùng làm <meta description>)
                        - Tối ưu từ khóa phổ biến (SEO)
                        - Tối ưu snippet hiển thị trên Google
                        - Thêm internal link nếu có thể (ví dụ link đến các trang ngành học trên chính website trường)
                        - Thêm external link uy tín (ví dụ: link tới bài báo tuyển sinh, dữ liệu từ Bộ GD&ĐT, v.v.)
                      "`,
              },
            ],
          },
        ],
      });

      // Lấy markdown thuần từ AI, nhưng giờ sẽ lấy field 'details' trong JSON trả về
      let aiText = response.text ?? "";
      let details = "";

      // Loại bỏ markdown code block nếu có
      let jsonString = aiText.trim();
      if (jsonString.startsWith("```")) {
        // Xử lý cả trường hợp ```json hoặc chỉ ```
        const lines = jsonString.split("\n");
        // Nếu dòng đầu là ```json hoặc ```, bỏ dòng đầu và dòng cuối
        if (lines[0].startsWith("```")) {
          lines.shift(); // bỏ dòng đầu
        }
        if (lines[lines.length - 1].startsWith("```")) {
          lines.pop(); // bỏ dòng cuối
        }
        jsonString = lines.join("\n");
      }

      try {
        const parsed = JSON.parse(jsonString);
        details = parsed.details || aiText;
        setSchoolName(parsed.school_name || "");
        setSchoolAddress(parsed.school_address || "");
        setSchoolYear(parsed.school_year || "");
        setSchoolType(parsed.school_type || "");
        setSchoolDescribe(parsed.school_describe || "");
        setSchoolAdmissionCriteria(parsed.school_admission_criteria || "");
        setSchoolTuition(parsed.school_tuition || "");
        setSchoolWebsite(parsed.school_website || "");
        setSchoolAdmissionPoint(parsed.school_admission_point || "");
        setSchoolShortName(parsed.school_short_name || "");
        setSchoolDormitory(parsed.school_dormitory || "");
        // Nếu là array thì set luôn, nếu là string thì tách theo dấu phẩy
        if (Array.isArray(parsed.school_major_popular)) {
          setSchoolMajorPopular(
            parsed.school_major_popular.filter((s: string) => Boolean(s))
          );
        } else if (typeof parsed.school_major_popular === "string") {
          setSchoolMajorPopular(
            parsed.school_major_popular
              .split(",")
              .map((s: string) => s.trim())
              .filter((s: string) => Boolean(s))
          );
        } else {
          setSchoolMajorPopular([]);
        }
      } catch (e) {
        console.log(e);
        details = aiText;
      }
      setEditorContent(details);
      setEditorKey((prev) => prev + 1);
      setAiResponse(details);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setEditorKey((prev) => prev + 1);
      }, 100);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (err) {
      setAiResponse("Đã xảy ra lỗi khi gọi Gemini AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlog = async () => {
    setSaving(true);
    setSaveError("");
    try {
      // Lấy markdown từ editor
      const markdown = editorRef.current?.getMarkdown() || "";
      await saveBlog({
        logo: schoolLogo,
        slug: schoolSlug,
        school_name: schoolName,
        school_address: schoolAddress,
        school_year: schoolYear,
        school_type: schoolType,
        school_describe: schoolDescribe,
        school_major_popular: schoolMajorPopular,
        school_admission_criteria: schoolAdmissionCriteria,
        school_tuition: schoolTuition,
        school_website: schoolWebsite,
        school_admission_point: schoolAdmissionPoint,
        school_short_name: schoolShortName,
        school_dormitory: schoolDormitory,
        details: markdown,
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Đã xảy ra lỗi khi lưu bài viết.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 16px #eee",
        padding: 32,
      }}
    >
      {/* Gemini AI Prompt Input */}
      <div className="mb-5">
        <GeminiPromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSendPrompt={handleGeminiPrompt}
          loading={loading}
          showSuccessMessage={showSuccessMessage}
        />
      </div>
      {/* End Gemini AI Prompt Input */}

      <h2
        style={{
          marginBottom: 24,
          fontWeight: 700,
          fontSize: 28,
          textAlign: "center",
        }}
      >
        Thêm Trường Mới
      </h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Tên trường:</label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Tên trường"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Mã trường:</label>
          <input
            type="text"
            value={schoolShortName}
            onChange={(e) => setSchoolShortName(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Ví dụ: HCMUS, HUST, ..."
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Năm thành lập:</label>
          <input
            type="text"
            value={schoolYear}
            onChange={(e) => setSchoolYear(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Năm thành lập"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Loại hình trường:</label>
          <input
            type="text"
            value={schoolType}
            onChange={(e) => setSchoolType(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Loại hình trường"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Địa chỉ:</label>
          <input
            type="text"
            value={schoolAddress}
            onChange={(e) => setSchoolAddress(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Địa chỉ trường"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Điểm chuẩn:</label>
          <input
            type="text"
            value={schoolAdmissionPoint}
            onChange={(e) => setSchoolAdmissionPoint(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="10 - 15"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">
            Chỉ tiêu tuyển sinh:
          </label>
          <input
            type="text"
            value={schoolAdmissionCriteria}
            onChange={(e) => setSchoolAdmissionCriteria(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Chỉ tiêu tuyển sinh"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Học phí:</label>
          <input
            type="text"
            value={schoolTuition}
            onChange={(e) => setSchoolTuition(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Học phí"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Website trường:</label>
          <input
            type="url"
            value={schoolWebsite}
            onChange={(e) => setSchoolWebsite(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="https://example.edu.vn"
            disabled={saving}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Ký túc xá:</label>
          <select
            value={schoolDormitory}
            onChange={(e) => setSchoolDormitory(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            disabled={saving}
          >
            <option value="">-- Chọn --</option>
            <option value="Có">Có</option>
            <option value="Không">Không</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Mô tả ngắn:</label>
          <textarea
            value={schoolDescribe}
            onChange={(e) => setSchoolDescribe(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Mô tả ngắn về trường"
            disabled={saving}
            rows={2}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Các ngành chính:</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {schoolMajorPopular.map((major, idx) => (
              <div key={`major-${idx}`}>
                {editingMajorIndex === idx ? (
                  <input
                    type="text"
                    value={editingMajorValue}
                    onChange={(e) => setEditingMajorValue(e.target.value)}
                    onBlur={() => {
                      const arr = [...schoolMajorPopular];
                      arr[idx] = editingMajorValue;
                      setSchoolMajorPopular(arr);
                      setEditingMajorIndex(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const arr = [...schoolMajorPopular];
                        arr[idx] = editingMajorValue;
                        setSchoolMajorPopular(arr);
                        setEditingMajorIndex(null);
                      }
                    }}
                    className="border rounded px-2 py-1"
                    autoFocus
                  />
                ) : (
                  <Badge
                    className="cursor-pointer rounded-xl group px-4 py-2 text-sm bg"
                    onClick={() => {
                      setEditingMajorIndex(idx);
                      setEditingMajorValue(major);
                    }}
                  >
                    {major}
                    <button
                      type="button"
                      className="ml-1 text-xs text-red-500 group-hover:inline hidden cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSchoolMajorPopular(
                          schoolMajorPopular.filter((_, i) => i !== idx)
                        );
                      }}
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMajor}
              onChange={(e) => setNewMajor(e.target.value)}
              className="border rounded px-2 py-1"
              placeholder="Thêm ngành mới"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMajor.trim()) {
                  setSchoolMajorPopular([
                    ...schoolMajorPopular,
                    newMajor.trim(),
                  ]);
                  setNewMajor("");
                }
              }}
              disabled={saving}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => {
                if (newMajor.trim()) {
                  setSchoolMajorPopular([
                    ...schoolMajorPopular,
                    newMajor.trim(),
                  ]);
                  setNewMajor("");
                }
              }}
              disabled={saving}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Logo URL:</label>
          <input
            type="url"
            value={schoolLogo}
            onChange={(e) => setSchoolLogo(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="https://example.com/logo.png"
            disabled={saving}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-600">
              Logo:
            </label>
            {schoolLogo ? (
              <img
                src={schoolLogo}
                alt="Logo trường"
                className="w-16 h-16 object-contain border rounded"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs">
                Chưa có logo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Markdown Editor */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Nội dung bài viết:</h3>
        <MarkdownEditor
          ref={editorRef}
          key={editorKey}
          content={editorContent}
          onContentChange={setEditorContent}
        />
      </div>
      {saveError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {saveError}
        </div>
      )}
      {showSuccessMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Lưu bài viết thành công!
        </div>
      )}
      <button
        style={{
          width: "100%",
          background: saving ? "#90caf9" : "#1976d2",
          color: "#fff",
          padding: "14px 0",
          fontSize: 18,
          fontWeight: 600,
          border: "none",
          borderRadius: 4,
          cursor: saving ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          marginTop: 24,
        }}
        onClick={handleSaveBlog}
        disabled={saving}
      >
        {saving ? "Đang lưu..." : "Lưu bài viết"}
      </button>
    </div>
  );
};

export default CreateBlog;
