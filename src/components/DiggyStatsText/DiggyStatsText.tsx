import styles from './DiggyStatsText.module.scss';
import CopyIcon from '/assets/copy_icon.svg';
import ICPSwap from '/assets/IcpSwapIcon.webp';
import DEXIcon from '/assets/DexScreenerIcon.webp';

const DiggyStatsText = () => {
    return (
        <div className={styles.DiggyStatsText}>
            <h1>DIGGYTROOP STATS</h1>

            <div className={styles.DiggyTroopStatsH}>
                <div className={styles.DiggyCanisterId}>
                    <div className={styles.DiggyTitleStat }>
                        CANISTER ID:
                    </div>
                    <p className={`${styles.ContentColumn} ${styles.Canister}`}>dfg2l-2yaaa-aaaap-akpsa-cai</p>
                    <img src={CopyIcon} className={styles.copyIcon} />
                </div>
                <div className={styles.DiggyCanisterId}>
                    <div className={styles.DiggyPage}>
                        <img src={ICPSwap} className={styles.pageIcon} />
                        <p className={styles.ContentColumn}>ICPSwap</p>
                    </div>
                    <div className={styles.DiggyPage}>
                        <img src={DEXIcon} className={styles.pageIcon} />
                        <p className={styles.ContentColumn}>DEX Screener</p>
                    </div>
                </div>
            </div>
            <div className={styles.DiggyTroopStats}>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>User Count</p>
                    <p className={styles.ContentColumn}>165</p>
                </div>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>Miner Count</p>
                    <p className={styles.ContentColumn}>1635</p>
                </div>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>Halving Count</p>
                    <p className={styles.ContentColumn}>0</p>
                </div>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>Next Halving Count</p>
                    <p className={styles.ContentColumn}>3197</p>
                </div>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>Block Count</p>
                    <p className={styles.ContentColumn}>9763</p>
                </div>
            </div>

            <div className={styles.DiggyTroopStats}>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>Price</p>
                    <p className={styles.ContentColumn}>0.000033183208 ICP / $0.000485</p>
                </div>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>Total Supply</p>
                    <p className={styles.ContentColumn}>99,746,840.1196604</p>
                </div>
                <div className={styles.DiggyTroopStatsColumn}>
                    <p className={styles.TitleColumn}>Market Cap</p>
                    <p className={styles.ContentColumn}>$48,713</p>
                </div>
            </div>
        </div>
    );
};

export default DiggyStatsText;
