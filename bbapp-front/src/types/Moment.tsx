import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

export type Moment = {
    id: string;
    name: string;
    icon: React.ReactElement;
    theme: string;
};

const moments: Moment[] = [
    { id: 'midi', name: 'midi', theme: 'noon', icon: <SunIcon className={'size-4'} /> },
    { id: 'soir', name: 'soir', theme: 'evening', icon: <MoonIcon className={'size-4'} /> },
];

export default moments;
