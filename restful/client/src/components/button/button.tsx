import { HTMLAttributes } from "react";

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}
export default function Button<IButtonProps>(props: IButtonProps) {
    return (
        <button
            {...props}
            className={`w-fit bg-button text-white h-[50px]  py-2  px-6  rounded-lg hover:bg-white hover:text-button border border-button transition duration-300 ${props.className}`}
        >
            {props.children}
        </button>
    )
}