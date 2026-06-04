/**
 * Pet Engine
 * Handles all pet mechanics including hatching, leveling, and synthesis
 */

import { Pet, PetData } from '@/types/game';
import { PETS_DATABASE } from '@/data/pets';
import { checkRandomEvent, calculatePetStats } from '@/utils/calculations';

export class PetEngine {
  /**
   * Hatch a new pet from an egg
   */
  static hatchPet(): Pet | null {
    let selectedPet: PetData | null = null;

    // Determine which pet to hatch based on odds
    for (const pet of PETS_DATABASE) {
      if (checkRandomEvent(pet.hatchingOdds)) {
        selectedPet = pet;
        break;
      }
    }

    if (!selectedPet) {
      // Default to first pet if none selected
      selectedPet = PETS_DATABASE[0];
    }

    return {
      id: `pet_${Date.now()}`,
      petDataId: selectedPet.id,
      name: selectedPet.name,
      level: 1,
      experience: 0,
      rarity: selectedPet.rarity,
      hp: selectedPet.baseHp,
      maxHp: selectedPet.baseHp,
      attack: selectedPet.baseAttack,
      defense: selectedPet.baseDefense,
      skills: selectedPet.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        description: skill.description,
        type: skill.type,
        damage: Math.floor(skill.damageMultiplier * selectedPet.baseAttack),
        manaCost: skill.manaCost,
        accuracy: skill.accuracy,
        cooldown: skill.cooldown,
      })),
      equippedGear: [],
    };
  }

  /**
   * Add experience to pet
   */
  static addPetExperience(pet: Pet, experience: number): Pet {
    const updated = { ...pet };
    updated.experience += experience;

    const expPerLevel = 500;
    while (updated.experience >= expPerLevel) {
      updated.level += 1;
      updated.experience -= expPerLevel;
      updated.maxHp = calculatePetStats(PETS_DATABASE[0].baseHp, updated.level);
      updated.attack = calculatePetStats(PETS_DATABASE[0].baseAttack, updated.level);
      updated.defense = calculatePetStats(PETS_DATABASE[0].baseDefense, updated.level);
      updated.hp = updated.maxHp;
    }

    return updated;
  }

  /**
   * Synthesize two pets into a stronger one
   */
  static synthesizePets(pet1: Pet, pet2: Pet): Pet {
    // Combine best stats
    const synthesized: Pet = {
      ...pet1,
      id: `pet_${Date.now()}`,
      level: Math.floor((pet1.level + pet2.level) / 2) + 1,
      experience: 0,
      hp: Math.max(pet1.maxHp, pet2.maxHp),
      maxHp: Math.max(pet1.maxHp, pet2.maxHp),
      attack: Math.floor((pet1.attack + pet2.attack) / 2 * 1.2),
      defense: Math.floor((pet1.defense + pet2.defense) / 2 * 1.2),
    };

    return synthesized;
  }

  /**
   * Get pet by ID from database
   */
  static getPetData(petId: string): PetData | undefined {
    return PETS_DATABASE.find((p) => p.id === petId);
  }
}
