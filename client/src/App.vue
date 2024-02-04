<template>
	<div>
		<header>
			<nav class="navbar">
				<router-link to="/">Home</router-link>
				<router-link to="/jobs">Jobs</router-link>
			</nav>
		</header>
		<Suspense>
			<router-view></router-view>
		</Suspense>
	</div>
</template>

<script setup></script>

<style scoped>

.navbar {
  display: flex;
  gap: 1.2rem;
  font-size: 1.2rem;
  justify-content: flex-end;
} 
</style>
