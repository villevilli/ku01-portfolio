<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Img from '$lib/img.svelte';
	import { setResponse } from '@sveltejs/kit/node';
	import pkg from 'hyphen/fi';
	const { hyphenateSync } = pkg;

	let skipIntro = false;

	let textToType = 'KU01 PortfolioVille Kujala';

	let pageHeight = 0;
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
			src: 'images/matkalaukku/av.jpg',
			title: 'Valosuunnittelu',
			description: `Kuvassa on otaniemen lukion vuoden 2023 vappugaalan lava. Olin mukana tapahtuman suunnittelussa, ja koko visuaalisen ilmeen luomisessa. Vaikka tapahtumatekniikan toteuttamisen voisi usein ajatella vain tylsäksi tekniseksi projektiksi, siinä pääsee todellisuudessa harjoittamaan omaa luovuuttan laajasti ja kiinostavasti, kun täytyy työskennellä projektin budjetin rajoissa luoden silti uniikin ja ikimuistoisen tapahtuman. Nautin itse tästä luovasta prosessista ja voisin nähdä itseni työskentelemässä alalla tulevaisuudessa.`
		},
		{
			src: 'images/matkalaukku/vava.jpg',
			title: 'Partio',
			description: `Partio on aina ollut tärkeä osa elämääni. Olen harrastanut sitä jo pienestä lapsesta asti. Tunnen myös monia hyviä ystäviäni juuri partion kautta. Kuvassa on vuoden 2016 kohtaaminen, ja lippukuntani vaaran vaeltajat, jonka jäsen olen yhä.`
		},
		{
			src: 'images/matkalaukku/valokuvaus.jpg',
			title: 'Valokuvaus',
			description: `Melkein jokainen matkalaukun kuvista on itseni kuvaama. Nautin valokuvaamisesta, sillä koen sen rauhalliseksi tekemiseksi, jossa pääsee samaan aikaan nauttimaan maailman yleisestä kauneudesta. Kuvassa on ystäväni, kuka harrastaa cosplayta Sinebrychoffin taidemuseossa helsingissä. Kuva on luonnolisesti itseni ottama.`
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

<svelte:head>
	<title>KU01 Portfolio Ville Kujala</title>

	<link rel="preload" as="image" href="images/matkalaukku/av.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/rakentelu.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/sailing.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/valokuvaus.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/millie.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/talvi.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/vava.jpg" />
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerHeight={pageHeight} />

{#if intro_done}
	<div class="background" in:slide|global={{ duration: 650, axis: 'x' }}>
		<Img src="images/matkalaukku/av.jpg" top="40vh" left="0" width="55vw" height="35vh" />
		<Img src="images/matkalaukku/rakentelu.jpg" top="0" left="0" width="60vw" height="40vh" />
		<Img src="images/matkalaukku/sailing.jpg" top="60vh" left="50vw" width="20vw" height="60vh" />
		<Img
			src="images/matkalaukku/valokuvaus.jpg"
			top="40vh"
			left="70vw"
			width="30vw"
			height="60vh"
		/>
		<Img src="images/matkalaukku/millie.jpg" top="0" left="60vw" width="40vw" height="45vh" />
		<Img src="images/matkalaukku/talvi.jpg" top="30vh" left="40vw" width="35vw" height="30vh" />
		<Img src="images/matkalaukku/vava.jpg" top="75vh" left="0" width="50vw" height="30vh" />
	</div>
{/if}
<div class="fakebg" />

<div class="intro" style="transform: translate(0,{-y * 0.2}vh);">
	<div class="intro_text">
		<h1>{BigHeaderContent}{cursor1}</h1>
		<h3>{SmallHeaderContent}{cursor2}</h3>
	</div>
</div>
<!-- {#if intro_done} -->
{#each suitcase_images as image, i}
	<section class="section center">
		<!-- {#if y > pageHeight * (i + 1 + 0.1) && y < pageHeight * (i + 1 + 0.4)} -->
		<div class="image_explainer" style="transform: translate(0,{y - pageHeight * (i + 1.2)}px);">
			<div transition:fly={{ x: -1000, duration: 1200 }} class="showcasedesc">
				<h2>{image.title}</h2>
				<p>
					{@html hyphenateSync(image.description, { minWordLength: 7 })}
				</p>
			</div>
			<img
				transition:fly={{ x: 1000, duration: 1200 }}
				src={image.src}
				alt="a light show"
				class="showcaseimage"
			/>
		</div>
		<!-- {/if} -->
	</section>
{/each}

<!-- {/if} -->

<style>
	:global(html) {
		box-sizing: border-box;
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		width: 100%;
		min-height: 100%;

		scroll-behavior: smooth;
		scroll-snap-type: y mandatory;
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
		overflow: hidden;
	}
	.fakebg {
		scroll-snap-align: start;
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
		text-align: justify;
		hyphens: manual;
		max-width: 70vw;
	}
	.showcaseimage {
		object-fit: cover;
		min-width: 0;
		min-height: 0;
	}
	.showcasedesc {
		box-sizing: border-box;
		flex-shrink: 3;
		min-width: 25%;
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

	@media (max-aspect-ratio: 2/3) {
		.image_explainer {
			flex-direction: column;
			height: 80vh;
			justify-content: flex-start;
		}
	}
</style>
