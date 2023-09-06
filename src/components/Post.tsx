import { useUserContext } from "@/context/UserContext";
import { api } from "@/lib/axios";
import { addLeadingZero, formatDate, stringToDate } from "@/utils";
import { Box } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Calendar, Clock, Link, MapPin, Trash } from "phosphor-react";

export interface PostProps {
    id: string;
    author: string;
    title: string;
    about: string;
    description: string;
    place: string;
    day: string;
    month: string;
    year: string;
    start_hour: string;
    start_minute: string;
    end_hour: string;
    end_minute: string;
    link?: string;
    created_at: Date;
}

export default function Post(props: PostProps) {
    const date = new Date(props.created_at)
    const formattedDate = formatDate(date)

    const day = addLeadingZero(props.day)
    const month = addLeadingZero(props.month)
    const formattedMonth = stringToDate(month)

    const start_hour = addLeadingZero(props.start_hour)
    const start_minute = addLeadingZero(props.start_minute)

    const end_hour = addLeadingZero(props.end_hour)
    const end_minute = addLeadingZero(props.end_minute)

    const {userInfo} = useUserContext()

    const router = useRouter()

    async function deletePost() {
        try {
            const res = await api.post('/post-delete', {
                postId: props.id
            })
            if(res.status === 200) {
                router.reload()
            }
        } catch(err) {
            if(err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                console.log(err.response.data)
                return
            }
            console.error(err)
        }
    }

    return (
        <div className="">
            <Box>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[#00B37E] font-bold">@{props.author}</span>
                        <span className="text-[#7C7C8A] text-sm">{props.about.length > 13 ? `${props.about.slice(0, 13)}...` : props.about}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {
                            props.author === userInfo.username && (
                                <Trash className="tap text-red-400 cursor-pointer hover:text-red-300" onClick={deletePost}/>
                            )
                        }
                        <span className="text-[#7C7C8A] text-xs">{formattedDate}</span>
                    </div>
                </div>

                <p className="text-zinc-200 mt-3 font-bold">
                    {props.title}
                </p>

                <p className="text-zinc-200 mt-1 break-words">
                    {props.description}
                </p>

                <div className="mt-3 flex items-center gap-1 text-zinc-400 text-">
                    <MapPin />
                    <span>{props.place}</span>
                </div>

                <div className="flex items-center gap-1 text-zinc-400 text-">
                    <Calendar />
                    <span>{day} {formattedMonth}. {props.year}</span>
                </div>

                <div className="flex items-center gap-1 text-zinc-400">
                        <Clock />
                        <span>{start_hour}:{start_minute} - {end_hour}:{end_minute}</span>
                </div>

               {props.link && (
                    <div className="flex items-center gap-1 text-[#6aebb6] mt-3">
                        <Link />
                        <a href={`https://${props.link}`} target="_blank" rel="noopener noreferrer">
                            Link
                        </a>
                    </div>
               )}
            </Box>
        </div>
    )
}