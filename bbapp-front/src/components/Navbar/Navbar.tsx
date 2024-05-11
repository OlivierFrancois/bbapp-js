import {NavLink} from "react-router-dom";
import React from "react";
import {CalendarDaysIcon, HomeIcon, ShoppingCartIcon} from "@heroicons/react/16/solid";

interface Props {
    isNavbarOpened: boolean,
    setIsNavbarOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

const navbarItemClasses = 'size-10'

const NavbarItems = [
    {
        name: 'Accueil',
        url: '/',
        icon: <HomeIcon className={navbarItemClasses}/>,
    },
    {
        name: 'Planning repas',
        url: '/planning-repas',
        icon: <CalendarDaysIcon className={navbarItemClasses}/>,
    },
    {
        name: 'Courses',
        url: '/course',
        icon: <ShoppingCartIcon className={navbarItemClasses}/>,
    },
];

export default function Navbar({isNavbarOpened, setIsNavbarOpened}: Props) {
    const open = () => setIsNavbarOpened(true);
    const close = (delay: number) => {
        setTimeout(() => {
            setIsNavbarOpened(false);
        }, delay);
    }

    const handleClick = () => {
        open();
        close(2000);
    }

    return <nav className={`navbar-custom ${isNavbarOpened ? 'opened' : 'closed'}`}
                onClick={handleClick}
                onMouseEnter={open}
                onMouseOut={() => close(0)}
    >
        {NavbarItems.map((navItem, i) => (
            <NavLink key={i}
                     to={navItem.url}
                     className={({isActive, isPending}) => {
                         return "navbar-item " + (isActive ? "active" : (isPending ? "pending" : ""));
                     }}
            >
                <div className={'navbar-item-icon'}>
                    {navItem.icon}
                </div>
            </NavLink>
        ))}
    </nav>
}