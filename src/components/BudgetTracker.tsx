import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import "react-circular-progressbar/dist/styles.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function BudgetTracker() {
    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    const handleDelete = () => {
        MySwal.fire({
          title: 'Confirmar eliminación',
          text: 'Estas seguro que quieres eliminar el presupuesto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: "Cancelar",
          confirmButtonText: 'Si, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch({ type: "reset-app" })
          }
        });
      };
    
    return (
        <div>
            <div className="flex gap-3 items-center absolute top-2 right-2">
                <button 
                    onClick={() => dispatch({ type: 'edit-app' })}
                >
                    <PencilSquareIcon
                        className="h-6 w-6 text-gray-500 sombra-edit md:h-7 md:w-7"
                    />
                </button>

                <button 
                    onClick={handleDelete}
                >
                    <TrashIcon
                        className="h-6 w-6 text-gray-500 sombra-delete md:h-7 md:w-7"
                    />
                </button>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 w-full space-y-10 md:gap-8">
            
                <div className="mx-auto pt-6 md:pt-0">
                <CircularProgressbarWithChildren 
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage === 100 ? `#DC2626` : `#3b82f6`,
                            trailColor: '#F5F5F5',
                            textColor: percentage === 100 ? `#DC2626` : `#3b82f6`,
                            textSize: '12'
                        })}
                    >
                        <div style={{ fontSize: 30, color: percentage === 100 ? `#DC2626` : `#3b82f6` }}>
                            <strong>{percentage}%</strong>
                            <div>Gastado</div>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className=" flex flex-col justify-center items-center gap-8">
                    
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

        </div>
    )
}
