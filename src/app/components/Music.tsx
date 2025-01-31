"use client";
import { useState } from "react";
import ReactHowler from 'react-howler'
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

const MusicComponent = () => {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = async () => {
        setIsMuted(!isMuted);
    };

    return (
        <>
        <ReactHowler
                    src={"/music/dj-catnip-song.mp3"}
                    playing={true}
                    onLoad={true}
                    onPlay={true}
                    onEnd={true}
                    loop={true}
                    mute={isMuted}
                    // volume={this.state.volume}
                    // ref={(ref) => (this.player = ref)}
                />
            <button
                onClick={toggleMute}
                className="fixed top-5 right-5 bg-gray-800 text-white p-3 rounded-full shadow-md"
                >
                {isMuted ? <IoVolumeMute size={18} /> : <IoVolumeHigh size={18} />}
            </button>
                </>
    )
}

export default MusicComponent;