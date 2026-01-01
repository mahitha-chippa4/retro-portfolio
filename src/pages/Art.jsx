import lap from "../assets/me/lap.png"
import folder from "../assets/buttons/open-folder.png"
import goal from "../assets/me/goal.png"
import cup from "../assets/me/cup.png"
import { useState } from "react";
import { art } from "../assets/constants/ArtConstants";


export default function Art() {
    const [activeTab, setActiveTab] = useState(0);
    const current = art[activeTab];
    return (
        <>

            <div className="w-[90vw] sm:w-[520px] h-auto text-black flex flex-col relative overflow-hidden bg-white p-3">

                <div className="flex flex-col font-bold gap-2 relative">
                    After hours, you’ll often find me at hackathons!
                    <div className="w-full h-auto overflow-hidden border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-white shadow-md">
                        <a href={current.link} target="_blank" className="block w-full h-auto">
                            <img src={current.mainImg} className="w-full h-auto object-contain hover:scale-105 transition-all duration-300"></img>
                        </a>
                    </div>
                    {/* sticker */}
                    <img src={goal} className="absolute top-8 right-0 h-14 sm:h-24 pointer-events-none z-10"></img>
                    <img src={cup} className="absolute bottom-[-10px] left-[-10px] w-24 sm:w-32 pointer-events-none z-10"></img>
                </div>

                <div className="p-1 sm:relative flex w-full  h-full flex-row justify-between items-center border-t-2 border-l-2  border-gray-500 border-b-2 border-r-2  border-b-gray-200 border-r-gray-200 bg-gray-100">
                    {/* <img src={lap} className=" hidden sm:block absolute bottom-44 -right-5"></img> */}
                    {/* <span className="text-xl flex flex-row w-full "> <img className="h-6" src={folder}></img>Projects</span> */}
                    {art.map((art, i) => (
                        <>

                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={` relative text-lg px-1 h-14 w-14  sm:h-20 sm:w-20 font-bold transition-transform duration-300 `}

                            >

                                <img src={art.img} className="absolute top-0 h-full w-full object-cover hover:border-l-4 hover:border-t-4 hover:border-b-4 hover:border-r-4 border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-b-gray-200 border-r-gray-200 bg-gray-100"></img>
                                <div className={` absolute hover:bg-blue-500/50 h-14 w-14  sm:h-20 sm:w-20 top-0
                    ${activeTab === i ? "bg-blue-500/50" : "bg-transparent"
                                    }`} ></div>
                            </button>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}