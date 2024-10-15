import React, { createContext, useContext, useEffect, useState } from 'react';

type ModalContextType = {
    openModal: (content: React.ReactNode, modalClasses?: string) => void;
    closeModal: () => void;
};

type ModalProviderProps = {
    children: React.ReactNode;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [show, setShow] = useState(false);
    const [size, setSize] = useState('');
    const modalRef = React.useRef<HTMLDialogElement>(null);

    const openModal = (content: React.ReactNode, size: string = '') => {
        if (modalRef.current) modalRef.current.showModal();
        setContent(content);
        setShow(true);
        setSize(size);
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
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <dialog ref={modalRef} className="modal">
                <div className={`modal-box ${size}`}>{content}</div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </ModalContext.Provider>
    );
};
