import {useContext} from "react";
import {DishContext} from "../../../routes/DishPage.tsx";

export default function Header() {
    const {selectedDish} = useContext(DishContext);

    if (!selectedDish) return <div>UNKNOWN</div>

    return selectedDish.id > 0
        ? <div className={'flex gap-1 item-center'}>Modification de <div className={'font-semibold first-letter:uppercase'}>{selectedDish.name}</div></div>
        : <div>Création d'un nouveau plat</div>
}