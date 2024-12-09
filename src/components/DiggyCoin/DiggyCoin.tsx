import React from 'react';
import styles from './DiggyCoin.module.scss';
import DiggyCoinImage from '/assets/DiggyCoin.webp';

interface DiggyCoinProps {
    size?: number | string;
}

const DiggyCoin: React.FC<DiggyCoinProps> = ({ size = '100px' }) => {
    return (
        <div
            className={styles.cointainer}
            style={{
                backgroundImage: `url(${DiggyCoinImage})`,
                width: size,
                height: size
            }}
        >
            <div
                className={styles.shine}
                style={{
                    WebkitMaskImage: `url(${DiggyCoinImage})`,
                    maskImage: `url(${DiggyCoinImage})`,
                    width: size,
                    height: size
                }}
            />
        </div>
    );
};


export default DiggyCoin;