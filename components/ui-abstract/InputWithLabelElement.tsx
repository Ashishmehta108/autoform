import { FormData } from "@/lib/types/persona.types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function InputWithLabelElement({
  labelFor,
  lableText,
  inputId,
  inputType,
  inputValue,
  setField,
  placeholder,
}: {
  labelFor: string;
  lableText: string;
  inputId: keyof FormData;
  inputType?: string;
  inputValue: string;
  setField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  placeholder: string;
}) {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(inputId, e.target.value);
  };
  return (
    <div className="space-y-2">
      <Label htmlFor={labelFor}>{lableText}</Label>
      <Input
        id={inputId}
        type={inputType}
        value={inputValue}
        onChange={onInputChange}
        required
        placeholder={placeholder}
      />
    </div>
  );
}
