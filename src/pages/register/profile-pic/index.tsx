import { Avatar, Box, Button, MultiStep, TextArea } from "@ignite-ui/react";
import Head from "next/head";
import { ArrowRight, File } from "phosphor-react";
import nookies from 'nookies'
import { useState } from "react";

export default function About() {
    const [selectedFile, setSelectedFile] = useState('')

    const cookies = nookies.get()
    const userId = cookies['@usparty:userId']

    return (
        <div className="max-w-[572px] mt-20 mx-auto mb-4 py-0 px-4">
            <div className="py-0 px-6">
                <h2 className="text-gray-100 text-[24px] font-bold leading-[180%]">Imagem de perfil</h2>
                <p className="text-[#A9A9B2] mb-6">Selecione uma imagem para o seu perfil USParty! <br/><span className="text-[12px] text-violet-200">*opcional</span></p>
            
                <MultiStep size={3} currentStep={3}/>
            </div>

            <Box as='form' className="mt-6 flex flex-col">
                <div className="text-center mb-4">
                    <Avatar />
                    <label htmlFor="file" className="text-sm text-violet-400 flex items-center justify-center gap-1 cursor-pointer hover:text-violet-300">
                        Selecionar arquivo <File />
                        <input id="file" type="file" className="hidden" accept="image/png, image/jpg, image/jpeg" onChange={ev => setSelectedFile(ev.target.files ? ev.target.files[0].name : '')}/>
                    </label>

                    {selectedFile && (
                        <p className="text-sm text-[#A9A9B2]">{selectedFile}</p>
                    )}
                </div>    

                <Button type="submit">
                    Concluir
                    <ArrowRight />
                </Button>
            </Box>

            <Head>
                <title>Finalizar! | USParty</title>
            </Head>
        </div>
    )
}

