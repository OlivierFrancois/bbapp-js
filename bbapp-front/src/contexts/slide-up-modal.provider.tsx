import React, { createContext, useContext, useEffect, useState } from 'react';

const AREA_HEIGHT = '80%';

type SlideUpModalContextT = {
    openModal: (content: React.ReactNode, modalClasses?: string) => void;
    closeModal: () => void;
};

type SlideUpModalProviderProps = {
    children: React.ReactNode;
};

const SlideUpModalContext = createContext<SlideUpModalContextT>({} as SlideUpModalContextT);

export const useSlideUpModal = () => useContext(SlideUpModalContext);

export const SlideUpModalProvider = ({ children }: SlideUpModalProviderProps) => {
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [show, setShow] = useState(false);
    const [size, setSize] = useState('');

    const modalRef = React.useRef<HTMLDivElement>(null);

    const openModal = (content: React.ReactNode, size: string = '') => {
        setContent(content);
        setShow(true);
        setSize(size);
    };

    const closeModal = () => {};

    useEffect(() => {
        if (show && modalRef.current) {
        }
    }, [show, modalRef.current]);

    return;
    /*
    return (
        <SlideUpModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            <div
                onClick={handleClose}
                className={`transition-[background] absolute z-10 h-full w-full ${displayCondition ? 'bg-black/50' : ''}`}
                style={{
                    bottom: show ? 0 : '-100%',
                }}
            ></div>

            <div
                className={`z-20 transition-all absolute flex flex-col bg-white w-full border shadow`}
                style={{
                    height: AREA_HEIGHT,
                    bottom: show ? 0 : `-${AREA_HEIGHT}`,
                }}
            >
                {displayCondition && (
                    <React.Fragment>
                        <HeaderSubcomponent handleClose={handleClose} headerContent={headerContent} />

                        <hr />

                        {bodyContent}
                    </React.Fragment>
                )}
            </div>
        </SlideUpModalContext.Provider>
    );*/
};
