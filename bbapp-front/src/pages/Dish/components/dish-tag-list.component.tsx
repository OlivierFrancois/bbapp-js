import {useContext} from "react";
import {DishContext} from "../dish.page.tsx";
import {DishTag} from "../../../types/DishTag.tsx";

export default function DishTagList() {
    const {setSelectedTag, dishTags} = useContext(DishContext);

    const handleTagCreate = () => {
        const category: DishTag = {id: 0, name: '', sortOrder: 0};
        setSelectedTag(category);
    }
    return <div className={'px-2 flex flex-col gap-2'}>
        <div className={'flex justify-between'}>
            <h2 className={'font-bold text-base text-neutral'}>Tags</h2>

            <button onClick={handleTagCreate} className={'btn btn-square btn-primary btn-sm btn-ghost'}>
                <i className={'fa fa-plus text-lg'}></i>
            </button>
        </div>

        <div className={'flex gap-x-3 gap-y-2 flex-wrap justify-stretch'}>
            {dishTags
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((dishTag, key) => (
                    <div key={`${key}_${dishTag.id}`}
                         className={'flex gap-2 items-center border rounded-full px-3'}
                         style={{borderColor: dishTag.color}}
                         onClick={() => setSelectedTag(dishTag)}
                    >
                        <i className={'fa fa-circle text-xs'} style={{color: dishTag.color}}></i>

                        <div className={'first-letter:uppercase '}>{dishTag.name}</div>
                    </div>
                ))
            }
        </div>
    </div>
}