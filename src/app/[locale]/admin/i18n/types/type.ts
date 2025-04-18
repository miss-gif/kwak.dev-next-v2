import { Database } from "../../../../../../types_db";

export type UiTextsRowInsert =
  Database["public"]["Tables"]["ui_texts"]["Insert"];
export type UiTextsRowUpdate =
  Database["public"]["Tables"]["ui_texts"]["Update"];

export type UiTextFormProps = {
  textData: Partial<UiTextsRowInsert | UiTextsRowUpdate>;
  setTextData: any;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
};

export type FormFieldProps = {
  label: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isTextarea?: boolean;
};

export type UiTextsRow = Database["public"]["Tables"]["ui_texts"]["Row"];

export type TranslationEditorProps = {
  textId: number;
  translations: Record<string, string>;
  setTranslations: (val: Record<string, string>) => void;
  languages: string[];
  onSave: () => void;
};

export type TextListProps = {
  uiTexts: UiTextsRow[];
  selectedTextId: number | null;
  onSelect: (id: number) => void;
  onEdit: (text: UiTextsRow) => void;
  onDelete: (id: number) => void;
};
