import { useMemo, useState } from "react"
import { useBudget } from "../hook/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState<number>(0)
    const { dispatch } = useBudget()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(+budget) 
        
    }, [budget])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch( {type : 'add-budget', payload: {budget}} )
    }

    return (
        <form className=" space-y-5 w-full" onSubmit={ handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className=" text-2xl font-bold md:text-3xl">
                    Definir Presupuesto
                </label>
                <input 
                    id="budget"
                    type="number"
                    className="bg-red-50 px-2 py-2 rounded-md border"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget || ""}
                    onChange={handleChange}
                />
            </div>
            <input 
                type="submit"
                className="bg-red-500 text-white w-full rounded-md font-bold cursor-pointer p-1 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={isValid}
            />
        </form>
    )
}
