export default function ScheduleHeader() {
    return (
        <div className={'h-[13rem] bg-center flex flex-col justify-end'} style={{ backgroundImage: `url('/public/background_blue.png')` }}>
            <div className={'text-white px-5 py-3 flex justify-between'}>
                <div>
                    <h3 className={'shadow'}>20 avril - 26 avril 2024</h3>
                    <h2 className={'font-semibold text-2xl shadow'}>Repas de la semaine</h2>
                </div>

                <div className={'flex items-center'}>
                    <button className="btn btn-square btn-xs btn-ghost text-2xl">
                        <i className="fa fa-caret-left"></i>
                    </button>

                    <button className="btn btn-square btn-xs btn-ghost text-2xl">
                        <i className="fa fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
