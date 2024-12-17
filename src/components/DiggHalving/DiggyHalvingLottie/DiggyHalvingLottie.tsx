import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import SVG1 from '/assets/DiggyHalving.json';

const DiggyHalvingLottie: React.FC = () => {

    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        const fetchAnimation = async () => {
            const response = await fetch("https://lottie.host/67471238-e6c4-4724-9b07-6904d85d4acc/lboUydrrIO.json");
            const data = await response.json();
            setAnimationData(data);
        };

        fetchAnimation();
    }, []);

    const options = {
        animationData: animationData,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options);

    return <div>{View} </div>;
};

export default DiggyHalvingLottie;
