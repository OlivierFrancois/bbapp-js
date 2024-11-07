import React, { useContext } from 'react';
import { Dish } from '../../../types/Dish.tsx';
import { useModal } from '../../../contexts/modal.provider.tsx';
import AddArticleModal from '../modals/add-article.modal.tsx';
import { RecipeItem } from '../../../types/RecipeItem.tsx';
import { DishContext } from '../dish.context.tsx';
import EditRecipeItem from './edit-recipe-item.component.tsx';

interface EditDishRecipeProps {
    editedDish: Dish;
    setEditedDish: React.Dispatch<React.SetStateAction<Dish>>;
}

export default function DishEditRecipe({ editedDish, setEditedDish }: EditDishRecipeProps) {
    const { openModal, closeModal } = useModal();

    const { reloadArticles } = useContext(DishContext);

    const handleAddArticle = (articleId: number) => {
        const newRecipeItem: RecipeItem = {
            articleId,
            dishId: editedDish.id,
            quantity: 0,
            unit: '',
        };
        const recipeItems = editedDish.recipeItems ? [...editedDish.recipeItems, newRecipeItem] : [newRecipeItem];
        setEditedDish({ ...editedDish, recipeItems });
        reloadArticles();
        closeModal();
    };

    const handleRemoveRecipeItem = (recipeItem: RecipeItem) => {
        const recipeItems = editedDish.recipeItems?.filter(
            (prevRecipeItem) => prevRecipeItem && prevRecipeItem.dishId === recipeItem.dishId && prevRecipeItem.articleId !== recipeItem.articleId
        );
        setEditedDish({ ...editedDish, recipeItems });
    };
    const handleUpdateRecipeItem = (updatedRecipeItem: RecipeItem) => {
        const recipeItems = editedDish.recipeItems?.map((prevRecipeItem) =>
            prevRecipeItem && prevRecipeItem.dishId === updatedRecipeItem.dishId && prevRecipeItem.articleId === updatedRecipeItem.articleId
                ? { ...prevRecipeItem, ...updatedRecipeItem }
                : prevRecipeItem
        );
        setEditedDish({ ...editedDish, recipeItems });
    };

    return (
        <div className="flex flex-col gap-2 ">
            <div className="flex justify-between items-center">
                <h3 className={'font-semibold'}>Ingrédients</h3>

                <button
                    className={'btn btn-xs btn-neutral'}
                    onClick={() => openModal(<AddArticleModal handleAddArticle={handleAddArticle} />, 'overflow-visible')}
                >
                    Ajouter
                </button>
            </div>

            <table className={'table table-xs'}>
                <thead>
                    <tr>
                        <th>Ingrédient</th>
                        <th>Quantité</th>
                        <th>Unité</th>
                    </tr>
                </thead>

                <tbody>
                    {editedDish.recipeItems?.map((recipeItem, recipeItemKey) => {
                        return (
                            recipeItem && (
                                <EditRecipeItem
                                    key={recipeItemKey}
                                    recipeItem={recipeItem}
                                    handleRemoveRecipeItem={handleRemoveRecipeItem}
                                    handleUpdateRecipeItem={handleUpdateRecipeItem}
                                />
                            )
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
