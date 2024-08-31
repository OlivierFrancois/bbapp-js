import {useContext} from 'react';
import {RecipeItem} from '../../../types/RecipeItem.tsx';
import {DishContext} from '../../../routes/DishPage.tsx';

interface RecipeItemProps {
    recipeItem: RecipeItem,
    handleRemoveRecipeItem: (recipeItem: RecipeItem) => void
}

export default function RecipeItemRow({recipeItem, handleRemoveRecipeItem}: RecipeItemProps) {
    const {articles} = useContext(DishContext);

    return <tr>
        <td>{articles.find(a => a.id === recipeItem.articleId)?.name ?? ''}</td>

        <td>{recipeItem.quantity} {recipeItem.unit}</td>

        <td className={'w-10'}>
            <div className={'btn btn-xs btn-square btn-outline btn-error'}
            onClick={() => handleRemoveRecipeItem(recipeItem)}>
                <i className={'fa fa-trash'}></i>
            </div>
        </td>
    </tr>
}