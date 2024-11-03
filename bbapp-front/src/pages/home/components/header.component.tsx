import background_green from '../../../assets/images/background_green.png';
import { useAuth } from '../../auth/auth.context.tsx';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../routes.ts';

export default function HomeHeader() {
    const { user } = useAuth();

    return (
        <div className={'h-[13rem] flex flex-col justify-end bg-[30%_20%]'} style={{ backgroundImage: `url(${background_green})` }}>
            <div className={'text-white px-5 py-3 flex justify-between items-center'}>
                <h2 className={'text-xl font-medium'}>
                    Bienvenue <span className={'font-semibold'}>{user?.username}</span> !
                </h2>

                <Link to={APP_ROUTES.user.edit} className={'btn btn-neutral btn-xs'}>
                    <i className="fa fa-gear"></i>
                    Compte
                </Link>
            </div>
        </div>
    );
}
