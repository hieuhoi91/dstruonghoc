
type AIResponseDisplayProps = {
  aiResponse: string;
};

const AIResponseDisplay = ({ aiResponse }: AIResponseDisplayProps) => {
  if (!aiResponse) return null;
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Response từ AI:</h3>
      <pre className="whitespace-pre-wrap text-sm text-gray-700">{aiResponse}</pre>
    </div>
  );
};

export default AIResponseDisplay; 