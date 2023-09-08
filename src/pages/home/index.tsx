import Post, { PostProps } from "@/components/Post";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/lib/axios";
import { Button } from "@ignite-ui/react";
import { Pulsar } from "@uiball/loaders";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { House, HouseLine, Pen, SignOut, User } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Home() {
    const { userInfo, setUserInfo } = useUserContext()
    const router = useRouter()
    
    const [posts, setPosts] = useState<PostProps[]>([])
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        const cookies = parseCookies()
        const username = cookies["@uspparty"]

        if(!username) {
            router.replace('/login')
        } else {
            setUserInfo({username})
        }

        setUserInfo({username})
      }, [])

    function handleLogout() {
        destroyCookie(null, '@uspparty')
        router.replace('/')
    }

    useEffect(() => {
        async function getPosts() {
            try {
                const res = await api.get('/post')
                setPosts(res.data)
                setIsLoading(false)
            } catch(err) {
                if(err instanceof AxiosError && err?.response?.data?.message) {
                    console.error(err.response.data.message)
                    return
                }
            }
        }

        getPosts()
    }, [])


    return (
        <div className="md:max-w-[800px] w-[100vw] mx-auto p-8 flex flex-col justify-center no-select">
            <div className="w-full text-gray-100 font-bold text-2xl flex items-center justify-between mb-4">
                <p className="md:hover:scale-110 md:hover:text-[#00B37E] duration-200 font-poppins">USParty</p>
                <div className="font-normal text-base flex items-center gap-2">
                    <p  onClick={() => (router.push(`/profile/${userInfo.username}`))} 
                        className="flex items-center gap-1 hover:text-[#00B37E] cursor-pointer mr-1">
                            {<User className="text-2xl"/>}
                    </p>
                    <SignOut className="tap text-2xl hover:text-red-400 md:hidden cursor-pointer" onClick={handleLogout}/>
                    <div className="max-md:hidden">
                        <Button size={"sm"} onClick={() => {router.push('/post-form')}}>
                            Criar evento
                            <Pen />
                        </Button>
                    </div>
                    <div className="max-md:hidden">
                        <Button variant={"secondary"} size={"sm"} onClick={handleLogout}>
                            Desconectar
                            <SignOut />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="md:hidden">
                <Button onClick={() => {router.push('/post-form')}} size={"sm"} style={{width: '100%'}}>
                    Criar novo evento
                    <Pen />
                </Button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                {
                    isloading ? (
                        <div className="mx-auto">
                            <Pulsar size={30} color="#00B37E" />
                        </div>
                    ) : (
                        posts.length !== 0 ? (
                            posts.map(post => (
                            <Post   key={post.id}
                                    id={post.id}
                                    author={post.author}
                                    title={post.title}
                                    about={post.about}
                                    description={post.description}
                                    place={post.place}
                                    created_at={post.created_at} 
                                    day={post.day}
                                    month={post.month}
                                    year={post.year}
                                    start_hour={post.start_hour} 
                                    start_minute={post.start_minute}
                                    end_hour={post.end_hour}
                                    end_minute={post.end_minute}
                                    link={post.link}
                            />))
                        ) : (
                           <div className="text-[#7C7C8A] text-center">
                                <p>Nenhum evento foi encontrado...</p>
                                <p>Tente recarregar a página.</p>
                           </div>
                        )
                    )
                }
            </div>

            <Head>
                <title>Página inicial | USParty</title>
            </Head>
        </div>
    )
}