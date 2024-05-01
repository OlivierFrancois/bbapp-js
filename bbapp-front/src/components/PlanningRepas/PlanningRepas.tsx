import {useContext} from "react";
import {PlanningRepasContext} from "../../routes/PlanningRepasPage.tsx";
import dayjs from "dayjs";
import {MoonIcon, SunIcon} from "@heroicons/react/16/solid";

export default function PlanningRepas() {
    const {date} = useContext(PlanningRepasContext);
    const dates = [];
    let currentDate = dayjs(date).startOf('week');
    while (currentDate.isBefore(dayjs(date).endOf('week')) || currentDate.isSame(dayjs(date).endOf('week'))) {
        currentDate = currentDate.add(1, 'day');
        dates.push(currentDate);
    }

    return (
        <div className={'flex-1'}>
            <table className={'table table-sm'}>
                <thead>
                    <tr>
                        <th className={'w-28'}></th>
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
                        <tr key={k}>
                            <td>
                                <div className="flex flex-col text-xs">
                                    <div className={'font-bold'}>{d.format('ddd')}</div>
                                    <div>{d.format('DD/MM/YYYY')}</div>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}