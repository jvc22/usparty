import Post, { PostProps } from "@/components/Post";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/lib/axios";
import { Button } from "@ignite-ui/react";
import { Pulsar } from "@uiball/loaders";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { ArrowLeft, SignOut, User } from "phosphor-react";
import { useEffect, useState } from "react";

interface ProfileDetailsProps {
    name: string;
    about: string;
}

export default function Home() {
    const { userInfo, setUserInfo } = useUserContext()
    const router = useRouter()

    const username = router.query.username

    const [profileDetails, setProfileDetails] = useState<ProfileDetailsProps>()
    const [userPosts, setUserPosts] = useState<PostProps[]>([])
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
        async function getUserPosts() {
            try {
                const res = await api.post('/user-posts', {
                    username,
                })
                if(res.status === 200) {
                    setUserPosts(res.data.posts)
                    setProfileDetails(res.data.userDetails)
                    setIsLoading(false)
                } else {
                    console.log(res.data.message)
                }
            } catch(err) {
                if(err instanceof AxiosError && err?.response?.data?.message) {
                    console.error(err.response.data.message)
                    return
                }
            }
        }

        getUserPosts()
    }, [router.query.username])


    return (
        <div className="md:max-w-[800px] w-[100vw] mx-auto p-8 flex flex-col justify-center no-select">
            <div className="w-full text-gray-100 font-bold text-2xl flex items-center justify-between mb-4">
                <p className="md:hover:scale-110 md:hover:text-[#00B37E] duration-200 font-poppins">USParty</p>
                <div className="font-normal text-base flex items-center gap-2">
                    <SignOut className="tap text-2xl hover:text-red-400 md:hidden cursor-pointer" onClick={handleLogout}/>
                    <div className="max-md:hidden">
                        <Button size={"sm"} onClick={() => {router.back()}}>
                            <ArrowLeft />
                            Retornar
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
                <Button onClick={() => {router.replace('/home')}} size={"sm"} style={{width: '100%'}}>
                    <ArrowLeft />
                    Retornar à página inicial
                </Button>
            </div>

            <div className="max-md:mt-4 flex flex-col gap-3">
                {
                    isloading ? (
                        <div className="mx-auto mt-2">
                            <Pulsar size={30} color="#00B37E" />
                        </div>
                    ) : (
                            userPosts.length !== 0 ? (
                                <>
                                    <div className="mx-auto text-base flex flex-col items-center mb-1">
                                        <p className="text-[#00B37E] font-bold">{router.query.username} <span className="text-gray-100 font-normal">&nbsp;|&nbsp; {profileDetails?.name}</span></p>
                                        <p className="text-zinc-400 text-[14px]">{profileDetails?.about}</p>
                                    </div>
                                    {
                                        userPosts.map(post => (
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
                                    }
                                </>
                        ) : (
                            <>
                            <div className="mx-auto text-base flex flex-col items-center mb-1">
                                        <p className="text-[#00B37E] font-bold">{router.query.username} <span className="text-gray-100 font-normal">&nbsp;|&nbsp; {profileDetails?.name}</span></p>
                                        <p className="text-zinc-400 text-[14px]">{profileDetails?.about}</p>
                            </div>
                            <div className="text-[#7C7C8A] text-center">
                                <p>Nenhum evento foi encontrado...</p>
                                <p>Tente recarregar a página.</p>
                            </div>
                            </>
                        )
                    )
                }
            </div>

            <Head>
                <title>{`${router.query.username} | USParty`}</title>
            </Head>
        </div>
    )
}