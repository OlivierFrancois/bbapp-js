import { useContext, useEffect, useState } from 'react';
import { DishContext } from '../../../routes/DishPage.tsx';
import { DishAPI } from '../../../api/DishAPI.tsx';
import Recipe from './Recipe.tsx';
import DishInformations from './DishInformations.tsx';
import { Dish } from '../../../types/Dish.tsx';
import { RecipeItem } from '../../../types/RecipeItem.tsx';
import { RecipeAPI } from '../../../api/RecipeAPI.tsx';

export default function Body() {
    const { selectedDish, setSelectedDish } = useContext(DishContext);
    const [cleanRecipeItems, setCleanRecipeItems] = useState<(RecipeItem)[]>([]);

    const [dish, setDish] = useState<Dish | null>(selectedDish);
    const [recipeItems, setRecipeItems] = useState<(RecipeItem)[]>([]);

    const [hasChanged, setHasChanged] = useState<boolean>(false);

    useEffect(() => {
        // Relative to dish information
        if (dish && selectedDish) {
            setHasChanged(dish.name !== selectedDish.name);
        }

        // Relative to recipe
        //Todo
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
            DishAPI.update(dish)
                .then(returnedDish => {
                    setSelectedDish(returnedDish)
                    // Save tous les recipes
                    recipeItems.forEach(recipeItems => {
                        RecipeAPI.save(recipeItems);
                    })

                });
        } else {
            DishAPI.create({ name: dish.name, url: dish.url } as Omit<Dish, 'id'>)
                .then(returnedDish => setSelectedDish(returnedDish));
        }
    };
    const handleCancelModification = () => {
        setDish(selectedDish);
        setRecipeItems(cleanRecipeItems)
    };
    const handleDelete = () => {
        DishAPI.delete(selectedDish.id)
            .then(res => {
                if (res.message === 'deleted') setSelectedDish(null);
            });
    };

    return <div className={'p-2 flex flex-col gap-3'}>
        <div className="flex items-center gap-2 justify-end">
            <button disabled={!hasChanged} onClick={handleCancelModification}
                    className={'btn btn-xs btn-secondary btn-outline'}>Annuler
            </button>
            <button disabled={!hasChanged} onClick={handleSaveDish} className={'btn btn-xs btn-primary'}>Sauvegarder
            </button>
        </div>

        <DishInformations dish={dish} setDish={setDish} />

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