"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useMemo, useRef } from "react";

const SOURCE_SIZE = 128;
const eyeCenters = [
  { x: 55, y: 58, horizontalRange: 1.4, verticalRange: 0.9 },
  { x: 69, y: 57, horizontalRange: 1.4, verticalRange: 0.9 },
] as const;

function usePupilMotion(eye: (typeof eyeCenters)[number]) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 420, damping: 32, mass: 0.25 });
  const y = useSpring(targetY, { stiffness: 420, damping: 32, mass: 0.25 });
  return useMemo(() => ({ x, y, targetX, targetY, eye }), [eye, targetX, targetY, x, y]);
}

export function AvatarEyeTracking() {
  const avatarRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const left = usePupilMotion(eyeCenters[0]);
  const right = usePupilMotion(eyeCenters[1]);

  useEffect(() => {
    if (prefersReducedMotion) {
      left.x.jump(0);
      left.y.jump(0);
      right.x.jump(0);
      right.y.jump(0);
      return;
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const avatar = avatarRef.current;
    if (!avatar) return;
    const border = parseFloat(getComputedStyle(avatar).borderLeftWidth) || 0;
    let pointerX = 0;
    let pointerY = 0;
    let hasPointer = false;

    const updatePupils = () => {
      if (!hasPointer) return;

      const bounds = avatar.getBoundingClientRect();
      const scale = (bounds.width - border * 2) / SOURCE_SIZE;

      for (const pupil of [left, right]) {
        const eyeX = bounds.left + border + pupil.eye.x * scale;
        const eyeY = bounds.top + border + pupil.eye.y * scale;
        const deltaX = pointerX - eyeX;
        const deltaY = pointerY - eyeY;
        const distance = Math.hypot(deltaX, deltaY);

        if (!distance) {
          pupil.targetX.set(0);
          pupil.targetY.set(0);
          continue;
        }

        const directionX = deltaX / distance;
        const directionY = deltaY / distance;
        const maxX = pupil.eye.horizontalRange * scale;
        const maxY = pupil.eye.verticalRange * scale;
        const maxDistance =
          1 / Math.hypot(directionX / maxX, directionY / maxY);
        const travel = Math.min(distance, maxDistance);

        pupil.targetX.set(directionX * travel);
        pupil.targetY.set(directionY * travel);
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      hasPointer = true;
      updatePupils();
    };

    const handlePointerLeave = () => {
      hasPointer = false;
      left.targetX.set(0);
      left.targetY.set(0);
      right.targetX.set(0);
      right.targetY.set(0);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("resize", updatePupils, { passive: true });
    window.addEventListener("scroll", updatePupils, { passive: true, capture: true });
    window.addEventListener("blur", handlePointerLeave);
    finePointer.addEventListener("change", handlePointerLeave);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", updatePupils);
      window.removeEventListener("scroll", updatePupils, true);
      window.removeEventListener("blur", handlePointerLeave);
      finePointer.removeEventListener("change", handlePointerLeave);
    };
  }, [left, prefersReducedMotion, right]);

  return (
    <span
      ref={avatarRef}
      className="sleek-hero-avatar"
      aria-label="Portrait of Srijan Prasad"
      role="img"
    >
      <img
        src="/eye-tracking/avatar-pixel-base.png"
        alt=""
        className="sleek-hero-avatar-base"
        width="96"
        height="96"
      />
      <motion.img
        aria-hidden="true"
        alt=""
        className="sleek-hero-avatar-pupil"
        src="/eye-tracking/avatar-pixel-pupil-left.png"
        draggable={false}
        style={{ x: left.x, y: left.y }}
      />
      <motion.img
        aria-hidden="true"
        alt=""
        className="sleek-hero-avatar-pupil"
        src="/eye-tracking/avatar-pixel-pupil-right.png"
        draggable={false}
        style={{ x: right.x, y: right.y }}
      />
    </span>
  );
}
