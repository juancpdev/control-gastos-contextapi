import { BudgetMap, Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions = 
    { type: "add-budget", payload: { budget: number, date: string } } |
    {type: 'edit-budget', payload: {budget: number}} |
    {type: 'remove-budget', payload: {date: string}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense : DraftExpense}} |
    {type: 'update-expense', payload: {expense : Expense}} |
    {type: 'remove-expense', payload: {id : Expense['id']}} |
    {type: 'get-expense-by-id', payload: {id : Expense['id']}} |
    {type: 'reset-app'} |
    {type: 'add-filter-category', payload: {id: Category['id']}} |
    {type: 'updated-date', payload: {date: string}} |
    {type: 'change-date', payload: {date: string}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory : Category['id'],
    date: string,
    budgetMap: { [key: string]: number } 
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

const initialBudgetMap = () : BudgetMap => {
    const localStorageExpenses = localStorage.getItem('budgetMap')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : {}
}

const initialDate = () : string => {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = String(dateNow.getMonth() + 1).padStart(2, '0');
    const date = `${month}/${year}`;
    return date
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategory: '',
    date: initialDate(),
    budgetMap: initialBudgetMap()
};


const createExpense = (draftExpense : DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
        state : BudgetState = initialState,
        action : BudgetActions
    ) => {

    if(action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget,
            budgetMap: {
                ...state.budgetMap,
                [state.date]: action.payload.budget
            }
        }
    }

    if(action.type === 'edit-budget') {
        
        return {
            ...state,
            budget: action.payload.budget,
            budgetMap : {
                ...state.budgetMap,
                [state.date]: action.payload.budget
            }
        }
    }

    if(action.type === 'remove-budget') {
        // Remover el presupuesto para la fecha especificada
        const { [action.payload.date]: removed, ...remainingBudgetMap } = state.budgetMap;

        return {
            ...state,
            budget: 0,
            expenses: state.expenses.filter(expense => expense.date.slice(3) !== action.payload.date),
            date: '',
            budgetMap: remainingBudgetMap
        }
    }

    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    
    if(action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if(action.type === "remove-expense") {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id ? expense : null)
        }
    }

    if(action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'reset-app') {
        return {
            ...state,
            expenses: [],
            budget: 0,
            date: "",
            budgetMap: {}
        }
    }

    if(action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    if (action.type === 'updated-date') {
        const { date } = action.payload;
        
        // Parsear la fecha para obtener mes y año
        const [month, year] = date.split('/');
        const monthYear = `${month}/${year}`;

        // Verificar si ya existe un presupuesto para ese mes y año
        const existingBudget = state.budgetMap[monthYear];
        
        return {
            ...state,
            date, // Actualizar la fecha seleccionada
            budget: existingBudget ?? state.budget // Usar el presupuesto existente o el global
        };
    }

    if (action.type === "change-date") {
        return {
            ...state,
            date: action.payload.date
        }
    }

    return state
}