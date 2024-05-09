import {NavLink} from "react-router-dom";
import React from "react";

interface Props {
    isNavbarOpened: boolean,
    setIsNavbarOpened: React.Dispatch<React.SetStateAction<boolean>>,
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
            <NavLink key={i}
                     to={navItem.url}
                     className={({isActive, isPending}) => {
                         return "navbar-item " + (isActive ? "active" : isPending ? "pending" : "");
                     }}
            >
                <i className={navItem.icon}></i>
            </NavLink>
        ))}
    </nav>
}