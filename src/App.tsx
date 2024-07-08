import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hook/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DateTitle from "./components/DateTitle";

const MySwal = withReactContent(Swal)

function App() {
  
  const {state, dispatch} = useBudget()
  const budgetValue = typeof state.budget === 'string' ? parseFloat(state.budget) : state.budget;

  const isValidBudget = useMemo(() => budgetValue > 0, [state.budget, budgetValue]);
  
  const isValidDate = useMemo(() => (state.budgetMap.hasOwnProperty(state.date)), [state.budgetMap, state.date]);
  
  const canRestartApp = useMemo(() => Object.keys(state.budgetMap).length > 0, [state.budgetMap])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString()),
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
    localStorage.setItem('budgetMap', JSON.stringify(state.budgetMap));
  }, [state])

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const formattedDate = `${month}/${year}`;
      dispatch({ type: "updated-date", payload: {date: formattedDate} });
    }
  };

  const handleResetApp = () => {
    MySwal.fire({
      title: 'Confirmar eliminación',
      text: '¿Estás seguro de que quieres reiniciar la aplicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch({ type: "reset-app" });
            MySwal.fire('¡Aplicación reiniciada!', '', 'success');
        }
    });

  }

  return (
    <>
      <div className=" xl:flex ">

        <header className=" bg-header p-6 text-center xl:h-screen xl:flex-1 xl:fixed ">
          <img className="w-72 px-8 m-auto" src="/logo2.png" alt="Logo CtrlGast" />
          
          <p className="text-white mt-6 xl:mt-10">Selecciona la fecha</p>
          <DatePicker
            className="bg-gray-200 text-center rounded-md cursor-pointer"
            onChange={handleDateChange}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            value={state.date}
          />
          <button 
              className="bg-slate-400 rounded-md p-2 font-bold text-white cursor-pointer disabled:opacity-50 disabled:cursor-default mt-5 xl:mt-10"
              disabled={!canRestartApp}
              onClick={handleResetApp}
            >
              Reset App
          </button>
          <div>
          <p className="text-sky-400 xl:flex items-end">Created By <a target="_blank" href="https://www.github.com/juancpdev">@jpdev</a></p>

          </div>
        </header>

        <div className="xl:flex-auto xl:ml-96">
        <div className="shadow-lg rounded-3xl bg-white max-w-3xl text-center m-10 p-3 flex justify-center md:mx-auto">
          <DateTitle/>
        </div>
          <div className=" max-w-3xl text-center m-10 p-6 shadow-lg rounded-md bg-white flex justify-center md:mx-auto relative">
            {isValidBudget && isValidDate ? <BudgetTracker/> : <BudgetForm /> }
          </div>

          {isValidBudget && isValidDate && (
              <main className="max-w-3xl m-10 md:mx-auto flex flex-col gap-4">
                <FilterByCategory/>
                <ExpenseList/>
                <ExpenseModal/>
              </main>
            )
          }
        </div>
        
        
      </div>
    </>
  )
}

export default App
