import React from 'react';
import styles from './TopBar.module.scss';
import DiggyCoin from '../DiggyCoin/DiggyCoin';
import DiscordIcon from '/assets/DiscordIcon.svg';
import XIcon from '/assets/X_icon.svg';

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
                <button
                    className={styles.iconButton}
                    onClick={() => handleDiscordClick()}
                    aria-label="Discord"
                >
                    <img src={DiscordIcon} alt="Discord" className={styles.iconImage} />
                </button>
                <button
                    className={styles.iconButton}
                    onClick={() => handleXClick()}
                    aria-label="X"
                >
                    <img src={XIcon} alt="X" className={styles.iconImage} />
                </button>
            </div>
        </header>
    );
};

export default TopBar;
