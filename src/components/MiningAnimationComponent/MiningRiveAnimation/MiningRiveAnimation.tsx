import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import animSrc from "/assets/diggymining.riv";

export const Rive = () => {
    const { RiveComponent } = useRive({
        src: animSrc,
        stateMachines: "DefState",
        layout: new Layout({
            fit: Fit.FitWidth,
            alignment: Alignment.Center,
        }),
        autoplay: true,
    });

    return <RiveComponent />;
};