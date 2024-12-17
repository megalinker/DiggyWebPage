import styles from './DiggyMining.module.scss';
import { Rive } from './MiningRiveAnimation/MiningRiveAnimation';


const DiggyMining = () => {

    return (
        <div className={styles.DiggyMining}>

            <p className={styles.AboutText}>
                <h1>MINING EVENT</h1>
                We're in the most exciting phase! The $DIGGY mining event ends at the end of January. Participate and take your $DIGGY to new heights
            </p>

            <div className={styles.DiggyMiningAnim}>
                <Rive />
            </div>

        </div >
    );
};

export default DiggyMining;
