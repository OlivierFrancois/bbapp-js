import RecipeItemRow from './RecipeItem.tsx';
import React, { useContext } from 'react';
import { RecipeItem } from '../../../types/RecipeItem.tsx';
import { DishContext } from '../../../routes/DishPage.tsx';

interface RecipeProps {
    recipeItems: RecipeItem[]
    setRecipeItems: React.Dispatch<React.SetStateAction<RecipeItem[]>>
}

export default function Recipe({ recipeItems, setRecipeItems }: RecipeProps) {
    const { selectedDish } = useContext(DishContext);
    const addRecipeItem = () => {
        if (!selectedDish) return;

        const newRecipeItem: RecipeItem = {
            dishId: selectedDish.id,
            articleId: 0,
            quantity: 0,
            unit: 'Unité',
        }
        setRecipeItems([...recipeItems, newRecipeItem]);
        // TODO : marche pas
    }

    return <div className={'flex flex-col gap-2'}>
        <div className="flex justify-between items-center">
            <div className="font-semibold">Liste des ingrédients</div>

            <button onClick={addRecipeItem} className={'btn btn-xs btn-primary'}>Ajouter</button>
        </div>

        <table className={'table table-sm w-full [&_td]:p-0 [&_td]:py-1'}>
            <tbody>
                {recipeItems.map((recipeItem, recipeItemKey) => (
                    <RecipeItemRow key={recipeItemKey} recipeItem={recipeItem}/>
                ))}
            </tbody>
        </table>
    </div>;
}