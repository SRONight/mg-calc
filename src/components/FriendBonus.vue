<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },

  multiplier: {
    type: Number,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <section class="section">
    <h3>Friend Bonus</h3>

    <div class="friend-input">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', Number($event.target.value))"
      >
        <option :value="1">1 player (solo)</option>

        <option :value="2">2 players</option>

        <option :value="3">3 players</option>

        <option :value="4">4 players</option>

        <option :value="5">5 players</option>

        <option :value="6">6 players (full server)</option>
      </select>
    </div>

    <p class="hint">
      Friend Bonus: +{{ Math.round((multiplier - 1) * 100) }}% (×{{
        multiplier.toFixed(2)
      }})
    </p>
  </section>
</template>
