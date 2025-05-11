import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function OptionsCheckbox({ id, label, checked, onCheckedChange }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={(checked) => onCheckedChange(checked === true)} />
      <Label htmlFor={id} className="cursor-pointer">{label}</Label>
    </div>
  );
}
