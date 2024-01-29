<script setup>
import { ref } from "vue";
const sectionName = ref(null);
const selected = ref(null);
const posts = ref(null);
const cvLink = ref(null);

fetch("http://localhost:5000/dictionary").then((res) =>
	res.json().then((res) => (posts.value = res)),
);

function post(info, endpoint) {
	fetch(`http://localhost:5000/${endpoint}`, {
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
</script>

<template>
	<div class="container">
		<select
			name="titles"
			id="titles"
			v-model="selected">
			<option
				:value="title"
				v-for="title in Object.keys(posts.original)"
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
