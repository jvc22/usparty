import { Box, Button, TextInput } from "@ignite-ui/react";
import { ArrowRight, List, X } from "phosphor-react";
import img from '../assets/connect.svg';
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SidebarItem } from "@/components/SidebarItem";
import { useUserContext } from "@/context/UserContext";
import { parseCookies } from "nookies";

const claimUsernameFormSchema = z.object({
  username: z.string()
            .min(3, {message: 'O usuário deve conter pelo menos 3 letras.'})
            .max(20, {message: 'O usuário deve conter no máximo 20 letras.'})
            .regex(/^([a-z]+)$/i, {message: 'O usuário deve conter apenas letras.'})
            .transform(username => username.toLowerCase())
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export default function ClaimUsername() {
  const { userInfo, setUserInfo } = useUserContext()
  const router = useRouter()

  useEffect(() => {
      const cookies = parseCookies()
      const username = cookies["@uspparty"]

      if(username) {
          setUserInfo({username})
          router.replace('/home')
      }
    }, []);

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema)
  })

  const [openMenu, setOpenMenu] = useState(false)

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const {username} = data
    await router.push(`/register/user-info?username=${username}`)
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center p-8 relative">
          <div className={`h-full w-[70%] p-8 bg-[#202024] fixed right-0 top-0 md:hidden ${openMenu ? 'transition translate-x-0 duration-200' : 'transition translate-x-[100%] duration-200'}`}>
            <button onClick={() => {setOpenMenu(false)}}>
              <X className="text-gray-100 text-2xl focus:text-violet-400"/>
            </button>

            <div className="mt-8 flex flex-col gap-4">
              <SidebarItem title="Fazer login" url="login"/>
              <SidebarItem title="Criar uma conta" url="register/user-info"/>
            </div>
          </div>

          <div className="w-full h-[96px] z-[-1] absolute top-0 border-b-[1px] border-[#323238]">
          </div>
      
      <div className="w-full text-gray-100 font-bold font-poppins text-2xl flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href='/' className="cursor-pointer md:hover:scale-110 md:hover:text-[#00B37E] duration-200">USParty</Link>
          <div className="flex gap-8 max-md:hidden">
            <Link className="hover:text-[#2fd898] hover:duration-200 font-normal text-base" href=''>Sobre</Link>
            <Link className="hover:text-[#2fd898] hover:duration-200 font-normal text-base" href=''>Informações de contato</Link>
          </div>
        </div>
        <div className="font-normal text-base flex items-center gap-8 max-md:hidden">
          <Link className="hover:text-[#2fd898] hover:duration-200" href='/login'>Login</Link>
          <Button size={"sm"} variant={"secondary"} onClick={() => {router.push('/register/user-info')}}>
            <span className="font-poppins">Criar uma conta</span>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => {setOpenMenu(true)}}>
          <List />
        </button>
      </div>
      <div className="max-w-[480px] mt-20 max-md:mt-16">
        <div className="flex items-center justify-center">

          <div className="Img max-md:hidden flex flex-col items-center pointer-events-none">
            <Image src={img} width={300} quality={80} priority alt=""/>
          </div> 
          
        </div>
        <p className="text-[#A9A9B2] text-xl text-center md:mt-3">Encontre os principais eventos da USP Ribeirão!</p>

        <p className="text-gray-100 text-4xl font-poppins font-bold mt-8">Registre-se</p>

        <Box as='form' className="flex flex-col gap-2 max-md:gap-4 md:flex-row mt-5" onSubmit={handleSubmit(handleClaimUsername)}>
          <TextInput size='sm' prefix="usparty.com.br/" placeholder="seu-usuario" {...register('username')} className="lowercase"/>
          <Button size='sm' type="submit" disabled={isSubmitting}>
            Reservar
            <ArrowRight />
          </Button>
        </Box>

        <p className="mt-2 text-[#7C7C8A] text-sm">
          {errors.username ? <span className="text-[#F75A68]">{errors.username.message}</span> : 'Digite o nome de usuário desejado'}
        </p>

        <p className="mt-4 text-gray-100">
          Já possui uma conta? Faça <Link href={'/login'} className="font-bold text-[#00B37E] hover:text-[#2fd898] hover:duration-100">login</Link>!
        </p>
      </div>

      <Head>
        <title>Bem-vindo! | USParty</title>
      </Head>
    </div>
  )
}
