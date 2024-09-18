import {useCallback, useContext, useEffect, useState} from 'react';
import { DishContext } from '../../dish.page.tsx';
import { DishAPI } from '../../../../api/DishAPI.tsx';
import Recipe from './recipe/recipe.component.tsx';
import DishInformation from './dish-information.component.tsx';
import { Dish } from '../../../../types/Dish.tsx';
import { RecipeItem } from '../../../../types/RecipeItem.tsx';
import { RecipeAPI } from '../../../../api/RecipeAPI.tsx';

export default function Body() {
    const { selectedDish, setSelectedDish } = useContext(DishContext);
    const [cleanRecipeItems, setCleanRecipeItems] = useState<(RecipeItem)[]>([]);

    const [dish, setDish] = useState<Dish | null>(selectedDish);
    const [recipeItems, setRecipeItems] = useState<(RecipeItem)[]>([]);

    const [hasChanged, setHasChanged] = useState<boolean>(false);

    const recipeHasChanged = useCallback(
        (): boolean => {
            if (cleanRecipeItems.length !== recipeItems.length) {
                return true;
            }

            const createKey = (item: RecipeItem) => `${item.dishId}-${item.articleId}`;

            const cleanMap = new Map(cleanRecipeItems.map(item => [createKey(item), item]));
            const recipeMap = new Map(recipeItems.map(item => [createKey(item), item]));

            for (const [key, cleanItem] of cleanMap.entries()) {
                const recipeItem = recipeMap.get(key);

                if (
                    !recipeItem ||
                    cleanItem.quantity !== recipeItem.quantity ||
                    cleanItem.unit !== recipeItem.unit
                ) {
                    return true;
                }
            }
            return false;
        },
        [cleanRecipeItems, recipeItems]
    );
    const dishTagsHaveChanged = useCallback(
        (): boolean => {
            if (!dish || !selectedDish) return true
            const dishHasExtraTag = dish.dishTagIds?.some(tagId => !selectedDish.dishTagIds?.includes(tagId)) ?? true;
            const selectedDishHasExtraTag = selectedDish.dishTagIds?.some(tagId => !dish.dishTagIds?.includes(tagId)) ?? true;
            return dishHasExtraTag || selectedDishHasExtraTag;
        },
        [dish, selectedDish]
    );

    useEffect(() => {
        if (dish && selectedDish) {
            setHasChanged(
                dish.name !== selectedDish.name ||
                dish.url !== selectedDish.url ||
                dishTagsHaveChanged() ||
                recipeHasChanged()
            );
        }
    }, [dish, selectedDish, recipeItems]);

    useEffect(() => {
        if (selectedDish) {
            RecipeAPI.getByDish(selectedDish.id).then(r => {
                setRecipeItems(r);
                setCleanRecipeItems(r)
            });
            setDish(selectedDish);
        }
    }, [selectedDish]);

    if (!dish || !selectedDish) return <div>UNKNOWN</div>;

    const handleSaveDish = () => {
        if (dish.id > 0) {
            DishAPI.saveWithRecipe(dish, recipeItems)
                .then(response => {
                    setSelectedDish(response.dish);
                })
        } else {
            const {id, ...payload} = dish;
            DishAPI.create(payload as Omit<Dish, 'id'>)
                .then(returnedDish => setSelectedDish(returnedDish));
        }
    };
    const handleCancelModification = () => {
        setDish(selectedDish);
        setRecipeItems(cleanRecipeItems)
    };
    const handleDelete = () => {
        DishAPI.delete(selectedDish.id)
            .then(() => setSelectedDish(null));
    };

    return <div className={'p-2 flex flex-col gap-3'}>
        <div className="flex items-center gap-2 justify-end">
            <button disabled={!hasChanged} onClick={handleCancelModification}
                    className={'btn btn-xs btn-secondary btn-outline'}>Annuler
            </button>
            <button disabled={!hasChanged} onClick={handleSaveDish} className={'btn btn-xs btn-primary'}>Sauvegarder
            </button>
        </div>

        <DishInformation dish={dish} setDish={setDish} />

        {selectedDish.id > 0 &&
            <>
                <hr />

                <Recipe recipeItems={recipeItems} setRecipeItems={setRecipeItems}/>

                <div className={'flex mt-5'}>
                    <button className={'flex-1 btn btn-error btn-sm'} onClick={handleDelete}>Supprimer</button>
                </div>
            </>
        }
    </div>;
}