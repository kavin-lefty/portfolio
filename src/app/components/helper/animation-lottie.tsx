"use client";

import { FC } from "react";
import Lottie from "lottie-react";

/**
 * If you import a JSON file (`import rocket from "./rocket.json"`),
 *   the value is an object that Lottie expects as `animationData`.
 * Change `object` → `string` if you actually pass a URL.
 */
interface AnimationLottieProps {
  animationPath: object; // or AnimationData from @lottiefiles if you have the type
  width?: string | number; // optional override
}

const AnimationLottie: FC<AnimationLottieProps> = ({
  animationPath,
  width = "95%",
}) => <Lottie animationData={animationPath} loop autoplay style={{ width }} />;

export default AnimationLottie;
