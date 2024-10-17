import React, { useContext, useEffect, useState } from 'react';
import { DishContext } from '../../dish.page.tsx';
import { DishTag } from '../../../../../types/DishTag.tsx';
import { DishTagAPI } from '../../../../../lib/api/DishTagAPI.tsx';

export default function TagBody() {
    const { selectedTag, setSelectedTag } = useContext(DishContext);

    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [dishTag, setDishTag] = useState<DishTag | null>(selectedTag);

    useEffect(() => {
        if (dishTag && selectedTag) {
            setHasChanged(dishTag.name !== selectedTag.name || dishTag.sortOrder !== selectedTag.sortOrder || dishTag.color !== selectedTag.color);
        }
    }, [dishTag, selectedTag]);

    if (!selectedTag || !dishTag) return <div>UNKNOWN</div>;

    const handleCategoryNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDishTag({ ...dishTag, name: target.value });
    };
    const handleSortOrderChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDishTag({ ...dishTag, sortOrder: parseInt(target.value) });
    };
    const handleColorChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDishTag({ ...dishTag, color: target.value });
    };

    const handleCancelModification = () => {
        setDishTag(selectedTag);
    };
    const handleSaveCategory = () => {
        if (dishTag.id > 0) {
            DishTagAPI.update(dishTag).then((returnedCategory) => setSelectedTag(returnedCategory));
        } else {
            const newCategory: Omit<DishTag, 'id'> = {
                name: dishTag.name,
                sortOrder: dishTag.sortOrder,
                color: dishTag.color,
            };
            DishTagAPI.create(newCategory).then((returnedCategory) => setSelectedTag(returnedCategory));
        }
    };
    const handleDelete = () => {
        DishTagAPI.delete(selectedTag.id).then(() => {
            setSelectedTag(null);
        });
    };

    return (
        <div className={'p-2 flex flex-col gap-3'}>
            <div className="flex items-center gap-2 justify-end">
                <button disabled={!hasChanged} onClick={handleCancelModification} className={'btn btn-xs btn-secondary btn-outline'}>
                    Annuler
                </button>
                <button disabled={!hasChanged} onClick={handleSaveCategory} className={'btn btn-xs btn-primary'}>
                    Sauvegarder
                </button>
            </div>

            <div className={'flex flex-col gap-2'}>
                <div className="font-semibold">Informations du tag</div>

                <div className={'flex items-center'}>
                    <div className="font-medium w-32">Nom</div>
                    <input
                        onInput={handleCategoryNameChange}
                        type="text"
                        className={'input input-primary input-sm input-bordered flex-1'}
                        value={dishTag.name}
                    />
                </div>

                <div className={'flex items-center'}>
                    <div className="font-medium w-32">Couleur</div>
                    <input
                        onInput={handleColorChange}
                        type="color"
                        className={'input input-primary input-sm input-bordered flex-1'}
                        value={dishTag.color}
                    />
                </div>

                <div className={'flex items-center'}>
                    <div className="font-medium w-32">Ordre</div>
                    <input
                        onInput={handleSortOrderChange}
                        type="number"
                        className={'input input-primary input-sm input-bordered flex-1'}
                        value={dishTag.sortOrder}
                    />
                </div>

                {dishTag.id > 0 && (
                    <div className={'flex mt-5'}>
                        <button className={'flex-1 btn btn-error btn-sm'} onClick={handleDelete}>
                            Supprimer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
