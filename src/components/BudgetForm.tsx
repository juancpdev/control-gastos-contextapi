import { useState } from "react"
import { useBudget } from "../hook/useBudget"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function BudgetForm() {

    const [budget, setBudget] = useState<number>(0)
    const { dispatch, state } = useBudget()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(state.date === "" || budget <= 0) {
            MySwal.fire({
                title: 'Error',
                text: 'Fecha o presupuesto vacios o invalidos',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Intentar de nuevo'
            })
        } else {
            MySwal.fire({
                title: '¡Éxito!',
                text: 'Presupuesto creado correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });            
            dispatch( {type : 'add-budget', payload: {budget: budget, date: state.date}} )
        }
    }


    return (
        <>
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
                    className=" bg-sky-400 text-white w-full rounded-md font-bold cursor-pointer p-1 hover:bg-sky-600 transition duration-300"
                />
            </form>
        </>
    )
}
