import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import "react-circular-progressbar/dist/styles.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function BudgetTracker() {
    const { state, remainingBudget, dispatch, totalExpensesByDate } = useBudget()

    const percentage = +((totalExpensesByDate / state.budget) * 100).toFixed(2)

    const handleDelete = () => {
        MySwal.fire({
            title: 'Confirmar eliminación',
            text: 'Estas seguro que quieres eliminar el presupuesto de este mes?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: "remove-budget", payload: {date: state.date} })
            }
        });
    };

    const handleEdit = () => {
        MySwal.fire({
          title: 'Editar presupuesto',
          html: `<input id="budgetEdit" class="swal2-input" placeholder="Presupuesto" type="number" value=${state.budget} />`,
          preConfirm: () => {
            const budgetInput = document.getElementById('budgetEdit') as HTMLInputElement;

            if (budgetInput) {
              const budgetValue = budgetInput.value.trim();
              if (!budgetValue) {
                Swal.showValidationMessage('El presupuesto no puede estar vacío');
                return null;
              }
              const newBudget = parseInt(budgetValue);
              if (isNaN(newBudget)) {
                Swal.showValidationMessage('Por favor, ingrese un valor numérico válido');
                return null;
              }
              if (newBudget < totalExpensesByDate) {
                Swal.showValidationMessage('El presupuesto no puede ser menor a lo gastado');
                return null;
              }
              return newBudget;
            } else {
              MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se encontró el campo de presupuesto'
              });
              return null;
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const newBudget = result.value;
            dispatch({ type: "edit-budget", payload: { budget: newBudget } });
            Swal.fire('¡Presupuesto actualizado!', '', 'success');
          }
        });
      };
    
    return (
        <div>
            <div className="flex gap-3 items-center absolute top-2 right-2">
                <button 
                    onClick={handleEdit}
                >
                    <PencilSquareIcon
                        className="h-6 w-6 text-sky-500 sombra-edit md:h-7 md:w-7 transition-transform transform hover:scale-95 hover:text-sky-400 duration-300"
                    />
                </button>

                <button 
                    onClick={handleDelete}
                >
                    <TrashIcon
                        className="h-6 w-6 text-sky-500 sombra-delete md:h-7 md:w-7 transition-transform transform hover:scale-95 hover:text-sky-400 duration-300"
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
                        amount={totalExpensesByDate}
                    />
                </div>
            </div>

        </div>
    )
}
