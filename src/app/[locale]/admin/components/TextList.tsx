import { UiTextsRow } from "@/app/[locale]/admin/types/type";
import { Button } from "@/components/ui/button";
type Props = {
  uiTexts: UiTextsRow[];
  selectedTextId: number | null;
  onSelect: (id: number) => void;
  onEdit: (text: UiTextsRow) => void;
  onDelete: (id: number) => void;
};

export default function TextList({
  uiTexts,
  selectedTextId,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="space-y-2 w-full">
      {uiTexts.map((t) => (
        <div
          key={t.id}
          className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${selectedTextId === t.id ? "bg-gray-200" : ""}`}
          onClick={() => onSelect(t.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">namespace: {t.namespace}</p>
              <p className="font-medium">key: {t.key}</p>
              <p className="text-xs text-gray-500">url: {t.url}</p>
              <p className="text-xs text-gray-500">
                description: {t.description}
              </p>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(t);
                }}
              >
                수정
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(t.id);
                }}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
