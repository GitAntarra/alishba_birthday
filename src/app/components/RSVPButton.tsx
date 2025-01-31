"use client";
import { useState } from "react";
import ConfettiEffect from "./ConfettiEffect";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { updateAttend } from "@/features/guests/guestAction";

const RSVPButton = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
    const dispatch = useAppDispatch()
  const { loading, data } = useSelector((state: RootState) => state.guest)

  const HandleAttend = async () => {
    if(data){
      await dispatch(updateAttend(data.id))
    }
  }
  if(data){
    return (
      <div className="relative">
        {data.attend == 'attend' && <ConfettiEffect/>}
        <button
          onClick={() => HandleAttend()}
          className={`mt-4 px-6 py-2 rounded-full transition-all scale-100 font-bold ${
            data.attend == 'attend'
              ? "bg-indigo-300 text-white"
              : "bg-pink-100 text-pink-400 hover:scale-110 hover:animate-pulse border border-pink-400"
          }`}
          disabled={data.attend == 'attend' ? true : false}
        >
          {data.attend == 'attend' ? "🎉 See You There!" : "Join"}
        </button>
      </div>
    );
  }
};

export default RSVPButton;
