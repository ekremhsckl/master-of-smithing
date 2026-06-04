/**
 * @file Game Core Types
 * @description Type definitions for all game entities and mechanics
 */

export interface Resource {
  mithril: number;
  coins: number;
  diamonds: number;
  enhancementStones: number;
  petEggs: number;
}

export interface PlayerStats {
  level: number;
  experience: number;
  totalDamageDealt: number;
  totalBattlesWon: number;
  totalBattlesLost: number;
  playtime: number;
}

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  resources: Resource;
  stats: PlayerStats;
  inventory: Inventory;
  pets: Pet[];
  activeTeam: string[]; // Pet IDs
  guildId: string | null;
  createdAt: number;
  lastPlayedAt: number;
}

export interface Inventory {
  maxSlots: number;
  items: EquipmentInstance[];
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'accessory' | 'helm' | 'boots' | 'gloves';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  baseDamage: number;
  baseDefense: number;
  crafterReward: number;
  requiredLevel: number;
  craftingCost: {
    mithril: number;
    coins: number;
  };
}

export interface EquipmentInstance {
  id: string;
  equipmentId: string;
  equipment: Equipment;
  level: number;
  quality: number; // 0-100
  equippedTo: string | null; // Player ID or Pet ID
}

export interface Pet {
  id: string;
  petDataId: string;
  name: string;
  level: number;
  experience: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skills: Skill[];
  equippedGear: EquipmentInstance[];
}

export interface PetData {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  hatchingOdds: number; // 0-100 percentage
  skills: SkillTemplate[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'defense' | 'heal' | 'buff' | 'debuff';
  damage: number;
  manaCost: number;
  accuracy: number; // 0-100
  cooldown: number; // seconds
}

export interface SkillTemplate {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'defense' | 'heal' | 'buff' | 'debuff';
  damageMultiplier: number;
  manaCost: number;
  accuracy: number;
  cooldown: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'daily' | 'weekly' | 'event';
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  rewards: {
    experience: number;
    mithril: number;
    coins: number;
    items: string[]; // Equipment IDs
  };
  requirements?: {
    level: number;
    completedQuests: string[];
  };
  tasks: QuestTask[];
  isCompleted: boolean;
}

export interface QuestTask {
  id: string;
  description: string;
  targetCount: number;
  currentCount: number;
  type: 'kill' | 'craft' | 'collect' | 'reach_level';
}

export interface Enemy {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skills: Skill[];
  loot: {
    experience: number;
    coins: number;
    mithril: number;
    items: string[];
  };
}

export interface BattleState {
  playerHp: number;
  playerMaxHp: number;
  playerMana: number;
  playerMaxMana: number;
  enemies: BattleEnemy[];
  turn: number;
  isPlayerTurn: boolean;
  battleLog: string[];
  isActive: boolean;
  reward?: BattleReward;
}

export interface BattleEnemy {
  enemyId: string;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  status: string[];
}

export interface BattleReward {
  experience: number;
  coins: number;
  mithril: number;
  items: EquipmentInstance[];
  victory: boolean;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  level: number;
  leader: string; // Player ID
  members: GuildMember[];
  treasury: {
    coins: number;
    mithril: number;
  };
  createdAt: number;
  perks: GuildPerk[];
}

export interface GuildMember {
  playerId: string;
  playerName: string;
  joinedAt: number;
  role: 'member' | 'officer' | 'leader';
  contributedResources: number;
}

export interface GuildPerk {
  id: string;
  name: string;
  description: string;
  level: number;
  bonus: {
    experienceBoost: number; // percentage
    mithrilBoost: number;
    coinsBoost: number;
  };
}

export interface GameState {
  player: Player;
  battle: BattleState | null;
  quests: Quest[];
  currentQuest: string | null;
  guild: Guild | null;
  isLoading: boolean;
  error: string | null;
}
