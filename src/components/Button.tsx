interface ButtonProps {
    children?: React.ReactNode,
    className?: string,
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}


export default function Button({children, ...restProps}:ButtonProps ) {
    
    return  (
        <button {...restProps}>
            {children}
        </button>
    )
}