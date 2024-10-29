import { DishScheduleItem } from '../../types/DishScheduleItem.tsx';
import React, { createContext } from 'react';

export const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';

export type ScheduleAction = {
    id: string;
    icon: string;
    label: string;
};

export type AbstractItem = {
    date: string;
    moment: string;
    dishScheduleItem?: DishScheduleItem;
};

export const scheduleActions: ScheduleAction[] = [
    { id: 'remove', label: 'Supprimer', icon: 'fa fa-trash' },
    { id: 'add', label: 'Ajouter', icon: 'fa fa-plus' },
    { id: 'copy', label: 'Copier', icon: 'fa fa-copy' },
    { id: 'swap', label: 'Échanger', icon: 'fa fa-right-left' },
];

export type DishScheduleContextI = {
    dishScheduleItems: DishScheduleItem[];
    reloadSchedule: (date: string) => void;
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    action: ScheduleAction | null;
    setAction: React.Dispatch<React.SetStateAction<ScheduleAction | null>>;
    swapItems: { to: AbstractItem | null; from: AbstractItem | null };
    setSwapItems: React.Dispatch<React.SetStateAction<{ to: AbstractItem | null; from: AbstractItem | null }>>;
    copyItems: { to: AbstractItem | null; from: AbstractItem | null };
    setCopyItems: React.Dispatch<React.SetStateAction<{ to: AbstractItem | null; from: AbstractItem | null }>>;
};
export const DishScheduleContext = createContext<DishScheduleContextI>({} as DishScheduleContextI);
