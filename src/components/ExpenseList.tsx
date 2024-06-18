import { useMemo } from "react"
import { useBudget } from "../hook/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

    return (
        <>
            {isEmpty ? <p className="text-xl text-center font-medium mb-5 text-gray-600">No hay Gastos</p> : (
                <>
                    <p className="text-2xl font-bold mb-5 text-gray-600">Lista de Gastos</p>
                    {state.expenses.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </>
    )
}
