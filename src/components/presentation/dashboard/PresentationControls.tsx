import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePresentationState } from "@/states/presentation-state";
import { Layout } from "lucide-react";
import { ModelPicker } from "./ModelPicker";

export function PresentationControls({
  shouldShowLabel = true,
}: {
  shouldShowLabel?: boolean;
}) {
  const {
    numSlides,
    setNumSlides,
    language,
    setLanguage,
    pageStyle,
    setPageStyle,
  } = usePresentationState();

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Model Selection */}
      <ModelPicker shouldShowLabel={shouldShowLabel} />

      {/* Number of Slides */}
      <div>
        {shouldShowLabel && (
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            幻灯片数量
          </label>
        )}
        <Select
          value={String(numSlides)}
          onValueChange={(v) => setNumSlides(Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择幻灯片数量" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
              <SelectItem key={num} value={String(num)}>
                {num} 张幻灯片
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language */}
      <div>
        {shouldShowLabel && (
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            语言
          </label>
        )}
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="选择语言" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">English (US)</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="it">Italian</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
            <SelectItem value="ko">Korean</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Page Style */}
      <div>
        {shouldShowLabel && (
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            页面样式
          </label>
        )}
        <Select value={pageStyle} onValueChange={setPageStyle}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <SelectValue placeholder="选择页面样式" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              <div className="flex items-center gap-3">
                <span>默认</span>
              </div>
            </SelectItem>
            <SelectItem value="traditional">
              <div className="flex items-center gap-3">
                <span>传统</span>
              </div>
            </SelectItem>
            <SelectItem value="tall">
              <div className="flex items-center gap-3">
                <span>高版</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
