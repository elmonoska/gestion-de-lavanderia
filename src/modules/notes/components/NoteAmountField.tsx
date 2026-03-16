import { moneyFormat } from "../../../utils/money";

type NoteAmountFieldProps = {
  label: string;
  amount: number;
}

export default function NoteAmountField({label, amount}: NoteAmountFieldProps) {
  return (
    <div className="">
      <p className="text-sm">{label} <span className="text-lg font-semibold">{moneyFormat(amount)}</span></p>
    </div>
  )
}
