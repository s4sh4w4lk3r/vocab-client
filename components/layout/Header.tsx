"use client";
import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import AuthButton from "../buttons/AuthButton";
import ThemeSwitchButton from "../buttons/ThemeSwitchButton";
import Link from "next/link";
import clientConfig from "@/config/clientConfig";

export default function Header() {
    const headerBgColor = useColorModeValue("whiteAlpha.800", "blackAlpha.700");
    return (
        <HStack
            as={"header"}
            opacity={0.8}
            bgColor={headerBgColor}
            h={16}
            top={0}
            position={"sticky"}
            backdropFilter="saturate(180%) blur(5px)"
            zIndex={"200"}
            borderBottomWidth={2}
            padding={2}
        >
            <HStack
                left={5}
                pos={"absolute"}
            >
                <Link href={"/"}>
                    <Text fontSize={32}>vocab</Text>
                </Link>
            </HStack>

            <HStack
                ml={32}
                w={"full"}
            >
                <Link href={"/dictionaries"}>
                    <Text fontSize={16}>Словари</Text>
                </Link>
                <Link href={clientConfig.auth.accountUrl}>
                    <Text fontSize={16}>Аккаунт</Text>
                </Link>
            </HStack>

            <HStack
                right={5}
                pos={"absolute"}
            >
                <ThemeSwitchButton />
                <AuthButton />
            </HStack>
        </HStack>
    );
}
