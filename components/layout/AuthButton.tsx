"use client";
import federatedLogout from "@/utils/client/federatedLogout";
import { Button } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";

export default function AuthBtn() {
    const session = useSession();
    const isAuthenticated = session.status == "authenticated";

    return isAuthenticated ? (
        <Button
            colorScheme="red"
            onClick={() => federatedLogout()}
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
