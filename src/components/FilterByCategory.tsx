import { categories } from "../data/categories";
import { useBudget } from "../hook/useBudget";

export default function FilterByCategory() {
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: {id : e.target.value} })
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
            </form>
        </div>
    )
}
