import { Dispatch, createContext, useReducer, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>,
    remainingBudget: number,
    totalExpensesByDate: number
}

type BudgetProviderProps = {
    children: ReactNode
} 

export const BudgetContext = createContext<BudgetContextProps>(null!)


export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    
    const totalExpensesByDate = useMemo(() => {
        return state.expenses
        .filter((expense) => expense.date.slice(3) === state.date)
        .reduce((total, expense) => total + expense.amount, 0)
    }, [state.expenses, state.date]);

    const remainingBudget = state.budget - totalExpensesByDate

    return (
        <BudgetContext.Provider
            value={{ 
                state, 
                dispatch,
                remainingBudget,
                totalExpensesByDate
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}
