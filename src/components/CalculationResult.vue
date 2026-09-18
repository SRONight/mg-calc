<script setup>
import "../assets/css/calculation-result.css";

defineProps({
  baseValue: {
    type: Number,
    required: true,
  },

  sizeMultiplier: {
    type: Number,
    required: true,
  },

  growthMultiplier: {
    type: Number,
    required: true,
  },

  conditionMultiplier: {
    type: Number,
    required: true,
  },

  friendBonusMultiplier: {
    type: Number,
    required: true,
  },

  finalValue: {
    type: Number,
    required: true,
  },
});

function formatNumber(value) {
  return Math.round(value).toLocaleString();
}

function formatMultiplier(value) {
  return `×${value.toFixed(2)}`;
}
</script>

<template>
  <section class="section result">
    <h3>Calculation</h3>

    <div class="calculation-row">
      <span>Base Value</span>
      <strong>{{ formatNumber(baseValue) }}</strong>
    </div>

    <div class="calculation-row">
      <span>Size</span>
      <strong>{{ formatMultiplier(sizeMultiplier) }}</strong>
    </div>

    <div class="calculation-row">
      <span>Growth</span>
      <strong>{{ formatMultiplier(growthMultiplier) }}</strong>
    </div>

    <div class="calculation-row">
      <span>Conditions</span>
      <strong>{{ formatMultiplier(conditionMultiplier) }}</strong>
    </div>

    <div class="calculation-row">
      <span>Friend Bonus</span>
      <strong>{{ formatMultiplier(friendBonusMultiplier) }}</strong>
    </div>

    <hr />

    <div class="final-value">
      <span>Final Value</span>
      <strong>{{ formatNumber(finalValue) }}</strong>
    </div>
  </section>
</template>
