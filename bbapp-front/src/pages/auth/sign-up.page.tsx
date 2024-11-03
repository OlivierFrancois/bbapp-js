import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import background_green from '../../assets/images/background_green.png';
import MeliveSvg from '../../components/melive.component.tsx';
import { APP_ROUTES } from '../../routes.ts';
import { SignUpPayload, UserAPI } from '../../lib/api/user.api.tsx';
import { toast } from 'react-toastify';
import { useAuth } from './auth.context.tsx';

export default function SignUpPage() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(false);

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

        const payload: SignUpPayload = {
            username,
            email,
            password,
        };

        UserAPI.signUp(payload).then(() => {
            toast.success('Compte créé avec succès. Bienvenue !');
            login({ username, password });
        });
    };

    useEffect(() => {
        if (username.length > 3) {
            UserAPI.checkUsernameAvailability(username).then((response) => setIsUsernameAvailable(response));
        }
    }, [username]);

    const isPasswordCorrect = useMemo(() => {
        return password === confirmPassword;
    }, [password, confirmPassword]);

    const isEmailValid = useMemo(() => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }, [email]);

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
                        value={username}
                        onInput={handleUsernameChange}
                        type="text"
                        placeholder="Saisissez votre nom d'utilisateur"
                        className="input input-sm w-full"
                    />

                    <div className={'mt-2 text-error text-sm flex flex-col'}>
                        {username.length > 0 && !isUsernameAvailable && <div>Le nom d'utilisateur est déjà pris.</div>}
                    </div>
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

                    <div className={'mt-2 text-error text-sm flex flex-col'}>
                        {email.length > 5 && !isEmailValid && <div>Veuillez saisir une adresse mail valide.</div>}
                    </div>
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
                    <div className={'mt-2 text-error text-sm flex flex-col'}>
                        {!isPasswordCorrect && <div>Les mots de passes sont différents !</div>}
                    </div>
                </label>

                <div className="flex flex-col gap-2">
                    {isUsernameAvailable && isPasswordCorrect && (
                        <button onClick={handleSubmit} className={'btn btn-primary'} disabled={!isUsernameAvailable || !isPasswordCorrect}>
                            Inscription
                        </button>
                    )}

                    <Link className={'text-lg text-white btn btn-ghost btn-sm'} to={APP_ROUTES.auth.login}>
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
