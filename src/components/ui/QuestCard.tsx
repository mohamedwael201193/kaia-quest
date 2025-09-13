import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Coins, Trophy, Clock } from 'lucide-react';

interface QuestCardProps {
  title: string;
  description: string;
  reward: number;
  progress: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLeft?: string;
  isCompleted?: boolean;
  onStart?: () => void;
  delay?: number;
}

const difficultyColors = {
  Easy: 'bg-success text-success-foreground',
  Medium: 'bg-accent text-accent-foreground',
  Hard: 'bg-destructive text-destructive-foreground',
};

export const QuestCard = ({
  title,
  description,
  reward,
  progress,
  difficulty,
  timeLeft,
  isCompleted = false,
  onStart,
  delay = 0
}: QuestCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: delay * 0.1, 
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="relative bg-gradient-parchment border-accent/20 shadow-quest hover:shadow-mystical transition-all duration-500 overflow-hidden group">
        {/* Magical border glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="font-adventure-heading text-xl text-foreground">
                {title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={difficultyColors[difficulty]} variant="secondary">
                  {difficulty}
                </Badge>
                {timeLeft && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {timeLeft}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-accent font-adventure-body font-semibold">
              <Coins className="h-4 w-4" />
              {reward}
            </div>
          </div>
          
          <CardDescription className="font-adventure-body text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-adventure-body">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-secondary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            {isCompleted ? (
              <div className="flex items-center gap-2 text-success font-adventure-body font-semibold">
                <Trophy className="h-4 w-4" />
                Quest Complete!
              </div>
            ) : (
              <Button 
                variant={progress > 0 ? "quest" : "treasure"}
                size="sm"
                onClick={onStart}
                className="font-adventure-body"
              >
                {progress > 0 ? 'Continue Quest' : 'Begin Quest'}
              </Button>
            )}
          </div>
        </CardContent>
        
        {/* Completion sparkle effect */}
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Trophy className="h-6 w-6 text-accent" />
            </motion.div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};