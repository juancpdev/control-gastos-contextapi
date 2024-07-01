import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hook/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  
  const {state, dispatch} = useBudget()
  
  const budgetValue = typeof state.budget === 'string' ? parseFloat(state.budget) : state.budget;
  const isValidBudget = useMemo(() => budgetValue > 0, [state.budget, budgetValue]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString()),
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <div className=" xl:flex ">

        <header className=" bg-orange-500 p-6 text-center xl:h-screen xl:max-w-96 xl:flex-1">
          <h1 className=" text-3xl font-bold">Planificador de Gastos</h1>
          <div>
            <h3>Calendario</h3>
            <p>redes</p>
          </div>
        </header>

        <div className="xl:flex-auto">
          <div className=" max-w-3xl text-center m-10 p-6 shadow-lg rounded-md bg-white flex justify-center md:mx-auto ">
            {isValidBudget ? <BudgetTracker/> : <BudgetForm /> }
          </div>

          {isValidBudget && (
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
