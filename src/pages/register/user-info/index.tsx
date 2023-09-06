import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, MultiStep, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowRight, Envelope, Lock } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
    username: z.string()
              .min(3, {message: 'O usuário deve conter pelo menos 3 letras.'})
              .max(20, {message: 'O usuário deve conter no máximo 20 letras.'})
              .regex(/^([a-z]+)$/i, {message: 'O usuário deve conter apenas letras.'})
              .transform(username => username.toLowerCase()),
    name: z.string()
            .min(5, {message: 'O nome deve ter pelo menos 5 letras.'}),
    email: z.string()
            .email({message: 'Insira um email válido.'}),
    password: z.string()
                .min(8, {message: 'Sua senha deve conter pelo menos 8 caracteres.'}),
    confirmPassword: z.string()
                .min(8, {message: 'Por favor, confirme a sua senha.'})            
}).refine(data => data.confirmPassword === data.password, {message: 'As senhas devem coincidir.', path: ['confirmPassword']})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const {register, handleSubmit, setValue, formState: {errors, isSubmitting}} = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    })

    const router = useRouter()

    useEffect(() => {
        if(router.query.username) {
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterFormData) {
        try {
            await api.post('/register', {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password
            })

            await router.push('/register/about')
        } catch(err) {
            if(err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                return
            }

            console.error(err)
        }
    }
    
    return (
        <div className="max-w-[572px] mt-5 md:mt-20 mx-auto mb-5 py-0 px-4 no-select">
            <div className="py-0 px-6">
                <h2 className="text-gray-100 text-[24px] font-bold leading-[180%]">Bem-vindo ao USParty!</h2>
                <p className="text-[#A9A9B2] mb-6">Precisamos de algumas informações para criar seu perfil.</p>
            
            <MultiStep size={2} currentStep={1}/>
            </div>

            <Box as='form' className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
                <label className="flex flex-col gap-2">
                    <p className="text-sm text-gray-100">Nome de usuário</p>
                    <TextInput prefix="rparty.com.br/" placeholder="seu-usuario" {...register('username')}/>
                    {errors.username && (
                        <p className="text-sm text-[#F75A68]">{errors.username.message}</p>
                    )}                
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm text-gray-100 flex items-center gap-2">Nome completo do usuário ou entidade</p>
                    <TextInput placeholder="Ex.: João Victor, Liga Unificada da Saúde, ..." {...register('name')}/>
                    {errors.name && (
                        <p className="text-sm text-[#F75A68]">{errors.name.message}</p>
                    )}
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm text-gray-100 flex items-center gap-2">Email {<Envelope />}</p>
                    <TextInput placeholder="seu-email@mail.com" {...register('email')}/>
                    {errors.email && (
                        <p className="text-sm text-[#F75A68]">{errors.email.message}</p>
                    )}
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm text-gray-100 flex items-center gap-2">Senha {<Lock />}</p>
                    <TextInput placeholder="••••••••" {...register('password')} type="password"/>
                    {errors.password && (
                        <p className="text-sm text-[#F75A68]">{errors.password.message}</p>
                    )}
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm text-gray-100 flex items-center gap-2">Confirme sua senha {<Lock />}</p>
                    <TextInput placeholder="••••••••" {...register('confirmPassword')} type="password"/>
                    {errors.confirmPassword && (
                        <p className="text-sm text-[#F75A68]">{errors.confirmPassword.message}</p>
                    )}
                </label>
                <Button type="submit" disabled={isSubmitting}>
                    Próximo passo <ArrowRight />
                </Button>
            </Box>

            <Head>
                <title>Crie sua conta! | USParty</title>
            </Head>
        </div>
    )
}