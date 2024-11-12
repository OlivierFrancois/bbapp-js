import { useContext } from 'react';
import { Dish } from '../../../types/Dish.tsx';
import { DishContext } from '../dish.context.tsx';
import dayjs from '../../../lib/dayjs.ts';
import { Link } from 'react-router-dom';

interface EditDishProps {
    dish: Dish;
}

export default function DishView({ dish }: EditDishProps) {
    const { articles, setEditMod, countUses } = useContext(DishContext);

    return (
        <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1 ">
                <div className="font-semibold">Informations générales</div>

                <div className="text-sm flex items-center gap-1">
                    <div className="">Plat créé le</div>
                    <div className={'font-medium'}>{dayjs(dish.createdAt).format('DD/MM/YYYY')}</div>
                </div>

                <div className="text-sm flex items-center gap-1">
                    <div className="">Plat utilisé</div>
                    <div className={'font-medium'}>{countUses}</div>
                    <div className="">fois</div>
                </div>
            </div>

            <hr />

            <div className="flex flex-col gap-2 ">
                <div className="flex justify-between items-center">
                    <h3 className={'font-semibold'}>Ingrédients</h3>
                </div>

                {(dish?.recipeItems?.length ?? 0) > 0 ? (
                    <table className={'table table-xs'}>
                        <thead>
                            <tr>
                                <th>Ingrédient</th>
                                <th>Quantité</th>
                                <th>Unité</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dish.recipeItems?.map((recipeItem, recipeItemKey) => {
                                return (
                                    recipeItem && (
                                        <tr key={recipeItemKey}>
                                            <td className={'first-letter:uppercase'}>
                                                {articles.find((article) => article.id === recipeItem?.articleId)?.name ?? 'unknown'}
                                            </td>

                                            <td>{recipeItem?.quantity}</td>

                                            <td>{recipeItem?.unit}</td>
                                        </tr>
                                    )
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <button className={'btn btn-outline btn-neutral btn-sm'} onClick={() => setEditMod(true)}>
                        Renseigner des ingrédients
                    </button>
                )}
            </div>

            <hr />

            {dish.url ? (
                <Link to={dish.url} target={'_blank'} className={'mt-2 btn btn-neutral btn-sm'}>
                    Consulter la recette
                </Link>
            ) : (
                <button className={'btn btn-outline btn-neutral btn-sm'} onClick={() => setEditMod(true)}>
                    Renseigner une recette
                </button>
            )}
        </div>
    );
}
