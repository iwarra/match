import JobRecs from "./src/views/JobRecs.vue";
import HomePage from "./src/views/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{ path: "/", component: HomePage },
	{ path: "/jobs", component: JobRecs },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
