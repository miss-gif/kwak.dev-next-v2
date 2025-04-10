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
      <Label>Key</Label>
      <Input
        placeholder="Key"
        value={textData.key || ""}
        onChange={(e) => setTextData({ ...textData, key: e.target.value })}
      />

      <Label>Href</Label>
      <Input
        placeholder="Href"
        value={textData.href || ""}
        onChange={(e) => setTextData({ ...textData, href: e.target.value })}
      />

      <Label>Description</Label>
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
