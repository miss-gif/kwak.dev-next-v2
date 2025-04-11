// components/admin/UiTextForm.tsx
import {
  FormFieldProps,
  UiTextFormProps,
  UiTextsRowInsert,
  UiTextsRowUpdate,
} from "@/app/[locale]/admin/i18n/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FormField = ({
  label,
  description,
  placeholder,
  value,
  onChange,
  isTextarea = false,
}: FormFieldProps) => (
  <div className="space-y-1">
    <Label className="font-semibold text-sm">{label}</Label>
    <p className="text-xs">{description}</p>
    {isTextarea ? (
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

export default function UiTextForm({
  textData,
  setTextData,
  onSubmit,
  onCancel,
  submitLabel = "저장",
}: UiTextFormProps) {
  const handleChange =
    (key: keyof UiTextsRowInsert | keyof UiTextsRowUpdate) =>
    (value: string) => {
      setTextData({ ...textData, [key]: value });
    };

  return (
    <div className="space-y-4">
      <FormField
        label="네임스페이스 (namespace)"
        description="페이지/컴포넌트/도메인 단위로 구분"
        placeholder="Namespace"
        value={textData.namespace || ""}
        onChange={handleChange("namespace")}
      />
      <FormField
        label="키 (Key)"
        description="간결하고, 의미 있고 개발자 중심으로 읽기 쉬운 영문식 식별자로 구성"
        placeholder="Key"
        value={textData.key || ""}
        onChange={handleChange("key")}
      />
      <FormField
        label="이동경로 (Url)"
        description="해당 ui_text에서 경로를 제공할 경우 주소"
        placeholder="Url"
        value={textData.url || ""}
        onChange={handleChange("url")}
      />
      <FormField
        label="설명 (Description)"
        description="해당 ul_text에 설명이 필요한 경우"
        placeholder="Description"
        value={textData.description || ""}
        onChange={handleChange("description")}
        isTextarea
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
