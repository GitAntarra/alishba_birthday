"use client"

import { useState, useEffect, FormEvent, ChangeEvent, Suspense } from 'react'
import Image from 'next/image'
import { Sour_Gummy } from 'next/font/google';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';
import RSVPButton from './components/RSVPButton';
import { fetchGuestByName } from '@/features/guests/guestAction';
import { MdCheck } from 'react-icons/md';
import LoadingPage from './components/LoadingPage';
import { useSearchParams } from 'next/navigation';

const sourGummy = Sour_Gummy({
  variable: "--font-sourGummy-sans",
  subsets: ["latin"],
  weight: '400'
});



export default function App() {
  const dispatch = useAppDispatch()
  const { loading, data } = useSelector((state: RootState) => state.guest)
  const [friend, setFriend] = useState<string>("");

  const searchParams = useSearchParams()
  const name = searchParams?.get("name")
  const gender = searchParams?.get("gender")
  const [skeleton, setSkeleton] = useState<boolean>(false)
  const [genderState, setGenderState] = useState<'girl' | 'boy'>('girl');

  const handleGetGuestByName = async (name: string, gen: 'boy' | 'girl') => {
    await dispatch(fetchGuestByName({ name, gender: gen }))
  }

  const handleSubmitFriend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(fetchGuestByName({ name: friend, gender: genderState }))
  }

  useEffect(() => {
    setSkeleton(true)
    if (gender) {
      setGenderState(gender as any)
    }
    if (name) {
      handleGetGuestByName(name, genderState)
    }else{
      if(data){
        handleGetGuestByName(data.name, data.gender)
      }
    }
  }, [])

  if (!skeleton) {
    return <LoadingPage loading={true} />
  }


  return (

    <div className="h-screen flex flex-col items-center justify-center text-gray-600 text-center px-6">
      {!name && !data && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <div className="w-full h-full bg-black opacity-25"></div>
          <form onSubmit={handleSubmitFriend} className="bg-white p-4 absolute rounded-lg z-50 w-72 md:w-1/3">
            <label htmlFor="">Your Name Please</label>
            <input className="mt-2 w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" type="text" placeholder="please type your name friend" value={friend} onChange={(e: ChangeEvent<HTMLInputElement>) => setFriend(e.target.value)} />
            <div className='flex gap-2 pt-2'>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="boy"
                  checked={genderState === "boy"}
                  onChange={() => setGenderState("boy")}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 border-blue-500 text-white ${genderState === "boy" ? "bg-blue-500" : ""}`}>
                  {genderState == 'boy' ? <MdCheck /> : ''}
                </div>
                <span>Boy</span>
              </label>

              {/* Girl Radio */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="girl"
                  checked={genderState === "girl"}
                  onChange={() => setGenderState("girl")}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 border-pink-500 text-white ${genderState === "girl" ? "bg-pink-500" : ""}`}>{genderState == 'girl' ? <MdCheck /> : ''}</div>
                <span>Girl</span>
              </label>
            </div>
            <button className="mt-2 bg-indigo-400 rounded-lg w-full py-1 text-white">Send</button>
          </form>
        </div>
      )}
      <p className='text-xl text-indigo-700'>Hi, <span className='font-bold'>{data && data?.name.charAt(0).toUpperCase() + data?.name.slice(1).toLowerCase()}</span> You're Invited!</p>
      <div className='rounded-full pt-2 relative'>
        <Image src={'/gallery/image-2.jpeg'} width={"100"} height={"100"} className='rounded-full' alt='alishbafoto' />
      </div>
      <div className={`${sourGummy.className} text-3xl font-bold text-pink-600 flex flex-col justify-center items-center`}>
        Antarra Alishba Nidra
        <p className='text-base text-indigo-600'>Lest High Five</p>
      </div>
      <h1 className="text-2xl font-bold pt-4">🎉 Birthday Party 🎉</h1>
      <p className="text-md mt-1">📅 Date: February 05, 2025</p>
      <p className="text-md">📍 Location: TK Islam Baitus Salam</p>
      <RSVPButton />
      <Image src={'/H-5-Cutout.png'} width={"120"} height={"120"} className='absolute top-5 left-5 animate-pulse' alt='h5' />
      <LoadingPage loading={loading} />
    </div>
  )
}