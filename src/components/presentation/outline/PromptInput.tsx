import { usePresentationState } from "@/states/presentation-state";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function PromptInput() {
  const {
    presentationInput,
    setPresentationInput,
    startOutlineGeneration,
    isGeneratingOutline,
  } = usePresentationState();

  const handleGenerateOutline = () => {
    if (!presentationInput.trim()) {
      toast.error("请输入演示文稿主题");
      return;
    }

    startOutlineGeneration();
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={presentationInput}
        onChange={(e) => setPresentationInput(e.target.value)}
        className="w-full rounded-md bg-muted px-4 py-3 pr-12 text-foreground outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="输入您的演示文稿主题..."
        disabled={isGeneratingOutline}
      />
      <button
        className={`absolute right-3 top-1/2 -translate-y-1/2 ${
          isGeneratingOutline
            ? "text-indigo-400"
            : "text-indigo-400 hover:text-indigo-500"
        }`}
        onClick={handleGenerateOutline}
        disabled={isGeneratingOutline || !presentationInput.trim()}
      >
        <RefreshCw size={20} />
      </button>
    </div>
  );
}
