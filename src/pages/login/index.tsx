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

            const test = await api.get('/test')
            console.log(test)
           
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
        <div className="w-[100vw] h-[90vh] md:h-[100vh] flex flex-col items-center p-8">
            <div className={`h-full w-[70%] p-8 bg-[#202024] fixed right-0 top-0 md:hidden ${openMenu ? 'transition translate-x-0 duration-200' : 'transition translate-x-[100%] duration-200'}`}>
                <button onClick={() => {setOpenMenu(false)}}>
                    <X className="icon text-gray-100 text-2xl md:hover:text-violet-400 duration-200"/>
                </button>

                <div className="mt-8 flex flex-col gap-4">
                    <SidebarItem title="Sobre" url=""/>
                    <SidebarItem title="Informações de contato" url=""/>
                    <SidebarItem title="Criar uma conta" url="register/user-info"/>
                </div>
            </div>

            <div className="w-full h-[96px] z-[-1] absolute top-0 border-b-[1px] border-[#323238]">
            </div>
            
            <div className="w-full text-gray-100 font-bold font-poppins text-2xl flex items-center justify-between">
                <div className="flex gap-8 items-center">
                    <Link href='/' className="cursor-pointer md:hover:scale-110 md:hover:text-violet-500 duration-200">USParty</Link>
                    <div className="flex gap-8 max-md:hidden">
                        <Link className="hover:text-violet-400 hover:duration-200 font-normal text-base" href=''>Sobre</Link>
                        <Link className="hover:text-violet-400 hover:duration-200 font-normal text-base" href=''>Informações de contato</Link>
                    </div>
                </div>
                <Link className="font-normal text-base max-md:hidden border-2 border-violet-500 rounded-md px-2 py-1 hover:bg-violet-500 text-violet-500 hover:text-white hover:duration-200" href='/register/user-info'>Criar uma conta</Link>
                <button className="md:hidden" onClick={() => {setOpenMenu(true)}}>
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
                        <TextInput prefix="usparty.com.br/" placeholder="seu-usuario" value={username} onChange={ev => setUsername(ev.target.value)}/>              
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
                    Não possui uma conta? <Link href={'/register/user-info'} className="font-bold text-violet-500 hover:text-violet-300 hover:duration-200">Cadastre-se</Link>!
                </p>
            </div>

            <Head>
                    <title>Faça login! | USParty</title>
            </Head>
        </div>
    )
}