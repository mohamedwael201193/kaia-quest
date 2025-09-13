import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vault, TrendingUp, Plus } from 'lucide-react';

interface VaultCardProps {
  balance: number;
  currency?: string;
  growth?: number;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

export const VaultCard = ({
  balance,
  currency = 'USDC',
  growth = 0,
  onDeposit,
  onWithdraw
}: VaultCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-gradient-hero border-accent/30 shadow-mystical text-primary-foreground overflow-hidden relative group">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`
              }}
            />
          ))}
        </div>
        
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 font-adventure-heading text-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Vault className="h-8 w-8 text-accent" />
            </motion.div>
            My Treasure Vault
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <motion.div 
              className="text-4xl font-adventure-heading font-bold text-accent"
              key={balance}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {balance.toLocaleString()} {currency}
            </motion.div>
            
            {growth !== 0 && (
              <motion.div 
                className={`flex items-center justify-center gap-1 text-sm ${
                  growth > 0 ? 'text-success' : 'text-destructive'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <TrendingUp className="h-3 w-3" />
                {growth > 0 ? '+' : ''}{growth.toFixed(2)}%
              </motion.div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="treasure"
              size="sm"
              onClick={onDeposit}
              className="w-full"
            >
              <Plus className="h-4 w-4" />
              Deposit
            </Button>
            
            <Button 
              variant="parchment"
              size="sm"
              onClick={onWithdraw}
              className="w-full"
            >
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};