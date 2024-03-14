import { Message, MessageType } from "@/app/types/Message";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MessageBox({ message }: { message: Message }) {
    const [showStatus, setShowStatus] = useState<string>("show");

    useEffect(() => {
        setTimeout(() => {
            setShowStatus("animation");
            setTimeout(() => {
                setShowStatus("hide");
            }, 500)
        }, 2000)
    }, [])
    if (message.type === MessageType.MARCIN) {
        return (
            <div className="w-full flex items-start gap-2.5 mt-2">
                <Image
                    className="w-8 h-8 rounded-full"
                    src="/me.png"
                    width={32}
                    height={42}
                    alt="Marcin image"
                />
                <div className="flex flex-col gap-1 w-full max-w-[320px]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.name}</span>
                    </div>
                    <div className="w-fit flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <p className="text-sm font-normal text-gray-900 dark:text-white">{message.text}</p>
                    </div>
                    <span className={`text-sm font-normal text-gray-500 dark:text-gray-400 transition-all duration-500 ${showStatus == 'animation' && 'opacity-0'} ${showStatus == 'hide' && 'hidden'}`}>Delivered</span>
                </div>
            </div>
        );
    }

    if (message.type === MessageType.CLIENT) {
        return (
            <div className="w-full flex items-end justify-end gap-2.5 mt-2">
                <div className="flex flex-col items-end gap-1 w-full max-w-[320px]">
                    <div className="w-fit flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-blue-500">
                        <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {message.text}
                        </p>
                    </div>
                    <span className={`text-sm font-normal text-gray-500 dark:text-gray-400 transition-all duration-500 ${showStatus == 'animation' && 'opacity-0'} ${showStatus == 'hide' && 'hidden'}`}>Delivered</span>
                </div>
            </div>
        );
    }
}
