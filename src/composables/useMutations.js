import { computed, ref } from "vue";

export function useMutations(mutationData) {
  const mutations = ref({
    growth: "none",
    hydro: "none",
    lunar: "none",
  });

  /*
   * ============================================================
   * Mutation groups
   * ============================================================
   */

  const growthMutations = computed(() => {
    return mutationData.value.filter((mutation) => mutation.group === "Growth");
  });

  const hydroMutations = computed(() => {
    return mutationData.value.filter((mutation) => mutation.group === "Hydro");
  });

  const lunarMutations = computed(() => {
    return mutationData.value.filter((mutation) => mutation.group === "Lunar");
  });

  /*
   * ============================================================
   * Helpers
   * ============================================================
   */

  function getMutation(name) {
    if (!name || name === "none") {
      return null;
    }

    return (
      mutationData.value.find(
        (mutation) => mutation.name.toLowerCase() === name.toLowerCase()
      ) ?? null
    );
  }

  function isSelected(group, name) {
    return mutations.value[group] === name;
  }

  /*
   * ============================================================
   * Growth
   * ============================================================
   *
   * none
   * Gold
   * Rainbow
   *
   * Gold / Rainbow are mutually exclusive.
   */

  function selectGrowthMutation(name) {
    if (mutations.value.growth === name) {
      mutations.value.growth = "none";
    } else {
      mutations.value.growth = name;
    }
  }

  /*
   * ============================================================
   * Hydro
   * ============================================================
   *
   * none
   * Wet
   * Chilled
   * Frozen
   * Thunderstruck
   * Thundercharged
   *
   * Wet + Chilled -> Frozen
   *
   * Frozen can be changed back to Wet / Chilled.
   *
   * Thunderstruck / Thundercharged are mutually exclusive.
   */

  function selectHydroMutation(name) {
    if (mutations.value.hydro === name) {
      mutations.value.hydro = "none";
      return;
    }

    mutations.value.hydro = name;
  }

  /*
   * ============================================================
   * Lunar
   * ============================================================
   *
   * none
   * Dawnlit
   * Dawnbound
   * Amberlit
   * Amberbound
   *
   * Dawnlit / Dawnbound are mutually exclusive.
   * Amberlit / Amberbound are mutually exclusive.
   */

  function selectLunarMutation(name) {
    const current = mutations.value.lunar;

    // None
    if (name === "none") {
      mutations.value.lunar = "none";
      return;
    }

    // Dawn group
    if (name === "Dawnlit" || name === "Dawnbound") {
      mutations.value.lunar = current === name ? "none" : name;

      return;
    }

    // Amber group
    if (name === "Amberlit" || name === "Amberbound") {
      mutations.value.lunar = current === name ? "none" : name;
    }
  }

  /*
   * ============================================================
   * Multipliers
   * ============================================================
   */

  const growthMultiplier = computed(() => {
    const mutation = getMutation(mutations.value.growth);

    return mutation?.coinMultiplier ?? 1;
  });

  const conditionMutations = computed(() => {
    const result = [];

    if (mutations.value.hydro !== "none") {
      const mutation = getMutation(mutations.value.hydro);

      if (mutation) {
        result.push(mutation);
      }
    }

    if (mutations.value.lunar !== "none") {
      const mutation = getMutation(mutations.value.lunar);

      if (mutation) {
        result.push(mutation);
      }
    }

    return result;
  });

  const conditionMultiplier = computed(() => {
    if (conditionMutations.value.length === 0) {
      return 1;
    }

    const sum = conditionMutations.value.reduce(
      (total, mutation) => total + mutation.coinMultiplier,
      0
    );

    return sum - conditionMutations.value.length + 1;
  });

  return {
    mutations,

    growthMutations,
    hydroMutations,
    lunarMutations,

    growthMultiplier,
    conditionMultiplier,

    getMutation,
    isSelected,

    selectGrowthMutation,
    selectHydroMutation,
    selectLunarMutation,
  };
}
