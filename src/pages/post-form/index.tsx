import { useUserContext } from "@/context/UserContext";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextArea, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus } from "phosphor-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const postFormSchema = z.object({
    title: z.string()
              .min(5, {message: 'O título deve conter pelo menos 5 caracteres.'})
              .max(33, {message: 'O título deve conter no máximo 33 caracteres.'}),
    description: z.string()
              .min(10, {message: 'A descrição deve conter pelo menos 10 caracteres.'})
              .max(160, {message: 'A descrição deve conter no máximo 160 caracteres.'}),
    place: z.string()
              .min(5, {message: 'A localidade deve conter pelo menos 5 caracteres'})
              .max(64, {message: 'A localidade deve conter no máximo 64 caracteres.'}),
    day: z.string()
              .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, {message: 'Dia inválido'}),
    month: z.string()
              .regex(/^(0?[1-9]|1[0-2])$/, {message: 'Mês inválido'}),
    year: z.string()
              .regex(/^(19|20)\d{2}$/, {message: 'Ano inválido'}),
    s_hour: z.string()
              .regex(/^([01]?[0-9]|2[0-3])$/, {message: 'Hora de início inválida'}),
    s_minute: z.string()
              .regex(/^([0-5]?[0-9])$/, {message: 'Minuto de início inválido'}),
    e_hour: z.string()
              .regex(/^([01]?[0-9]|2[0-3])$/, {message: 'Hora de término inválida'}),
    e_minute: z.string()
              .regex(/^([0-5]?[0-9])$/, {message: 'Minuto de término inválido'}),
    link: z.string()
              .refine(value => {
                if(value === '') {
                    return true
                }
                  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
                  return urlPattern.test(value);
              }, {message: 'O link inserido não é válido.'})
              .default('')
})

type PostFormData = z.infer<typeof postFormSchema>

export default function PostForm() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<PostFormData>({
        resolver: zodResolver(postFormSchema)
    })

    const router = useRouter()
    const {userInfo} = useUserContext()

    const [value, setValue] = useState("");
    const nextInputRef = useRef();

    async function handlePost(data: PostFormData, ev: any) {
        ev.preventDefault()

        try {
            const res = await api.post('/post-form', {
                author: userInfo.username,
                title: data.title,
                description: data.description,
                place: data.place,
                day: data.day,
                month: data.month,
                year: data.year,
                s_hour: data.s_hour,
                s_minute: data.s_minute,
                e_hour: data.e_hour,
                e_minute: data.e_minute,
                link: data.link
            })

            if(res.status === 201) {
                router.push('/home')
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
        <div className="md:max-w-[500px] w-[100vw] mx-auto p-8 flex flex-col justify-center">
            <div>
                <p className="text-2xl text-center text-gray-100 font-bold md:hover:scale-110 md:hover:text-[#00B37E] duration-20 font-poppins">USParty</p>
            </div>

            <div className="mt-4 w-full">
                <Box as='form' onSubmit={handleSubmit(handlePost)} className="mt-3 flex flex-col gap-4">
                    <label className="flex flex-col gap-2">
                        <p className="text-sm text-gray-100">Título do evento</p>
                        <TextInput {...register('title')} placeholder="Palestra: Biofísica..."/>
                        {errors.title && (
                            <p className="text-sm text-[#F75A68]">{errors.title.message}</p>
                        )}
                    </label>
                    <label className="flex flex-col gap-2">
                        <p className="text-sm text-gray-100">Descrição do evento</p>
                        <TextArea {...register('description')}/>
                        {errors.description && (
                            <p className="text-sm text-[#F75A68]">{errors.description.message}</p>
                        )}
                    </label>
                    <label className="flex flex-col gap-2">
                        <p className="text-sm text-gray-100">Local</p>
                        <TextInput {...register('place')} placeholder="FFCLRP – Bloco da Física, Sala 25"/>
                        {errors.place && (
                            <p className="text-sm text-[#F75A68]">{errors.place.message}</p>
                        )}
                    </label>
                    <div className="flex gap-2">
                        <label className="flex flex-col gap-2 w-1/3">
                            <p className="text-sm text-gray-100">Dia</p>
                            <TextInput placeholder="22" {...register('day')} maxLength={2}/>
                            {errors.day && (
                                <p className="text-sm text-[#F75A68]">{errors.day.message}</p>
                            )}
                        </label>
                        <label className="flex flex-col gap-2 w-1/3">
                            <p className="text-sm text-gray-100">Mês</p>
                            <TextInput id="month" placeholder="10" {...register('month')} maxLength={2}/>
                            {errors.month && (
                                <p className="text-sm text-[#F75A68]">{errors.month.message}</p>
                            )}
                        </label>
                        <label className="flex flex-col gap-2">
                            <p className="text-sm text-gray-100">Ano</p>
                            <TextInput id="year" placeholder="2023" {...register('year')} maxLength={4}/>
                            {errors.year && (
                                <p className="text-sm text-[#F75A68]">{errors.year.message}</p>
                            )}
                        </label>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-100 text-sm font-bold">Início</span>
                            <div className="flex gap-2">
                                <label className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-100">Hora</p>
                                    <TextInput placeholder="09" {...register('s_hour')} maxLength={2}/>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-100">Minuto</p>
                                    <TextInput placeholder="45" {...register('s_minute')} maxLength={2}/>
                                </label>
                            </div>
                            {errors.s_hour && (
                                <p className="text-sm text-[#F75A68]">{errors.s_hour.message}</p>
                            )}
                            {errors.s_minute && (
                                <p className="text-sm text-[#F75A68]">{errors.s_minute.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-100 text-sm font-bold">Fim</span>
                            <div className="flex gap-2">
                                <label className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-100">Hora</p>
                                    <TextInput placeholder="17" {...register('e_hour')} maxLength={2}/>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-100">Minuto</p>
                                    <TextInput placeholder="30" {...register('e_minute')} maxLength={2}/>
                                </label>
                            </div>
                            {errors.e_hour && (
                                <p className="text-sm text-[#F75A68]">{errors.e_hour.message}</p>
                            )}
                            {errors.e_minute && (
                                <p className="text-sm text-[#F75A68]">{errors.e_minute.message}</p>
                            )}
                        </div>
                    </div>
                    <label className="flex flex-col gap-2">
                        <p className="text-sm text-gray-100">Link (opcional)</p>
                        <TextInput placeholder="Link para o evento" {...register('link')}/>
                        {errors.link && (
                                <p className="text-sm text-[#F75A68]">{errors.link.message}</p>
                        )}
                    </label>

                    <Button type="submit" disabled={isSubmitting}>
                        Publicar
                        <Plus />
                    </Button>
                </Box>
            </div>

            <Head>
                <title>Publicar evento | USParty</title>
            </Head>
        </div>
    )
}