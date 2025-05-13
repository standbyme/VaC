import "./index.css";
import { Composition } from "remotion";
import { BeginningComponent, BeginningComponentSchema } from "./BeginningComponent";


export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={BeginningComponent}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={BeginningComponentSchema}
        defaultProps={{
          text: "Welcome to Remotion",
          color: "#000000",
        }}
      />
    </>
  );
};
