'use client'

import { HTMLAttributes, useState } from 'react'

interface InputController<T>
    extends HTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    initialValue: T extends string | number | readonly string[] ? T : never
    value: T
    setValue: (value: T) => void
}

export function Input<T>({
    _controller,
    placeholder,
    label,
    type,
    readonly,
    options,
    className,
    min
}: {
    _controller: InputController<T>
    placeholder: string
    label: string
    readonly?: boolean
    min?: number,
    className?: string
        type:
    | 'text'
    | 'number'
    | 'password'
    | 'search'
    | 'email'
    | 'textarea'
    | 'select'
    options?: { value: string | number; label: string }[]
}) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="w-full flex flex-col gap-2">
            {label.trim() !== '' && <label className='md:text-[15px] font-regular msm:text-[14px]  text-brand-lightblack  leading-loose'>{label}</label>}
            {type !== 'textarea' && type !== 'select' ? (
                <div className='relative w-full h-[50px]'>
                    <input
                        readOnly={readonly}
                        min={min}
                        type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                        className={`w-full border border-[#F0F4FD]  relative rounded-lg placeholder:text-brand-lightblack/40 placeholder:text-sm h-[50px]  px-5 focus:ring-button/10 focus:ring-2 duration-100 outline-none  ${readonly ? 'bg-neutral-100' : 'bg-white'} ${className}`}
                        placeholder={placeholder}
                        defaultValue={_controller.initialValue as string} // Adjusted type here
                        onChange={(e) =>
                            _controller.setValue(
                                type === 'number'
                                    ? (e.target.valueAsNumber as T)
                                    : (e.target.value.trim() as T),
                            )
                        }
                    />
                    {type == 'password' && <button

                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-4 top-[18px] text-sm text-brand-lightblack/30'>
                        {showPassword ?

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        }</button>}
                </div>
            ) : type === 'textarea' ? (
                <textarea
                    readOnly={readonly}
                    className="w-full border border-[#F0F4FD]  rounded-lg placeholder:text-brand-lightblack/40 placeholder:text-sm h-[50px]  px-5 min-h-[140px] outline-none py-3 resize-none focus:ring-button/10 focus:ring-2 duration-100"
                    placeholder={placeholder}
                    defaultValue={_controller.initialValue as string} // Adjusted type here
                    onChange={(e) => _controller.setValue(e.target.value as T)}
                />
            ) : (
                <select
                    className="w-full border border-[#F0F4FD]  rounded-lg placeholder:text-brand-lightblack/40 placeholder:text-sm h-[50px]  px-5 outline-none focus:ring-button/10 focus:ring-2 duration-100"
                    defaultValue={_controller.initialValue as string} // Adjusted type here
                    onChange={(e) => _controller.setValue(e.target.value as T)}
                >
                    {options &&
                        options.map((option, i) => (
                            <option key={option.value} value={option.value} selected={i === 0}>
                                {option.label}
                            </option>
                        ))}
                </select>
            )}
        </div>
    )
}
