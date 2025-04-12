import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TranslationEditorProps } from "@/app/[locale]/admin/i18n/types/type";

export default function TranslationEditor({
  textId,
  translations,
  setTranslations,
  languages,
  onSave,
}: TranslationEditorProps) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">🌍 번역 관리</h2>
      <div>UI Text ID: {textId}</div>
      {languages.map((lang) => (
        <div key={lang} className="flex flex-col space-y-1">
          <Label>{lang.toUpperCase()}</Label>
          <Input
            value={translations[lang] || ""}
            onChange={(e) =>
              setTranslations({ ...translations, [lang]: e.target.value })
            }
          />
        </div>
      ))}
      <Button onClick={onSave}>저장</Button>
    </div>
  );
}
