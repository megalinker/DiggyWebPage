import React from 'react';
import styles from './TopBar.module.scss';
import DiggyCoin from '../DiggyCoin/DiggyCoin';
import DiscordIcon from '/assets/DiscordIcon.svg';
import XIcon from '/assets/X_icon.svg';
import SocialIcons from '../SocialIcons/SocialIcons';

const TopBar: React.FC = () => {

    const handleDiscordClick = () => {
        window.open('https://x.com/diggycoin_', '_blank');
    };

    const handleXClick = () => {
        window.open('https://x.com/diggycoin_', '_blank');
    };


    return (
        <header className={styles.topBar}>
            {/* Left Section */}
            <div className={styles.leftSection}>
                <DiggyCoin size={40} />
                <span className={styles.orangeText}>DIGGY</span>
            </div>

            {/* Right Section */}
            <div className={styles.rightSection}>
                <SocialIcons />
            </div>
        </header>
    );
};

export default TopBar;
