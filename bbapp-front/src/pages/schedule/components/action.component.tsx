import { useContext, useState } from 'react';
import { DishScheduleContext, ScheduleAction, scheduleActions } from '../schedule.utils.tsx';

export default function ScheduleActionBar() {
    const { action, setAction } = useContext(DishScheduleContext);
    const [open, setOpen] = useState<boolean>(false);

    const handleActionChange = (newAction: ScheduleAction | null) => {
        setAction(newAction);
        setOpen(false);
    };

    const handleOpen = () => {
        setAction(null);
        setOpen(!open);
    };

    return (
        <div className={`${open && 'w-full'} right-0 fixed bottom-4 px-5 flex justify-end`}>
            <div
                className={`overflow-hidden transition-all rounded-full bg-dark px-4 p-1 flex gap-5 h-12 items-center justify-center max-w-full ${open ? ' w-full' : !action ? 'w-16' : 'w-28'}`}
            >
                {open && (
                    <div className={'flex-1 flex items-center px-5 gap-4'}>
                        {scheduleActions.map((action, key) => (
                            <button
                                onClick={() => handleActionChange(action)}
                                key={key}
                                className={'btn btn-sm btn-circle btn-accent text-xl tooltip'}
                                data-tip={action.label}
                            >
                                <i className={action.icon}></i>
                            </button>
                        ))}
                    </div>
                )}

                {!open && action && (
                    <button className={'btn btn-sm btn-circle btn-accent text-xl'}>
                        <i className={action.icon}></i>
                    </button>
                )}

                <button onClick={handleOpen} className={`${open ? 'rotate-90' : ''} btn btn-ghost p-0 text-3xl text-primary`}>
                    <i className={`fa fa-fw ${open ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
        </div>
    );
}
