"use client";
import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthBtn() {
    const session = useSession();
    const isAuthenticated = session.status == "authenticated";

    return isAuthenticated ? <Button onClick={() => signOut()}>Выйти</Button> : <Button onClick={() => signIn("keycloak")}>Войти</Button>;
}
