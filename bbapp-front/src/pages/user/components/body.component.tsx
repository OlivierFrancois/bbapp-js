import React, { useMemo, useState } from 'react';
import { UserAPI } from '../../../lib/api/user.api.tsx';
import { toast } from 'react-toastify';

export default function UserBody() {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const isPasswordCorrect = useMemo(() => {
        return newPassword === confirmPassword;
    }, [newPassword, confirmPassword]);

    const handleOldPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(target.value);
    };
    const handleNewPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(target.value);
    };
    const handleConfirmNewPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(target.value);
    };
    const handlePasswordSubmit = () => {
        if (confirmPassword !== newPassword) return;

        UserAPI.updatePassword({ newPassword, oldPassword })
            .then(() => {
                toast.success('Mot de passe mis à jour.');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch(() => toast.error("Le mot de passe n'a pas pu être mis à jour."));
    };

    return (
        <div className={'flex-1 py-4 px-5 flex flex-col gap-4'}>
            <div className={'mt-2 flex-1 flex flex-col gap-6'}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Mot de passe</span>
                    </div>

                    <input
                        onInput={handleOldPasswordChange}
                        value={oldPassword}
                        type="password"
                        placeholder="Type your password"
                        className="input input-sm input-bordered w-full"
                    />
                </label>

                <div className="flex flex-col gap-1">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Nouveau mot de passe</span>
                        </div>

                        <input
                            onInput={handleNewPasswordChange}
                            value={newPassword}
                            type="password"
                            placeholder="Type your password"
                            className="input input-sm input-bordered w-full"
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Confirmation du mot de passe</span>
                        </div>

                        <input
                            onInput={handleConfirmNewPasswordChange}
                            value={confirmPassword}
                            type="password"
                            placeholder="Type your password"
                            className="input input-sm input-bordered w-full"
                        />
                    </label>

                    {!isPasswordCorrect && newPassword.length > 3 && (
                        <div className={'text-error flex flex-col'}>
                            <div>Les mots de passes sont différents !</div>
                        </div>
                    )}
                </div>

                <button onClick={handlePasswordSubmit} disabled={!(isPasswordCorrect && newPassword.length > 3)} className={'btn btn-sm btn-primary'}>
                    Mettre à jour
                </button>
            </div>
        </div>
    );
}
