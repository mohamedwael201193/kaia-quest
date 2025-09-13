import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Crown, 
  Plus, 
  Search, 
  Share2, 
  Trophy, 
  Target,
  TrendingUp
} from 'lucide-react';

const Guilds = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const myGuilds = [
    {
      id: 1,
      name: 'Treasure Seekers Alliance',
      description: 'Elite savers working together to reach financial freedom',
      members: 47,
      totalSaved: 125000,
      rank: 3,
      isLeader: true,
      memberAvatars: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b332c107?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
      ],
      activeQuest: 'Save 10,000 USDC collectively this week',
      questProgress: 73
    },
    {
      id: 2,
      name: 'DeFi Dragons',
      description: 'Legendary guild mastering the ancient arts of yield farming',
      members: 32,
      totalSaved: 87500,
      rank: 7,
      isLeader: false,
      memberAvatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=32&h=32&fit=crop&crop=face'
      ],
      activeQuest: 'Complete 50 daily savings challenges',
      questProgress: 84
    }
  ];

  const discoverGuilds = [
    {
      id: 3,
      name: 'Crypto Crusaders',
      description: 'New adventurers learning the ways of Web3 together',
      members: 23,
      totalSaved: 45000,
      rank: 12,
      isPublic: true,
      category: 'Beginner Friendly'
    },
    {
      id: 4,
      name: 'Yield Wizards',
      description: 'Advanced strategies and magical profit spells',
      members: 156,
      totalSaved: 450000,
      rank: 1,
      isPublic: false,
      category: 'Expert Level'
    },
    {
      id: 5,
      name: 'Stable Guardians',
      description: 'Conservative savers focused on steady growth',
      members: 89,
      totalSaved: 234000,
      rank: 4,
      isPublic: true,
      category: 'Conservative'
    }
  ];

  const handleInviteFriends = () => {
    // Here would use LINE LIFF SDK
    // liff.shareTargetPicker()
    console.log('Opening LINE contact picker...');
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
              Adventure Guilds
            </h1>
          </div>
          
          <Button variant="treasure" size="sm" onClick={handleInviteFriends}>
            <Share2 className="h-4 w-4 mr-2" />
            Invite Friends
          </Button>
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
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Users className="w-full h-full text-accent" />
              </motion.div>
              
              <CardTitle className="font-adventure-heading text-3xl mb-2">
                Join Forces with Fellow Adventurers
              </CardTitle>
              
              <p className="font-adventure-body text-primary-foreground/90">
                Unite with other treasure seekers to complete epic guild quests, share strategies, and achieve legendary savings goals together.
              </p>
            </CardHeader>
          </Card>
        </motion.section>

        {/* Guild Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Tabs defaultValue="my-guilds" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="my-guilds">
                <Crown className="h-4 w-4 mr-2" />
                My Guilds
              </TabsTrigger>
              <TabsTrigger value="discover">
                <Search className="h-4 w-4 mr-2" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="create">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </TabsTrigger>
            </TabsList>

            {/* My Guilds Tab */}
            <TabsContent value="my-guilds" className="mt-6">
              <div className="space-y-6">
                {myGuilds.map((guild, index) => (
                  <motion.div
                    key={guild.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="bg-gradient-parchment border-accent/20 shadow-quest hover:shadow-mystical transition-all duration-300 group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="font-adventure-heading text-xl text-foreground">
                                {guild.name}
                              </CardTitle>
                              {guild.isLeader && (
                                <Crown className="h-5 w-5 text-accent" />
                              )}
                            </div>
                            <CardDescription className="font-adventure-body">
                              {guild.description}
                            </CardDescription>
                          </div>
                          
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            Rank #{guild.rank}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Guild Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-adventure-heading font-bold text-accent">
                              {guild.members}
                            </div>
                            <div className="text-sm font-adventure-body text-muted-foreground">
                              Members
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-adventure-heading font-bold text-success">
                              {(guild.totalSaved / 1000).toFixed(0)}K
                            </div>
                            <div className="text-sm font-adventure-body text-muted-foreground">
                              Total Saved
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-adventure-heading font-bold text-primary">
                              {guild.questProgress}%
                            </div>
                            <div className="text-sm font-adventure-body text-muted-foreground">
                              Quest Progress
                            </div>
                          </div>
                        </div>

                        {/* Member Avatars */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-adventure-body text-muted-foreground">
                            Members:
                          </span>
                          <div className="flex -space-x-2">
                            {guild.memberAvatars.map((avatar, i) => (
                              <Avatar key={i} className="w-8 h-8 border-2 border-background">
                                <AvatarImage src={avatar} />
                                <AvatarFallback>U{i + 1}</AvatarFallback>
                              </Avatar>
                            ))}
                            {guild.members > guild.memberAvatars.length && (
                              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold">
                                +{guild.members - guild.memberAvatars.length}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Active Quest */}
                        <Card className="bg-gradient-magic/50 border-accent/30">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-adventure-body font-semibold text-sm">
                                Active Guild Quest
                              </span>
                              <Target className="h-4 w-4 text-accent" />
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {guild.activeQuest}
                            </p>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-gradient-treasure h-2 rounded-full transition-all duration-300"
                                style={{ width: `${guild.questProgress}%` }}
                              />
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex gap-3">
                          <Button variant="quest" size="sm" className="flex-1">
                            View Guild
                          </Button>
                          <Button variant="parchment" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Discover Tab */}
            <TabsContent value="discover" className="mt-6">
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search guilds by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Guild List */}
                <div className="grid gap-4">
                  {discoverGuilds.map((guild, index) => (
                    <motion.div
                      key={guild.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <Card className="bg-card hover:bg-gradient-parchment/50 border-accent/20 shadow-sm hover:shadow-quest transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <CardTitle className="font-adventure-heading text-lg text-foreground">
                                  {guild.name}
                                </CardTitle>
                                <Badge variant="outline">{guild.category}</Badge>
                              </div>
                              <CardDescription className="font-adventure-body">
                                {guild.description}
                              </CardDescription>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm font-adventure-body font-semibold text-accent">
                                Rank #{guild.rank}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {guild.isPublic ? 'Public' : 'Private'}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm font-adventure-body">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {guild.members}
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                {(guild.totalSaved / 1000).toFixed(0)}K USDC
                              </span>
                            </div>
                            
                            <Button 
                              variant={guild.isPublic ? "treasure" : "quest"} 
                              size="sm"
                            >
                              {guild.isPublic ? 'Join Guild' : 'Request Invite'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Create Tab */}
            <TabsContent value="create" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-gradient-parchment border-accent/20 shadow-quest">
                  <CardHeader className="text-center">
                    <CardTitle className="font-adventure-heading text-2xl text-foreground">
                      Create Your Own Guild
                    </CardTitle>
                    <CardDescription className="font-adventure-body">
                      Gather adventurers under your banner and lead them to legendary savings goals
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-adventure-body font-medium text-foreground">
                          Guild Name
                        </label>
                        <Input placeholder="Enter your guild's name..." className="mt-1" />
                      </div>
                      
                      <div>
                        <label className="text-sm font-adventure-body font-medium text-foreground">
                          Guild Description
                        </label>
                        <Input placeholder="Describe your guild's mission..." className="mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="quest" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Public Guild
                      </Button>
                      <Button variant="parchment" className="w-full">
                        <Crown className="h-4 w-4 mr-2" />
                        Create Private Guild
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>
      </div>
    </div>
  );
};

export default Guilds;