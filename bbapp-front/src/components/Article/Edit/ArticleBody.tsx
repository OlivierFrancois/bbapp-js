import React, {useCallback, useContext, useEffect, useState} from "react";
import {ArticleContext} from "../../../routes/ArticlePage.tsx";
import Article from "../../../interfaces/Article.tsx";
import {ArticleAPI} from "../../../api/ArticleAPI.tsx";

export default function ArticleBody() {
    const { selectedArticle, setSelectedArticle, categories } = useContext(ArticleContext);

    const [hasChanged, setHasChanged] = useState<boolean>(false)
    const [article, setArticle] = useState<Article|null>(selectedArticle)

    useEffect(() => {
        if (article && selectedArticle && article.categoryId > 0) {
            setHasChanged((article.name !== selectedArticle.name) ||
                (article.categoryId !== selectedArticle.categoryId) ||
                (article.sortOrder !== selectedArticle.sortOrder)
            );
        }
    }, [article, selectedArticle]);

    const capitalizeFirstLetter = useCallback((string: string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : string, []);


    if (!selectedArticle || !article) return <div>UNKNOWN</div>

    const handleNameChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, name: target.value});
    }
    const handleSortOrderChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, sortOrder: parseInt(target.value)});
    }
    const handleCategoryChange = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
        setArticle({...article, categoryId: parseInt(target.value)});
    }
    const handleCancelModification = () => {
        setArticle(selectedArticle);
    }
    const handleSaveArticle = () => {
        ArticleAPI.save(article)
            .then(returnedArticle => setSelectedArticle(returnedArticle));
    }
    const handleDelete = () => {
        ArticleAPI.delete(selectedArticle.id)
            .then(res => {
                if (res.message === 'deleted') setSelectedArticle(null);
            })
    }

    return <div className={'p-2 flex flex-col gap-3'}>
        <div className="flex items-center gap-2 justify-end">
            <button disabled={!hasChanged} onClick={handleCancelModification} className={'btn btn-xs btn-secondary btn-outline'}>Annuler</button>
            <button disabled={!hasChanged} onClick={handleSaveArticle} className={'btn btn-xs btn-primary'}>Sauvegarder</button>
        </div>

        <div className={'flex flex-col gap-2'}>
            <div className="font-semibold">Informations de l'article</div>

            <div className={'flex items-center'}>
                <div className="font-medium w-32">Nom</div>
                <input onInput={handleNameChange} type="text"
                       className={'input input-primary input-sm input-bordered flex-1'}
                       value={article.name}/>
            </div>


            <div className={'flex items-center'}>
                <div className="font-medium w-32">Ordre</div>
                <input onInput={handleSortOrderChange} type="number"
                       className={'input input-primary input-sm input-bordered flex-1'}
                       value={article.sortOrder}/>
            </div>

            <div className={'flex items-center'}>
                <div className="font-medium w-32">Catégorie</div>

                <select id="category"
                        className={'select select-primary select-sm flex-1 first-letter:uppercase'}
                        defaultValue={article.categoryId}
                        onChange={handleCategoryChange}>
                    <option value={0} disabled={true}></option>
                    {categories
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((category, keyCategory) => <option key={keyCategory} className={'first-letter:capitalize'}
                                                                value={category.id}>{capitalizeFirstLetter(category.name)}</option>)
                    }
                </select>
            </div>

            {article.id > 0 &&
                <div className={'flex mt-5'}>
                    <button className={'flex-1 btn btn-error btn-sm'} onClick={handleDelete}>Supprimer</button>
                </div>
            }
        </div>
    </div>
}