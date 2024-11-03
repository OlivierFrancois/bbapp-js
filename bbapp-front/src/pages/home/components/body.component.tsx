import { useAuth } from '../../auth/auth.context.tsx';

export default function HomeBody() {
    const { logout, home } = useAuth();

    return (
        <div className={'flex-1 py-4 px-5 flex flex-col gap-4'}>
            <div className={'flex-1'}>
                <h3 className="font-semibold text-xl">
                    Membres de <span className={'font-bold'}>{home?.name}</span>
                </h3>
            </div>

            <button onClick={logout} className={'btn btn-outline btn-error'}>
                Déconnexion
            </button>
        </div>
    );
}
