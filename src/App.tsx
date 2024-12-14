import styles from './App.module.scss';
import DiggyAboutText from './components/DiggyAboutText/DiggyAboutText';
import DiggyCoin from './components/DiggyCoin/DiggyCoin';
import DiggyCounter from './components/DiggyCounter/DiggyCounter';
import DiggyStats from './components/DiggyStats/DiggyStats';
import DiggyStatsText from './components/DiggyStatsText/DiggyStatsText';
import OrangeButton from './components/OrangeButton/OrangeButton';
import TopBar from './components/TopBar/TopBar';
import DiggyPlay from '/assets/DiggyPlay.svg';
import DiggyMiners from '/assets/DiggyMiners.webp';
import DiggyCoinImage from '/assets/DiggyCoin.webp';
import BlueSvg from '/assets/BlueSvg.svg';
import { RiveDemo } from './components/MiningAnimationComponent/InteractiveRive';

function App() {

  const handleMineNowClick = () => {
    window.open('https://hpalt-7yaaa-aaaal-amr3a-cai.raw.icp0.io/', '_blank');
  };

  const handleBuyDiggyClick = () => {
    window.open(
      'https://app.icpswap.com/swap/pro?input=ryjl3-tyaaa-aaaaa-aaaba-cai&output=dfg2l-2yaaa-aaaap-akpsa-cai',
      '_blank'
    );
  };

  return (
    <div className={styles.App}>
      <div className={styles.MainDiv}>
        <div className={styles.TopBar}>
          <TopBar />
        </div>
        <div className={styles.Coins}>
          <DiggyCoin size={75} />
          <DiggyCoin />
          <DiggyCoin size={75} />
        </div>
        <h1 className={styles.Title}>THE 1ST PoW GAMING TOKEN ON ICP</h1>
        <p className={styles.SubText}>
          For a limited time, you can create miners and extract $DIGGY
        </p>
        <div className={styles.DiggyCounter}>
          <DiggyCounter />
        </div>
        <div className={styles.MainButtons}>
          <OrangeButton
            text="MINE NOW"
            icon={DiggyPlay}
            onClick={handleMineNowClick}
          />
          <OrangeButton
            text="BUY $DIGGY"
            onClick={handleBuyDiggyClick}
          />
        </div>

        <img
          src={DiggyMiners}
          alt="DiggyMiners"
          className={styles.BottomImage}
        />

      </div>
      <div className={styles.DiggyBody}>

        <img src={BlueSvg} className={styles.BlueSvg} />
        <img src={DiggyCoinImage} className={styles.DiggyCoin} />

        <DiggyStats />
        <div className={styles.DiggySection}>
          <div className={styles.leftAbout}>
            <DiggyAboutText />
            <OrangeButton
              text="BUY $DIGGY"
              onClick={handleBuyDiggyClick}
            />
          </div>
          <DiggyCoin size={"25vw"} />
        </div>
        <div className={styles.DiggySection}>
          <div className={styles.DiggyTroopStatsContent}>
            <DiggyStatsText />
            <div className={styles.SecondButtonRow}>
              <OrangeButton
                text="MINE NOW"
                icon={DiggyPlay}
                onClick={handleMineNowClick}
              />
              <OrangeButton
                text="BUY $DIGGY"
                onClick={handleBuyDiggyClick}
              />
            </div>
          </div>
        </div>
        <div className={styles.DiggyMiningAnim}>
          <RiveDemo />
        </div>
      </div>
    </div>
  );
}

export default App;
