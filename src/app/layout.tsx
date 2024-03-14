import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Marcin Kowalczyk | Portfolio",
    description: "Portfolio Fullstack Developera Marcina Kowalczyka",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
            <body className={`${inter.className} dark h-screen flex justify-center items-center gradient-background`}>
                {children}
            </body>
        </html>
    );
}
