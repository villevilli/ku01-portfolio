<script lang="ts">
	import { slide } from 'svelte/transition';

	export let src: string;
	export let alt: string = '';
	export let top: string = '';
	export let bottom: string = '';
	export let left: string = '';
	export let right: string = '';
	export let transform: string = '';
	export let width: string = '';
	export let height: string = '';
</script>

<img
	{src}
	{alt}
	style="
top: {top};
bottom: {bottom};
left:{left};
right:{right};
transform: {transform};
width: {width};
height: {height};"
/>

<style>
	img {
		position: absolute;
		object-fit: cover;
		border: 2px solid white;
		box-sizing: border-box;
	}
</style>
