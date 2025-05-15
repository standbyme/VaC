import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { gsap } from "gsap";
import { use, useRef } from "react";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);


export const BeginningComponentSchema = z.object({
  text: z.string(),
  color: zColor(),
});

// https://enlear.academy/how-to-integrate-greensock-with-remotion-e4eee6f5a41f

export const BeginningComponent: React.FC<z.infer<typeof BeginningComponentSchema>> = ({
  text,
  color,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const squareRef = useRef(null);

  // Animate from 0 to 1 after 25 frames
  // const logoTranslationProgress = spring({
  //   frame: frame - 25,
  //   fps,
  //   config: {
  //     damping: 100,
  //   },
  // });

  // Fade out the animation at the end
  // const opacity = interpolate(
  //   frame,
  //   [durationInFrames - 25, durationInFrames - 15],
  //   [1, 0],
  //   {
  //     extrapolateLeft: "clamp",
  //     extrapolateRight: "clamp",
  //   },
  // );
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(squareRef.current, { rotation: -90, x: 0, duration: 5 });
    timelineRef.current = tl;
  });


  useGSAP(() => {
    const time = frame / fps;
    if (timelineRef.current) {
      timelineRef.current.seek(time).pause();
    }
  }, [frame]);

  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <AbsoluteFill>
        <div
          ref={squareRef}
          style={{
            fontSize: 100,
            color: color,
          }}>{text}</div>
      </AbsoluteFill >
    </AbsoluteFill>
  );
};
