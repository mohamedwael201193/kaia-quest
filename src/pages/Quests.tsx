import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestCard } from '@/components/ui/QuestCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Scroll, Trophy, Clock } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLeft?: string;
  isCompleted?: boolean;
}

const Quests = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const questData = {
    daily: [
      {
        id: 1,
        title: 'Morning Savings Ritual',
        description: 'Save 10 USDC before noon to start your day right',
        reward: 15,
        progress: 0,
        difficulty: 'Easy' as const,
        timeLeft: '3h 45m',
        isCompleted: false
      },
      {
        id: 2,
        title: 'Consistency Challenger',
        description: 'Make a deposit for 3 consecutive days',
        reward: 50,
        progress: 66,
        difficulty: 'Medium' as const,
        timeLeft: '18h 20m',
        isCompleted: false
      }
    ] as Quest[],
    weekly: [
      {
        id: 3,
        title: 'Treasure Hunter',
        description: 'Accumulate 1000 USDC in your vault this week',
        reward: 200,
        progress: 35,
        difficulty: 'Hard' as const,
        timeLeft: '4 days',
        isCompleted: false
      },
      {
        id: 4,
        title: 'Social Explorer',
        description: 'Join 2 new guilds and participate in their activities',
        reward: 75,
        progress: 50,
        difficulty: 'Medium' as const,
        timeLeft: '6 days',
        isCompleted: false
      }
    ] as Quest[],
    completed: [
      {
        id: 5,
        title: 'First Steps',
        description: 'Complete your first deposit to begin your adventure',
        reward: 25,
        progress: 100,
        difficulty: 'Easy' as const,
        isCompleted: true
      },
      {
        id: 6,
        title: 'Early Bird',
        description: 'Save 100 USDC in your first week',
        reward: 100,
        progress: 100,
        difficulty: 'Medium' as const,
        isCompleted: true
      }
    ] as Quest[]
  };

  const allQuests = [...questData.daily, ...questData.weekly, ...questData.completed];
  const activeQuests = allQuests.filter(quest => !quest.isCompleted);
  
  const getFilteredQuests = (): Quest[] => {
    switch (selectedFilter) {
      case 'daily': return questData.daily;
      case 'weekly': return questData.weekly;
      case 'completed': return questData.completed;
      case 'active': return activeQuests;
      default: return allQuests;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-accent/20 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-adventure-heading text-2xl font-bold text-foreground">
              Quest Journal
            </h1>
          </div>
          
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            {activeQuests.length} Active
          </Badge>
        </div>
      </motion.header>

      <div className="px-6 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-gradient-hero text-primary-foreground border-accent/30 shadow-mystical">
            <CardHeader className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Scroll className="w-full h-full text-accent" />
              </motion.div>
              
              <CardTitle className="font-adventure-heading text-3xl mb-2">
                Ancient Scrolls Await
              </CardTitle>
              
              <p className="font-adventure-body text-primary-foreground/90">
                Complete quests to earn treasures and unlock new adventures. Each challenge brings you closer to mastering the mystical arts of DeFi.
              </p>
            </CardHeader>
          </Card>
        </motion.section>

        {/* Quest Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="all" onClick={() => setSelectedFilter('all')}>
                All Quests
              </TabsTrigger>
              <TabsTrigger value="active" onClick={() => setSelectedFilter('active')}>
                <Clock className="h-4 w-4 mr-1" />
                Active
              </TabsTrigger>
              <TabsTrigger value="daily" onClick={() => setSelectedFilter('daily')}>
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" onClick={() => setSelectedFilter('weekly')}>
                Weekly
              </TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setSelectedFilter('completed')}>
                <Trophy className="h-4 w-4 mr-1" />
                Done
              </TabsTrigger>
            </TabsList>

            {/* Quest Grid */}
            <div className="mt-6">
              <motion.div 
                className="grid gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {getFilteredQuests().map((quest, index) => (
                  <QuestCard
                    key={quest.id}
                    title={quest.title}
                    description={quest.description}
                    reward={quest.reward}
                    progress={quest.progress}
                    difficulty={quest.difficulty}
                    timeLeft={quest.timeLeft}
                    isCompleted={quest.isCompleted || false}
                    delay={index}
                    onStart={() => console.log(`Starting quest ${quest.id}`)}
                  />
                ))}
                
                {getFilteredQuests().length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="text-muted-foreground font-adventure-body">
                      No quests found for this filter.
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </Tabs>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-parchment border-accent/20 shadow-quest">
            <CardContent className="pt-6">
              <h3 className="font-adventure-heading text-xl mb-3 text-foreground">
                Ready for More Adventures?
              </h3>
              <p className="font-adventure-body text-muted-foreground mb-4">
                New quests unlock as you progress. Keep saving and exploring to discover legendary challenges!
              </p>
              <Button variant="treasure" onClick={() => window.location.href = '/dashboard'}>
                Return to Adventure Map
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Quests;