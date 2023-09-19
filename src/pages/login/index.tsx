import Image from "next/image";
import img from "../../assets/login.svg"
import { Box, Button, TextInput } from "@ignite-ui/react";
import { ArrowRight, List, Lock, User, X } from "phosphor-react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/lib/axios";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { SidebarItem } from "@/components/SidebarItem";
import { useUserContext } from "@/context/UserContext";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [openMenu, setOpenMenu] = useState(false)

    const { setUserInfo } = useUserContext()
    const router = useRouter()

    async function handleLogin(ev: any) {
        ev.preventDefault()

        try {
            const res = await api.post('/login', {
                username: username,
                password: password,
            })
           
            if(res.status === 200) {
                setUserInfo({username})
            }
            await router.push('/home')
        } catch(err) {
            if(err instanceof AxiosError && err?.response?.data?.message) {
                setError(err.response.data.message)
                console.log(err.response.data)
                return
            }
            console.error(err)
        }
    }

    return (
        <div className="w-[100vw] h-[90vh] md:h-[100vh] flex flex-col items-center p-6 no-select">
            <div className={`h-full w-[70%] p-8 bg-[#202024] fixed right-0 top-0 md:hidden ${openMenu ? 'transition translate-x-0 duration-200' : 'transition translate-x-[100%] duration-200'}`}>
                <button onClick={() => {setOpenMenu(false)}} className="tap">
                    <X className="icon text-gray-100 text-2xl md:hover:text-violet-400 duration-200"/>
                </button>

                <div className="mt-8 flex flex-col gap-4">
                    <SidebarItem title="Criar uma conta" url="register/user-info"/>
                    <SidebarItem title="Download" url="download"/>
                </div>
            </div>

            <div className="w-full h-[80px] z-[-1] absolute top-0 border-b-[1px] border-[#323238]">
            </div>
            
            <div className="w-full text-gray-100 font-bold font-poppins text-2xl flex items-center justify-between">
                <div className="flex gap-8 items-center">
                <Link href='/' className="cursor-pointer hover:scale-110 hover:text-[#00B37E] duration-200">USParty</Link>
                    <div className="flex gap-8 max-md:hidden">
                        <Link className="hover:text-[#2fd898] hover:duration-200 font-normal text-base" href='/download'>Download</Link>
                    </div>
                </div>
                <div className="font-normal text-base flex items-center gap-8 max-md:hidden">
                    <Link className="hover:text-[#2fd898] hover:duration-200" href='/login'>Login</Link>
                    <Button size={"sm"} variant={"secondary"} onClick={() => {router.push('/register/user-info')}}>
                        <span className="font-poppins">Criar uma conta</span>
                    </Button>
                </div>
                <button className="md:hidden tap" onClick={() => {setOpenMenu(true)}}>
                    <List />
                </button>
            </div>
            <div className="max-w-[480px] mt-10">
                <div>
                    <div className="Img flex flex-col items-center pointer-events-none">
                        <Image src={img} height={200} quality={80} priority alt=""/>
                    </div>  

                    <h2 className="text-gray-100 text-4xl font-bold font-poppins leading-[140%] ">Login</h2>
                    <p className="text-[#A9A9B2] mb-6">Insira suas credenciais de acesso.</p>
                </div>

                <Box as='form' className="flex flex-col gap-4" onSubmit={handleLogin} >
                    <label className="flex flex-col gap-2">
                        <p className="text-sm text-gray-100 flex items-center gap-2">Nome de usuário <User /></p>
                        <TextInput prefix="usparty.netlify.app/" placeholder="seu-usuario" value={username} onChange={ev => setUsername(ev.target.value)}/>              
                    </label>
                    <label className="flex flex-col gap-2">
                        <p className="text-sm text-gray-100 flex items-center gap-2">Senha {<Lock />}</p>
                        <TextInput placeholder="••••••••" type="password" value={password} onChange={ev => setPassword(ev.target.value)}/>

                        {error && (
                        <p className="text-sm text-[#F75A68]">{error}</p>
                        )}  
                    </label>

                    <Button type="submit" size={"sm"}>
                        Conectar <ArrowRight />
                    </Button>
                </Box>

                <p className="mt-4 text-gray-100">
                    Não possui uma conta? <Link href={'/register/user-info'} className="font-bold text-[#00B37E] hover:text-[#2fd898] hover:duration-100">Cadastre-se</Link>!
                </p>
            </div>

            <Head>
                    <title>Faça login! | USParty</title>
            </Head>
        </div>
    )
}