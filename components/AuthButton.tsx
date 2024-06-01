"use client";
import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthBtn() {
    const session = useSession();
    const isAuthenticated = session.status == "authenticated";

    return isAuthenticated ? (
        <Button
            colorScheme="red"
            onClick={() => signOut()}
        >
            Выйти
        </Button>
    ) : (
        <Button
            colorScheme="blue"
            onClick={() => signIn("keycloak")}
        >
            Войти
        </Button>
    );
}
