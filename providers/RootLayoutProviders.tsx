"use client";

import SessionGuard from "@/components/layout/SessionGuard";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export default function RootLayoutProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider refetchInterval={4 * 60}>
            <ChakraProvider>
                <SessionGuard> {children}</SessionGuard>
            </ChakraProvider>
        </SessionProvider>
    );
}
