import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list"
import 'react-swipeable-list/dist/styles.css'

type ExpenseDetailProps = {
    expense: Expense
}
export default function ExpenseDetail({expense} : ExpenseDetailProps) {

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => {}}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => {}}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList className="rounded-md shadow-md">
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
            <div className=" max-w-3xl text-center p-6 bg-white w-full flex items-center md:mx-auto md:flex-row md:p-6 md:gap-6  ">

                <div className="w-20 space-y-2">
                    <img src={`/icono_${categoryInfo.icon}.svg`} alt="Icono Gasto" />
                    <p className=" uppercase text-sm font-bold text-gray-500 md:hidden">{categoryInfo.name}</p>
                </div>

                <div className="text-start flex-1 flex flex-col items-end md:flex-row md:items-center">
                    <div className="flex flex-col items-end mb-2 md:items-start md:flex-1">
                        <p className="hidden uppercase text-sm font-bold text-gray-500 md:block">{categoryInfo.name}</p>
                        <p className=" font-semibold">{expense.expenseName}</p>
                        <p className=" text-gray-500">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <AmountDisplay
                    amount={expense.amount}
                />
                </div>

            </div>
            </SwipeableListItem>
        </SwipeableList>
        
    )
}
