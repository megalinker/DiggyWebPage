import React from 'react';
import styles from './SocialIcons.module.scss';
import DiscordIcon from '/assets/DiscordIcon.svg';
import XIcon from '/assets/X_icon.svg';
import { goDiggyscord, goDiggyX } from '../../utils/clickUtils';

const SocialIcons: React.FC = () => {

    return (
        <div className={styles.socialIcons}>
            <button
                className={styles.iconButton}
                onClick={goDiggyscord}
                aria-label="Discord"
            >
                <img src={DiscordIcon} alt="Discord" className={styles.iconImage} />
            </button>
            <button
                className={styles.iconButton}
                onClick={goDiggyX}
                aria-label="X"
            >
                <img src={XIcon} alt="X" className={styles.iconImage} />
            </button>
        </div>
    );
};

export default SocialIcons;
