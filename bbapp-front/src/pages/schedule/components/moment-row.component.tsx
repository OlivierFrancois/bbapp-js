import { useContext, useEffect, useMemo, useState } from 'react';
import { Moment } from '../../../types/Moment.tsx';
import { DishScheduleItem } from '../../../types/DishScheduleItem.tsx';
import { useModal } from '../../../contexts/modal.provider.tsx';
import AddDish from './modals/add-dish.modal.tsx';
import { DishScheduleAPI } from '../../../lib/api/DishScheduleAPI.tsx';
import { Dayjs } from 'dayjs';
import { AbstractItem, DishScheduleContext } from '../schedule.utils.tsx';
import RemoveDish from './modals/remove-dish.modal.tsx';
import { Dish } from '../../../types/Dish.tsx';
import { useModalUp } from '../../../contexts/modal-up.provider.tsx';
import DishEdit from '../../dish/edit/edit.modal.tsx';

interface MomentRowProps {
    moment: Moment;
    scheduleItem?: DishScheduleItem | undefined;
    date: Dayjs;
}

export default function MomentRow({ moment, scheduleItem, date }: MomentRowProps) {
    const { action, reloadSchedule, swapItems, setSwapItems, copyItems, setCopyItems } = useContext(DishScheduleContext);

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

    const { openSlideUpModal } = useModalUp();

    const handleAddDish = (dishId: number) => {
        DishScheduleAPI.add({ date: date.toISOString(), moment: moment.id, dishId }).then(() => {
            closeModal();
            reloadSchedule(date.format('YYYY-MM-DD'));
        });
    };

    const handleDishClick = (dish: Dish) => {
        if (removeMod) {
            openModal(
                <RemoveDish
                    key={`${date.format('YYYY-MM-DD')}_${moment.id}`}
                    date={date}
                    moment={moment}
                    dish={dish}
                    handleRemoveDish={handleRemoveDish}
                />
            );
        } else if (dish) {
            openSlideUpModal(<DishEdit givenDish={dish} onDishSave={() => reloadSchedule(date.format('YYYY-MM-DD'))} />);
            //window.open(dish.url, '_blank');
        }
    };
    const handleRemoveDish = (dishId: number) => {
        DishScheduleAPI.remove({ date: date.toISOString(), moment: moment.id, dishId }).then(() => {
            closeModal();
            reloadSchedule(date.format('YYYY-MM-DD'));
        });
    };

    const handleRowClick = () => {
        if (copyingMod) handleCopyClick();
        else if (swapingMod) handleSwapClick();
    };
    const handleSwapClick = () => {
        if (!swapingMod) return;

        const swapItem: AbstractItem = {
            date: date.toISOString(),
            moment: moment.id,
            dishScheduleItem: scheduleItem,
        };

        if (!swapItems.from) {
            setSwapItems({ ...swapItems, from: swapItem });
            return;
        }

        setSwapItems({ ...swapItems, to: swapItem });
        return;
    };
    const handleCopyClick = () => {
        if (!copyingMod) return;

        const copyItem: AbstractItem = {
            date: date.toISOString(),
            moment: moment.id,
            dishScheduleItem: scheduleItem,
        };

        if (!copyItems.from) {
            setCopyItems({ ...copyItems, from: copyItem });
            return;
        }
        setCopyItems({ ...copyItems, to: copyItem });
        return;
    };

    const isSwaping = useMemo(() => {
        return swapingMod && swapItems.from && swapItems.from.moment === moment.id && swapItems.from.date === date.toISOString();
    }, [swapItems]);
    const isCopying = useMemo(() => {
        return copyingMod && copyItems.from && copyItems.from.moment === moment.id && copyItems.from.date === date.toISOString();
    }, [copyItems]);

    return (
        <div
            className={`${(swapingMod || isCopying) && 'cursor-pointer'} ${(isSwaping || isCopying) && 'bg-info/20'} transition-colors relative rounded p-0.5 flex items-stretch text-${moment.theme} gap-2 text-sm`}
            onClick={handleRowClick}
        >
            {(isSwaping || isCopying) && (
                <>
                    <div className={'z-10 absolute top-0 right-0 h-full w-6 animate-pulse flex items-center justify-center'}>
                        {isCopying && <i className="fa fa-copy text-dark"></i>}
                        {isSwaping && <i className="fa fa-right-left text-dark"></i>}
                    </div>
                </>
            )}

            <div className={'flex gap-2 items-center'}>
                <div className={``}>{moment.icon}</div>
                <div className={'w-8'}>{moment.name}</div>
            </div>

            <div className={`bg-${moment.theme} rounded-l w-1`}></div>

            <div className={`transition-all flex-1 flex items-center gap-2 ${removeMod ? 'py-0.5' : ''} overflow-x-scroll no-scrollbar`}>
                {scheduleItem?.dishes.map((dish, dishKey) => (
                    <div key={dishKey} className={`relative ${removeMod && 'cursor-pointer'}`} onClick={() => handleDishClick(dish)}>
                        <div
                            className={`bg-dark text-white px-3 py-0 rounded-full font-light text-[.7rem] first-letter:uppercase whitespace-nowrap max-w-40 overflow-hidden text-ellipsis`}
                            key={dishKey}
                        >
                            {dish.name}
                        </div>

                        <button
                            className={`${removeMod ? '-top-0.5 -right-1 ' : '-top-5 -right-10'} transition-all absolute text-white size-3 text-[.7rem] flex items-center justify-center bg-error rounded-full`}
                        >
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                ))}

                <button
                    className={`${addingMod ? 'right-0' : '-right-32'} transition-all absolute  bg-gray-200 flex items-center gap-2 text-xs font-light rounded-full py-0.5 text-dark px-2`}
                    onClick={() =>
                        openSlideUpModal(
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
