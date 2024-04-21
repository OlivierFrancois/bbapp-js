import React, {SetStateAction} from "react";

interface Props {
    isNavbarOpened: boolean,
}

const NavbarItems = [
    {
        name: 'Accueil',
        url: '/',
        icon: 'fa fa-home',
    },
    {
        name: 'Planning repas',
        url: '/planning-repas',
        icon: 'fa fa-calendar',
    }
];

export default function Navbar({isNavbarOpened}: Props) {
    return <nav className={`navbar ${isNavbarOpened ? 'opened' : 'closed'}`}>
        {NavbarItems.map((navItem, i) => (
            <a href={navItem.url} className={'navbar-item'}>
                <i className={navItem.icon}></i>
            </a>
        ))}
    </nav>
}