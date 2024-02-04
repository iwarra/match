<script setup>
import { ref, watch, watchEffect } from "vue";

const {
	data: jobs,
	loading,
	error,
} = await useFetch(`http://localhost:5000/jobs`);

class HttpError extends Error {
	constructor(message) {
		super(message);
		this.name = "HttpError";
	}
}

async function useFetch(url) {
	let loading = ref(true);
	let error = ref(null);
	let data = ref(null);

	watchEffect(async () => {
		const res = await fetch(url);
		if (!res.ok) {
			error.value = new HttpError(`(${res.status}) ${res.statusText}`);
			loading.value = false;
		} else {
			data.value = await res.json();
			loading.value = false;
		}
	});

	return { data, loading, error };
}
</script>

<template>
	<div>
		<h1>Here are top ten jobs for you:</h1>
		<!-- <button @click="test()">Show jobs</button> -->
		<span v-if="loading">Loading...</span>
		<span v-if="error">{{ error }}</span>
		<div v-else>
			<div v-for="job in jobs">
				<h2>{{ job.original.headline }}</h2>
				<p>{{ job.original.description.text.substr(0, 200) }}...</p>
			</div>
		</div>
		<!-- <pre>{{ jobs }}</pre> -->
	</div>
</template>

<style scoped></style>
