/**
 * Crafting Engine
 * Handles all equipment crafting mechanics
 */

import { Equipment, EquipmentInstance, Resource } from '@/types/game';
import { EQUIPMENT_DATABASE } from '@/data/equipment';
import { calculateCraftingTime, checkRandomEvent } from '@/utils/calculations';
import { validateResourceAmount } from '@/utils/validators';

export class CraftingEngine {
  /**
   * Check if player can craft equipment
   */
  static canCraftEquipment(equipment: Equipment, resources: Resource, playerLevel: number): boolean {
    if (playerLevel < equipment.requiredLevel) return false;

    return (
      resources.mithril >= equipment.craftingCost.mithril &&
      resources.coins >= equipment.craftingCost.coins
    );
  }

  /**
   * Craft equipment and return instance
   */
  static craftEquipment(
    equipmentId: string,
    resources: Resource,
    playerLuck: number = 0
  ): { equipment: EquipmentInstance; cost: Partial<Resource> } | null {
    const equipment = EQUIPMENT_DATABASE.find((e) => e.id === equipmentId);
    if (!equipment) return null;

    if (
      resources.mithril < equipment.craftingCost.mithril ||
      resources.coins < equipment.craftingCost.coins
    ) {
      return null;
    }

    // Determine quality based on luck
    let quality = 50;
    if (checkRandomEvent(playerLuck)) {
      quality = Math.min(100, 50 + Math.random() * 50);
    } else {
      quality = Math.max(10, 50 - Math.random() * 40);
    }

    const instance: EquipmentInstance = {
      id: `${equipmentId}_${Date.now()}`,
      equipmentId,
      equipment,
      level: 1,
      quality: Math.floor(quality),
      equippedTo: null,
    };

    return {
      equipment: instance,
      cost: {
        mithril: equipment.craftingCost.mithril,
        coins: equipment.craftingCost.coins,
      },
    };
  }

  /**
   * Get crafting time for equipment
   */
  static getCraftingTime(equipmentId: string): number {
    const equipment = EQUIPMENT_DATABASE.find((e) => e.id === equipmentId);
    if (!equipment) return 0;
    return calculateCraftingTime(equipment.rarity);
  }

  /**
   * Upgrade equipment
   */
  static upgradeEquipment(
    equipment: EquipmentInstance,
    resources: Resource
  ): { success: boolean; newLevel: number } {
    const upgradeCost = equipment.level * 50;
    if (resources.mithril < upgradeCost || resources.enhancementStones < 1) {
      return { success: false, newLevel: equipment.level };
    }

    // Success chance based on current level
    const successChance = Math.max(50, 100 - equipment.level * 5);
    if (checkRandomEvent(successChance)) {
      return { success: true, newLevel: equipment.level + 1 };
    }

    return { success: false, newLevel: equipment.level };
  }

  /**
   * Get all craftable equipment for current level
   */
  static getCraftableEquipment(playerLevel: number): Equipment[] {
    return EQUIPMENT_DATABASE.filter((e) => e.requiredLevel <= playerLevel);
  }
}
