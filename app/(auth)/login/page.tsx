import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function () {
    return (
        <div className="min-w-[400px] flex flex-col items-center justify-center h-fit p-5 bg-zinc-800/50 rounded-lg hover:bg-zinc-800/60">
            <p>Login</p>
            <form className="flex flex-col items-center justify-center w-full gap-5">
                <Input type="text" placeholder="Username" className="w-full h-10 bg-zinc-700/50 rounded-lg border-0 p-2" />
                <Input type="password" placeholder="Password" className="w-full h-10 bg-zinc-700/50 rounded-lg focus:border-1 border-0 p-2" />
                <Button type="submit" variant="secondary" className="ml-auto">Login</Button>  
            </form>
            <p>Don't have a account? <Link className="text-green-300" href={"register"}>register</Link> </p>
        </div>
    )
}