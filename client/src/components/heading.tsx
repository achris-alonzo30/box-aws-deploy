type HeaderProps = {
    name: string;
}

export const Heading = ({
    name
} : HeaderProps) => {
    return (
        <h1 className="capitalize text-2xl font-semibold">{name}</h1>
    )
}