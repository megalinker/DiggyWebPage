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
import { Rive } from './components/MiningAnimationComponent/MiningRiveAnimation/MiningRiveAnimation';
import { goICPSwap, goMiningPage } from './utils/clickUtils';
import Footer from './components/Footer/Footer';
import DiggyRoadMap from './components/DiggyRoadMap/DiggyRoadMap';
import DiggyHalving from './components/DiggHalving/DiggyHalving';
import DiggyMining from './components/MiningAnimationComponent/MiningComponent';

function App() {

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
            onClick={goMiningPage}
          />
          <OrangeButton
            text="BUY $DIGGY"
            onClick={goICPSwap}
          />
        </div>

        <img
          src={DiggyMiners}
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
              onClick={goICPSwap}
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
                onClick={goMiningPage}
              />
              <OrangeButton
                text="BUY $DIGGY"
                onClick={goICPSwap}
              />
            </div>
          </div>
        </div>
          <DiggyMining />

        <DiggyHalving />
        <DiggyRoadMap />
      </div>
      <Footer />
    </div>
  );
}

export default App;
