import React, { useContext, useEffect, useState } from 'react';
import { ArticleContext } from '../../article.page.tsx';
import { ArticleCategory } from '../../../../../types/ArticleCategory.tsx';
import { ArticleCategoryAPI } from '../../../../../lib/api/ArticleCategoryAPI.tsx';

export default function CategoryBody() {
    const { selectedCategory, setSelectedCategory } = useContext(ArticleContext);

    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [category, setCategory] = useState<ArticleCategory | null>(selectedCategory);

    useEffect(() => {
        if (category && selectedCategory) {
            setHasChanged(category.name !== selectedCategory.name || category.sortOrder !== selectedCategory.sortOrder);
        }
    }, [category, selectedCategory]);

    if (!selectedCategory || !category) return <div>UNKNOWN</div>;

    const handleCategoryNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({ ...category, name: target.value });
    };
    const handleSortOrderChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({ ...category, sortOrder: parseInt(target.value) });
    };

    const handleCancelModification = () => {
        setCategory(selectedCategory);
    };
    const handleSaveCategory = () => {
        if (category.id > 0) {
            ArticleCategoryAPI.update(category).then((returnedCategory) => setSelectedCategory(returnedCategory));
        } else {
            const newCategory: Omit<ArticleCategory, 'id'> = {
                name: category.name,
                sortOrder: category.sortOrder,
            };
            ArticleCategoryAPI.create(newCategory).then((returnedCategory) => setSelectedCategory(returnedCategory));
        }
    };
    const handleDelete = () => {
        ArticleCategoryAPI.delete(selectedCategory.id).then((res) => {
            if (res.message === 'deleted') setSelectedCategory(null);
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
                <div className="font-semibold">Informations de l'article</div>

                <div className={'flex items-center'}>
                    <div className="font-medium w-32">Nom</div>
                    <input
                        onInput={handleCategoryNameChange}
                        type="text"
                        className={'input input-primary input-sm input-bordered flex-1'}
                        value={category.name}
                    />
                </div>

                <div className={'flex items-center'}>
                    <div className="font-medium w-32">Ordre</div>
                    <input
                        onInput={handleSortOrderChange}
                        type="number"
                        className={'input input-primary input-sm input-bordered flex-1'}
                        value={category.sortOrder}
                    />
                </div>

                {category.id > 0 && (
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
