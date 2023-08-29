import Post, { PostProps } from "@/components/Post";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/lib/axios";
import { Button } from "@ignite-ui/react";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { Pen, SignOut } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPosts] = useState<PostProps[]>([])
    const { userInfo, setUserInfo } = useUserContext()
    const router = useRouter()

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
                console.log(posts)
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
        <div className="md:max-w-[800px] w-[100vw] mx-auto p-8 flex flex-col justify-center">
            <div className="w-full text-gray-100 font-bold text-2xl flex items-center justify-between mb-4">
                <p className="md:hover:scale-110 md:hover:text-violet-500 duration-200 max-md:focus:text-violet-500 font-poppins">USParty</p>
                <div className="font-normal text-base flex items-center gap-3">
                    <p>Olá, <span className="text-violet-400 font-bold">{userInfo.username}</span></p>
                    <button className="md:hidden" onClick={handleLogout}>
                        <SignOut className="text-2xl text-violet-400" />
                    </button>
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

            <div className="md:mt-2 mt-10 flex flex-col gap-4">
                {posts.map(post => (
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
                            />
                ))}
            </div>

            <Head>
                <title>Página inicial | USParty</title>
            </Head>
        </div>
    )
}