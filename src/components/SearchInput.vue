<script setup lang="ts">
// Define props
const props = defineProps<{
  searchQuery: string;
}>();

// Define emits
const emit = defineEmits<{
  (e: "update:searchQuery", value: string): void;
}>();

// Emit on input
const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:searchQuery", target.value);
};
</script>

<template>
  <div
    class="flex flex-1 border rounded-primary focus-within:border-theme-purple"
  >
    <input
      type="search"
      class="w-full py-1.5 px-2.5 border-0 focus:border-0 outline-none"
      placeholder="Search for a task..."
      :value="props.searchQuery"
      @input="updateValue"
    />
    <img src="../assets/search.svg" alt="Search" class="px-2.5" />
  </div>
</template>
