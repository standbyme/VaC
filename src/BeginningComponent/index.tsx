import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);


export const BeginningComponentSchema = z.object({
  text: z.string(),
  color: zColor(),
});


export const BeginningComponent: React.FC<z.infer<typeof BeginningComponentSchema>> = ({
  text,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elementRef = useRef(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (timelineRef.current === null) {
      const tl = gsap.timeline({ paused: true });
      tl.to(elementRef.current, { rotation: -90, x: 0, duration: 5 });
      timelineRef.current = tl;
    }

    const time = frame / fps;
    timelineRef.current.seek(time).pause();
  }, [frame]);

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <AbsoluteFill>
        <div
          ref={elementRef}
          style={{
            fontSize: 100,
            color: color,
          }}>{text}</div>
      </AbsoluteFill >
    </AbsoluteFill>
  );
};
