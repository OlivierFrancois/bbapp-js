import background_green from '../../../assets/images/background_green.png';

export default function UserHeader() {
    return (
        <div className={'h-[13rem] flex flex-col justify-end bg-[30%_20%]'} style={{ backgroundImage: `url(${background_green})` }}>
            <div className={'text-white px-5 py-3 flex justify-between items-center'}>
                <h2 className={'text-xl font-medium'}>Modifier votre compte</h2>
            </div>
        </div>
    );
}
