import AmountDisplay from "./AmountDisplay";


export default function BudgetTracker() {
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
                amount={300}
            />
            <AmountDisplay
                label={'Disponible'}
                amount={200}
            />
            <AmountDisplay
                label={'Gastado'}
                amount={100}
            />
        </div>
    </div>
  )
}
