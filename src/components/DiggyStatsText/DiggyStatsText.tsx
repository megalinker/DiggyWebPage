import styles from './DiggyStatsText.module.scss';
import CopyIcon from '/assets/copy_icon.svg';
import ICPSwap from '/assets/IcpSwapIcon.webp';
import DEXIcon from '/assets/DexScreenerIcon.webp';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { canisterId, idlFactory } from '../../declarations/diggyCanister';
import { canisterId as icpSCanisterId, idlFactory as icpSIdlFactory } from '../../declarations/icpSwapCanister';
import { Stats } from '../../declarations/diggyCanister/diggycanister.did';
import { goDexScreener, goICPSwap } from '../../utils/clickUtils';
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

const DiggyStatsText = () => {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 350px)' });

    const [userCount, setUserCount] = useState(0);
    const [minerCount, setMinerCount] = useState(0);
    const [activeMinerCount, setActiveMinerCount] = useState(0);
    const [halvingCount, setHalvingCount] = useState(0);
    const [blocksUntilHalving, setBlocksUntilHalving] = useState(0);
    const [blockReward, setBlockReward] = useState(0);
    const [blockCount, setBlockCount] = useState(0);
    const [priceUSD, setPriceUSD] = useState(0);
    const [priceICP, setPriceICP] = useState(0);
    const [liquidityUSD, setLiquidityUSD] = useState(0);
    const [FDV, setFDV] = useState(0);
    const [marketCap, setMarketCap] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {

            const agent = HttpAgent.createSync();

            const actorDiggy = Actor.createActor(idlFactory, {
                agent: agent,
                canisterId,
            });

            const actorICPS = Actor.createActor(icpSIdlFactory, {
                agent: agent,
                canisterId: icpSCanisterId,
            });

            const tokenAddresses = "7q5ax-7yaaa-aaaag-qnacq-cai";
            const dexscreenerUrl = `https://api.dexscreener.com/latest/dex/pairs/icp/${tokenAddresses}`;

            const dexscreenerResponse = await fetch(dexscreenerUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!dexscreenerResponse.ok) {
                throw new Error(`Dexscreener API error: ${dexscreenerResponse.status} ${dexscreenerResponse.statusText}`);
            }

            const [stats, diggystats, icpstats, dexscreenerData] = await Promise.all([
                actorDiggy.getMinterStats() as Promise<Stats>,
                actorICPS.getToken("dfg2l-2yaaa-aaaap-akpsa-cai") as Promise<PublicTokenOverview>,
                actorICPS.getToken("ryjl3-tyaaa-aaaaa-aaaba-cai") as Promise<PublicTokenOverview>,
                fetch(dexscreenerUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`Dexscreener API error: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                }),
            ]);

            setUserCount(Number(stats.user_count));
            setMinerCount(Number(stats.miner_count));
            setActiveMinerCount(Number(stats.active_miner_count));
            setHalvingCount(Number(stats.halving_count));
            setBlocksUntilHalving(Number(stats.next_halving_blocks_count));
            setBlockReward(Number(stats.current_block_reward) / 100000000);
            setBlockCount(Number(stats.block_count));
            setPriceUSD(Number(diggystats.priceUSD));
            setPriceICP(Number(diggystats.priceUSD / icpstats.priceUSD));

            const liquidityUSD = dexscreenerData.pairs[0].liquidity.usd;
            const fdv = dexscreenerData.pairs[0].fdv;
            const marketCap = dexscreenerData.pairs[0].marketCap;

            setLiquidityUSD(liquidityUSD);
            setFDV(fdv);
            setMarketCap(marketCap);

        };

        fetchStats();

        const interval = setInterval(fetchStats, 10000); // Fetch every 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const copyCanisterId = async () => {
        const canisterId = "dfg2l-2yaaa-aaaap-akpsa-cai";
        await navigator.clipboard.writeText(canisterId);
    };

    return (
        <div className={styles.DiggyStatsText}>
            <h1>DIGGYTROOP STATS</h1>

            <div className={styles.DiggyTroopStatsH}>
                <div className={styles.DiggyCanisterId}>
                    <div className={styles.DiggyTitleStat}>
                        CANISTER ID:
                    </div>
                    <p className={`${styles.ContentColumn} ${styles.Canister}`} onClick={copyCanisterId}
                        style={{ cursor: 'pointer' }}>dfg2l-2yaaa-aaaap-akpsa-cai</p>
                    <img src={CopyIcon} className={styles.copyIcon} onClick={copyCanisterId}
                        style={{ cursor: 'pointer' }} />
                </div>
                <div className={styles.DiggyCanisterId} onClick={goICPSwap}>
                    <div className={styles.DiggyPage}>
                        <img src={ICPSwap} className={styles.pageIcon} />
                        <p className={styles.ContentColumn}>ICPSwap</p>
                    </div>
                    <div className={styles.DiggyPage} onClick={goDexScreener}>
                        <img src={DEXIcon} className={styles.pageIcon} />
                        <p className={styles.ContentColumn}>DEX Screener</p>
                    </div>
                </div>
            </div>
            <div className={styles.DiggyStatsRow}>
                <div className={styles.DiggyTroopStatsL}>
                    <div className={styles.DiggyTroopStatsColumn}>
                        <div className={styles.DiggyTitleColumn}>
                            MINING
                        </div>
                        <p className={styles.TitleColumn}>User Count</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={userCount} /></p>
                        <p className={styles.TitleColumn}>Miner Count</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={minerCount} /></p>
                        <p className={styles.TitleColumn}>Active Miner Count</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={activeMinerCount} /></p>
                        <p className={styles.TitleColumn}>Halving Count</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={halvingCount} /></p>
                        <p className={styles.TitleColumn}>Blocks Until Next Halving</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={blocksUntilHalving} /></p>
                    </div>

                    <div className={styles.DiggyTroopStatsColumn}>
                        <p className={styles.TitleColumn}>Current Block Reward</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={blockReward} decimalPlaces={3} /></p>
                        <p className={styles.TitleColumn}>Block Count</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={blockCount} /></p>
                        {!isSmallScreen && (
                            <>
                                <p className={styles.TitleColumn}>&nbsp;</p>
                                <p className={styles.ContentColumn}>&nbsp;</p>
                                <p className={styles.TitleColumn}>&nbsp;</p>
                                <p className={styles.ContentColumn}>&nbsp;</p>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.DiggyTroopStatsR}>
                    <div className={styles.DiggyTroopStatsColumn}>
                        <div className={styles.DiggyTitleColumn}>
                            MARKET
                        </div>
                        <p className={styles.TitleColumn}>Price USD</p>
                        <p className={styles.ContentColumn}>$ <AnimatedNumber value={priceUSD} decimalPlaces={8} /></p>
                        <p className={styles.TitleColumn}>Price ICP</p>
                        <p className={styles.ContentColumn}><AnimatedNumber value={priceICP} decimalPlaces={8} /> ICP</p>
                        <p className={styles.TitleColumn}>Liquidity</p>
                        <p className={styles.ContentColumn}>$ <AnimatedNumber value={liquidityUSD} decimalPlaces={2} /></p>
                        <p className={styles.TitleColumn}>FDV</p>
                        <p className={styles.ContentColumn}>$ <AnimatedNumber value={FDV} decimalPlaces={0} /></p>
                        <p className={styles.TitleColumn}>Market Cap</p>
                        <p className={styles.ContentColumn}>$ <AnimatedNumber value={marketCap} decimalPlaces={0} /></p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DiggyStatsText;
