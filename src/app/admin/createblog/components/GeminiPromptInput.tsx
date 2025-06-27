
type GeminiPromptInputProps = {
  prompt: string;
  setPrompt: (v: string) => void;
  loading: boolean;
  onSendPrompt: () => void;
  showSuccessMessage: boolean;
};

const GeminiPromptInput = ({ prompt, setPrompt, loading, onSendPrompt, showSuccessMessage }: GeminiPromptInputProps) => (
  <div className="mb-5">
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Nhập tên trường"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        className="flex-1 px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onSendPrompt}
        disabled={loading}
        className={`px-5 py-2 text-base font-semibold rounded bg-green-600 text-white transition hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {loading ? 'Đang gửi...' : 'Gửi prompt'}
      </button>
    </div>
    {showSuccessMessage && (
      <div className="mt-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
        <span className="mr-2">✅</span>
        <span>Nội dung từ AI đã được đưa vào editor! Bạn có thể chỉnh sửa và review lại.</span>
      </div>
    )}
  </div>
);

export default GeminiPromptInput; 