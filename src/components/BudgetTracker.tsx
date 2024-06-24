import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";


export default function BudgetTracker() {

    const { state, remainingBudget, totalExpenses } = useBudget()
    
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 w-full space-y-10">
            <div className="mx-auto">
                <img src="/grafico.jpg" alt="Grafica de gastos" />
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
