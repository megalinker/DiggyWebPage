import { useMediaQuery } from 'react-responsive';
import { goICPSwap, goMiningPage } from '../../utils/clickUtils';
import OrangeButton from '../OrangeButton/OrangeButton';
import SocialIcons from '../SocialIcons/SocialIcons';
import styles from './Footer.module.scss';
import DiggyFooter from '/assets/DiggyFooter.webp';
import DiggyPlay from '/assets/DiggyPlay.svg';

function Footer() {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1150px)' });
    const isSmallerScreen = useMediaQuery({ query: '(max-width: 800px)' });

    return (
        <div className={styles.MainFt}>

            <p className={styles.FooterText}>
                <strong>Join the $DIGGY mining action!</strong> Experience the power of the first PoW mining token
                on #ICP.
                {!isSmallerScreen && " Make history and be part of our community."}
            </p>
            {!isSmallScreen && (
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
            )}
            {!isSmallerScreen && (
                <SocialIcons />
            )}
            <p className={styles.FooterText}>  COPYRIGHT © 2024 DIGGY. ALL RIGHTS RESERVED </p>
            <img
                src={DiggyFooter}
                className={styles.BottomImage}
            />
        </div>
    );
}

export default Footer;
