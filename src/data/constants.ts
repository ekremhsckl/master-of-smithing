/**
 * Game Constants and Configuration
 */

export const GAME_CONSTANTS = {
  // Experience
  EXPERIENCE_PER_LEVEL: 1000,
  PET_EXPERIENCE_PER_LEVEL: 500,

  // Resources
  STARTING_MITHRIL: 100,
  STARTING_COINS: 500,
  STARTING_DIAMONDS: 10,

  // Inventory
  INITIAL_INVENTORY_SLOTS: 20,
  MAX_INVENTORY_SLOTS: 100,

  // Combat
  INITIAL_PLAYER_HP: 100,
  INITIAL_PLAYER_MANA: 50,
  BASE_PLAYER_ATTACK: 10,
  BASE_PLAYER_DEFENSE: 5,

  // Pets
  MAX_ACTIVE_PETS: 3,

  // Quality
  MAX_QUALITY: 100,
  MIN_QUALITY: 0,

  // UI
  ANIMATION_DURATION: 300,
};

export const RARITY_COLORS: Record<string, string> = {
  common: '#95A5A6',
  rare: '#3498DB',
  epic: '#9B59B6',
  legendary: '#F39C12',
};

export const DIFFICULTY_MULTIPLIERS: Record<string, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2,
  legendary: 3,
};
