<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade, fade } from 'svelte/transition';
	import Portal from 'svelte-portal/src/Portal.svelte';
	import { browser } from '$app/environment';

	let className = '';

	export let alt = '';
	export let src = '';
	export let style = '';
	export let description: string;

	let expanded = false;

	$: if (browser) document.body.style.overflowY = expanded ? 'hidden' : '';

	const [send, receive] = crossfade({
		duration: 700,
		easing: quintOut
	});
</script>

<!-- <svelte:body style={expanded ? 'overflow: none' : ''} /> -->

<!-- TODO FIX BEING ABLE TO SCROLL ZOOMED IN -->
{#if !expanded}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
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
	<Portal target="body">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			transition:fade={{ duration: 700, easing: quintOut }}
			class="overlay"
			on:click={() => (expanded = false)}
		>
			<div class="flex">
				<img class="open" in:receive={{ key: 1 }} out:send={{ key: 1 }} {alt} {src} />
				{#if description}
					<div class="description" on:click|stopPropagation={() => ({})}>
						<p>{description}</p>
					</div>
				{/if}
			</div>
		</div>
	</Portal>
{/if}

<style>
	.open {
		object-fit: scale-down;
		max-width: 100%;
		max-height: 100%;
		min-height: 0;
	}
	.closed {
		cursor: zoom-in;
		max-width: 100%;
		max-height: 100%;
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
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: zoom-out;
		padding: 3%;
		box-sizing: border-box;
	}
	.flex {
		height: 100%;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.description {
		flex-shrink: 0;
		box-sizing: border-box;
		cursor: text;
		background-color: antiquewhite;
		margin: 10px;
		width: 100%;
	}
	p {
		margin: 15px;
		box-sizing: border-box;
	}
</style>
