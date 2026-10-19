"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FloatingPixelProps {
    color?: "orange" | "grey";
    className?: string;
    style?: React.CSSProperties;
    initialRotate?: number;
}

export const FloatingPixel = ({
    color = "orange",
    className = "",
    style,
    initialRotate = 0,
}: FloatingPixelProps) => {
    const [rotated, setRotated] = useState(false);

    return (
        <motion.div
            style={style}
            onClick={() => setRotated(!rotated)}
            onHoverStart={() => setRotated(!rotated)}
            initial={{ scale: 0, rotate: initialRotate }}
            animate={{
                scale: 1,
                rotate: rotated ? initialRotate + 90 : initialRotate,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className={`w-3 h-3 shrink-0 select-none cursor-pointer transition-colors shadow-xs ${
                color === "orange" ? "bg-[#E64A11] hover:bg-[#FF5100]" : "bg-[#7A7A7A] hover:bg-[#A3A3A3]"
            } ${className}`}
        />
    );
};

export default FloatingPixel;
