import { useContext, useEffect, useState } from 'react';
import { Moment } from '../../../types/Moment.tsx';
import { DishScheduleItem } from '../../../types/DishScheduleItem.tsx';
import { DishScheduleContext } from '../schedule.page.tsx';
import { useModal } from '../../../contexts/modal.provider.tsx';
import AddDish from './add-dish.modal.tsx';
import RemoveDish from './remove-dish.modal.tsx';
import { DishScheduleAPI } from '../../../lib/api/DishScheduleAPI.tsx';
import { Dayjs } from 'dayjs';

interface MomentRowProps {
    moment: Moment;
    scheduleItem?: DishScheduleItem | undefined;
    date: Dayjs;
}

export default function MomentRow({ moment, scheduleItem, date }: MomentRowProps) {
    const { action, reloadSchedule } = useContext(DishScheduleContext);

    const { openModal, closeModal } = useModal();

    const [addingMod, setAddingMod] = useState<boolean>(action?.id === 'add');
    const [removeMod, setRemoveMod] = useState<boolean>(action?.id === 'remove');
    const [swapingMod, setSwapingMod] = useState<boolean>(action?.id === 'swap');
    const [copyingMod, setCopyingMod] = useState<boolean>(action?.id === 'copy');

    useEffect(() => {
        setAddingMod(action?.id === 'add');
        setRemoveMod(action?.id === 'remove');
        setSwapingMod(action?.id === 'swap');
        setCopyingMod(action?.id === 'copy');
    }, [action]);

    const handleAddDish = (dishId: number) => {
        DishScheduleAPI.add({ date: date.toISOString(), moment: moment.id, dishId }).then(() => {
            closeModal();
            reloadSchedule(date.format('YYYY-MM-DD'));
        });
    };
    const handleRemoveDish = (dishId: number) => {
        DishScheduleAPI.remove({ date: date.toISOString(), moment: moment.id, dishId }).then(() => {
            closeModal();
            reloadSchedule(date.format('YYYY-MM-DD'));
        });
    };

    return (
        <div className={`relative rounded-xl p-0.5 flex items-stretch text-${moment.theme} gap-2 text-sm`}>
            <div className={'flex gap-2 items-center'}>
                <div className={`transition-transform ${addingMod && 'rotate-45'}`}>{moment.icon}</div>
                <div className={'w-8'}>{moment.name}</div>
            </div>

            <div className={`bg-${moment.theme} rounded-l w-1`}></div>

            <div className={`transition-all flex-1 flex items-center gap-2 ${removeMod ? 'py-0.5' : ''} overflow-x-scroll no-scrollbar`}>
                {scheduleItem?.dishes.map((dish, dishKey) => (
                    <div key={dishKey} className={'relative'}>
                        <div
                            className={`bg-dark text-white px-3 py-0 rounded-full font-light text-[.7rem] first-letter:uppercase whitespace-nowrap max-w-40 overflow-hidden text-ellipsis`}
                            key={dishKey}
                        >
                            {dish.name}
                        </div>

                        <button
                            className={`${removeMod ? '-top-0.5 -right-1 ' : '-top-5 -right-10'} transition-all absolute text-white size-3 text-[.7rem] flex items-center justify-center bg-error rounded-full`}
                            onClick={() =>
                                openModal(
                                    <RemoveDish
                                        key={`${date.format('YYYY-MM-DD')}_${moment.id}`}
                                        date={date}
                                        moment={moment}
                                        dish={dish}
                                        handleRemoveDish={handleRemoveDish}
                                    />
                                )
                            }
                        >
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                ))}

                <button
                    className={`${addingMod ? 'right-0' : '-right-32'} transition-all absolute  bg-gray-200 flex items-center gap-2 text-xs font-light rounded-full py-0.5 text-dark px-2`}
                    onClick={() =>
                        openModal(
                            <AddDish key={`${date.format('YYYY-MM-DD')}_${moment.id}`} date={date} moment={moment} handleAddDish={handleAddDish} />,
                            'overflow-visible'
                        )
                    }
                >
                    <i className="fa fa-plus"></i>
                    <div>Ajouter</div>
                </button>
            </div>
        </div>
    );
}