"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useCallback } from "react";

export function usePosterParallax() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics springs
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            // normalized coordinate between -0.5 and +0.5
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        },
        [mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    // Layer 0: Giant Background Watermark Text (moves opposite: -15px)
    const l0X = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
    const l0Y = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

    // Layer 1: Burnt Orange Geometric Block & Floating Squares (moves with: +10px)
    const l1X = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
    const l1Y = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

    // Layer 2: Cutout Portrait / Visual Cutout (moves +20px with subtle 3D tilt)
    const l2X = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
    const l2Y = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
    const l2RotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
    const l2RotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

    // Layer 3: Foreground Stacked Impact Typography (moves +35px)
    const l3X = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
    const l3Y = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);

    return {
        handleMouseMove,
        handleMouseLeave,
        l0: { x: l0X, y: l0Y },
        l1: { x: l1X, y: l1Y },
        l2: { x: l2X, y: l2Y, rotateY: l2RotateY, rotateX: l2RotateX },
        l3: { x: l3X, y: l3Y },
    };
}

export default usePosterParallax;
