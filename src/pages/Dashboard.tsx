import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { TreasureMap } from '@/components/3d/TreasureMap';
import { VaultCard } from '@/components/ui/VaultCard';
import { QuestCard } from '@/components/ui/QuestCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users, Scroll, Settings } from 'lucide-react';

const Dashboard = () => {
  const [userBalance] = useState(2450);
  const [userProgress] = useState(0.35);
  const [vaultGrowth] = useState(5.7);

  const activeQuests = [
    {
      id: 1,
      title: 'Daily Savings Challenge',
      description: 'Save 50 USDC today to unlock bonus rewards',
      reward: 25,
      progress: 75,
      difficulty: 'Easy' as const,
      timeLeft: '4h 30m'
    },
    {
      id: 2,
      title: 'Weekly Accumulator',
      description: 'Reach 500 USDC in total savings this week',
      reward: 100,
      progress: 45,
      difficulty: 'Medium' as const,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-accent/20 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-adventure-heading text-2xl font-bold text-foreground">
            Adventure Dashboard
          </h1>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Map className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Scroll className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="px-6 py-8 space-y-8">
        {/* Main 3D Map Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Card className="overflow-hidden bg-gradient-parchment border-accent/30 shadow-mystical">
            <CardHeader>
              <CardTitle className="font-adventure-heading text-2xl text-foreground text-center">
                Your Adventure Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 w-full">
                <Canvas camera={{ position: [0, 5, 5], fov: 60 }}>
                  <Suspense fallback={null}>
                    <TreasureMap 
                      userProgress={userProgress}
                      isInteractive={true}
                    />
                  </Suspense>
                </Canvas>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Stats and Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vault Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <VaultCard 
              balance={userBalance}
              growth={vaultGrowth}
              onDeposit={() => console.log('Deposit')}
              onWithdraw={() => console.log('Withdraw')}
            />
          </motion.div>

          {/* Active Quests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-magic border-accent/20 shadow-quest">
              <CardHeader>
                <CardTitle className="font-adventure-heading text-xl text-foreground flex items-center gap-2">
                  <Scroll className="h-6 w-6 text-accent" />
                  Active Quests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeQuests.map((quest, index) => (
                  <QuestCard
                    key={quest.id}
                    title={quest.title}
                    description={quest.description}
                    reward={quest.reward}
                    progress={quest.progress}
                    difficulty={quest.difficulty}
                    timeLeft={quest.timeLeft}
                    delay={index}
                    onStart={() => console.log(`Starting quest ${quest.id}`)}
                  />
                ))}
                
                <div className="pt-4 text-center">
                  <Button variant="quest" onClick={() => window.location.href = '/quests'}>
                    View All Quests
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="parchment" 
              className="h-20 flex-col gap-2"
              onClick={() => window.location.href = '/quests'}
            >
              <Scroll className="h-6 w-6" />
              <span className="text-sm">Quests</span>
            </Button>
            
            <Button 
              variant="parchment" 
              className="h-20 flex-col gap-2"
              onClick={() => window.location.href = '/guilds'}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Guilds</span>
            </Button>
            
            <Button 
              variant="parchment" 
              className="h-20 flex-col gap-2"
            >
              <Map className="h-6 w-6" />
              <span className="text-sm">Explore</span>
            </Button>
            
            <Button 
              variant="treasure" 
              className="h-20 flex-col gap-2"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm">Rewards</span>
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;