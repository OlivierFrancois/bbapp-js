import { useEffect, useState } from 'react';
import { Moment } from '../../../types/Moment.tsx';
import { DishScheduleItem } from '../../../types/DishScheduleItem.tsx';

interface MomentRowProps {
    moment: Moment;
    scheduleItem?: DishScheduleItem | undefined;
}

export default function MomentRow({ moment, scheduleItem }: MomentRowProps) {
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        setEditMode(false);
    }, [scheduleItem]);

    return (
        <div className={`transition-all rounded-xl p-0.5 flex items-stretch text-${moment.theme} gap-2 text-sm`}>
            <div className={'flex gap-2 items-center'} onClick={() => setEditMode(!editMode)}>
                <div className={`transition-transform ${editMode ? 'rotate-90' : ''}`}>{moment.icon}</div>
                <div className={'w-8'}>{moment.name}</div>
            </div>

            <div className={`bg-${moment.theme} rounded-l w-1`}></div>

            <div className={'flex-1 flex flex-wrap items-center gap-2 relative'}>
                {scheduleItem?.dishes.map((dish, dishKey) => (
                    <div key={dishKey} className={'relative'}>
                        <div
                            className={
                                'bg-dark text-white px-2 py-0.5 rounded-full font-light text-xs first-letter:uppercase whitespace-nowrap max-w-44 overflow-hidden text-ellipsis'
                            }
                            key={dishKey}
                        >
                            {dish.name}
                        </div>

                        {editMode && (
                            <button
                                className={
                                    'size-4 shadow bg-white text-error btn-circle absolute -top-1.5 -right-1.5 flex items-center justify-center'
                                }
                            >
                                <i className="fa fa-times text-xs"></i>
                            </button>
                        )}
                    </div>
                ))}

                <div
                    className={`absolute transition-all ${editMode ? 'right-0' : '-right-16'} bg-gray-200 text-dark px-2 py-0.5 rounded-full font-light text-xs first-letter:uppercase`}
                >
                    Ajouter
                </div>
            </div>
        </div>
    );
}
