import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Credentials } from '../../lib/auth/auth.handler.ts';
import { useAuth } from './auth.context.tsx';
import { APP_ROUTES } from '../../routes.ts';
import background_green from '../../assets/images/background_green.png';
import MeliveSvg from '../../components/melive.component.tsx';

export default function SignInPage() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '', rememberMe: false });

    const { login, loggedIn } = useAuth();

    const handleSubmit = () => {
        login(credentials);
    };

    const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, username: target.value });
    };
    const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, password: target.value });
    };
    const handleRememberMeChange = () => {
        setCredentials({ ...credentials, rememberMe: !credentials.rememberMe });
    };

    useEffect(() => {
        if (loggedIn) {
            navigate(APP_ROUTES.home);
        }
    }, []);

    return (
        <div
            className={'text-white h-screen flex-1 flex flex-col items-center gap-8 pt-32 p-4 bg-center'}
            style={{
                backgroundImage: `url(${background_green})`,
            }}
        >
            <div className={'flex flex-col'}>
                <MeliveSvg color={'#FBCE9E'} />
                <div className={'self-end font-extralight'}>By Mel&Olive</div>
            </div>

            <div className="z-10 rounded-xl bg-black/60 w-full flex flex-col p-4 gap-4 text-dark max-w-lg">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Nom d'utilisateur</span>
                    </div>

                    <input
                        value={credentials.username}
                        onInput={handleUsernameChange}
                        type="text"
                        placeholder="Saisissez votre nom d'utilisateur"
                        className="input input-sm w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Mot de passe</span>
                    </div>

                    <input
                        value={credentials.password}
                        onInput={handlePasswordChange}
                        type="password"
                        placeholder="Saisissez votre mot de passe"
                        className="input input-sm w-full"
                    />
                </label>

                <div className="flex">
                    <label className="label cursor-pointer flex gap-2">
                        <input
                            checked={credentials.rememberMe}
                            onChange={handleRememberMeChange}
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="label-text  text-white">Se souvenir de moi</span>
                    </label>
                </div>

                <div className="flex flex-col">
                    <button onClick={handleSubmit} className={'btn btn-primary'}>
                        Connexion
                    </button>

                    <div className="flex items-center justify-between">
                        <Link to={APP_ROUTES.auth.passwordForgotten} className={'btn btn-xs text-white btn-ghost'}>
                            Mot de passe oublié ?
                        </Link>

                        <Link to={APP_ROUTES.auth.signin} className={'btn btn-xs text-white btn-ghost'}>
                            Créer un compte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
