import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './OrangeButton.module.scss';

interface OrangeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: string;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({ text, icon, ...buttonProps }) => {
    return (
        <button className={styles.pushable} {...buttonProps}>
            <span className={styles.front}>
                {icon && <img src={icon} alt="" className={styles.icon} />}
                {text}
            </span>
        </button>
    );
};

export default OrangeButton;
