import React, {useContext, useState} from "react";
import {Article} from "../../../types/Article.tsx";
import {ArticleAPI} from "../../../api/ArticleAPI.tsx";
import {DishContext} from "../../../routes/DishPage.tsx";

interface Props {
    handleArticleAdd: (article: Article | null) => void,
    setDisplayArticleAdder: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function ArticleAdder({handleArticleAdd, setDisplayArticleAdder}: Props) {
    const [articleInput, setArticleInput] = useState<string>('')
    const [articles, setArticles] = useState<Article[]>([])
    const {refreshArticles} = useContext(DishContext);

    const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setArticleInput(target.value);
        if (target.value.length > 0) {
            ArticleAPI.getByName({name: target.value})
                .then(res => {
                    setArticles(res);
                })
        } else {
            setArticles([]);
        }
    }

    const handleArticleCreate = () => {
        const article: Omit<Article, 'id'> = {
            name: articleInput,
            sortOrder: 0,
            categoryId: null
        };
        ArticleAPI.create(article)
            .then(articleResponse => {
                handleArticleAdd(articleResponse);
                refreshArticles();
            })
    }

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black/40'}>
            <div
                className={'absolute top-1/4 left-1/2 -translate-x-1/2 w-80 bg-white rounded-xl shadow-xl py-3 px-4 flex flex-col gap-3'}>
                <div className="flex items-center justify-between">
                    <h3 className={'font-semibold text-lg'}>Ajouter un article</h3>

                    <button className={'btn btn-square btn-ghost btn-sm'} onClick={() => setDisplayArticleAdder(false)}>
                        <i className={'fa fa-times text-xl'}></i>
                    </button>
                </div>

                <hr/>

                <div className="relative">
                    <input type="text"
                           autoFocus
                           onInput={handleInput}
                           placeholder={'Recherchez un article'}
                           value={articleInput}
                           className="input input-sm w-full input-bordered my-1"/>

                    {(articles.length > 0 || articleInput.length >= 3) &&
                        <div className={'absolute top-100 w-full border bg-white border-t-0 rounded'}>
                            {articles.map((p, k) =>
                                <div key={k}
                                     className={'first-letter:uppercase text-sm py-3 px-2 border-t hover:bg-gray-50'}
                                     onClick={() => handleArticleAdd(p)}>{p.name}
                                </div>
                            )}

                            {(articleInput.length >= 3) && !articles.some(dish => dish.name.toLowerCase() === articleInput.toLowerCase()) && (
                                <div onClick={handleArticleCreate}
                                     className={'text-sm py-3 px-2 border-t hover:bg-gray-50 italic'}>
                                    Créer l'article "<span className={'first-letter:uppercase font-medium'}>{articleInput}</span>"
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}