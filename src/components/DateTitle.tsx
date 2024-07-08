import { changeDate, formatDate2 } from "../helpers"
import { useBudget } from "../hook/useBudget"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function DateTitle() {

    const { state, dispatch } = useBudget()

    const handleBefore = () => {
        dispatch({ type: "change-date", payload: {date: changeDate(state.date, false)}})
    }

    const handleAfter = () => {
        dispatch({ type: "change-date", payload: {date: changeDate(state.date, true)}})
    }

    return (
        <div className="flex justify-between w-full md:px-6">
            <button 
                    onClick={handleBefore}
                >
                <ChevronDoubleLeftIcon
                    className="h-6 w-6 text-sky-500 sombra-edit md:h-7 md:w-7 transition-transform transform hover:scale-95 hover:text-sky-400 duration-300 cursor-pointer"
                />
            </button>
            
                <div className="text-md mx-5 capitalize font-bold text-sky-800 md:text-xl">{formatDate2(state.date)}</div>
            <button 
                onClick={handleAfter}
            >
                <ChevronDoubleRightIcon
                    className="h-6 w-6 text-sky-500 sombra-edit md:h-7 md:w-7 transition-transform transform hover:scale-95 hover:text-sky-400 duration-300 cursor-pointer"
                />
            </button>
            
        </div>
    )
}
