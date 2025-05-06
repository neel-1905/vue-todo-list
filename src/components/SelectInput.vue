<script setup lang="ts">
import chevronDown from "../assets/chevron-down.svg";
import { computed, ref } from "vue";
import type { Option } from "../types";

const props = defineProps<{
  options: Option[];
  selectedValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:selectedValue", value: string): void;
}>();

const isOptionsOpen = ref<boolean>(false);

const selectedLabel = computed(() => {
  const matchedLabel = props.options.find(
    (option) => option.value === props.selectedValue
  );
  return matchedLabel ? matchedLabel.label : "None selected";
});

const handleOptionClick = (option: Option) => {
  isOptionsOpen.value = false;
  emit("update:selectedValue", option.value);
};
</script>

<template>
  <div
    @click="isOptionsOpen = !isOptionsOpen"
    class="relative shrink-0 bg-theme-purple h-full max-h-10 w-[120px] gap-2 flex justify-between items-center rounded-primary p-3"
  >
    <span class="text-sm">
      {{ selectedLabel }}
    </span>

    <img :src="chevronDown" alt="Arrow Down" />

    <div
      v-if="isOptionsOpen"
      class="absolute right-0 top-full mt-2 bg-theme-purple rounded-primary w-[120px]"
    >
      <ul>
        <li
          v-for="option in props.options"
          :key="option.value"
          class="hover:bg-theme-purple-hover cursor-pointer px-3 py-3 rounded-primary text-sm"
          @click.stop="handleOptionClick(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
