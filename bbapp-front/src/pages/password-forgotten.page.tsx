import background_green from '../assets/images/background_green.png';
import MeliveSvg from '../components/melive.component.tsx';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../routes.ts';

export default function PasswordForgottenPage() {
    return (
        <div
            className={'text-white h-screen flex-1 flex flex-col items-center gap-24 pt-24 p-4 bg-center'}
            style={{
                backgroundImage: `url(${background_green})`,
            }}
        >
            <div className={'flex flex-col'}>
                <MeliveSvg color={'#FBCE9E'} />
                <div className={'self-end font-extralight'}>By Mel&Olive</div>
            </div>

            <div className="flex items-center justify-center flex-col">
                <div className="text-6xl text-white font-bold animate-bounce">CHEEEEH</div>
                <div className="text-sm text-white">(wip)</div>
            </div>

            <Link className={'mt-4 text-lg text-white'} to={APP_ROUTES.login}>
                Retour à l'accueil
            </Link>
        </div>
    );
}
