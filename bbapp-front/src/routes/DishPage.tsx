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
            <div className={'h-screen flex flex-col gap-2 relative overflow-hidden'}>


                <div
                    className={'bg-gradient-to-br from-primary to-primary/85 from-10% text-secondary-content font-semibold text-xl px-2 py-1 h-12 flex items-center'}>Liste des plats</div>

                    <List/>

                    <SlideUpModal
                        displayCondition={selectedDish !== null}
                        handleClose={() => {
                            setSelectedDish(null)
                        }}
                        headerContent={<Header/>}
                        bodyContent={<Body/>}
                    />
                </div>
        </DishContext.Provider>
);
}
