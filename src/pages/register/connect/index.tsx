import { Box, Button, MultiStep } from "@ignite-ui/react";
import Head from "next/head";
import { ArrowRight, Check } from "phosphor-react";
import { FcGoogle } from "react-icons/fc";
import { BsInstagram } from 'react-icons/bs'
import { useSession } from "next-auth/react";

export default function Connect() {
    const isSignedIn = false

    return (
        <div className="max-w-[572px] mt-20 mx-auto mb-4 py-0 px-4">
            <div className="py-0 px-6">
                <h2 className="text-gray-100 text-[24px] font-bold leading-[180%]">Conecte suas redes sociais!</h2>
                <p className="text-[#A9A9B2] mb-6">Vincule sua conta a uma outra já existente. Lembre-se de que a sua imagem de perfil será a mesma da conta vinculada.</p>
            
                <MultiStep size={3} currentStep={2}/>
            </div>

            <Box className="mt-6 flex flex-col">
                {/* <div className="flex items-center justify-between border-[1px] border-[#323238] py-4 px-6 rounded-md mb-4">
                    <div className="flex items-center gap-3 text-gray-100">
                        <p className="text-sm md:text-base">Google Email</p>
                        <FcGoogle size={20}/>
                    </div>

                    {
                        isSignedIn ? (
                            <Button size='sm' disabled>
                                Conectado <Check />
                            </Button>
                        ) :
                        (
                            <Button size='sm' variant='secondary'>
                                Conectar <ArrowRight />
                            </Button>
                        )
                    }
                </div> */}

                <div className="flex items-center justify-between border-[1px] border-[#323238] py-4 px-6 rounded-md mb-4">
                    <div className="flex items-center gap-3 text-gray-100">
                        <p className="text-sm md:text-base">Instagram</p>
                        <div className="ig">
                            <BsInstagram />
                        </div>
                            
                    </div>

                    {
                        isSignedIn ? (
                            <Button size='sm' disabled>
                                Conectado <Check />
                            </Button>
                        ) :
                        (
                            <Button size='sm' variant='secondary'>
                                Conectar <ArrowRight />
                            </Button>
                        )
                    }
                </div>

                <Button type="submit" disabled={!isSignedIn}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Box>

            <Head>
                <title>Conecte-se! | USParty</title>
            </Head>
        </div>
    )
}