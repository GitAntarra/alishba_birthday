"use client"

import { timeAgo } from "@/_helper/time"
import { fetchAllComment } from "@/features/comments/commentAction"
import { RootState, useAppDispatch } from "@/redux/store"
import { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TimeAgoComponent from "../components/TimeAgo"
import { BiMessageAltDetail } from "react-icons/bi"

const CommentPage = () => {
    const dispatch = useAppDispatch()
    const { loading, datas } = useSelector((state: RootState) => state.comment)
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        dispatch(fetchAllComment())
    }, [])

    return (
        <div className="relative p-4 flex flex-col gap-3 pb-44">
            {datas && datas.map((n, i) => (
                <div className={`${i % 2 ? 'bg-pink-50 text-right' : 'bg-yellow-50 text-left'}  p-4 rounded-lg  text-gray-700 shadow-md`}>
                    {n.message}
                    <p className="text-xs text-gray-500">{n.guest.name} | <TimeAgoComponent createdAt={n.createdAt} /></p>
                </div>
            ))}

            <div className="fixed bottom-[50px] left-0 w-full p-2">
                <div className="bg-white w-full p-2 rounded-lg">

                <input className="mt-2 w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="text" placeholder="please type your message" value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                <button className="mt-2 bg-indigo-400 rounded-lg w-full py-1 text-white">Send</button>
                </div>
            </div>
        </div>
    )
}

export default CommentPage;