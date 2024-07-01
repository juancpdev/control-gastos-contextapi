import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget } = useBudget()
    
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 w-full space-y-10">
            <div className="mx-auto">
                <CircularProgressbar 
                    value={state.budget / remainingBudget} 
                />
            </div>
            <div className=" flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className=" bg-pink-600 w-full text-white p-2 font-bold rounded-lg "
                >
                    Resetear App
                </button>
                
                <AmountDisplay
                    label={'Presupuesto'}
                    amount={state.budget}
                />
                <AmountDisplay
                    label={'Disponible'}
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label={'Gastado'}
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
