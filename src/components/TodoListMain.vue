// TodoListMain.vue
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import SearchInput from "./SearchInput.vue";
import SelectInput from "./SelectInput.vue";
import AddItemModal from "./AddItemModal.vue";
import type { TodoList, Todo } from "../types";
import TasksList from "./TasksList.vue";

const selectOptions = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

const searchQuery = ref("");
const selectedOption = ref("all");
const isModalOpen = ref(false);

const todoList = ref<TodoList>([]);

onMounted(() => {
  const storedTodoList = localStorage.getItem("todoList");

  if (!storedTodoList) return;

  try {
    const parsed = JSON.parse(storedTodoList);
    if (Array.isArray(parsed)) {
      todoList.value = parsed as TodoList;
    } else {
      console.warn("Invalid todo list data");
    }
  } catch (error) {
    console.error("Failed to parse todoList from localStorage", error);
  }
});

const handleOpenModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleAddItem = (item: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    name: item,
    status: "pending",
  };

  todoList.value = [...todoList.value, newTodo];
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const handleStatusToggle = (id: number) => {
  todoList.value = todoList.value.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        status: todo.status === "pending" ? "completed" : "pending",
      };
    }
    return todo;
  });

  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const handleDeleteItem = (id: number) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id);
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const handleEditItem = (updatedItem: Todo) => {
  console.log(updatedItem);
  // Create a completely new array with the updated item
  todoList.value = todoList.value.map((todo) => {
    if (todo.id === updatedItem.id) {
      return updatedItem;
    }
    return todo;
  });

  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

// Computed: filtered list
const filteredTodos = computed(() => {
  return todoList.value.filter((todo) => {
    const matchesSearch = todo.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      selectedOption.value === "all" || todo.status === selectedOption.value;

    return matchesSearch && matchesStatus;
  });
});
</script>

<template>
  <div class="max-w-5xl w-full h-full py-6 flex flex-col">
    <div class="flex flex-col my-4">
      <h1 class="text-3xl font-bold text-center mb-4">TODO LIST</h1>
      <div class="flex items-center gap-4">
        <SearchInput v-model:searchQuery="searchQuery" />
        <SelectInput
          v-model:options="selectOptions"
          v-model:selectedValue="selectedOption"
        />
      </div>
    </div>

    <div class="flex-1 mb-4">
      <TasksList
        :todo-list="filteredTodos"
        @update-status="handleStatusToggle"
        @delete-item="handleDeleteItem"
        @edit-item="handleEditItem"
      />
    </div>

    <div class="flex justify-end items-center">
      <button
        @click="handleOpenModal"
        class="bg-theme-purple text-xl rounded-full w-10 h-10 flex justify-center items-center p-0 cursor-pointer"
      >
        <img src="../assets/plus.svg" class="h-4 w-4" />
      </button>
    </div>
  </div>

  <AddItemModal
    :isModalOpen="isModalOpen"
    :closeModal="closeModal"
    @add-item="handleAddItem"
  />
</template>
