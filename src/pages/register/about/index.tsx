import { Box, Button, MultiStep, TextArea } from "@ignite-ui/react";
import Head from "next/head";
import { ArrowRight } from "phosphor-react";
import nookies from 'nookies'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const claimAboutFormSchema = z.object({
    about: z.string()
              .min(10, {message: 'A sua descrição deve conter pelo menos 10 caracteres.'})
              .max(44, {message: 'A sua descrição deve conter, no máximo, 44 caracteres.'})
})

type ClaimAboutFormData = z.infer<typeof claimAboutFormSchema>

export default function About() {
    const { setUserInfo } = useUserContext()
    const router = useRouter()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ClaimAboutFormData>({
        resolver: zodResolver(claimAboutFormSchema)
      })

      async function handleClaimAbout(data: ClaimAboutFormData, ev: any) {
        ev.preventDefault()
        const {about} = data

        const cookies = nookies.get()
        const userId = cookies['@uspparty:userId']
        
        try {
            const res = await api.post('/register/about', {
                about: about,
                userId,
            })

            if(res.status === 200) {
                setUserInfo(res.data.username)
                router.replace('/home')
            }
        } catch(err) {
            if(err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                return
            }
            console.error(err)
        }
      }

    return (
        <div className="max-w-[572px] mt-20 mx-auto mb-4 py-0 px-4 no-select">
            <div className="py-0 px-6">
                <h2 className="text-gray-100 text-[24px] font-bold leading-[180%]">Fale sobre você!</h2>
                <p className="text-[#A9A9B2] mb-6">Esta será a sua "bio". As informações inseridas ficarão visíveis para outros usuários!</p>
            
                <MultiStep size={2} currentStep={2}/>
            </div>

            <Box as='form' onSubmit={handleSubmit(handleClaimAbout)} className="mt-6 flex flex-col">
                <label className="flex flex-col gap-2">
                    <p className="text-sm text-gray-100">Preencha com algumas informações extras</p>
                    <TextArea className="mb-4" {...register('about')} placeholder="ex.: Liga sobre [...], Professor de [...], ... "/>             
                </label>

                <Button type="submit" disabled={isSubmitting}>
                    Finalizar
                    <ArrowRight />
                </Button>
            </Box>

            <p className="mt-2 text-[#7C7C8A] text-sm">
                {errors.about ? <span className="text-[#F75A68]">{errors.about.message}</span> : ''}
            </p>

            <Head>
                <title>Finalizar! | USParty</title>
            </Head>
        </div>
    )
}

