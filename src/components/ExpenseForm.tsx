import { categories } from "../data/categories"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense } from "../types";
import { useState, ChangeEvent, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hook/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: ''
    })

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, remainingBudget } = useBudget()

    
    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId )[0]
            
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])


    const handleChange = ((e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = [name].includes('amount')

        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }) 

    const handleChangeDate = ((value: Date | null) => {
        if (value) {
            const fecha = value.toString();
            const date = new Date(fecha);
    
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
    
            const formatDate = `${day}/${month}/${year}`
    
            setExpense({
                ...expense,
                date: formatDate
            });
        }
        
    })
    

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar
        if(Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        
        // Validar que no me pase del limite
        if((expense.amount - previousAmount) > remainingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }

        // Agregar un nuevo gasto
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense} } })
        } else {
            dispatch({type: 'add-expense', payload: {expense}})
        }
        
        // reiniciar el state
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: ''
        })
        setPreviousAmount(0)
    }

    return (
        <form className=" space-y-5" onSubmit={handleSubmit}>
            <legend className=" font-bold uppercase text-center text-3xl pb-3 border-b-4 border-blue-500">
                {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="expenseName" 
                    className=" text-xl">
                    Nombre Gasto:
                </label>
                
                <input 
                    id="expenseName"
                    name="expenseName"
                    placeholder="Añade el Nombre del gasto"
                    className=" bg-gray-200 p-2"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="amount" 
                    className=" text-xl">
                    Cantidad:
                </label>
                
                <input 
                    id="amount"
                    name="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className=" bg-gray-200 p-2"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="category" 
                    className=" text-xl">
                    Categoria:
                </label>
                
                <select 
                    id="category"
                    name="category"
                    className=" bg-gray-200 p-2"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="" disabled>-- Seleccione --</option>
                    {categories.map( (category) => (
                        <option 
                            key={category.id} 
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="date" 
                    className=" text-xl">
                    Fecha Gasto:
                </label>
                <div>
                    <DatePicker
                        className=" bg-gray-200 p-2 w-full "
                        value={expense.date}
                        onChange={handleChangeDate}
                    />
                </div>
            </div>

            <input 
                type="submit" 
                className=" bg-blue-600 w-full text-white py-2 uppercase font-medium rounded-md cursor-pointer"
                value={state.editingId ? 'Guardar Cambios' : 'Guardar Gasto'}

            />
        </form>
    )
}
