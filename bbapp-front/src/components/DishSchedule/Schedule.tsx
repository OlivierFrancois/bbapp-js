import {useContext, useEffect, useState} from "react";
import {DishScheduleContext} from "../../routes/DishSchedulePage.tsx";
import dayjs from "dayjs";
import {MoonIcon, SunIcon} from "@heroicons/react/16/solid";
import {DishScheduleAPI} from "../../api/DishScheduleAPI.tsx";
import {DishScheduleItem} from "../../types/DishScheduleItem.tsx";
import Cell from "./Cell.tsx";

const moments = ['midi', 'soir'];
const cellHeight = 'h-[5.5rem]';

export default function Schedule() {
    const {date, selectedCell, swapMod, setSwapMod, swapItem1, swapItem2, setSwapItem1, setSwapItem2} = useContext(DishScheduleContext);

    const [dishScheduleItems, setDishScheduleItems] = useState<DishScheduleItem[]>([]);

    useEffect(() => {
        const payload = {
            startDate: dayjs(date).startOf('week').format('YYYY-MM-DD'),
            endDate: dayjs(date).endOf('week').format('YYYY-MM-DD')
        }

        DishScheduleAPI.getPeriod(payload)
            .then(res => {
                setDishScheduleItems(res);
            })
    }, [date, selectedCell]);

    useEffect(() => {
        const payload = {
            startDate: dayjs(date).startOf('week').format('YYYY-MM-DD'),
            endDate: dayjs(date).endOf('week').format('YYYY-MM-DD')
        }

        if (swapItem1 && swapItem2) {
            const payload1 = {
                date: new Date(swapItem2.date).toISOString(),
                moment: swapItem2.moment,
                dishIds: swapItem1.dishScheduleItem?.dishes.map((dish) => dish.id) ?? [],
            };
            const payload2 = {
                date: new Date(swapItem1.date).toISOString(),
                moment: swapItem1.moment,
                dishIds: swapItem2.dishScheduleItem?.dishes.map((dish) => dish.id) ?? [],
            }

            DishScheduleAPI.save(payload1)
                .then(() => {
                    DishScheduleAPI.save(payload2)
                        .then(() => {
                            DishScheduleAPI.getPeriod(payload)
                                .then(res => {
                                    setSwapMod(false);
                                    setDishScheduleItems(res);
                                })
                        })
                });
        }

        setSwapItem1(null);
        setSwapItem2(null);
    }, [swapItem2]);

    const handleSwapMod = () => {
        setSwapMod(!swapMod);
    }

    const dates = [];
    let currentDate = dayjs(date).startOf('week');
    while (currentDate.isBefore(dayjs(date).endOf('week')) || currentDate.isSame(dayjs(date).endOf('week'))) {
        dates.push(currentDate);
        currentDate = currentDate.add(1, 'day');
    }

    return (
        <div className={'flex-1'}>
            <table className={'table border table-fixed table-sm [&_td]:px-2 [&_td]:py-1 [&_th]:py-0'}>
                <thead className={'bg-gray-100'}>
                    <tr className={'h-10'}>
                        <th className={'w-24'}>
                            <div className={'flex items-center justify-center'}>
                                <button onClick={handleSwapMod} className={`btn btn-sm ${swapMod ? 'btn-active' : ''}`}>
                                    <i className="fa-solid fa-right-left text-xl"></i>
                                </button>
                            </div>
                        </th>

                        <th className={'text-primary'}>
                        <div className={'flex justify-center'}>
                                <SunIcon className={'size-8'}/>
                            </div>
                        </th>

                        <th className={'text-primary'}>
                            <div className={'flex justify-center'}>
                                <MoonIcon className={'size-8'}/>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {dates.map((d, k) => (
                        <tr className={cellHeight} key={k}>
                            <td className={cellHeight}>
                                <div className="h-full flex flex-col justify-start text-xs">
                                    <div className={'font-bold capitalize'}>{d.format('dddd')}</div>
                                    <div>{d.format('DD/MM/YYYY')}</div>
                                </div>
                            </td>

                            {moments.map((moment, key) => (
                                <td key={key} className={`border-l !p-0 ${cellHeight}`}>
                                    <Cell
                                        key={d.format('YYYY-MM-DD') + key}
                                        date={d.format('YYYY-MM-DD')}
                                        moment={moment}
                                        dishScheduleItem={dishScheduleItems.find(p => dayjs(p.date).format('YYYY-MM-DD') === d.format('YYYY-MM-DD') && p.moment === moment)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}