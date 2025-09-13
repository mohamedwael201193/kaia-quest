import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Play, Trophy } from 'lucide-react';

const Home = () => {
  const [chestClicked, setChestClicked] = useState(false);

  const handleBeginQuest = () => {
    setChestClicked(true);
    // Here would integrate with LINE LIFF SDK
    // liff.login()
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -200, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="font-adventure-heading text-6xl md:text-8xl font-bold text-primary-foreground mb-4">
            Kaia Quest
          </h1>
          <motion.div 
            className="flex items-center justify-center gap-2 text-accent text-xl font-adventure-body"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-6 w-6" />
            Adventure Awaits
            <Sparkles className="h-6 w-6" />
          </motion.div>
        </motion.div>

        {/* Animated Treasure Chest (CSS-based) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12 relative"
        >
          <motion.div
            className="relative cursor-pointer group"
            onClick={handleBeginQuest}
            animate={{ 
              y: [0, -10, 0],
              rotateY: chestClicked ? 360 : 0
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 1.5, ease: "easeOut" }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Treasure Chest */}
            <div className="relative">
              {/* Chest Body */}
              <div className="w-32 h-24 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg border-4 border-amber-700 shadow-treasure group-hover:shadow-mystical transition-all duration-300">
                <div className="absolute inset-2 border-2 border-amber-600 rounded opacity-60"></div>
              </div>
              
              {/* Chest Lid */}
              <motion.div
                className="absolute -top-3 left-0 w-32 h-6 bg-gradient-to-br from-amber-700 to-amber-800 rounded-t-lg border-4 border-amber-600"
                animate={{
                  rotateX: chestClicked ? -45 : 0,
                  transformOrigin: "bottom"
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Lock */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-accent rounded-sm border border-yellow-600"></div>
              </motion.div>
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-accent opacity-20 blur-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Sparkles */}
              <div className="absolute -inset-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent rounded-full"
                    style={{
                      left: `${20 + Math.cos((i / 8) * Math.PI * 2) * 60}px`,
                      top: `${20 + Math.sin((i / 8) * Math.PI * 2) * 60}px`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              {/* Treasure Glow when opened */}
              {chestClicked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                >
                  <Trophy className="w-8 h-8 text-accent animate-glow-pulse" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center space-y-6"
        >
          <p className="text-primary-foreground/90 text-lg font-adventure-body max-w-md mx-auto">
            Embark on magical DeFi adventures. Save treasures, complete quests, and build your fortune in the mystical realm of Web3.
          </p>
          
          <Button
            variant="hero"
            size="xl"
            onClick={handleBeginQuest}
            className="relative group overflow-hidden"
            disabled={chestClicked}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-treasure opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-3">
              <Play className="h-6 w-6" />
              {chestClicked ? 'Opening Portal...' : 'Begin Your Quest'}
            </div>
          </Button>
          
          <motion.p 
            className="text-primary-foreground/70 text-sm font-adventure-body"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Click the treasure chest to start your adventure
          </motion.p>
        </motion.div>
      </div>

      {/* Mystical footer elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent" />
    </div>
  );
};

export default Home;