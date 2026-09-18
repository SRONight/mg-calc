<script setup>
import "../assets/css/mutation-section.css";

defineProps({
  title: {
    type: String,
    required: true,
  },

  mutations: {
    type: Array,
    required: true,
  },

  selected: {
    type: String,
    required: true,
  },
});

defineEmits(["select"]);

function getMutationStyle(mutation) {
  if (!mutation.gradient) {
    return {
      backgroundColor: mutation.color,
    };
  }

  const { angleDegrees, colorStops } = mutation.gradient;

  const stops = colorStops
    .map((stop) => `${stop.color} ${stop.offset * 100}%`)
    .join(", ");

  return {
    backgroundColor: mutation.color,
    backgroundImage: `linear-gradient(${angleDegrees}deg, ${stops})`,
  };
}
</script>

<template>
  <section class="mutation-group">
    <h4>{{ title }}</h4>

    <div class="mutation-buttons">
      <button
        v-for="mutation in mutations"
        :key="mutation.name"
        type="button"
        class="mutation-button"
        :class="{ selected: selected === mutation.name }"
        :style="getMutationStyle(mutation)"
        @click="$emit('select', mutation.name)"
      >
        {{ mutation.name }}
      </button>
    </div>
  </section>
</template>
