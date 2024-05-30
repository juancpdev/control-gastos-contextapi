import { categories } from "../data/categories"

export default function ExpenseForm() {
  return (
    <form className=" space-y-5">
        <legend className=" font-bold uppercase text-center text-3xl pb-3 border-b-4 border-blue-500">
            Nuevo Gasto
        </legend>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="nombre" 
                className=" text-xl">
                Nombre Gasto:
            </label>
            
            <input 
                id="nombre"
                name="nombre"
                placeholder="Añade el Nombre del gasto"
                className=" bg-gray-200 p-2"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="nombre" 
                className=" text-xl">
                Cantidad:
            </label>
            
            <input 
                id="nombre"
                name="nombre"
                placeholder="Añade la cantidad del gasto: ej. 300"
                className=" bg-gray-200 p-2"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="nombre" 
                className=" text-xl">
                Categoria:
            </label>
            
            <select 
                id="category"
                name="category"
                className=" bg-gray-200 p-2"
            >
                <option value="" disabled>-- Seleccione --</option>
                {categories.map( (category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <input 
            type="submit" 
            className=" bg-blue-600 w-full text-white py-2 uppercase font-medium rounded-md"
            value={'Registrar Gasto'}
        />
    </form>
  )
}
