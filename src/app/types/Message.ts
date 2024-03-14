import { ReactNode } from "react";

export type Message = {
    name: string,
    type: MessageType,
    plainText: string,
    text: ReactNode,
    createdAt: Date;
}

export enum MessageType {
    CLIENT,
    MARCIN
}