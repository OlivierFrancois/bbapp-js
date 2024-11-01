import background_green from '../../../assets/images/background_green.png';
import { useAuth } from '../../auth.context.tsx';

export default function HomeHeader() {
    const { user } = useAuth();

    return (
        <div className={'h-[13rem] flex flex-col justify-end bg-[30%_20%]'} style={{ backgroundImage: `url(${background_green})` }}>
            <div className={'text-white px-5 py-3 flex flex-col'}>
                <h2 className={'text-2xl font-medium'}>
                    Bienvenue <span className={'font-semibold'}>{user?.username}</span> !
                </h2>
            </div>
        </div>
    );
}
