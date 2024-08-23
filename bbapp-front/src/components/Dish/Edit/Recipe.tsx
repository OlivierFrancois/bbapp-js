import { Dish } from '../../../types/Dish.tsx';
import { useContext, useEffect, useState } from 'react';
import { RecipeItem } from '../../../types/RecipeItem.tsx';
import { RecipeAPI } from '../../../api/RecipeAPI.tsx';
import { DishContext } from '../../../routes/DishPage.tsx';

interface RecipeProps {
    dish: Dish;
}

export default function Recipe({ dish }: RecipeProps) {
    const {articles} = useContext(DishContext);
    const [recipeItems, setRecipeItems] = useState<(RecipeItem)[]>([]);

    useEffect(() => {
        RecipeAPI.getByDish(dish.id).then(r => setRecipeItems(r));
    }, []);


    return <div className={'flex flex-col gap-2'}>
        <div className="flex justify-between items-center">
            <div className="font-semibold">Liste des ingrédients</div>

            <button className={'btn btn-xs btn-primary'}>Ajouter</button>
        </div>

        <table className={'table table-sm w-full [&_td]:p-0 [&_td]:py-1'}>
            <tbody>
                {recipeItems.map((recipeItem, recipeItemKey) => (
                    <tr key={recipeItemKey} className={'flex'}>
                        <td className={'w-full'}>{articles.find(a => a.id === recipeItem.articleId)?.name ?? 'undefined'}</td>

                        <td className={'w-full'}>{recipeItem.quantity} {recipeItem.unit}</td>

                        <td className={'w-16'}>
                            <div className={'btn btn-xs btn-square btn-outline btn-error'}>
                                <i className={'fa fa-trash'}></i>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}