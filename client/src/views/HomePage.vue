<script setup>
import { ref } from "vue";
const sectionName = ref(null);
const selected = ref(null);
const posts = ref(null);
const cvLink = ref(null);
const message = ref();
const answer = ref(null);
//const render = "https://match-0ubs.onrender.com";
const local = "http://localhost:5000";

fetch(`${local}/dictionary`).then((res) =>
	res.json().then((res) => (posts.value = res)),
);

async function post(info, endpoint) {
	return fetch(`${local}/${endpoint}`, {
		method: "POST",
		body: JSON.stringify(info),
		headers: { "content-type": "application/json" },
	});
}

function handleSectionName() {
	post({ [selected.value]: sectionName.value }, "dictionary");
	//console.log('FE:', { [selected.value]: sectionName.value })
}

function sendCV() {
	post({ value: cvLink.value }, "resume");
}

async function handlePrompt(message) {
	const prompt = { role: "user", content: message };
	const response = await post(new Array(prompt), "chat");
	if (!response.ok) throw new Error(response.statusText);

	answer.value = await response.json();
}
</script>

<template>
	<div
		class="container"
		v-if="posts">
		<pre v-if="answer">{{ answer.generated_text }}</pre>
		<h1>Matcher</h1>
		<select
			name="titles"
			id="titles"
			v-model="selected">
			<option
				:value="title"
				v-for="title in Object.keys(posts)"
				:key="title">
				{{ title }}
			</option>
		</select>
		<form
			action=""
			@submit.prevent>
			<label for="sectionName">Add section name</label>
			<input
				v-model="sectionName"
				type="text"
				name="sectionName"
				id="sectionName" />
			<button @click="handleSectionName">Add</button>
		</form>
		<form
			action=""
			@submit.prevent>
			<label for="">Add link to CV</label>
			<input
				v-model="cvLink"
				type="text"
				name=""
				id="" />
			<button @click="sendCV">Add</button>
			<label for="prompt"></label>
			<textarea
				id="prompt"
				name="prompt"
				rows="8"
				cols="5"
				v-model="message"></textarea>
			<button @click="handlePrompt(message)">Send message</button>
			<h2>Your answer:</h2>
			<p v-if="answer">{{ answer }}</p>
		</form>
	</div>
</template>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	text-align: start;
	gap: 1rem;
}

.container {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
</style>