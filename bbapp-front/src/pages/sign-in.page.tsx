import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import background_green from '../assets/images/background_green.png';
import MeliveSvg from '../components/melive.component.tsx';
import { APP_ROUTES } from '../routes.ts';
import { SignInPayload, UserAPI } from '../lib/api/user.api.tsx';
import { toast } from 'react-toastify';
import { useAuth } from './auth.context.tsx';

export default function SignInPage() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const { login } = useAuth();

    const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(target.value);
    };
    const handleEmailchange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(target.value);
    };
    const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(target.value);
    };
    const handleConfirmPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(target.value);
    };

    const handleSubmit = () => {
        if (password !== confirmPassword) return;

        const payload: SignInPayload = {
            username,
            email,
            password,
        };

        UserAPI.signIn(payload).then(() => {
            toast.success('Compte créé avec succès. Bienvenue !');
            login({ username, password });
        });
    };

    useEffect(() => {
        // TODO : Check password confirm + avaibility username
    }, []);

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

            <div className="z-10 rounded-xl bg-black/60 w-full flex flex-col p-4 gap-4 text-dark">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Nom d'utilisateur</span>
                    </div>

                    <input
                        value={username}
                        onInput={handleUsernameChange}
                        type="text"
                        placeholder="Saisissez votre nom d'utilisateur"
                        className="input input-sm w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Adresse e-mail</span>
                    </div>

                    <input
                        value={email}
                        onInput={handleEmailchange}
                        type="email"
                        placeholder="Saisissez votre adresse e-mail"
                        className="input input-sm w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Mot de passe</span>
                    </div>

                    <input
                        value={password}
                        onInput={handlePasswordChange}
                        type="password"
                        placeholder="Saisissez votre mot de passe"
                        className="input input-sm w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Confirmer votre mot de passe</span>
                    </div>

                    <input
                        value={confirmPassword}
                        onInput={handleConfirmPasswordChange}
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        className="input input-sm w-full"
                    />
                </label>

                <button onClick={handleSubmit} className={'btn btn-primary'}>
                    Inscription
                </button>

                <Link className={'mt-4 text-lg text-white'} to={APP_ROUTES.login}>
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
