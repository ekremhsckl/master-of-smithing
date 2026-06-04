/**
 * Game Input Validators
 * Validates all player inputs and game state changes
 */

export const validatePlayerName = (name: string): boolean => {
  if (!name || name.length === 0) return false;
  if (name.length < 2 || name.length > 20) return false;
  return /^[a-zA-Z0-9_-]+$/.test(name);
};

export const validateResourceAmount = (amount: number): boolean => {
  return Number.isInteger(amount) && amount >= 0 && amount <= 1000000;
};

export const validateInventorySlot = (slot: number, maxSlots: number): boolean => {
  return Number.isInteger(slot) && slot >= 0 && slot < maxSlots;
};

export const validateLevel = (level: number): boolean => {
  return Number.isInteger(level) && level >= 1 && level <= 1000;
};

export const validateEquipmentType = (
  type: string
): type is 'weapon' | 'armor' | 'accessory' | 'helm' | 'boots' | 'gloves' => {
  return ['weapon', 'armor', 'accessory', 'helm', 'boots', 'gloves'].includes(type);
};

export const validateRarity = (
  rarity: string
): rarity is 'common' | 'rare' | 'epic' | 'legendary' => {
  return ['common', 'rare', 'epic', 'legendary'].includes(rarity);
};

export const validateSkillType = (
  type: string
): type is 'attack' | 'defense' | 'heal' | 'buff' | 'debuff' => {
  return ['attack', 'defense', 'heal', 'buff', 'debuff'].includes(type);
};
