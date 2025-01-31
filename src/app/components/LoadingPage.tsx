"use client"

import Image from "next/image";

const LoadingPage = ({ loading }: { loading: boolean }) => {

    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 ${loading ? '' : 'hidden'} z-50 flex justify-center items-center`}>
            <div className="absolute top-0 bottom-0 left-0 right-0 opacity-50 bg-black"></div>
            <div className="z-50 bg-white rounded-lg p-2 pt-4 flex flex-col justify-center items-center">
                <Image src={"/characters/my-melody.svg"} width={"60"} height={"60"} alt="loading" className="animate-bounce" />
                <span className="animate-pulse">Loading ...</span>
            </div>
        </div>
    )
}

export default LoadingPage;