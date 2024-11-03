import { useAuth } from '../../auth/auth.context.tsx';
import { useLoaderData } from 'react-router-dom';
import { User } from '../../../types/User.tsx';

type Props = {
    members: User[];
    mealCount: number;
    dishCount: number;
};

export default function HomeBody() {
    const { logout, home, user } = useAuth();

    const { members, mealCount, dishCount } = useLoaderData() as Props;

    return (
        <div className={'flex-1 py-4 px-5 flex flex-col gap-4'}>
            {!home && (
                <div className="bg-gray-100 rounded p-2 flex gap-4 items-center text-sm">
                    <i className="fa fa-warning fa-2x text-warning"></i>
                    Vous n'appartenez à aucun foyer. Contactez un administrateur.
                </div>
            )}

            {home && (
                <div className="flex-1 flex flex-col">
                    <div className={'flex flex-col gap-3'}>
                        <h3 className={'font-medium'}>
                            Informations sur le foyer <span className="font-bold">{home.name}</span>
                        </h3>

                        <div className="flex flex-col text-sm">
                            <div>
                                <span className={'font-bold'}>{mealCount}</span> repas ont été renseignés
                            </div>

                            <div>
                                <span className={'font-bold'}>{dishCount}</span> plats on été créés
                            </div>
                        </div>

                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th className={'w-5'}>#</th>
                                    <th>Membres</th>
                                </tr>
                            </thead>

                            <tbody>
                                {members
                                    .sort((a, b) => a.username.localeCompare(b.username))
                                    .map((member, key) => (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>
                                                {member.username} {member.id === user?.id && <span className={'font-bold'}>(vous)</span>}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <button onClick={logout} className={'btn btn-outline btn-error'}>
                Déconnexion
            </button>
        </div>
    );
}
