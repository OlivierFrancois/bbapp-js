import MeliveSvg from '../../components/melive.component.tsx';

export default function HomePage() {
    return (
        <>
            <div
                className={'absolute h-screen w-screen top-0 left-0 bg-center -z-10'}
                style={{
                    backgroundImage: `url('/public/background_green.png')`,
                }}
            ></div>

            <div className={'text-white h-screen flex-1 flex items-center justify-center'}>
                <div className={'flex flex-col animate-bounce'}>
                    <MeliveSvg />
                    <div className={'self-end font-extralight'}>By Mel&Olive</div>
                </div>
            </div>
        </>
    );
}
