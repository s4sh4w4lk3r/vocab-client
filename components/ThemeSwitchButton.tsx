"use client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function ThemeSwitchButton() {
    const { toggleColorMode } = useColorMode();
    const modeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
    return <Button onClick={toggleColorMode}>{modeIcon}</Button>;
}
