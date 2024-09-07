import React, {useContext, useEffect, useState} from "react";
import {DishContext} from "../../dish.page.tsx";
import {DishCategory} from "../../../../types/DishCategory.tsx";
import {DishCategoryAPI} from "../../../../api/DishCategoryAPI.tsx";

export default function CategoryBody() {
    const { selectedCategory, setSelectedCategory } = useContext(DishContext);

    const [hasChanged, setHasChanged] = useState<boolean>(false)
    const [dishCategory, setDishCategory] = useState<DishCategory|null>(selectedCategory)

    useEffect(() => {
        if (dishCategory && selectedCategory) {
            setHasChanged(dishCategory.name !== selectedCategory.name || dishCategory.sortOrder !== selectedCategory.sortOrder)
        }
    }, [dishCategory, selectedCategory]);

    if (!selectedCategory || !dishCategory) return <div>UNKNOWN</div>

    const handleCategoryNameChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDishCategory({...dishCategory, name: target.value});
    }
    const handleSortOrderChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDishCategory({...dishCategory, sortOrder: parseInt(target.value)});
    }

    const handleCancelModification = () => {
        setDishCategory(selectedCategory);
    }
    const handleSaveCategory = () => {
        if (dishCategory.id > 0) {
            DishCategoryAPI.update(dishCategory)
                .then(returnedCategory => setSelectedCategory(returnedCategory));
        } else {
            const newCategory : Omit<DishCategory, 'id'> = {
                name: dishCategory.name,
                sortOrder: dishCategory.sortOrder,
            }
            DishCategoryAPI.create(newCategory)
                .then(returnedCategory => setSelectedCategory(returnedCategory));
        }
    }
    const handleDelete = () => {
        DishCategoryAPI.delete(selectedCategory.id)
            .then(() => {
                setSelectedCategory(null);
            })
    }

    return <div className={'p-2 flex flex-col gap-3'}>
        <div className="flex items-center gap-2 justify-end">
            <button disabled={!hasChanged} onClick={handleCancelModification} className={'btn btn-xs btn-secondary btn-outline'}>Annuler</button>
            <button disabled={!hasChanged} onClick={handleSaveCategory} className={'btn btn-xs btn-primary'}>Sauvegarder</button>
        </div>

        <div className={'flex flex-col gap-2'}>
            <div className="font-semibold">Informations de l'article</div>

            <div className={'flex items-center'}>
                <div className="font-medium w-32">Nom</div>
                <input onInput={handleCategoryNameChange} type="text"
                       className={'input input-primary input-sm input-bordered flex-1'}
                       value={dishCategory.name}/>
            </div>

            <div className={'flex items-center'}>
                <div className="font-medium w-32">Ordre</div>
                <input onInput={handleSortOrderChange} type="number"
                       className={'input input-primary input-sm input-bordered flex-1'}
                       value={dishCategory.sortOrder}/>
            </div>

            {dishCategory.id > 0 &&
                <div className={'flex mt-5'}>
                    <button className={'flex-1 btn btn-error btn-sm'} onClick={handleDelete}>Supprimer</button>
                </div>
            }
        </div>
    </div>
}