"use client";

import InputMessage from "@/components/InputMessage";
import { Message, MessageType } from "./types/Message";
import { ReactNode, useEffect, useState } from "react";
import MessageBox from "@/components/MessageBox";
import { deprecate } from "util";
import FirstMessage from "@/components/messages-template/FirstMessage";
import MessageBoxResponding from "@/components/MessageBoxResponding";
import AboutMeMessage from "@/components/messages-template/AboutMeMessage";
import ContactMessage from "@/components/messages-template/ContactMessage";
import OfferMessage from "@/components/messages-template/OfferMessage";
import ProjectsMessage from "@/components/messages-template/ProjectsMessage";
import WelcomeMessage from "@/components/messages-template/WelcomeMessage";

const audio = new Audio("./sound.mp3");

const exampleMessages = ["Pokaż swoje realizacje", "Powiedz mi coś o sobie", "Jaki jest twój e-mail?", "Jaka jest twoja oferta?", "Powiedz mi coś o sobie"]

const aliases = [
    { main: "kontakt", alias: ["telefon", "email", "numer", "e-mail", "e mail"], component: <ContactMessage /> },
    { main: "o mnie", alias: ["o sobie", "wiek", "praca"], component: <AboutMeMessage /> },
    { main: "oferta", alias: ["oferujesz", "usługi", "oferowac", "uslugi", "oferte"], component: <OfferMessage /> },
    { main: "projekty", alias: ["portfolio", "realizacje", "co zrobileś", "projekt"], component: <ProjectsMessage /> },
    { main: "witam", alias: ["hej", "czesc", "siema", "siemano", "heej", "heej"], component: <WelcomeMessage /> },
];

export default function Home() {
    const [inputMessage, setInputMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [responding, setResponding] = useState<boolean>(false);

    const sendMessage = (message?: string) => {
        setMessages((prev) => [
            ...prev,
            {
                name: "Klient",
                type: MessageType.CLIENT,
                createdAt: new Date(),
                text: <p>{message ? message : inputMessage}</p>,
                plainText: message ? message : inputMessage,
            },
        ]);
        setInputMessage("");
        playSound();
    };
    const sendResponse = (plainMessage: string, message?: ReactNode) => {
        setMessages((prev) => [
            ...prev,
            {
                name: "Marcin Kowalczyk",
                type: MessageType.MARCIN,
                createdAt: new Date(),
                text: message == null || message == undefined ? <p>{plainMessage}</p> : message,
                plainText: plainMessage,
            },
        ]);
        setInputMessage("");
        playSound();
    };

    useEffect(() => {
        setMessages([
            {
                name: "Marcin Kowalczyk",
                type: MessageType.MARCIN,
                createdAt: new Date(),
                text: (
                    <FirstMessage />
                ),
                plainText:
                    "Moje portfolio działa w oparciu o sztuczną inteligincję. Wpisz którąs z komend i kontynuujmy konwersacje.",
            },
        ]);
        playSound();
    }, []);

    useEffect(() => {
        if (messages.length === 0) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.type === MessageType.CLIENT) {
            setResponding(true);
            // Normalize the input message
            const normalizedInputMessage = lastMessage.plainText
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ę/g, "e")
                .replace(/ą/g, "a")
                .replace(/ć/g, "c")
                .replace(/ś/g, "s")
                .replace(/ź/g, "z")
                .replace(/ż/g, "z")
                .replace(/ł/g, "l")
                .replace(/ó/g, "o");
            // Find the matching alias
            const about = aliases.find((alias) => {
                return normalizedInputMessage.includes(alias.main) ||
                    alias.alias.some((x) => {
                        return normalizedInputMessage.includes(x);
                    });
            });
            setTimeout(() => {
                if (about) {
                    sendResponse(about.main, about.component);
                } else {
                    sendResponse("Niestety nie rozumiem. Wpisz 'pomoc', aby zobaczyć dostępne komendy.");
                }
                setResponding(false);
            }, 2500);
        }
    }, [messages]);

    const playSound = () => {
        audio.play().catch((error) => console.error("Error playing the sound:", error));
    };

    return (
        <div className="flex flex-col justify-center items-center max-w-xl w-full mx-auto">
            <div className="w-full h-[700px] p-2 pb-0 bg-gray-50 dark:bg-gray-700">
                <div className="w-full h-full bg-gray-800 overflow-auto">
                    <div className="w-full px-2 py-4">
                        {messages.map((message: Message, index: number) => (
                            <MessageBox key={index} message={message} />
                        ))}
                        {responding && <MessageBoxResponding />}
                    </div>
                </div>
            </div>

            <InputMessage
                message={inputMessage}
                setMessage={setInputMessage}
                send={(message?: string) => sendMessage(message)}
                isMarcinWriting={responding}
                messageTemplates={exampleMessages}
            />
        </div>
    );
}
