import dayjs from "dayjs";
import 'dayjs/locale/fr';
import List from "../components/Dish/List.tsx";
import React, {createContext, useState} from "react";
import Dish from "../interfaces/Dish.tsx";
import SlideUpModal from "../components/SlideUpModal/SlideUpModal.tsx";
import Header from "../components/Dish/Edit/Header.tsx";
import Body from "../components/Dish/Edit/Body.tsx";
dayjs.locale('fr');

interface DishContextI {
    selectedDish: Dish | null,
    setSelectedDish: React.Dispatch<React.SetStateAction<Dish|null>>
}

export const DishContext = createContext<DishContextI>({} as DishContextI);

export default function DishPage() {
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

    return (
        <DishContext.Provider value={{selectedDish, setSelectedDish}}>
            <div className={'min-h-screen flex flex-col gap-2 relative overflow-hidden'}>
                <div className={'font-semibold text-xl px-2 py-1'}>Liste des plats</div>

                <hr/>

                <List/>

                <SlideUpModal
                    displayCondition={selectedDish !== null}
                    handleClose={() => {setSelectedDish(null)}}
                    headerContent={<Header/>}
                    bodyContent={<Body />}
                />

                <div className={'h-[4.5rem]'}></div>
            </div>
        </DishContext.Provider>
    );
}
