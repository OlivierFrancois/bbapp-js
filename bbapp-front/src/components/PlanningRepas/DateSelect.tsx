export default function DateSelect() {
    return (
        <div className={'bg-secondary h-12 text-secondary-content flex justify-between items-center p-1 text-2xl shadow'}>
            <div className="btn btn-neutral btn-sm">
                <i className="fa fa-arrow-left"></i>
            </div>

            <div className="btn btn-primary btn-sm">
                <i className="fa fa-calendar"></i> Cette semaine
            </div>

            <div className="btn btn-neutral btn-sm">
                <i className="fa fa-arrow-right"></i>
            </div>
        </div>
    )
}