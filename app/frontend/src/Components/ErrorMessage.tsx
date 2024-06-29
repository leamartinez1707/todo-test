
export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" bg-red-700 text-white font-bold uppercase text-center p-1 my-2 text-sm">
            {children}
        </div>
    )
}
