import background_blue from '../../../../assets/images/background_blue.png';

export default function DishIndexHeader() {
    return (
        <div className={'h-[13rem] bg-center flex flex-col justify-end'} style={{ backgroundImage: `url(${background_blue})` }}>
            <div className={'text-white px-5 py-3 flex flex-col'}>
                <div className={'flex items-center justify-between'}>
                    <h2 className={'font-semibold text-2xl hover:underline cursor-pointer'}>Liste de vos plats</h2>
                </div>
            </div>
        </div>
    );
}
