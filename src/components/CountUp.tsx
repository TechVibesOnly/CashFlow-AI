import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ end, duration = 1000, prefix = '', className }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {prefix}{count.toLocaleString('en-IN')}
    </span>
  );
};
