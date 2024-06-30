
export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" text-red-700 font-semibold p-1 text-sm">
            {children}
        </div>
    )
}
