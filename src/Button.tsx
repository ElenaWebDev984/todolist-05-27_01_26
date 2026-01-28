type Props = {
    title: string
    onClick: () => void
    className?: string
    disabled?: boolean
}

export const Button = (props: Props) => {
    return (
        <button
            className={props.className}
            disabled={props.disabled}
            onClick={props.onClick}>{props.title}
        </button>
    )
}