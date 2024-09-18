import React, { useContext  } from 'react';
import { Dish } from '../../../../types/Dish.tsx';
import { DishContext } from '../../dish.page.tsx';
import {DishTag} from "../../../../types/DishTag.tsx";

interface DishInformationsProps {
    dish: Dish
    setDish: React.Dispatch<React.SetStateAction<Dish | null>>
}

export default function DishInformation({dish, setDish} : DishInformationsProps) {
    const { selectedDish, dishTags } = useContext(DishContext);

    if (!selectedDish || !dish) return <div>UNKNOWN</div>;

    const handleDishNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, name: target.value });
    };
    const handleDishUrlChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, url: target.value });
    };

    const handleDishTagChange = ({ target }: React.ChangeEvent<HTMLInputElement>, dishTag: DishTag) => {
        if (!dish.dishTagIds) return;

        if (target.checked) {
            setDish({
                ...dish,
                dishTagIds: [...dish.dishTagIds, dishTag.id],
            });
        } else {
            setDish({
                ...dish,
                dishTagIds: dish.dishTagIds.filter((dishTagId) => dishTagId !== dishTag.id),
            });
        }
    }

    return <div className={'p-2 flex flex-col gap-3'}>
        <div className={'flex flex-col gap-2'}>
            <div className="font-semibold">Informations du plat</div>

            <div className={'flex items-center'}>
                <div className="font-medium w-28">Nom du plat</div>
                <input onInput={handleDishNameChange} type="text" className={'input input-sm input-bordered flex-1'}
                       value={dish.name} />
            </div>

            <div className={'flex items-center'}>
                <div className="font-medium w-28">URL</div>
                <input onInput={handleDishUrlChange} type="text" className={'input input-sm input-bordered flex-1'}
                       value={dish.url ?? ''} />
            </div>

            <div className={'flex items-start gap-1'}>
                <div className={'font-medium w-28'}>Tags</div>
                <div className="flex flex-col gap-1">
                {dishTags.sort((a,b) => a.name.localeCompare(b.name))
                    .map((dishTag, key) =>
                        <label key={key} className={'flex items-center gap-2'}>
                            <input type="checkbox" className={`checkbox checkbox-sm"`}
                                   style={{
                                       borderColor: dishTag.color,
                                       '--chkbg': dishTag.color
                                   } as { [key: string]: string } }
                                   value={dishTag.id} onChange={(e) => handleDishTagChange(e, dishTag) } checked={dish.dishTagIds?.includes(dishTag.id)}/>
                            <span className={'first-letter:uppercase'}>{dishTag.name}</span>
                        </label>
                    )
                }
                </div>
            </div>
        </div>
    </div>;
}