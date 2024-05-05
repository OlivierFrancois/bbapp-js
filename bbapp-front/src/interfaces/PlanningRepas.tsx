import Plat from "./Plat.tsx";

export default interface PlanningRepas {
    id: number,
    createdAt: string,
    updatedAt: string,
    date: string,
    moment: string,
    plats: Plat[],
}