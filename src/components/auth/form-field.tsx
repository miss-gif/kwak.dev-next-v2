import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => (
  <FormField
    control={control}
    name={name as any}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-xs">{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className="bg-gray-50 border border-gray-200 text-sm"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
