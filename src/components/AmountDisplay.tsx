import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string,
    amount: number
}

export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className="text-2xl font-bold text-blue-600">
        {label && `${label}: `}
        <span className='text-black font-black'>{formatCurrency(amount)}</span>
    </p>
  )
}
