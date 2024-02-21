const AuthLayout = ({children}: {
    children : React.ReactNode}) => {
        return(
            <div className="flex justify-center items-center h-full w-full bg-slate-950">
                {children}
            </div>
        )
    }
export default AuthLayout;