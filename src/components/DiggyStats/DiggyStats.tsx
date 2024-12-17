import React, { useEffect, useState } from 'react';
import DiggyCoin from '../DiggyCoin/DiggyCoin';
import styles from './DiggyStats.module.scss';
import { useMediaQuery } from 'react-responsive';
import ICPToken from '/assets/ICPToken.svg';
import { Actor, HttpAgent } from '@dfinity/agent';
import { canisterId as icpSCanisterId, idlFactory as icpSIdlFactory } from '../../declarations/icpSwapCanister';
import { canisterId as icpSCanisterId2, idlFactory as icpSIdlFactory2 } from '../../declarations/icpSwapAnotherCanister';
import { PublicTokenOverview } from '../../declarations/icpSwapCanister/icpswap.did';

interface AnimatedNumberProps {
    value: number;
    decimalPlaces?: number;
}
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, decimalPlaces = 0 }) => {
    const [displayValue, setDisplayValue] = useState<number>(value);

    useEffect(() => {
        const duration = 1500; // 1.5 seconds
        const start = displayValue;
        const end = value;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const rawValue = start + (end - start) * progress;

            // Round to the specified decimal places
            const factor = Math.pow(10, decimalPlaces);
            const newValue = Math.round(rawValue * factor) / factor;

            setDisplayValue(newValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(end);
            }
        };

        if (start !== end) {
            requestAnimationFrame(animate);
        }

        return () => {
            // Cleanup if needed
        };
    }, [value]);

    const formattedValue = displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });

    return <span>{formattedValue}</span>;
};

const DiggyStats: React.FC = () => {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1775px)' });

    const [TVL, setTVL] = useState(0);
    const [P24, setP24] = useState(0);
    const [vol24, setVol24] = useState(0);
    const [vol7D, setVol7D] = useState(0);
    const [totalVol, setTotalVol] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {

            const agent = HttpAgent.createSync();

            const actorICPS = Actor.createActor(icpSIdlFactory, {
                agent: agent,
                canisterId: icpSCanisterId,
            });

            //const actorICPS2 = Actor.createActor(icpSIdlFactory2, {
            //    agent: agent,
            //    canisterId: icpSCanisterId2,
            //});

            // const tokenBalance = await actorICPS2.getTokenBalance() as { token0: bigint; token1: bigint };

            // Define token addresses and Dexscreener URL
            const tokenDiggy = "dfg2l-2yaaa-aaaap-akpsa-cai";
            const tokenICP = "ryjl3-tyaaa-aaaaa-aaaba-cai";
            const tokenAddresses = "7q5ax-7yaaa-aaaag-qnacq-cai";
            const dexscreenerUrl = `https://api.dexscreener.com/latest/dex/pairs/icp/${tokenAddresses}`;

            // Create the Dexscreener fetch promise
            const fetchDexscreener = fetch(dexscreenerUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Dexscreener API error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            });

            // Fetch token stats and Dexscreener data
            const [diggystats, icpstats, dexscreenerData] = await Promise.all([
                actorICPS.getToken(tokenDiggy) as Promise<PublicTokenOverview>,
                actorICPS.getToken(tokenICP) as Promise<PublicTokenOverview>,
                fetchDexscreener,
            ]);

            setVol24(diggystats.volumeUSD1d);
            setVol7D(diggystats.volumeUSD7d);
            setTotalVol(diggystats.totalVolumeUSD);

            const priceDiggyUSD = diggystats.priceUSD;
            const priceICP = icpstats.priceUSD;

            // Process Dexscreener data
            if (dexscreenerData.pairs && dexscreenerData.pairs.length > 0) {
                const pair = dexscreenerData.pairs[0];

                const price24h = pair.priceChange.h24;
                setP24(Number(price24h));

                const pooledDiggy = pair.liquidity.base;
                const pooledICP = pair.liquidity.quote;

                const totalDiggyUSD = Number(pooledDiggy) * priceDiggyUSD;
                const totalICPUSD = Number(pooledICP) * priceICP;
                const TVL = totalDiggyUSD + totalICPUSD;
                setTVL(TVL);
            } else {
                console.warn("No pairs data available from Dexscreener.");
            }

        };

        fetchStats();

        const interval = setInterval(fetchStats, 10000); // Fetch every 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    const getP24BackgroundClass = () => {
        if (P24 > 0) return styles.positive24;
        if (P24 < 0) return styles.negative24;
        return '';
    };

    return (
        <div className={styles.DiggyStats}>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>Pool</p>
                <div className={styles.DiggyStatsIcons}>
                    {!isSmallScreen && (
                        <>
                            <DiggyCoin size={"1.5vw"} />
                            <img src={ICPToken} alt="ICP" className={styles.iconImage} />
                        </>
                    )}
                    <p className={styles.ContentColumn}>DIGGY / ICP</p>
                </div>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>TVL</p>
                <p className={styles.ContentColumn}>$ <AnimatedNumber value={TVL} decimalPlaces={2} /></p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>Price Change (24H)</p>
                <p className={`${styles.ContentColumn} ${getP24BackgroundClass()}`}><AnimatedNumber value={P24} decimalPlaces={2} />%</p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>VOLUME (24H)</p>
                <p className={styles.ContentColumn}>$ <AnimatedNumber value={vol24} decimalPlaces={2} /></p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>VOLUME (7D)</p>
                <p className={styles.ContentColumn}>$ <AnimatedNumber value={vol7D} decimalPlaces={2} /></p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>Total Volume</p>
                <p className={styles.ContentColumn}>$ <AnimatedNumber value={totalVol} decimalPlaces={2} /></p>
            </div>
        </div>
    );
};

export default DiggyStats;
