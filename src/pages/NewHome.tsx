import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Users, TrendingUp, Award } from 'lucide-react';
import { useLiff } from '@/hooks/useLiff';
import { useAppStore } from '@/store/useAppStore';
import { CoinBurst } from '@/components/ui/CoinBurst';

// Lazy load the 3D scene
const MapScene = lazy(() => import('@/components/three/MapScene').then(module => ({ default: module.MapScene })));
const MapSceneFallback = lazy(() => import('@/components/three/MapScene').then(module => ({ default: module.MapSceneFallback })));

export default function NewHome() {
  const [use3D, setUse3D] = useState(true);
  const { isLoggedIn, profile, login } = useLiff();
  const { stats, initializeDemoData } = useAppStore();

  // Initialize demo data on mount
  useState(() => {
    initializeDemoData();
  });

  const handleBeginQuest = () => {
    if (!isLoggedIn) {
      login();
    } else {
      window.location.href = '/quests';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CoinBurst />
      
      {/* 3D Map Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Suspense fallback={<MapSceneFallback />}>
          {use3D ? (
            <MapScene />
          ) : (
            <MapSceneFallback />
          )}
        </Suspense>

        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="flex flex-col h-full">
            {/* Header */}
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 pointer-events-auto"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-sora text-3xl font-bold text-foreground">
                  Kaia Quest
                </h1>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUse3D(!use3D)}
                  >
                    {use3D ? '2D' : '3D'}
                  </Button>
                  {profile && (
                    <div className="flex items-center gap-2">
                      <img 
                        src={profile.pictureUrl} 
                        alt={profile.displayName}
                        className="w-8 h-8 rounded-full border-2 border-gold"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {profile.displayName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.header>

            {/* Stats Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="px-6 pointer-events-auto"
            >
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-3 text-center">
                    <TrendingUp className="w-5 h-5 text-jade mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground">
                      ${(stats.tvl / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-muted-foreground">TVL</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-3 text-center">
                    <Users className="w-5 h-5 text-iris mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground">
                      {stats.questsCompleted.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Quests</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-3 text-center">
                    <Award className="w-5 h-5 text-gold mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground">
                      {stats.sbtsMinted.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">SBTs</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Bottom CTA */}
            <div className="flex-1 flex items-end justify-center pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center space-y-6 pointer-events-auto"
              >
                <div className="space-y-2">
                  <h2 className="font-sora text-2xl font-bold text-foreground">
                    {isLoggedIn ? `Welcome back, ${profile?.displayName}!` : 'Begin Your Quest'}
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Embark on magical DeFi adventures. Save treasures, complete quests, and build your fortune.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleBeginQuest}
                  className="bg-gradient-iris hover:bg-iris text-white shadow-glow px-8 py-3 text-lg font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {isLoggedIn ? 'Enter Map' : 'Login with LINE'}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}