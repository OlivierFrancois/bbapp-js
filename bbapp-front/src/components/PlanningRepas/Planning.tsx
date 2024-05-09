import {useContext, useEffect, useState} from "react";
import {PlanningRepasContext} from "../../routes/PlanningRepasPage.tsx";
import dayjs from "dayjs";
import {MoonIcon, SunIcon} from "@heroicons/react/16/solid";
import {PlanningRepasAPI} from "../../api/PlanningRepasAPI.tsx";
import PlanningRepas from "../../interfaces/PlanningRepas.tsx";
import Cell from "./Cell.tsx";

const moments = ['midi', 'soir'];

export default function Planning() {
    const {date} = useContext(PlanningRepasContext);

    const [planningRepas, setPlanningRepas] = useState<PlanningRepas[]>([]);

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

        PlanningRepasAPI.getPlanningWeek(payload)
            .then(res => {
                setPlanningRepas(res);
            })
    }, [date]);

    return (
        <div className={'flex-1'}>
            <table className={'table table-fixed table-sm h-full [&_td]:px-2 [&_td]:py-1'}>
                <thead className={'bg-gray-50'}>
                    <tr className={'h-16'}>
                        <th className={'w-24'}></th>
                        <th className={'text-primary'}>
                            <div className={'flex justify-center'}>
                                <SunIcon className={'size-10'}/>
                            </div>
                        </th>

                        <th className={'text-primary'}>
                            <div className={'flex justify-center'}>
                                <MoonIcon className={'size-10'}/>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {dates.map((d, k) => (
                        <tr className={'h-20'} key={k}>
                            <td>
                                <div className="flex flex-col text-xs">
                                    <div className={'font-bold capitalize'}>{d.format('dddd')}</div>
                                    <div>{d.format('DD/MM/YYYY')}</div>
                                </div>
                            </td>

                            {moments.map((moment, key) => (
                                <td key={key} className={'border-l h-20 !p-0'}>
                                    <Cell
                                        date={d.format('YYYY-MM-DD')}
                                        moment={moment}
                                        planningRepas={planningRepas.find(p => dayjs(p.date).format('YYYY-MM-DD') === d.format('YYYY-MM-DD') && p.moment === moment)}
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