import React, { useState } from 'react';
import { Article } from '../../../types/Article.tsx';
import { ArticleAPI } from '../../../lib/api/ArticleAPI.tsx';

interface AddArticleModalProps {
    handleAddArticle: (articleId: number) => void;
}

export default function AddArticleModal({ handleAddArticle }: AddArticleModalProps) {
    const [articleInput, setArticleInput] = useState<string>('');
    const [articles, setArticles] = useState<Article[]>([]);

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setArticleInput(target.value);
        if (target.value.length > 0) {
            ArticleAPI.getByName({ name: target.value }).then((res) => {
                setArticles(res);
            });
        } else {
            setArticles([]);
        }
    };

    const clearModalBeforeHandleAddDish = (articleId: number) => {
        setArticleInput('');
        setArticles([]);
        handleAddArticle(articleId);
    };

    const handleArticleCreate = () => {
        const payload = { name: articleInput, sortOrder: 0, categoryId: null };
        ArticleAPI.create(payload).then((article) => {
            clearModalBeforeHandleAddDish(article.id);
        });
    };

    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'font-bold'}>Ajouter un article</div>

            <hr />

            <div className={'relative'}>
                <input
                    type="text"
                    autoFocus
                    onInput={handleInput}
                    placeholder={'Recherchez un article à ajouter'}
                    value={articleInput}
                    className="input input-sm w-full input-bordered "
                />

                {(articles.length > 0 || articleInput.length >= 3) && (
                    <div className={'absolute bg-white top-100 w-full border border-t-0 rounded'}>
                        {articles.map(
                            (article, k) =>
                                k <= 4 && (
                                    <div
                                        key={k}
                                        className={'first-letter:uppercase text-sm py-3 px-2 border-t hover:bg-gray-50'}
                                        onClick={() => clearModalBeforeHandleAddDish(article.id)}
                                    >
                                        {article.name}
                                    </div>
                                )
                        )}

                        {articleInput.length >= 3 && !articles.some((article) => article.name.toLowerCase() === articleInput.toLowerCase()) && (
                            <div onClick={handleArticleCreate} className={' text-sm py-3 px-2 border-t hover:bg-gray-50 italic'}>
                                Créer l'article "<span className={'first-letter:uppercase font-medium'}>{articleInput}</span>"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
