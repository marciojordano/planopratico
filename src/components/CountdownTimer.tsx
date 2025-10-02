import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-black text-white py-6 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="text-amber-400" size={24} />
          <p className="text-lg font-semibold text-rose-300">
            Inscrições encerram em:
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-4 min-w-[80px]">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.days}</div>
            <div className="text-xs md:text-sm text-rose-100">DIAS</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-4 min-w-[80px]">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs md:text-sm text-rose-100">HORAS</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-4 min-w-[80px]">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs md:text-sm text-rose-100">MIN</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-4 min-w-[80px]">
            <div className="text-3xl md:text-4xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs md:text-sm text-rose-100">SEG</div>
          </div>
        </div>
      </div>
    </div>
  );
}
