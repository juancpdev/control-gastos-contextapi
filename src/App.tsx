import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hook/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";

function App() {
  
  const {state, dispatch} = useBudget()
  
  const budgetValue = typeof state.budget === 'string' ? parseFloat(state.budget) : state.budget;
  const isValidBudget = useMemo(() => budgetValue > 0, [state.budget, budgetValue]);


  return (
    <>
      <div className=" xl:flex ">

        <header className=" bg-orange-500 p-6 text-center xl:h-screen xl:max-w-96">
          <h1 className=" text-3xl font-bold">Planificador de Gastos</h1>
          <div>
            <h3>Calendario</h3>
            <p>redes</p>
          </div>
        </header>

        <div className=" max-w-3xl text-center m-10 p-6 shadow-lg rounded-md bg-white flex justify-center md:mx-auto xl:h-full xl:w-10/12">
          {isValidBudget ? <BudgetTracker/> : <BudgetForm /> }
        </div>

        {isValidBudget && 
          <ExpenseModal/>
        }
        
      </div>
    </>
  )
}

export default App
