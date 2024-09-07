import React from "react";
import {NavLink} from "react-router-dom";

const navbarItemClasses = 'fa text-3xl md:text-xl'

const NavbarItems = [
    {
        name: 'Accueil',
        url: '/',
        icon: <i className={`fa-home ${navbarItemClasses}`}></i>,
    },
    {
        name: 'Planning repas',
        url: '/dish-schedule',
        icon: <i className={`fa-calendar ${navbarItemClasses}`}></i>,
    },
    {
        name: 'Plats',
        url: '/dish',
        icon: <i className={`fa-utensils ${navbarItemClasses}`}></i>,
    },
    {
        name: 'Courses',
        url: '/article',
        icon: <i className={`fa-cart-shopping ${navbarItemClasses}`}></i>,
    },
];

export default function NavbarComponent() {

    return <React.Fragment>
        <nav className={`navbar-custom navbar-custom-mobile`}>
            {NavbarItems.map((navItem, i) => (
                <NavLink key={`mobile-${i}`}
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

        <nav className={`navbar-custom navbar-custom-md`}>
            <div className={'mb-10 text-4xl font-medium text-center'}>Bbapp</div>

            {NavbarItems.map((navItem, i) => (
                <NavLink key={`md-${i}`}
                         to={navItem.url}
                         className={({isActive, isPending}) => {
                             return "navbar-item " + (isActive ? "active" : (isPending ? "pending" : ""));
                         }}
                >
                    <div className={'navbar-item-icon'}>
                        {navItem.icon}
                    </div>

                    <div className={'navbar-item-text'}>{navItem.name}</div>
                </NavLink>
            ))}
        </nav>
    </React.Fragment>
}