import {useContext} from "react";
import {DishContext} from "../../../routes/DishPage.tsx";
import {DishAPI} from "../../../api/DishAPI.tsx";
import Recipe from './Recipe.tsx';
import DishInformations from './DishInformations.tsx';

export default function Body() {
    const { selectedDish, setSelectedDish } = useContext(DishContext);


    if (!selectedDish) return <div>UNKNOWN</div>

    const handleDelete = () => {
        DishAPI.delete(selectedDish.id)
            .then(res => {
                if (res.message === 'deleted') setSelectedDish(null);
            })
    }

    return <div className={'p-2 flex flex-col gap-3'}>
        <DishInformations />


        {selectedDish.id > 0 &&
            <>
                <hr />

                <Recipe dish={selectedDish}/>

                <div className={'flex mt-5'}>
                    <button className={'flex-1 btn btn-error btn-sm'} onClick={handleDelete}>Supprimer</button>
                </div>
            </>
        }
    </div>
}