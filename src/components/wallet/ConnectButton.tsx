import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronDown, AlertTriangle, ExternalLink } from 'lucide-react';
import { targetChainId, kaiaMainnet, kaiaTestnet } from '@/config/wagmi';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const demoMode = useAppStore((state) => state.demoMode);

  const isWrongNetwork = isConnected && chainId !== targetChainId;
  const currentChain = chainId === kaiaMainnet.id ? kaiaMainnet : kaiaTestnet;
  const targetChain = targetChainId === kaiaMainnet.id ? kaiaMainnet : kaiaTestnet;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (demoMode) {
    return (
      <Badge variant="secondary" className="px-3 py-1">
        Demo Mode
      </Badge>
    );
  }

  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wallet className="w-4 h-4" />
            Connect Wallet
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {connectors.map((connector) => (
            <DropdownMenuItem
              key={connector.id}
              onClick={() => connect({ connector })}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                {connector.name}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isWrongNetwork) {
    return (
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2"
      >
        <Button
          variant="destructive"
          onClick={() => switchChain({ chainId: targetChainId })}
          disabled={isPending}
          className="gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          {isPending ? 'Switching...' : `Switch to ${targetChain.name}`}
        </Button>
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <div className="w-2 h-2 bg-jade rounded-full animate-pulse" />
          {formatAddress(address!)}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Connected to</span>
            <Badge variant="outline" className="text-xs">
              {currentChain.name}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground font-mono mb-3">
            {address}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => window.open(`${currentChain.blockExplorers.default.url}/account/${address}`, '_blank')}
          className="cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}