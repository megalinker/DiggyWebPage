import styles from './DiggyHalving.module.scss';
import DiggyHalvingLottie from './DiggyHalvingLottie/DiggyHalvingLottie';

const DiggyHalving = () => {
    return (
        <div className={styles.DiggyHalving}>
            <div className={styles.Animation}>
                <DiggyHalvingLottie />
            </div>
            <div>
                <p className={styles.AboutText}>
                    <h1>FIRST HALVING OF $DIGGY</h1>
                    We have reached a historic milestone! Mining rewards are halved, strengthening our economy and ensuring sustainable growth
                </p>
            </div>
        </div>
    );
};

export default DiggyHalving;
