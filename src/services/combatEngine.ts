/**
 * Combat Engine
 * Handles all battle mechanics and resolution
 */

import { Pet, Enemy, BattleReward } from '@/types/game';
import { calculateDamage, checkRandomEvent } from '@/utils/calculations';

export class CombatEngine {
  /**
   * Calculate damage output
   */
  static calculateAttackDamage(attacker: Pet | { attack: number }, defender: Pet | Enemy): number {
    const baseDamage = attacker.attack;
    const defense = defender.defense;
    const variance = 0.15;

    // Defense reduces damage
    const defenseReduction = defense * 0.1;
    let finalDamage = baseDamage - defenseReduction;

    // Add variance
    finalDamage = calculateDamage(finalDamage, variance);

    return Math.max(1, Math.floor(finalDamage));
  }

  /**
   * Check if attack hits
   */
  static checkHit(accuracy: number): boolean {
    return checkRandomEvent(accuracy);
  }

  /**
   * Determine action speed (who goes first)
   */
  static getActionSpeed(entity: Pet | Enemy | { attack: number }): number {
    // Simplified: attack stat determines speed
    return (entity.attack || 0) + Math.random() * 10;
  }

  /**
   * Calculate battle reward
   */
  static calculateReward(
    enemy: Enemy,
    playerLevel: number,
    victory: boolean
  ): BattleReward {
    if (!victory) {
      return {
        experience: 0,
        coins: 0,
        mithril: 0,
        items: [],
        victory: false,
      };
    }

    // Adjust rewards based on level difference
    let expMultiplier = 1;
    if (playerLevel < enemy.level) {
      expMultiplier = 1.5;
    } else if (playerLevel > enemy.level + 5) {
      expMultiplier = 0.5;
    }

    return {
      experience: Math.floor(enemy.loot.experience * expMultiplier),
      coins: Math.floor(enemy.loot.coins * expMultiplier),
      mithril: Math.floor(enemy.loot.mithril * expMultiplier),
      items: enemy.loot.items.length > 0 ? enemy.loot.items : [],
      victory: true,
    };
  }

  /**
   * Simulate automatic battle
   */
  static simulateBattle(
    playerTeam: Pet[],
    enemies: Enemy[]
  ): { playerVictory: boolean; battleLog: string[] } {
    const log: string[] = [];
    let playerHp = playerTeam.reduce((sum, pet) => sum + pet.hp, 0);
    let enemyHp = enemies.reduce((sum, enemy) => sum + enemy.hp, 0);
    const maxTurns = 50;
    let turn = 0;

    while (turn < maxTurns && playerHp > 0 && enemyHp > 0) {
      // Player attack
      if (playerTeam.length > 0) {
        const attacker = playerTeam[Math.floor(Math.random() * playerTeam.length)];
        const defender = enemies[Math.floor(Math.random() * enemies.length)];
        const damage = this.calculateAttackDamage(attacker, defender);
        enemyHp -= damage;
        log.push(`${attacker.name} attacks for ${damage} damage!`);
      }

      // Enemy counter-attack
      if (enemyHp > 0 && enemies.length > 0) {
        const attacker = enemies[Math.floor(Math.random() * enemies.length)];
        const defender = playerTeam[Math.floor(Math.random() * playerTeam.length)];
        const damage = this.calculateAttackDamage(attacker, defender);
        playerHp -= damage;
        log.push(`${attacker.name} attacks for ${damage} damage!`);
      }

      turn++;
    }

    return {
      playerVictory: playerHp > 0,
      battleLog: log,
    };
  }
}
