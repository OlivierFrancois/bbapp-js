import {useContext, useEffect, useState} from "react";
import {MealPlanContext} from "../../routes/MealPlanPage.tsx";
import dayjs from "dayjs";
import {MoonIcon, SunIcon} from "@heroicons/react/16/solid";
import {MealPlanAPI} from "../../api/MealPlanAPI.tsx";
import MealPlan from "../../interfaces/MealPlan.tsx";
import Cell from "./Cell.tsx";

const moments = ['midi', 'soir'];
const cellHeight = 'h-[5.5rem]';

export default function Planner() {
    const {date, selectedCell} = useContext(MealPlanContext);

    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);

    const dates = [];
    let currentDate = dayjs(date).startOf('week');
    while (currentDate.isBefore(dayjs(date).endOf('week')) || currentDate.isSame(dayjs(date).endOf('week'))) {
        dates.push(currentDate);
        currentDate = currentDate.add(1, 'day');
    }

    useEffect(() => {
        const payload = {
            startDate: dayjs(date).startOf('week').format('YYYY-MM-DD'),
            endDate: dayjs(date).endOf('week').format('YYYY-MM-DD')
        }

        MealPlanAPI.getPeriod(payload)
            .then(res => {
                setMealPlans(res);
            })
    }, [date, selectedCell]);

    return (
        <div className={'flex-1'}>
            <table className={'table border table-fixed table-sm [&_td]:px-2 [&_td]:py-1 [&_th]:py-0'}>
                <thead className={'bg-gray-100'}>
                    <tr className={'h-10'}>
                        <th className={'w-24'}></th>
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
                                        date={d.format('YYYY-MM-DD')}
                                        moment={moment}
                                        mealPlan={mealPlans.find(p => dayjs(p.date).format('YYYY-MM-DD') === d.format('YYYY-MM-DD') && p.moment === moment)}
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