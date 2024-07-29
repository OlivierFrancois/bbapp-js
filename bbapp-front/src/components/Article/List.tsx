import {useContext} from "react";
import Article from "../../interfaces/Article.tsx";
import {ArticleContext} from "../../routes/ArticlePage.tsx";

export default function List() {
    const {setSelectedArticle, setSelectedCategory,categories, articles} = useContext(ArticleContext);

    return <div className={'overflow-auto'}>
        <table className={'table table-sm table-pin-rows'}>
            {categories
                .sort((a, b) => a.sortOrder === b.sortOrder ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder)
                .map((category, keyCategory) => (
                    <tbody key={`${keyCategory}_${category.id}`}>
                        <tr>
                            <th className={'text-lg uppercase'}>{category.name}</th>

                            <th className={'w-10'}>
                                <div className="btn btn-primary btn-xs btn-circle"
                                     onClick={() => setSelectedCategory(category)}>
                                    <i className={'fa fa-pen'}></i>
                                </div>
                            </th>
                        </tr>

                        {articles
                            .filter(article => article.categoryId === category.id)
                            .sort((a, b) => a.sortOrder === b.sortOrder ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder)
                            .map((article: Article, key) => (
                                <tr key={`${key}_${article.id}`}>
                                <td className={'first-letter:uppercase'}>{article.name}</td>

                                        <td>
                                            <button className="btn btn-secondary btn-xs btn-outline btn-circle"
                                                    onClick={() => setSelectedArticle(article)}>
                                                <i className={'fa fa-pen'}></i>
                                            </button>
                                        </td>
                                </tr>
                            ))
                        }
                    </tbody>
                ))}
        </table>

        <div className={'h-[4.5rem]'}></div>
    </div>
}