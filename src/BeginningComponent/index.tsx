import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const BeginningComponentSchema = z.object({
  text: z.string(),
  color: zColor(),
});

export const BeginningComponent: React.FC<z.infer<typeof BeginningComponentSchema>> = ({
  text,
  color,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Animate from 0 to 1 after 25 frames
  // const logoTranslationProgress = spring({
  //   frame: frame - 25,
  //   fps,
  //   config: {
  //     damping: 100,
  //   },
  // });

  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <AbsoluteFill style={{ opacity }}>
        <div style={{
          fontSize: 100,
          color: color,
        }}>{text}</div>
      </AbsoluteFill >
    </AbsoluteFill>
  );
};
