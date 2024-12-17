import { goRoadMap } from '../../utils/clickUtils';
import OrangeButton from '../OrangeButton/OrangeButton';
import styles from './DiggyRoadMap.module.scss';
import DiggyFeo from '/assets/DiggyAlert.webp'


const DiggyRoadMap = () => {

    return (
        <div className={styles.DiggyRoadMap}>
            <h1>DIGGY ROADMAP</h1>

            <img src={DiggyFeo} className={styles.DiggyFeo} />
            <p className={styles.RoadMapText}>We are working on the roadmap and the first official game of $DIGGY </p>
            <div className={styles.RoadButton}>
                <OrangeButton
                    text="ROADMAP"
                    onClick={goRoadMap}
                />
            </div >
        </div >
    );
};

export default DiggyRoadMap;
