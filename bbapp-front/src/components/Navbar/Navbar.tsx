import {NavLink} from "react-router-dom";

const navbarItemClasses = 'fa text-3xl'

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
        url: '/shop-list',
        icon: <i className={`fa-cart-shopping ${navbarItemClasses}`}></i>,
    },
];

export default function Navbar() {

    return <nav className={`navbar-custom opened`}>
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