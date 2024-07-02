import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
    
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 w-full space-y-10">
            <div className="mx-auto">
            <CircularProgressbarWithChildren 
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? `#DC2626` : `#3b82f6`,
                        trailColor: '#F5F5F5',
                        textColor: percentage === 100 ? `#DC2626` : `#3b82f6`,
                        textSize: '12'
                    })}
                >
                    <div style={{ fontSize: 35, color: percentage === 100 ? `#DC2626` : `#3b82f6` }}>
                        <strong>{percentage}%</strong>
                        <div>Gastado</div>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
            <div className=" flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className=" bg-pink-600 w-full text-white p-2 font-bold rounded-lg "
                    onClick={() => dispatch({ type: 'reset-app' })}
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
