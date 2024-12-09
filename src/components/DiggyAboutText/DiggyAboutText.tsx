import styles from './DiggyAboutText.module.scss';

const DiggyAboutText = () => {
    return (
        <div className={styles.DiggyAboutText}>
            <h1>ABOUT $DIGGY</h1>
            <p className={styles.AboutText}>
                $DIGGY is the first proof-of-work (PoW) gaming token on ICP, launched via the BOOM Launchpad.
                This launch represents the first public test of the BOOM Launchpad,
                which features PoW mining and offers rewards for mining and burning cycles.
            </p>
        </div>
    );
};

export default DiggyAboutText;
