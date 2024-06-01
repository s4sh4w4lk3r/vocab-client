"use client";
import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import AuthButton from "./AuthButton";
import ThemeSwitchButton from "./ThemeSwitchButton";

export default function Header() {
    const headerBgColor = useColorModeValue("whiteAlpha.800", "blackAlpha.700");
    return (
        <HStack
            as={"header"}
            opacity={0.8}
            bgColor={headerBgColor}
            h={16}
            position={"sticky"}
            top={0}
            backdropFilter="saturate(180%) blur(5px)"
            zIndex={"200"}
            borderBottomWidth={2}
            justifyContent={"flex-end"}
            padding={2}
        >
            <ThemeSwitchButton />
            <AuthButton />
        </HStack>
    );
}
