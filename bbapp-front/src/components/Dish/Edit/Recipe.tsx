import RecipeItemRow from './RecipeItem.tsx';
import React, {useContext, useState} from 'react';
import { RecipeItem } from '../../../types/RecipeItem.tsx';
import { DishContext } from '../../../routes/DishPage.tsx';
import ArticleAdder from "./ArticleAdder.tsx";
import {Article} from "../../../types/Article.tsx";
import {RecipeAPI} from "../../../api/RecipeAPI.tsx";

interface RecipeProps {
    recipeItems: RecipeItem[]
    setRecipeItems: React.Dispatch<React.SetStateAction<RecipeItem[]>>
}

export default function Recipe({ recipeItems, setRecipeItems }: RecipeProps) {
    const { selectedDish } = useContext(DishContext);

    const [displayArticleAdder, setDisplayArticleAdder] = useState<boolean>(false)
    const addRecipeItem = (article: Article | null) => {
        if (!selectedDish || !article) return;

        const newRecipeItem: RecipeItem = {
            dishId: selectedDish.id,
            articleId: article.id,
            quantity: 0,
            unit: '',
        }
        setRecipeItems([...recipeItems, newRecipeItem]);
        setDisplayArticleAdder(false);
    }
    const removeRecipeItem = (recipeItem: RecipeItem) => {
        RecipeAPI.delete(recipeItem.dishId, recipeItem.articleId)
            .then(() => {
                setRecipeItems((prevRecipeItems) =>
                    prevRecipeItems.filter(r => r.dishId === recipeItem.dishId && r.articleId !== recipeItem.articleId)
                );
            })
    }

    return <div className={'flex flex-col gap-2'}>
        <div className="flex justify-between items-center">
            <div className="font-semibold">Liste des ingrédients</div>

            <button onClick={() => setDisplayArticleAdder(!displayArticleAdder)} className={'btn btn-xs btn-primary'}>Ajouter</button>
        </div>

        <table className={'table table-sm w-full [&_td]:p-0 [&_td]:py-1'}>
            <tbody>
                {recipeItems.map((recipeItem, recipeItemKey) => (
                    <RecipeItemRow key={recipeItemKey} recipeItem={recipeItem} handleRemoveRecipeItem={removeRecipeItem}/>
                ))}

            </tbody>
        </table>

        {displayArticleAdder && <ArticleAdder handleArticleAdd={addRecipeItem} setDisplayArticleAdder={setDisplayArticleAdder}/>}
    </div>;
}