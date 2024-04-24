import DateSelect from "../components/PlanningRepas/DateSelect.tsx";
import PlanningRepas from "../components/PlanningRepas/PlanningRepas.tsx";

export default function PlanningRepasPage() {
    return (
        <div className={'h-full flex flex-col'}>
            <DateSelect/>

            <PlanningRepas/>
        </div>
    );
}
