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
        <div className="w-[100vw] h-[90vh] md:h-[100vh] flex flex-col items-center p-8 no-select">
            <div className={`h-full w-[70%] p-8 bg-[#202024] fixed right-0 top-0 md:hidden ${openMenu ? 'transition translate-x-0 duration-200' : 'transition translate-x-[100%] duration-200'}`}>
                <button onClick={() => {setOpenMenu(false)}} className="tap">
                    <X className="icon text-gray-100 text-2xl md:hover:text-violet-400 duration-200"/>
                </button>

                <div className="mt-8 flex flex-col gap-4">
                    <SidebarItem title="Fazer login" url="login"/>
                    <SidebarItem title="Criar uma conta" url="register/user-info"/>
                </div>
            </div>

            <div className="w-full h-[96px] z-[-1] absolute top-0 border-b-[1px] border-[#323238]">
            </div>
            
            <div className="w-full text-gray-100 font-bold font-poppins text-2xl flex items-center justify-between">
                <div className="flex gap-8 items-center">
                <Link href='/' className="cursor-pointer md:hover:scale-110 md:hover:text-[#00B37E] duration-200">USParty</Link>
                    <div className="flex gap-8 max-md:hidden">
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
                <h2 className="text-gray-100 text-3xl mt-3 font-bold font-poppins leading-[120%] text-center">Tutorial de <span className="text-[#00B37E]">download</span></h2>
                
                <h2 className="text-[#00B37E] text-2xl mt-4 font-bold font-poppins leading-[140%]">iOS e Android</h2>
                <p className="mt-2 text-gray-200">
                    <p className="font-bold">1. Primeiro passo</p> 
                    Nas configurações de seu navegador, busque pelas opções "Instalar aplicativo", "Adicionar à tela de início" ou "Adicionar à tela inicial".
                </p>
                <p className="mt-2 text-gray-200">
                    <p className="font-bold">2. Segundo passo</p> 
                    Selecione a opção que aparece em seu dispositivo. Após o carregamento, procure pelo ícone em sua lista de aplicativos ou tela inicial.
                </p>

                <h2 className="text-[#00B37E] text-2xl mt-4 font-bold font-poppins leading-[140%]">Desktop</h2>
                <p className="mt-2 text-gray-200"> 
                    Na barra de endereços de seu navegador em seu computador, verifique a presença de um ícone "Instalar USParty". Em caso positivo, selecione a opção e aproveite o aplicativo.
                </p>
            </div>

            <Head>
                    <title>Downlaod | USParty</title>
            </Head>
        </div>
    )
}