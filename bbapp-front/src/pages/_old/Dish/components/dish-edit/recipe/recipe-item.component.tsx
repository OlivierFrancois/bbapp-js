import React, { useContext } from 'react';
import { RecipeItem } from '../../../../../../types/RecipeItem.tsx';
import { DishContext } from '../../../dish.page.tsx';

interface RecipeItemProps {
    recipeItem: RecipeItem,
    handleRemoveRecipeItem: (recipeItem: RecipeItem) => void,
    handleUpdate: (updatedRecipeItem: RecipeItem) => void
}

export default function RecipeItemRow({ recipeItem, handleRemoveRecipeItem, handleUpdate }: RecipeItemProps) {
    const { articles } = useContext(DishContext);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRecipeItem = {
            ...recipeItem,
            quantity: parseFloat(e.target.value) || 0, // Convert the value to a number
        };
        handleUpdate(updatedRecipeItem);
    };
    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRecipeItem = {
            ...recipeItem,
            unit: e.target.value,
        };
        handleUpdate(updatedRecipeItem);
    };

    return <tr>
        <td>{articles.find(a => a.id === recipeItem.articleId)?.name ?? ''}</td>

        <td>
            <div className={'flex items-center gap-3'}>
                <input type="text" className={'input input-xs input-bordered w-12 text-center'}
                       value={recipeItem.quantity} onChange={handleQuantityChange} />

                <input type="text" className={'input input-xs input-bordered w-24'} value={recipeItem.unit}
                       onChange={handleUnitChange} />
            </div>
        </td>

        <td className={'w-10'}>
            <div className={'btn btn-xs btn-square btn-outline btn-error'}
                 onClick={() => handleRemoveRecipeItem(recipeItem)}>
                <i className={'fa fa-trash'}></i>
            </div>
        </td>
    </tr>;
}