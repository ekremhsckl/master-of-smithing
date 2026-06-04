/**
 * Game Calculation Utilities
 * Handles all mathematical calculations for game mechanics
 */

import { GAME_CONSTANTS } from '@/data/constants';

/**
 * Calculate damage with random variance
 */
export const calculateDamage = (baseDamage: number, variance: number = 0.1): number => {
  const minDamage = baseDamage * (1 - variance);
  const maxDamage = baseDamage * (1 + variance);
  return Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);
};

/**
 * Calculate experience reward based on difficulty
 */
export const calculateExperienceReward = (
  baseExp: number,
  difficultyMultiplier: number,
  playerLevel: number,
  enemyLevel: number
): number => {
  let reward = baseExp * difficultyMultiplier;

  // Level scaling
  if (playerLevel < enemyLevel) {
    reward *= 1.2;
  } else if (playerLevel > enemyLevel) {
    reward *= Math.max(0.5, 1 - (playerLevel - enemyLevel) * 0.1);
  }

  return Math.floor(reward);
};

/**
 * Calculate equipment effectiveness
 */
export const calculateEquipmentStats = (
  baseDamage: number,
  level: number,
  quality: number
): number => {
  const levelBonus = 1 + (level - 1) * 0.1;
  const qualityBonus = 1 + (quality / 100) * 0.5;
  return Math.floor(baseDamage * levelBonus * qualityBonus);
};

/**
 * Calculate pet stats
 */
export const calculatePetStats = (
  baseStat: number,
  petLevel: number
): number => {
  return Math.floor(baseStat * (1 + (petLevel - 1) * 0.15));
};

/**
 * Calculate crafting time (in seconds)
 */
export const calculateCraftingTime = (rarity: string): number => {
  const baseTime: Record<string, number> = {
    common: 10,
    rare: 30,
    epic: 60,
    legendary: 180,
  };
  return baseTime[rarity] || 10;
};

/**
 * Calculate success rate for actions
 */
export const calculateSuccessRate = (
  baseRate: number,
  playerLuck: number = 0
): number => {
  return Math.min(100, baseRate + playerLuck);
};

/**
 * Check if random event occurred
 */
export const checkRandomEvent = (probability: number): boolean => {
  return Math.random() * 100 < probability;
};
