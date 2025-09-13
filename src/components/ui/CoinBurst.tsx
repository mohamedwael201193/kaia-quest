import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState } from 'react';

interface CoinProps {
  id: number;
  delay: number;
}

function Coin({ id, delay }: CoinProps) {
  const randomX = Math.random() * 200 - 100; // -100 to 100
  const randomY = Math.random() * 100 + 50; // 50 to 150
  
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 w-8 h-8 bg-gradient-treasure rounded-full border-2 border-gold-glow shadow-treasure flex items-center justify-center text-sm font-bold text-ink z-50"
      initial={{ 
        x: 0, 
        y: 0, 
        scale: 0.5, 
        opacity: 0,
        rotate: 0 
      }}
      animate={{ 
        x: randomX, 
        y: -randomY, 
        scale: [0.5, 1, 0.8], 
        opacity: [0, 1, 1, 0],
        rotate: 360 * 2
      }}
      transition={{ 
        duration: 1.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.3, 0.8, 1]
      }}
      style={{ 
        transformOrigin: 'center center',
      }}
    >
      💰
    </motion.div>
  );
}

export function CoinBurst() {
  const showCoinBurst = useAppStore((state) => state.showCoinBurst);
  const [coins, setCoins] = useState<number[]>([]);

  useEffect(() => {
    if (showCoinBurst) {
      // Generate 8-12 coins with staggered delays
      const coinCount = Math.floor(Math.random() * 5) + 8; // 8-12 coins
      const newCoins = Array.from({ length: coinCount }, (_, i) => i);
      setCoins(newCoins);
      
      // Clear coins after animation
      setTimeout(() => setCoins([]), 2000);
    }
  }, [showCoinBurst]);

  return (
    <AnimatePresence>
      {showCoinBurst && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {coins.map((id) => (
            <Coin 
              key={id} 
              id={id} 
              delay={Math.random() * 0.3} 
            />
          ))}
          
          {/* Sparkle Effect */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gold rounded-full"
                  style={{
                    left: `${Math.cos((i / 12) * Math.PI * 2) * 40}px`,
                    top: `${Math.sin((i / 12) * Math.PI * 2) * 40}px`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function triggerCoinAnimation() {
  const store = useAppStore.getState();
  store.triggerCoinBurst();
}