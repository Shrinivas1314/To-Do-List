<template>
  <div class="container">
    <h1>Nuxt 3 To-Do List</h1>

    <!-- Task Form -->
    <form @submit.prevent="addTask">
      <input v-model="newTask.activity" placeholder="Activity" required />
      <input v-model.number="newTask.price" type="number" placeholder="Price" required />

      <select v-model="newTask.type">
        <option v-for="option in types" :key="option" :value="option">{{ option }}</option>
      </select>

      <label>
        <input type="checkbox" v-model="newTask.bookingRequired" />
        Booking Required
      </label>

      <input type="range" v-model.number="newTask.accessibility" min="0" max="1" step="0.1" />
      
      <button type="submit">Add</button>
    </form>

    <!-- Task Summary -->
    <h2>Total Items: {{ tasks.length }}</h2>

    <!-- Task List -->
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.activity }} - ${{ task.price }} - {{ task.type }} - Accessibility: {{ task.accessibility }}
        <button @click="removeTask(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// Reactive states
const tasks = ref([]);
const newTask = ref({
  activity: "",
  price: null,
  type: "education",
  bookingRequired: false,
  accessibility: 0.5,
});
const types = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];

// Load stored tasks from localStorage
onMounted(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) tasks.value = JSON.parse(savedTasks);
});

// Watch for changes and update localStorage
watch(tasks, (newTasks) => {
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}, { deep: true });

// Add new task
const addTask = () => {
  tasks.value.push({ ...newTask.value });
  newTask.value.activity = "";
  newTask.value.price = null;
  newTask.value.type = "education";
  newTask.value.bookingRequired = false;
  newTask.value.accessibility = 0.5;
};

// Remove task
const removeTask = (index) => {
  tasks.value.splice(index, 1);
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

input, select, button {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 8px;
}

button {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
