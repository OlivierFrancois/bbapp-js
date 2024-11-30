import { useContext, useState } from 'react';
import { DishIndexContext } from '../../dish.context.tsx';
import { useModalUp } from '../../../../contexts/modal-up.provider.tsx';
import DishModal from '../../dish.modal.tsx';
import dayjs from '../../../../lib/dayjs.ts';
import { Dish } from '../../../../types/Dish.tsx';

type OrderByT = {
    id: string;
    theadLabel: string;
    label: string;
};

const orderByAll: OrderByT[] = [
    { id: 'name', theadLabel: '', label: 'Par nom' },
    { id: 'countUses', theadLabel: 'Utilisations', label: 'Par utilisation' },
    { id: 'mostRecentUse', theadLabel: 'Dernière utilisation', label: 'Par dernière utilisation' },
    { id: 'nextUpcomingUse', theadLabel: 'Prochaine utilisation', label: 'Par prochaine utilisation' },
];

export default function DishIndexBody() {
    const { dishes, reloadDishes } = useContext(DishIndexContext);

    const [orderBy, setOrderBy] = useState<OrderByT>(orderByAll.find(() => true) as OrderByT);

    const { openSlideUpModal } = useModalUp();

    const sortDishes = (a: Dish, b: Dish) => {
        if (a.countUses !== undefined && b.countUses !== undefined && orderBy.id === 'countUses') {
            return a.countUses > b.countUses ? -1 : 1;
        } else if (orderBy.id === 'mostRecentUse') {
            const aMostRecentUse = dayjs(a.mostRecentUse ? a.mostRecentUse : '1970-01-01');
            const bMostRecentUse = dayjs(b.mostRecentUse ? b.mostRecentUse : '1970-01-01');

            if (aMostRecentUse.isSame(bMostRecentUse)) {
                return a.name.localeCompare(b.name);
            }
            return aMostRecentUse.isBefore(bMostRecentUse) ? 1 : -1;
        } else if (orderBy.id === 'nextUpcomingUse') {
            const aNextUpcomingUse = dayjs(a.nextUpcomingUse ? a.nextUpcomingUse : '2099-12-31');
            const bNextUpcomingUse = dayjs(b.nextUpcomingUse ? b.nextUpcomingUse : '2099-12-31');

            if (aNextUpcomingUse.isSame(bNextUpcomingUse)) {
                return a.name.localeCompare(b.name);
            }

            return aNextUpcomingUse.isBefore(bNextUpcomingUse) ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
    };

    const handleDishClick = (dish: Dish) => {
        openSlideUpModal(<DishModal key={dish.id} givenDish={dish} onDishSave={reloadDishes} />);
    };

    return (
        <div className={'py-4 px-5 flex flex-col gap-3'}>
            <div className="flex flex-wrap gap-2">
                {orderByAll.map((item) => (
                    <button onClick={() => setOrderBy(item)} className={`btn btn-xs btn-neutral ${item.id === orderBy.id ? '' : 'btn-outline'}`}>
                        {item.label}
                    </button>
                ))}
            </div>

            <table className={'table table-sm'}>
                <thead>
                    <tr>
                        <th className={'w-10'}>#</th>
                        <th>Nom</th>

                        {orderBy.theadLabel && <th className={'w-20'}>{orderBy.theadLabel}</th>}
                    </tr>
                </thead>

                <tbody>
                    {dishes
                        .sort((a, b) => sortDishes(a, b))
                        .map((dish, dishKey) => (
                            <tr key={dishKey} onClick={() => handleDishClick(dish)}>
                                <td>{dishKey + 1}</td>

                                <td className={'first-letter:uppercase max-w-20 whitespace-nowrap overflow-hidden text-ellipsis'}>{dish.name}</td>

                                {orderBy.id === 'countUses' && <td>{dish.countUses}</td>}

                                {orderBy.id === 'mostRecentUse' && (
                                    <td>{dish.mostRecentUse ? dayjs(dish.mostRecentUse).format('DD/MM/YYYY') : '/'}</td>
                                )}

                                {orderBy.id === 'nextUpcomingUse' && (
                                    <td>{dish.nextUpcomingUse ? dayjs(dish.nextUpcomingUse).format('DD/MM/YYYY') : '/'}</td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
