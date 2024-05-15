import BudgetForm from "./components/BudgetForm"

function App() {
  

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
        <div className=" max-w-3xl text-center m-10 p-6 shadow-lg rounded-md bg-white md:mx-auto xl:h-full xl:w-10/12">
          <BudgetForm />
        </div>
      </div>
    </>
  )
}

export default App
