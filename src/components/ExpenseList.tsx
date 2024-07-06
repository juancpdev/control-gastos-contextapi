import { useMemo } from "react"
import { useBudget } from "../hook/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    const filteredExpensesDate = state.date ? state.expenses.filter(expense => {
        // Separar el mes y año de expense.date
        const expenseParts = expense.date.split('/');
        const expenseMonth = parseInt(expenseParts[1]);
        const expenseYear = parseInt(expenseParts[2]);
    
        // Separar el mes y año de state.date
        const stateParts = state.date.split('/');
        const stateMonth = parseInt(stateParts[0]);
        const stateYear = parseInt(stateParts[1]);
    
        // Comparar solo mes y año
        return expenseMonth === stateMonth && expenseYear === stateYear;
    }) : state.expenses;

    const filteredExpensesDateCategory = state.currentCategory !== "" ? filteredExpensesDate.filter(expense => {
        if(expense.category === state.currentCategory) {
            return expense
        }
    }) : filteredExpensesDate
    
    
    const isEmpty = useMemo(() => filteredExpensesDateCategory.length === 0, [filteredExpensesDateCategory])

    return (
        <>
            {isEmpty ? <p className="text-xl md:text-2xl text-center font-medium mb-5 text-gray-600 pt-10">No hay Gastos</p> : (
                <>
                    <p className="text-2xl font-bold mt-5 text-gray-600">Lista de Gastos</p>
                    {filteredExpensesDateCategory.map(expense => (
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
