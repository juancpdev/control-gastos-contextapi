import { useState } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hook/useBudget";

export default function FilterByCategory() {
    const {dispatch, state} = useBudget()
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCategory(value);
        dispatch({ type: 'add-filter-category', payload: {id : e.target.value} })
    }

    const handleFilter = () => {
        setSelectedCategory("");
        dispatch({ type: 'add-filter-category', payload: {id : ""} })
    }

    return (
        <div className="p-10 bg-white w-full rounded-md shadow-md">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select 
                        id="category" 
                        className="bg-slate-100 p-3 flex-1 rounded cursor-pointer"
                        onChange={handleChange}
                        value={selectedCategory}
                    >
                        <option value="">-- Todas las categorias</option>
                        {categories.map(category => (
                            <option 
                                key={category.id} 
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center mt-6">
                    {state.currentCategory !== "" && (
                        <button
                            onClick={handleFilter}
                            className=" rounded-xl text-sm border border-red-600 text-red-600 px-4 py-2 md:text-lg"
                        >
                            Eliminar Filtro X
                        </button>
                        
                    )}
                </div>
            </form>
        </div>
    )
}
