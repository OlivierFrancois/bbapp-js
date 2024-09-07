import {useContext} from "react";
import {DishContext} from "../../dish.page.tsx";

export default function CategoryHeader() {
    const {selectedCategory} = useContext(DishContext);

    if (!selectedCategory) return <div>UNKNOWN</div>

    return selectedCategory.id > 0
        ? <div className={'flex gap-1 item-center'}>Modification de <div className={'font-semibold first-letter:uppercase'}>{selectedCategory.name}</div></div>
        : <div>Création d'une nouvelle catégorie</div>
}