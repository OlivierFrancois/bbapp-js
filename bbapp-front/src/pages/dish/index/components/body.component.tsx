import { useContext, useState } from 'react';
import { DishIndexContext } from '../../dish.context.tsx';
import { useModalUp } from '../../../../contexts/modal-up.provider.tsx';
import DishModal from '../../dish.modal.tsx';
import dayjs from '../../../../lib/dayjs.ts';

const orderByName = { id: 'name', theadLabel: '', label: 'Par nom' };
const orderByCountUses = { id: 'countUses', theadLabel: 'Utilisations', label: 'Par utilisation' };
const orderByMostRecentUse = { id: 'mostRecentUse', theadLabel: 'Dernière utilisation', label: 'Par dernière utilisation' };
const orderByNextUpcomingUse = { id: 'nextUpcomingUse', theadLabel: 'Prochaine utilisation', label: 'Par prochaine utilisation' };

export default function DishIndexBody() {
    const { dishes, reloadDishes } = useContext(DishIndexContext);

    const [orderBy, setOrderBy] = useState<{ id: string; label: string; theadLabel: string }>({
        id: 'countUses',
        theadLabel: 'Utilisations',
        label: 'Par utilisation',
    });

    const { openSlideUpModal } = useModalUp();

    return (
        <div className={'py-4 px-5 flex flex-col gap-3'}>
            <div className="flex flex-wrap gap-2">
                {[orderByName, orderByCountUses, orderByMostRecentUse, orderByNextUpcomingUse].map((item) => (
                    <button onClick={() => setOrderBy(item)} className={'btn btn-xs btn-neutral'}>
                        {item.label}
                    </button>
                ))}
            </div>

            <table className={'table'}>
                <thead>
                    <tr>
                        <th className={'w-10'}>#</th>
                        <th>Nom</th>

                        {orderBy.theadLabel && <th className={'w-20'}>{orderBy.theadLabel}</th>}
                    </tr>
                </thead>

                <tbody>
                    {dishes
                        .sort((a, b) => {
                            if (a.countUses && b.countUses && orderBy.id === 'countUses') {
                                return a.countUses - b.countUses;
                            } else if (a.mostRecentUse && b.mostRecentUse && orderBy.id === 'mostRecentUse') {
                                const aMostRecentUse = dayjs(a.mostRecentUse);
                                const bMostRecentUse = dayjs(b.mostRecentUse);
                                return aMostRecentUse.isBefore(bMostRecentUse) ? -1 : 1;
                            } else if (a.nextUpcomingUse && b.nextUpcomingUse && orderBy.id === 'nextUpcomingUse') {
                                const aMostRecentUse = dayjs(a.mostRecentUse);
                                const bMostRecentUse = dayjs(b.mostRecentUse);
                                return aMostRecentUse.isBefore(bMostRecentUse) ? -1 : 1;
                            }
                            return a.name.localeCompare(b.name);
                        })
                        .map((dish, dishKey) => (
                            <tr onClick={() => openSlideUpModal(<DishModal givenDish={dish} onDishSave={reloadDishes} />)}>
                                <td>{dishKey + 1}</td>
                                <td className={'first-letter:uppercase'}>{dish.name}</td>

                                {orderBy.id === 'countUses' && <td>{dish.countUses}</td>}
                                {orderBy.id === 'mostRecentUse' && <td>{dayjs(dish.mostRecentUse).format('DD/MM/YYYY')}</td>}
                                {orderBy.id === 'nextUpcomingUse' && <td>{dayjs(dish.nextUpcomingUse).format('DD/MM/YYYY')}</td>}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
