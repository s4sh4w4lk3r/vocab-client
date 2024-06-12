import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RootLayoutProviders from "@/providers/RootLayoutProviders";
import type { Metadata } from "next";
import { type NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";

const inter: NextFont = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: "Vocab",
    description: "Платформа для изучения иностранных слов и выражений.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={inter.className}
                style={{ minHeight: "100%", position: "relative" }}
            >
                <RootLayoutProviders>
                    <Header />
                    {children}
                    <Footer />
                </RootLayoutProviders>
            </body>
        </html>
    );
}
