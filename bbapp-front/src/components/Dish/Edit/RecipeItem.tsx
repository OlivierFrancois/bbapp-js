import { useContext } from 'react';
import { RecipeItem } from '../../../types/RecipeItem.tsx';
import { DishContext } from '../../../routes/DishPage.tsx';

interface RecipeItemProps {
    recipeItem: RecipeItem;
}

export default function RecipeItemRow({ recipeItem }: RecipeItemProps) {
    const { articles } = useContext(DishContext);

    return <tr>
        <td>{articles.find(a => a.id === recipeItem.articleId)?.name ?? 'undefined'}</td>

        <td>{recipeItem.quantity} {recipeItem.unit}</td>

        <td className={'w-10'}>
            <div className={'btn btn-xs btn-square btn-outline btn-error'}>
                <i className={'fa fa-trash'}></i>
            </div>
        </td>
    </tr>;
}