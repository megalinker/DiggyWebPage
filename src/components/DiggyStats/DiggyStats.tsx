import React from 'react';
import DiggyCoin from '../DiggyCoin/DiggyCoin';
import styles from './DiggyStats.module.scss';
import { useMediaQuery } from 'react-responsive';

const DiggyStats: React.FC = () => {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1775px)' });

    return (
        <div className={styles.DiggyStats}>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>Pool</p>
                <div className={styles.DiggyStatsIcons}>
                    {!isSmallScreen && (
                        <>
                            <DiggyCoin size={33} />
                            <DiggyCoin size={33} />
                        </>
                    )}
                    <p className={styles.ContentColumn}>DIGGY / ICP</p>
                </div>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>TVL</p>
                <p className={styles.ContentColumn}>$8.27K</p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>APR (24H)</p>
                <p className={styles.ContentColumn}>2.16%</p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>VOLUME (24H)</p>
                <p className={styles.ContentColumn}>$207.625</p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>VOLUME (7D)</p>
                <p className={styles.ContentColumn}>$4.36K</p>
            </div>
            <div className={styles.DiggyStatsColumn}>
                <p className={styles.TitleColumn}>Total Volume</p>
                <p className={styles.ContentColumn}>$48.65K</p>
            </div>
        </div>
    );
};

export default DiggyStats;
