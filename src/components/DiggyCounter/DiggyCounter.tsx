import React, { useEffect, useState } from 'react';
import styles from './DiggyCounter.module.scss';

const DiggyCounter: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date('2025-01-29T19:15:00+05:30').getTime();
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({
                    days: String(days).padStart(2, '0'),
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0'),
                });
            } else {
                setTimeLeft({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
            }
        };

        calculateTimeLeft();

        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.counter}>
            <div className={styles.box}>
                <div className={styles.value}>{timeLeft.days}</div>
                <div className={styles.label}>Days</div>
            </div>
            <div className={styles.box}>
                <div className={styles.value}>{timeLeft.hours}</div>
                <div className={styles.label}>Hours</div>
            </div>
            <div className={styles.box}>
                <div className={styles.value}>{timeLeft.minutes}</div>
                <div className={styles.label}>Minutes</div>
            </div>
            <div className={styles.box}>
                <div className={styles.value}>{timeLeft.seconds}</div>
                <div className={styles.label}>Seconds</div>
            </div>
        </div>
    );
};

export default DiggyCounter;
