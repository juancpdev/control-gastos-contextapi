export type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: string
}

export type BudgetMap = {
    [key: string]: number 
}

export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
    id: string
    name: string
    icon: string
}