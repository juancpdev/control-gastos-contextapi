import { useMemo } from "react"
import { useBudget } from "../hook/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    
    const filteredExpenses = state.currentCategory ? state.expenses.filter( expense => (expense.category === state.currentCategory)) : state.expenses
    
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <>
            {isEmpty ? <p className="text-xl md:text-2xl text-center font-medium mb-5 text-gray-600 pt-10">No hay Gastos</p> : (
                <>
                    <p className="text-2xl font-bold mt-5 text-gray-600">Lista de Gastos</p>
                    {filteredExpenses.map(expense => (
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
