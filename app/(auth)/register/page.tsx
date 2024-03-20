"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner"
import {z} from "zod";
import axios from "axios";

const inputSchema = z.object({
    userName: z.string().min(3 , {message: "UserName must be atlist 3 charecter"}),
    email: z.string().email(),
    password: z.string().min(4 , {message: "Password must be at list 4 charecter long"})
});

export default function () {
    const [data , setData] = useState({
        userName: "",
        email: "",
        password: ""
    })
    const [loading , setLoading] = useState(false);

    // Handle Subbmit
    const onSubbmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const temp = inputSchema.safeParse(data);
        
        // if(!temp.success) {
        //     toast(temp.error.errors[0].message);
        //     return;
        // }

        try {
            setLoading(true);
            const response = await axios.post("api/auth/register" , {...data});
            console.log(response);
            

        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false);
        }
        
    }

    // change input
    const inputHandler = (e:any) => {
        setData({...data , [e.target.name] : e.target.value})
    }
    return (
        <div className="max-w-[400px] w-full flex flex-col items-center justify-center gap-8 h-fit p-5 bg-zinc-800/50 rounded-lg hover:bg-zinc-800/60">
            <p className="text-3xl">Register</p>
            <form onSubmit={onSubbmit} className="flex flex-col items-center justify-center w-full gap-5">
                <Input onChange={inputHandler} type="text" name="userName" placeholder="Username" className="w-full h-10 bg-zinc-700/50 rounded-lg border-0 p-2" />
                <Input onChange={inputHandler} type="email" name="email" placeholder="Email" className="w-full h-10 bg-zinc-700/50 rounded-lg border-0 p-2" />
                <Input onChange={inputHandler} type="password" name="password" placeholder="Password" className="w-full h-10 bg-zinc-700/50 rounded-lg focus:border-1 border-0 p-2" />
                <Button disabled={loading} type="submit" variant="secondary" className="ml-auto disabled:cursor-not-allowed">
                    {loading ? <Loader className="animate-spin" /> : "Register"}
                    </Button>  
            </form>
            <p>Already have a account? <Link className="text-green-300" href={"login"}>login</Link> </p>
        </div>
    )
}