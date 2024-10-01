import {useContext} from "react";
import {Article} from "../../../../types/Article.tsx";
import {ArticleContext} from "../article.page.tsx";

export default function List() {
    const {setSelectedArticle, setSelectedCategory,categories, articles} = useContext(ArticleContext);

    const handleArticleCreate = (categoryId: number) => {
        const article: Article = {id: 0, name: '', sortOrder: 0, categoryId: categoryId};
        setSelectedArticle(article);
    }

    return <div className={'overflow-auto'}>
        <table className={'table table-sm table-pin-rows table-zebra'}>
            {categories
                .sort((a, b) => a.sortOrder === b.sortOrder ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder)
                .map((category, keyCategory) => (
                    <tbody className={'border-b'} key={`${keyCategory}_${category.id}`}>
                        <tr>
                            <th className={'w-4'}>#</th>

                            <th className={'uppercase cursor-pointer hover:underline active:underline'}
                                onClick={() => setSelectedCategory(category)}>{category.name}</th>

                            <th className={'w-16'}>
                                <div className="flex items-center justify-center">
                                    <button className="btn btn-sm btn-square btn-ghost"
                                            onClick={() => handleArticleCreate(category.id)}>
                                        <i className={'fa fa-plus'}></i>
                                    </button>
                                </div>
                            </th>
                        </tr>

                        {articles
                            .filter(article => article.categoryId === category.id)
                            .sort((a, b) => a.sortOrder === b.sortOrder ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder)
                            .map((article: Article, key) => (
                                <tr key={`${key}_${article.id}`} className={'hover'}>
                                    <td className={'w-10'}>{key + 1}</td>

                                    <td colSpan={2} className={'first-letter:uppercase hover:underline active:underline'}
                                        onClick={() => setSelectedArticle(article)}
                                    >
                                        {article.name}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                ))}

            <tbody>
                <tr>
                    <th className={'w-4'}>#</th>

                    <th className={'uppercase'}>Sans catégorie</th>

                    <th className={'w-10'}>
                        <div className="flex items-center justify-center gap-2">
                            <button className="btn btn-sm btn-square btn-ghost"
                                    onClick={() => handleArticleCreate(0)}>
                                <i className={'fa fa-plus'}></i>
                            </button>
                        </div>
                    </th>
                </tr>

                {articles
                    .filter(article => article.categoryId === null)
                .sort((a, b) => a.sortOrder === b.sortOrder ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder)
                .map((article: Article, key) => (
                    <tr key={`${key}_${article.id}`} className={'hover'}>
                        <td className={'w-10'}>{key + 1}</td>

                        <td className={'first-letter:uppercase hover:underline active:underline'}
                            colSpan={2}
                            onClick={() => setSelectedArticle(article)}
                        >
                            {article.name}
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>

        <div className={'h-[4.5rem]'}></div>
    </div>
}