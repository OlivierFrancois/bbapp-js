import React, { useMemo, useState } from 'react';
import { UserAPI } from '../../../lib/api/user.api.tsx';
import { toast } from 'react-toastify';

export default function ChangePassword() {
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
        <div>
            <h3>Changement de mot de passe</h3>
            <div className={'mt-2 flex-1 flex flex-col gap-4'}>
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

                <div className="flex flex-col gap-2">
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
                            <span className="label-text">Confirmation</span>
                        </div>

                        <input
                            onInput={handleConfirmNewPasswordChange}
                            value={confirmPassword}
                            type="password"
                            placeholder="Type your password"
                            className="input input-sm input-bordered w-full"
                        />
                    </label>
                </div>

                {isPasswordCorrect && newPassword.length > 3 ? (
                    <button onClick={handlePasswordSubmit} className={'btn btn-sm btn-primary'}>
                        Valider
                    </button>
                ) : (
                    <div className={'text-error flex flex-col'}>
                        <div>Mot de passe incorrect.</div>
                    </div>
                )}
            </div>
        </div>
    );
}
