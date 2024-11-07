import { RecipeItem } from '../../../types/RecipeItem.tsx';
import React, { useContext, useEffect, useState } from 'react';
import { DishContext } from '../dish.context.tsx';

interface EditRecipeItemProps {
    recipeItem: RecipeItem;
    handleRemoveRecipeItem: (recipeItem: RecipeItem) => void;
    handleUpdateRecipeItem: (updatedRecipeItem: RecipeItem) => void;
}

export default function EditRecipeItem({ recipeItem, handleRemoveRecipeItem, handleUpdateRecipeItem }: EditRecipeItemProps) {
    const { articles } = useContext(DishContext);
    const [editedRecipeItem, setEditedRecipeItem] = useState<RecipeItem>(recipeItem);

    const handleQuantityEdit = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEditedRecipeItem({ ...editedRecipeItem, quantity: Number(target.value) });
    };
    const handleUnitEdit = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEditedRecipeItem({ ...editedRecipeItem, unit: target.value });
    };

    useEffect(() => {
        handleUpdateRecipeItem(editedRecipeItem);
    }, [editedRecipeItem]);

    return (
        <tr>
            <td className={'first-letter:uppercase'}>{articles.find((article) => article.id === recipeItem?.articleId)?.name ?? 'unknown'}</td>

            <td>
                <input
                    type="text"
                    className={'input input-xs input-bordered w-8 text-center'}
                    onChange={handleQuantityEdit}
                    value={recipeItem?.quantity}
                />
            </td>

            <td>
                <input type="text" className={'input input-xs input-bordered w-16'} onChange={handleUnitEdit} value={recipeItem?.unit} />
            </td>

            <td>
                <button className={'btn btn-outline btn-square btn-xs'} onClick={() => handleRemoveRecipeItem(recipeItem)}>
                    <i className="fa fa-times"></i>
                </button>
            </td>
        </tr>
    );
}
