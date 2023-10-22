<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Img from '$lib/img.svelte';
	import { setResponse } from '@sveltejs/kit/node';

	let skipIntro = false;

	let textToType = 'KU01 PortfolioVille Kujala';

	let BigHeaderContent = '';
	let SmallHeaderContent = '';
	let cursor1 = '_';
	let cursor2 = '';
	let y: number;

	interface suitcase_image {
		src: string;
		title: string;
		description: string;
	}

	let suitcase_images: Array<suitcase_image> = [
		{
			src: '/images/matkalaukku/av.jpg',
			title: 'Valosuunnittelu',
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deseruntmollit anim id est laborum.`
		},
		{
			src: '/images/matkalaukku/av.jpg',
			title: 'Valosuunnittelu',
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deseruntmollit anim id est laborum.`
		}
	];

	let typer = setInterval(typeNext, 150);

	let typerIndex = 0;
	let intro_done = false;

	function typeNext() {
		if (skipIntro) {
			BigHeaderContent = 'KU01 Portfolio';
			SmallHeaderContent = 'Ville Kujala';
			clearInterval(typer);
			intro_done = true;
			return;
		}

		if (typerIndex >= textToType.length) {
			clearInterval(typer);
			cursor2 = '';
			intro_done = true;
		} else if (typerIndex < 14) {
			BigHeaderContent += textToType[typerIndex];
		} else {
			cursor1 = '';
			cursor2 = '_';
			SmallHeaderContent += textToType[typerIndex];
		}
		typerIndex++;
	}
</script>

<svelte:window bind:scrollY={y} />
{#if intro_done}
	<div class="background" in:slide|global={{ duration: 650, axis: 'x' }}>
		<Img src="/images/matkalaukku/av.jpg" top="40vh" left="0" width="55vw" height="35vh" />
		<Img src="/images/matkalaukku/rakentelu.jpg" top="0" left="0" width="60vw" height="40vh" />
		<Img src="/images/matkalaukku/sailing.jpg" top="60vh" left="50vw" width="20vw" height="60vh" />
		<Img
			src="/images/matkalaukku/valokuvaus.jpg"
			top="40vh"
			left="70vw"
			width="30vw"
			height="60vh"
		/>
		<Img src="/images/matkalaukku/millie.jpg" top="0" left="60vw" width="40vw" height="45vh" />
		<Img src="/images/matkalaukku/talvi.jpg" top="30vh" left="40vw" width="35vw" height="30vh" />
		<Img src="/images/matkalaukku/vava.jpg" top="75vh" left="0" width="50vw" height="30vh" />
	</div>
	<div class="fakebg" />
{/if}

<div class="intro" style="transform: translate(0,{-y * 0.2}vh);">
	<div class="intro_text">
		<h1>{BigHeaderContent}{cursor1}</h1>
		<h3>{SmallHeaderContent}{cursor2}</h3>
	</div>
</div>
{#if intro_done}
	{#each suitcase_images as image, i}
		<section class="section center">
			{#if y > innerHeight * (i + 1 + 0.1) && y < innerHeight * (i + 1 + 0.4)}
				<div
					class="image_explainer"
					style="transform: translate(0,{y - innerHeight * (i + 1.2)}px);"
				>
					<div transition:fly={{ x: -1000, duration: 1200 }} class="showcasedesc">
						<h2>{image.title}</h2>
						<p>
							{image.description}
						</p>
					</div>
					<img
						transition:fly={{ x: 1000, duration: 1200 }}
						src={image.src}
						alt="a light show"
						class="showcaseimage"
					/>
				</div>
			{/if}
		</section>
	{/each}
{/if}

<style>
	:global(html) {
		box-sizing: border-box;
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		width: 100%;
		min-height: 100%;

		scroll-behavior: smooth;
		scroll-snap-type: y proximity;
	}
	:global(body) {
		margin: 0;
		width: 100%;
		height: 100%;
		background-color: antiquewhite;
		overflow-x: hidden;
	}
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.background {
		scroll-snap-align: start;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 120vh;
	}

	.section {
		width: 100vw;
		height: 100vh;
		scroll-snap-align: start;
		overflow-x: hidden;
	}
	.fakebg {
		box-sizing: border-box;
		top: 0;
		left: 0;
		width: 100vw;
		height: 120vh;
	}

	.image_explainer {
		display: flex;
		justify-content: space-between;
		width: 80vw;
		height: 60vh;
	}
	.showcaseimage {
		object-fit: cover;
		min-width: 0;
		min-height: 0;
	}
	.showcasedesc {
		box-sizing: border-box;
		flex-shrink: 24;
		margin-right: 5%;
	}

	.intro {
		box-sizing: border-box;
		width: fit-content;
		position: absolute;
		margin: 0;
		top: 30vh;
	}

	.intro_text {
		box-sizing: border-box;
		padding: 0.3em;
		padding-left: 1em;
		padding-right: 1em;
		margin: 5em;
		margin-bottom: 0;
		width: fit-content;
		background-color: antiquewhite;
	}
</style>
