<script lang="ts">
	import { browser } from '$app/environment';
	import { expoOut, quintOut } from 'svelte/easing';
	import { crossfade, fade } from 'svelte/transition';

	let className = '';

	export let alt = '';
	export let src = '';
	export let style = '';
	export { className as class };

	let expanded = false;

	const [send, receive] = crossfade({
		duration: 700,
		easing: quintOut
	});
	console.log(className);
</script>

{#if !expanded}
	<img
		in:receive={{ key: 1 }}
		out:send={{ key: 1 }}
		{alt}
		{src}
		class={$$props.class + ' closed'}
		{style}
		on:click={() => (expanded = true)}
	/>
{:else}
	<div
		transition:fade={{ duration: 700, easing: quintOut }}
		class="overlay"
		on:click={() => (expanded = false)}
	>
		<img class="open" in:receive={{ key: 1 }} out:send={{ key: 1 }} {alt} {src} />
	</div>
{/if}

<style>
	.open {
		object-fit: scale-down;
		max-width: 100%;
		max-height: 100%;
	}
	.closed {
		cursor: zoom-in;
	}
	.overlay {
		background-color: rgb(0, 0, 0, 60%);
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: zoom-out;
	}
</style>
