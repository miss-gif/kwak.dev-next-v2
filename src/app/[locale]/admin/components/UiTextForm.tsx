// components/admin/UiTextForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "../../../../../types_db";

type UiTextsRowInsert = Database["public"]["Tables"]["ui_texts"]["Insert"];
type UiTextsRowUpdate = Database["public"]["Tables"]["ui_texts"]["Update"];

type Props = {
  textData: Partial<UiTextsRowInsert | UiTextsRowUpdate>;
  setTextData: (data: Partial<UiTextsRowInsert | UiTextsRowUpdate>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
};

export default function UiTextForm({
  textData,
  setTextData,
  onSubmit,
  onCancel,
  submitLabel = "저장",
}: Props) {
  return (
    <div className="space-y-2">
      <Label className="font-semibold text-sm">네임스페이스 (namespace)</Label>
      <p className="text-xs">페이지/컴포넌트/도메인 단위로 구분</p>
      <Input
        placeholder="Namespace"
        value={textData.namespace || ""}
        onChange={(e) =>
          setTextData({ ...textData, namespace: e.target.value })
        }
      />
      <Label className="font-semibold text-sm">키 (Key)</Label>
      <p className="text-xs">
        간결하고, 의미 있고 개발자 중심으로 읽기 쉬운 영문식 식별자로 구성
      </p>
      <Input
        placeholder="Key"
        value={textData.key || ""}
        onChange={(e) => setTextData({ ...textData, key: e.target.value })}
      />

      <Label className="font-semibold text-sm">이동경로 (Url)</Label>
      <p className="text-xs">해당 ui_text에서 경로를 제공할 경우 주소</p>
      <Input
        placeholder="Url"
        value={textData.url || ""}
        onChange={(e) => setTextData({ ...textData, url: e.target.value })}
      />

      <Label className="font-semibold text-sm">설명 (Description)</Label>
      <p className="text-xs">해당 ul_text에 설명이 필요한 경우</p>
      <Textarea
        placeholder="Description"
        value={textData.description || ""}
        onChange={(e) =>
          setTextData({ ...textData, description: e.target.value })
        }
      />

      <div className="flex gap-2 mt-3">
        <Button onClick={onSubmit}>{submitLabel}</Button>
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </div>
  );
}
