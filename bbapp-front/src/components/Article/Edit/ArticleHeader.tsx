import {useContext} from "react";
import {ArticleContext} from "../../../routes/ArticlePage.tsx";

export default function ArticleHeader() {
    const {selectedArticle} = useContext(ArticleContext);

    if (!selectedArticle) return <div>UNKNOWN</div>

    return selectedArticle.id > 0
        ? <div className={'flex gap-1 item-center'}>Modification de <div className={'font-semibold first-letter:uppercase'}>{selectedArticle.name}</div></div>
        : <div>Création d'un nouvel article</div>
}