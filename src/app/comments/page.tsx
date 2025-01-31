"use client"

import { timeAgo } from "@/_helper/time"
import { addComment, fetchAllComment } from "@/features/comments/commentAction"
import { RootState, useAppDispatch } from "@/redux/store"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import TimeAgoComponent from "../components/TimeAgo"
import { BiMessageAltDetail } from "react-icons/bi"
import { IoMdSend } from "react-icons/io"
import Image from "next/image"
import LoadingPage from "../components/LoadingPage"

const CommentPage = () => {
    const dispatch = useAppDispatch()
    const guest = useSelector((state: RootState) => state.guest.data)
    const { loading, datas } = useSelector((state: RootState) => state.comment)
    const [message, setMessage] = useState<string>("");


    const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (guest) {
            await dispatch(addComment({ guestId: guest?.id, message }))
            setMessage("")
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
    }

    useEffect(() => {
        dispatch(fetchAllComment())
    }, [])

    return (
        <div className="relative p-4 flex flex-col gap-3 pb-32">
            {datas && datas.map((n, i) => (
                <div className={`flex gap-2 ${n.guestId === guest?.id ? 'flex-row-reverse' : ''}`} key={n.id}>
                    <div className={`w-7 h-7 ${n.guest.gender === 'girl' ? 'bg-pink-200' : 'bg-indigo-200'} rounded-full flex items-center justify-center`}>
                        <Image src={n.guest.gender === 'girl' ? "/characters/my-melody.svg" : "/characters/finn.svg"} width={"19"} height={"19"} alt={`chart${i}`} />
                    </div>
                    <div className={`${n.guestId === guest?.id ? 'bg-indigo-50 text-right' : 'bg-pink-50 text-left'}  p-4  text-gray-700 shadow-md flex-1 ${n.guestId === guest?.id ? 'ml-8 rounded-l-2xl rounded-b-2xl' : 'mr-8 rounded-r-2xl rounded-b-2xl'} `}>
                        {n.message}
                        <p className="text-xs text-gray-500">{n.guest.name} | <TimeAgoComponent createdAt={n.createdAt} /></p>
                    </div>

                </div>
            ))}

            <div className="fixed bottom-[50px] left-0 w-full p-2">
                <form onSubmit={handleSubmitMessage} className="bg-white w-full p-2 rounded-lg flex gap-2">
                    <input className=" w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="text" placeholder="please type your message" value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                    <button type="submit" className=" bg-indigo-400 rounded-lgpy-1 text-white w-10 flex justify-center items-center rounded-xl"><IoMdSend /></button>
                </form>
            </div>
            <LoadingPage loading={loading} />
        </div>
    )
}

export default CommentPage;