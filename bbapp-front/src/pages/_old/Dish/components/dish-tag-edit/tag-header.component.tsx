import {useContext} from "react";
import {DishContext} from "../../dish.page.tsx";

export default function TagHeader() {
    const {selectedTag} = useContext(DishContext);

    if (!selectedTag) return <div>UNKNOWN</div>

    return selectedTag.id > 0
        ? <div className={'flex gap-1 item-center'}>Modification de <div className={'font-semibold first-letter:uppercase'}>{selectedTag.name}</div></div>
        : <div>Création d'un nouveau tag</div>
}