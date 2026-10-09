"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const spriteSets: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

type SpritePosition = { x: number; y: number };

export function CursorPet() {
  const prefersReducedMotion = useReducedMotion();
  const catX = useMotionValue(32);
  const catY = useMotionValue(32);
  const springX = useSpring(catX, { stiffness: 260, damping: 32, mass: 0.45 });
  const springY = useSpring(catY, { stiffness: 260, damping: 32, mass: 0.45 });
  const x = useTransform(springX, (value) => value - 16);
  const y = useTransform(springY, (value) => value - 16);
  const [isEnabled, setIsEnabled] = useState(false);
  const [sprite, setSprite] = useState<SpritePosition>({ x: -96, y: -96 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let mouseX = 0;
    let mouseY = 0;
    let nekoX = 32;
    let nekoY = 32;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let lastFrameTimestamp = 0;
    let frameAccumulator = 0;
    let animationFrame = 0;

    const setCurrentSprite = (name: string, frame: number) => {
      const frames = spriteSets[name];
      const [spriteX, spriteY] = frames[frame % frames.length];
      setSprite({ x: spriteX * 32, y: spriteY * 32 });
    };

    const resetIdleAnimation = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const idle = () => {
      idleTime += 1;
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        const availableAnimations = ["sleeping", "scratchSelf"];
        if (nekoX < 32) availableAnimations.push("scratchWallW");
        if (nekoY < 32) availableAnimations.push("scratchWallN");
        if (nekoX > window.innerWidth - 32) availableAnimations.push("scratchWallE");
        if (nekoY > window.innerHeight - 32) availableAnimations.push("scratchWallS");
        idleAnimation =
          availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setCurrentSprite("tired", 0);
            break;
          }
          setCurrentSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setCurrentSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setCurrentSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    };

    const frame = () => {
      frameCount += 1;
      const diffX = nekoX - mouseX;
      const diffY = nekoY - mouseY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < 10 || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setCurrentSprite("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }

      let direction = "";
      if (diffY / distance > 0.5) direction += "N";
      if (diffY / distance < -0.5) direction += "S";
      if (diffX / distance > 0.5) direction += "W";
      if (diffX / distance < -0.5) direction += "E";
      setCurrentSprite(direction, frameCount);

      nekoX -= (diffX / distance) * 10;
      nekoY -= (diffY / distance) * 10;
      nekoX = Math.min(Math.max(16, nekoX), window.innerWidth - 16);
      nekoY = Math.min(Math.max(16, nekoY), window.innerHeight - 16);
      catX.set(nekoX);
      catY.set(nekoY);
    };

    const animate = (timestamp: number) => {
      if (lastFrameTimestamp === 0) {
        lastFrameTimestamp = timestamp;
      } else {
        frameAccumulator += Math.min(timestamp - lastFrameTimestamp, 1000);
        lastFrameTimestamp = timestamp;
        const elapsedFrames = Math.min(Math.floor(frameAccumulator / 100), 10);
        frameAccumulator -= elapsedFrames * 100;
        for (let i = 0; i < elapsedFrames; i += 1) {
          frame();
        }
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const syncAvailability = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      setIsEnabled(enabled);
      if (enabled && !animationFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      } else if (!enabled && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    syncAvailability();
    finePointer.addEventListener("change", syncAvailability);
    reducedMotion.addEventListener("change", syncAvailability);
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      finePointer.removeEventListener("change", syncAvailability);
      reducedMotion.removeEventListener("change", syncAvailability);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [catX, catY, prefersReducedMotion]);

  if (!isEnabled || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-pet"
      data-testid="cursor-pet"
      initial={false}
      style={{
        x,
        y,
        backgroundPosition: `${sprite.x}px ${sprite.y}px`,
      }}
    />
  );
}
