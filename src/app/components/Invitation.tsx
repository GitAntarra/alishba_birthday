"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import RSVPButton from "./RSVPButton";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { fetchGuestByName } from "@/features/guests/guestAction";

const Invitation = () => {
  const dispatch = useAppDispatch()
  const { loading, data } = useSelector((state: RootState) => state.guest)
  const [friend, setFriend] = useState<string>("");

  const searchParams = useSearchParams()
  const name = searchParams?.get("name")
  const [skeleton, setSkeleton] = useState<boolean>(false)

  const handleGetGuestByName = async (name: string) => {
    await dispatch(fetchGuestByName(name))
  }

  useEffect(() => {
    setSkeleton(true)
    if(name){
      handleGetGuestByName(name)
    }
  }, [])

  if (!skeleton) {
    return <div>Skeleton</div>
  }

  const handleSubmitFriend = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(fetchGuestByName(friend))
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center  text-gray-600 text-center px-6">
      {!name && !data && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <div className="w-full h-full bg-black opacity-25"></div>
          <form onSubmit={handleSubmitFriend} className="bg-white p-4 absolute rounded-lg z-50 w-72 md:w-1/3">
            <label htmlFor="">Your Name Please</label>
            <input className="mt-2 w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="text" placeholder="please type your name friend" value={friend} onChange={(e: ChangeEvent<HTMLInputElement>)=>setFriend(e.target.value)} />
            <button className="mt-2 bg-indigo-400 rounded-lg w-full py-1 text-white">Send</button>
          </form>
        </div>
      )}
      <div className="relative w-52 h-44 animate-bounce">
        <Image src={'/H-5-Cutout.png'} fill alt="alishba" priority />
      </div>
      <h1 className="text-3xl font-bold text-pink-500 bg-white rounded-full py-2 px-4 border-2 border-pink-500">Hi, {data?.name}</h1>
      <h1 className="text-2xl font-bold pt-4">🎉 You're Invited! 🎉</h1>
      <p className="text-lg mt-2">Join us for a magical High Five from Alishba celebration!</p>
      <p className="text-md mt-1">📅 Date: February 05, 2025</p>
      <p className="text-md">📍 Location: TK Islam Baitus Salam</p>

      <RSVPButton />

    </div>
  );
};

export default Invitation;
