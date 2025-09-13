import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  members: Profile[];
  goalAmount: number;
  currentAmount: number;
  questActive: boolean;
  createdAt: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLeft?: string;
  completed: boolean;
  type: 'daily' | 'weekly' | 'special';
}

export interface Stats {
  tvl: number;
  questsCompleted: number;
  sbtsMinted: number;
  totalUsers: number;
}

export interface AppState {
  // Demo mode
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;

  // User progress
  mapProgress: number;
  setMapProgress: (progress: number) => void;
  
  // User profile
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  
  // Guilds
  guilds: Guild[];
  setGuilds: (guilds: Guild[]) => void;
  addGuild: (guild: Guild) => void;
  updateGuild: (id: string, updates: Partial<Guild>) => void;
  
  // Quests
  quests: Quest[];
  setQuests: (quests: Quest[]) => void;
  updateQuest: (id: string, updates: Partial<Quest>) => void;
  completeQuest: (id: string) => void;
  
  // Stats
  stats: Stats;
  setStats: (stats: Stats) => void;
  
  // Wallet
  balance: number;
  setBalance: (balance: number) => void;
  
  // Animations
  showCoinBurst: boolean;
  triggerCoinBurst: () => void;
  
  // Initialize demo data
  initializeDemoData: () => void;
}

const demoQuests: Quest[] = [
  {
    id: '1',
    title: 'Daily Savings Challenge',
    description: 'Save 50 USDC today to unlock bonus rewards',
    reward: 25,
    progress: 75,
    difficulty: 'Easy',
    timeLeft: '4h 30m',
    completed: false,
    type: 'daily'
  },
  {
    id: '2',
    title: 'Weekly Accumulator',
    description: 'Reach 500 USDC in total savings this week',
    reward: 100,
    progress: 45,
    difficulty: 'Medium',
    completed: false,
    type: 'weekly'
  },
  {
    id: '3',
    title: 'Round-Up Master',
    description: 'Complete 10 round-up transactions',
    reward: 50,
    progress: 30,
    difficulty: 'Easy',
    completed: false,
    type: 'special'
  }
];

const demoGuilds: Guild[] = [
  {
    id: '1',
    name: 'Crypto Savers',
    description: 'Building wealth together through consistent savings',
    members: [
      { userId: '1', displayName: 'Alice', pictureUrl: 'https://picsum.photos/40/40?random=1' },
      { userId: '2', displayName: 'Bob', pictureUrl: 'https://picsum.photos/40/40?random=2' },
      { userId: '3', displayName: 'Charlie', pictureUrl: 'https://picsum.photos/40/40?random=3' }
    ],
    goalAmount: 10000,
    currentAmount: 7500,
    questActive: true,
    createdAt: '2024-01-01'
  }
];

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Demo mode
        demoMode: import.meta.env.VITE_DEMO_MODE === 'true',
        setDemoMode: (enabled) => set({ demoMode: enabled }),

        // User progress
        mapProgress: 0.35,
        setMapProgress: (progress) => set({ mapProgress: Math.max(0, Math.min(1, progress)) }),

        // User profile
        profile: null,
        setProfile: (profile) => set({ profile }),

        // Guilds
        guilds: [],
        setGuilds: (guilds) => set({ guilds }),
        addGuild: (guild) => set((state) => ({ guilds: [...state.guilds, guild] })),
        updateGuild: (id, updates) => set((state) => ({
          guilds: state.guilds.map(guild => 
            guild.id === id ? { ...guild, ...updates } : guild
          )
        })),

        // Quests
        quests: [],
        setQuests: (quests) => set({ quests }),
        updateQuest: (id, updates) => set((state) => ({
          quests: state.quests.map(quest =>
            quest.id === id ? { ...quest, ...updates } : quest
          )
        })),
        completeQuest: (id) => set((state) => ({
          quests: state.quests.map(quest =>
            quest.id === id ? { ...quest, completed: true, progress: 100 } : quest
          ),
          mapProgress: Math.min(1, state.mapProgress + 0.1)
        })),

        // Stats
        stats: {
          tvl: 1250000,
          questsCompleted: 2847,
          sbtsMinted: 1203,
          totalUsers: 5432
        },
        setStats: (stats) => set({ stats }),

        // Wallet
        balance: 2450,
        setBalance: (balance) => set({ balance }),

        // Animations
        showCoinBurst: false,
        triggerCoinBurst: () => {
          set({ showCoinBurst: true });
          setTimeout(() => set({ showCoinBurst: false }), 2000);
        },

        // Initialize demo data
        initializeDemoData: () => {
          const { demoMode } = get();
          if (demoMode) {
            set({
              quests: demoQuests,
              guilds: demoGuilds,
            });
          }
        }
      }),
      {
        name: 'kaia-quest-store',
        partialize: (state) => ({
          demoMode: state.demoMode,
          mapProgress: state.mapProgress,
          profile: state.profile,
          balance: state.balance,
        }),
      }
    ),
    {
      name: 'kaia-quest-store'
    }
  )
);