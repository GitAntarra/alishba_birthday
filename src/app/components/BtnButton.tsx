"use client"

import { RootState, useAppDispatch } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiChat2, CiHome, CiImageOn, CiSquareQuestion } from "react-icons/ci";
import { TbBrandGithub, TbInfoCircle, TbMessageChatbot, TbPhoto, TbPhotoAi } from "react-icons/tb";
import { useSelector } from "react-redux";

const BtnButton = () => {
    const dispatch = useAppDispatch()
    const { loading, data } = useSelector((state: RootState) => state.guest)

    const pathname = usePathname();
    const prefix = pathname;


    const prefixHandle = prefix?.split("/") ? prefix.split("/")[1] : "";

    const dataMenu = [
        {
            id: 1,
            title: "Home",
            url: "/",
            icon: <TbBrandGithub size={"20"} className="font-bold" />
        },{
            id: 2,
            title: "Comments",
            url: "/comments",
            icon: <TbMessageChatbot size={"20"} className="font-bold" />
        },{
            id: 3,
            title: "Gallery",
            url: "/gallery",
            icon: <TbPhoto size={"20"} className="font-bold" />
        },{
            id: 4,
            title: "About",
            url: "/about",
            icon: <TbInfoCircle size={"20"} className="font-bold" />
        }
    ]

    if (data) {
        return (
            <div className={`fixed bottom-0 left-0 w-screen bg-pink-300 text-gray-600 flex flex-row justify-between items-center ${data.attend !== 'attend' ? 'hidden' : ''}`}>
                {dataMenu.map((n)=>(
                <Link href={n.url} key={n.id} className={`text-xs font-bold flex flex-col justify-center items-center flex-1 py-2 ${prefix === n.url ? 'bg-indigo-300 text-indigo-800' : ''}`}>{n.icon} {n.title}</Link>
                ))}
                
            </div>
        )
    }
}

export default BtnButton;