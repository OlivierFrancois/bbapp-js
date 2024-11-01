import { useAuth } from '../../auth.context.tsx';
import { useModal } from '../../../contexts/modal.provider.tsx';
import ChangePassword from './change-password.component.tsx';

export default function HomeBody() {
    const { logout } = useAuth();

    const { openModal } = useModal();

    return (
        <div className={'flex-1 py-4 px-5 flex flex-col gap-4'}>
            <div className="flex justify-end gap-4">
                <button onClick={() => openModal(<ChangePassword />)} className={'btn btn-neutral btn-outline btn-xs'}>
                    Votre compte
                </button>
            </div>

            <div className={'flex-1'}>
                <h3 className="font-semibold text-xl">Membre de votre foyer</h3>
            </div>

            <button onClick={logout} className={'btn btn-outline btn-error'}>
                Déconnexion
            </button>
        </div>
    );
}
