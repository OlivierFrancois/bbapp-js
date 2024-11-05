import React, { createContext, useContext, useEffect, useState } from 'react';

type ModalUpContextType = {
    openSlideUpModal: (content: React.ReactNode, modalClasses?: string) => void;
    closeModal: () => void;
};

type ModalUpProviderProps = {
    children: React.ReactNode;
};

const ModalUpContext = createContext<ModalUpContextType>({} as ModalUpContextType);

export const useModalUp = () => useContext(ModalUpContext);

export const ModalUpProvider = ({ children }: ModalUpProviderProps) => {
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [show, setShow] = useState(false);
    const modalRef = React.useRef<HTMLDialogElement>(null);

    const openModal = (content: React.ReactNode) => {
        if (modalRef.current) modalRef.current.showModal();
        setContent(content);
        setShow(true);
    };

    const closeModal = () => {
        modalRef?.current?.close();
    };

    useEffect(() => {
        if (show && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [show, modalRef.current]);

    return (
        <ModalUpContext.Provider value={{ openSlideUpModal: openModal, closeModal }}>
            {children}
            <dialog ref={modalRef} className="modal modal-bottom">
                <div className={`modal-box h-5/6`}>{content}</div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </ModalUpContext.Provider>
    );
};
