import React, { useState } from 'react';

interface Props {
    title: string,
    handleInput: () => void,
    handleCreate: () => void,
    handleAdd: () => void,
    items: {id: number, name: string}[]
}

export default function SearchOrCreate({title, handleInput, items, handleAdd, handleCreate}: Props) {
    const [input, setInput] = useState<string>('')

    return <div className={'absolute top-0 flex flex-col items-center left-0 z-20 bg-black/10 h-full w-screen'}>
        <div className={'flex flex-col rounded-xl border bg-white gap-2 w-80 p-3'}>
            <div className={'font-medium'}>{title}</div>

            <hr />

            <div className={'relative flex-1'}>
                <input type="text"
                       autoFocus
                       onInput={handleInput}
                       placeholder={'Recherchez un plat'}
                       value={input}
                       className="input input-sm w-full input-bordered " />

                {(items.length > 0 || input.length >= 3) &&
                    <div className={'absolute top-100 w-full border border-t-0 rounded'}>
                        {items.map((item, k) =>
                            <div key={k}
                                 className={'first-letter:uppercase text-sm py-3 px-2 border-t hover:bg-gray-50'}
                                 onClick={handleAdd}>{item.name}
                            </div>
                        )}

                        {(input.length >= 3) && !items.some(item => item.name.toLowerCase() === input.toLowerCase()) && (
                            <div onClick={handleCreate}
                                 className={'text-sm py-3 px-2 border-t hover:bg-gray-50 italic'}>
                                Créer "<span className={'first-letter:uppercase font-medium'}>{input}</span>"
                            </div>
                        )}
                    </div>
                }
            </div>

            <button onClick={handleAdd} className={'btn btn-primary btn-sm'}>Ajouter</button>
        </div>
    </div>
}