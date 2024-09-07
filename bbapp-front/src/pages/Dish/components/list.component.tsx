import {useContext} from "react";
import {DishContext} from "../dish.page.tsx";

interface ListProps {
    handleDishCreate: (categoryId?: number) => void
}

export default function List({handleDishCreate}: ListProps) {
    const {setSelectedDish, setSelectedCategory, dishCategories, dishes} = useContext(DishContext);

    return <div className={'overflow-auto'}>
        <table className={'table table-sm table-pin-rows'}>
            {dishCategories
                .sort((a, b) => a.sortOrder === b.sortOrder ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder)
                .map((category, keyCategory) => (
                    <tbody key={`${keyCategory}_${category.id}`}>
                        <tr>
                            <th className={'text-lg uppercase'}>{category.name}</th>

                            <th className={'w-10'}>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="btn btn-primary btn-xs btn-circle"
                                            onClick={() => handleDishCreate(category.id)}>
                                        <i className={'fa fa-plus'}></i>
                                    </button>

                                    <button className="btn btn-primary btn-xs btn-circle"
                                            onClick={() => setSelectedCategory(category)}>
                                        <i className={'fa fa-pen'}></i>
                                    </button>
                                </div>
                            </th>
                        </tr>

                        {dishes
                            .filter(dish => dish.dishCategoryId === category.id)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((dish, key) => (
                                <tr key={`${key}_${dish.id}`}>
                                    <td className={'first-letter:uppercase'}>{dish.name}</td>

                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="btn btn-secondary btn-xs btn-outline btn-circle"
                                                    onClick={() => setSelectedDish(dish)}>
                                                <i className={'fa fa-pen'}></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                ))}

            <tbody>
                <tr>
                    <th className={'text-lg uppercase'}>Sans catégorie</th>

                    <th className={'w-10'}>
                        <div className="flex items-center justify-center gap-2">
                            <button className="btn btn-primary btn-xs btn-circle"
                                    onClick={() => handleDishCreate()}>
                                <i className={'fa fa-plus'}></i>
                            </button>
                        </div>
                    </th>
                </tr>

                {dishes
                    .filter(dish => dish.dishCategoryId === null)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((dish, key) => (
                        <tr key={`${key}_${dish.id}`}>
                            <td className={'first-letter:uppercase'}>{dish.name}</td>

                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="btn btn-secondary btn-xs btn-outline btn-circle"
                                            onClick={() => setSelectedDish(dish)}>
                                        <i className={'fa fa-pen'}></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <div className={'h-[4.5rem]'}></div>
    </div>
}