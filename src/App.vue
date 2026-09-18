<script setup>
import { computed, ref } from "vue";

import CropSelector from "./components/CropSelector.vue";
import SizeInput from "./components/SizeInput.vue";
import FriendBonus from "./components/FriendBonus.vue";
import MutationSection from "./components/MutationSection.vue";
import CalculationResult from "./components/CalculationResult.vue";
import Footer from "./components/Footer.vue";

import { useCropData } from "./composables/useCropData";
import { useMutations } from "./composables/useMutations";

import "./assets/css/main.css";

/*
 * ============================================================
 * Crop data
 * ============================================================
 */

const { crops, mutationData, loading, error, selectedCropName } = useCropData();

/*
 * ============================================================
 * Crop
 * ============================================================
 */

const selectedCrop = computed(() => {
  return (
    crops.value.find((plant) => plant.crop.name === selectedCropName.value) ??
    null
  );
});

/*
 * ============================================================
 * Mutations
 * ============================================================
 */

const {
  mutations,

  growthMutations,
  hydroMutations,
  lunarMutations,

  growthMultiplier,
  conditionMultiplier,

  selectGrowthMutation,
  selectHydroMutation,
  selectLunarMutation,
} = useMutations(mutationData);

/*
 * ============================================================
 * Size
 * ============================================================
 */

const size = ref(50);

function getSizeMultiplier(sizeValue, crop) {
  if (!crop) {
    return 1;
  }

  const maxSizeMultiplier = crop.crop.maxSizeMultiplier;

  return 1 + (maxSizeMultiplier - 1) * ((sizeValue - 50) / 50);
}

const sizeMultiplier = computed(() => {
  return getSizeMultiplier(size.value, selectedCrop.value);
});

/*
 * ============================================================
 * Friend Bonus
 * ============================================================
 *
 * 1 player = +0%  = x1.00
 * 2 players = +10% = x1.10
 * 3 players = +20% = x1.20
 * 4 players = +30% = x1.30
 * 5 players = +40% = x1.40
 * 6 players = +50% = x1.50
 */

const friendPlayers = ref(1);

const friendBonusMultiplier = computed(() => {
  return 1 + (friendPlayers.value - 1) * 0.1;
});

/*
 * ============================================================
 * Final value
 * ============================================================
 */

const finalValue = computed(() => {
  if (!selectedCrop.value) {
    return 0;
  }

  const baseValue = selectedCrop.value.crop.baseSellPrice;

  return (
    baseValue *
    sizeMultiplier.value *
    growthMultiplier.value *
    conditionMultiplier.value *
    friendBonusMultiplier.value
  );
});
</script>

<template>
  <main class="calculator">
    <header class="header">
      <h2>Magic Garden Crops Calculator</h2>
    </header>

    <div v-if="loading" class="message">Loading crop data...</div>

    <div v-else-if="error" class="message error">
      Failed to load data:
      {{ error }}
    </div>

    <template v-else>
      <!-- Crop -->
      <CropSelector v-model="selectedCropName" :crops="crops" />

      <section class="section top-options">
        <!-- Size -->
        <SizeInput v-model="size" :multiplier="sizeMultiplier" />

        <!-- Friend Bonus -->
        <FriendBonus
          v-model="friendPlayers"
          :multiplier="friendBonusMultiplier"
        />
      </section>

      <!-- Mutations -->
      <section class="section mutations">
        <h3 class="mutations-title">Mutation</h3>

        <MutationSection
          title="Growth"
          :mutations="growthMutations"
          :selected="mutations.growth"
          @select="selectGrowthMutation"
        />

        <MutationSection
          title="Hydro"
          :mutations="hydroMutations"
          :selected="mutations.hydro"
          @select="selectHydroMutation"
        />

        <MutationSection
          title="Lunar"
          :mutations="lunarMutations"
          :selected="mutations.lunar"
          @select="selectLunarMutation"
        />
      </section>

      <!-- Calculation -->
      <CalculationResult
        :base-value="selectedCrop?.crop.baseSellPrice ?? 0"
        :size-multiplier="sizeMultiplier"
        :growth-multiplier="growthMultiplier"
        :condition-multiplier="conditionMultiplier"
        :friend-bonus-multiplier="friendBonusMultiplier"
        :final-value="finalValue"
      />
    </template>
  </main>
  <Footer />
</template>
