import { useState } from 'react';
import { motion } from 'framer-motion';
import { VaultCard } from '@/components/ui/VaultCard';
import { QuestCard } from '@/components/ui/QuestCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users, Scroll, Settings, Compass, Mountain, Flag } from 'lucide-react';

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
        {/* Adventure Map Section (CSS-based) */}
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
            <CardContent className="p-8">
              <div className="relative h-96 w-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl border-4 border-amber-300 overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 69, 19, 0.3) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                
                {/* Adventure Path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  <path
                    d="M 50 250 Q 100 200 150 220 T 250 180 T 350 120"
                    stroke="#8B4513"
                    strokeWidth="4"
                    strokeDasharray="8,4"
                    fill="none"
                    className="opacity-70"
                  />
                </svg>
                
                {/* Quest Markers */}
                <div className="absolute inset-0">
                  {/* Starting Point */}
                  <motion.div
                    className="absolute w-8 h-8 bg-success rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                    style={{ left: '10%', top: '80%' }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Flag className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  {/* Current Position (User) */}
                  <motion.div
                    className="absolute w-12 h-12 bg-primary rounded-full border-4 border-accent shadow-mystical flex items-center justify-center"
                    style={{ left: `${20 + userProgress * 60}%`, top: '65%' }}
                    animate={{ 
                      y: [0, -5, 0],
                      boxShadow: ['0 4px 20px rgba(255, 215, 0, 0.3)', '0 8px 25px rgba(255, 215, 0, 0.5)', '0 4px 20px rgba(255, 215, 0, 0.3)']
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Compass className="w-6 h-6 text-accent animate-spin" style={{ animationDuration: '8s' }} />
                  </motion.div>
                  
                  {/* Mid Quest Marker */}
                  <motion.div
                    className={`absolute w-8 h-8 ${userProgress >= 0.5 ? 'bg-success' : 'bg-accent'} rounded-full border-4 border-white shadow-lg flex items-center justify-center`}
                    style={{ left: '55%', top: '50%' }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <Mountain className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  {/* End Treasure */}
                  <motion.div
                    className={`absolute w-10 h-10 ${userProgress >= 0.9 ? 'bg-success' : 'bg-accent'} rounded-full border-4 border-white shadow-treasure flex items-center justify-center`}
                    style={{ left: '85%', top: '30%' }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <span className="text-2xl">👑</span>
                  </motion.div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute inset-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-accent rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
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