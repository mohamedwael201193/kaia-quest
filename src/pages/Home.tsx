import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { TreasureChest } from '@/components/3d/TreasureChest';
import { FallbackTreasureChest } from '@/components/3d/FallbackTreasureChest';
import { Button } from '@/components/ui/button';
import { Sparkles, Play } from 'lucide-react';

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

        {/* 3D Treasure Chest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-80 h-80 mb-12"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#FFD700" />
            
            <Suspense fallback={
              <FallbackTreasureChest 
                onClick={handleBeginQuest}
                isOpen={chestClicked}
                position={[0, 0, 0]}
              />
            }>
              <TreasureChest 
                onClick={handleBeginQuest}
                isOpen={chestClicked}
                position={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
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