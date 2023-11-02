<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Img from '$lib/img.svelte';
	import { setResponse } from '@sveltejs/kit/node';
	import av from '$lib/images/matkalaukku/av.jpg';
	import millie from '$lib/images/matkalaukku/millie.jpg';
	import rakentelu from '$lib/images/matkalaukku/rakentelu.jpg';
	import rinkeliburgeri from '$lib/images/matkalaukku/rinkeliburgeri.jpg';
	import sailing from '$lib/images/matkalaukku/sailing.jpg';
	import talvi from '$lib/images/matkalaukku/talvi.jpg';
	import valkouvaus from '$lib/images/matkalaukku/valokuvaus.jpg';
	import vava from '$lib/images/matkalaukku/vava.jpg';

	import pkg from 'hyphen/fi';
	import Maximizableimage from '$lib/maximizableimage.svelte';
	const { hyphenateSync } = pkg;

	let skipIntro = false;

	let textToType = 'KU01 PortfolioVille Kujala';

	let pageHeight = 0;
	let BigHeaderContent = '';
	let SmallHeaderContent = '';
	let cursor1 = '_';
	let cursor2 = '';
	let y: number;

	interface image_data {
		src: string;
		title: string;
		description: string;
	}

	let suitcase_images: Array<image_data> = [
		{
			src: av,
			title: 'Valosuunnittelu',
			description: `Kuvassa on otaniemen lukion vuoden 2023 vappugaalan lava. Olin mukana tapahtuman suunnittelussa, ja koko visuaalisen ilmeen luomisessa. Vaikka tapahtumatekniikan toteuttamisen voisi usein ajatella vain tylsäksi tekniseksi projektiksi, siinä pääsee todellisuudessa harjoittamaan omaa luovuuttan laajasti ja kiinostavasti, kun täytyy työskennellä projektin budjetin rajoissa luoden silti uniikin ja ikimuistoisen tapahtuman. Nautin itse tästä luovasta prosessista ja voisin nähdä itseni työskentelemässä alalla tulevaisuudessa.`
		},
		{
			src: vava,
			title: 'Partio',
			description: `Partio on aina ollut tärkeä osa elämääni. Olen harrastanut sitä jo pienestä lapsesta asti. Tunnen myös monia hyviä ystäviäni juuri partion kautta. Kuvassa on vuoden 2016 kohtaaminen, ja lippukuntani vaaran vaeltajat, jonka jäsen olen yhä.`
		},
		{
			src: valkouvaus,
			title: 'Valokuvaus',
			description: `Melkein jokainen matkalaukun kuvista on itseni kuvaama. Nautin valokuvaamisesta, sillä koen sen rauhalliseksi tekemiseksi, jossa pääsee samaan aikaan nauttimaan maailman yleisestä kauneudesta. Kuvassa on ystäväni, kuka harrastaa cosplayta Sinebrychoffin taidemuseossa helsingissä. Kuva on luonnolisesti itseni ottama.`
		},
		{
			src: rinkeliburgeri,
			title: 'Rinkeliburgeri',
			description: `Kuvassa on erään päivän aamupalani. Valitettavasti se ei löytäny tietään kannelle sillä kuvassa on erilainen estetiikka muihin kuviin verrattuna. Kuitenkin jokaisen nuoren elämään liittyy kuvan kaltaiset nopeat somepostaukset joten tämäkin on osa minun elämäni visuaalista olemusta.`
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

	<!-- <link rel="preload" as="image" href="images/matkalaukku/av.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/rakentelu.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/sailing.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/valokuvaus.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/millie.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/talvi.jpg" />
	<link rel="preload" as="image" href="images/matkalaukku/vava.jpg" /> -->
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerHeight={pageHeight} />

{#if intro_done}
	<div class="background" in:slide|global={{ duration: 650, axis: 'x' }}>
		<Img src={av} top="40vh" left="0" width="55vw" height="35vh" />
		<Img src={rakentelu} top="0" left="0" width="60vw" height="40vh" />
		<Img src={sailing} top="60vh" left="50vw" width="20vw" height="60vh" />
		<Img src={valkouvaus} top="40vh" left="70vw" width="30vw" height="60vh" />
		<Img src={millie} top="0" left="60vw" width="40vw" height="45vh" />
		<Img src={talvi} top="30vh" left="40vw" width="35vw" height="30vh" />
		<Img src={vava} top="75vh" left="0" width="50vw" height="30vh" />
	</div>
{/if}
<div class="fakebg" />

<div class="intro" style="transform: translate(0,{-y * 0.2}vh);">
	<div class="intro_text">
		<h1 class=".intro_text_text">{BigHeaderContent}{cursor1}</h1>
		<h3>{SmallHeaderContent}{cursor2}</h3>
	</div>
</div>

<div>
	<h2 class="title">Visuaalinen matkalaukku</h2>
	{#each suitcase_images as image, i}
		<section class="fakesection" />
		<section class="section center">
			<div class="image_explainer {i % 2 == 0 ? '' : 'rev-explainer'}">
				<div transition:fly={{ x: -1000, duration: 1200 }} class="showcasedesc">
					<h3>{image.title}</h3>
					<p class="showcasedescdesc">
						{@html hyphenateSync(image.description, { minWordLength: 7 })}
					</p>
				</div>
				<Maximizableimage src={image.src} alt="a light show" class="showcaseimage" />
			</div>
		</section>
	{/each}
</div>
<div>
	<h2 class="title ghosts_title">Otiksen Aaveita</h2>
	<section class="ghosts section">
		<div class="center ghosts_div">Ghosts in progress</div>
	</section>
</div>
<div>
	<h2 class="title">Katukuvausta</h2>
	<section class="section">
		<div class="center">Todo: Add pictures</div>
	</section>
</div>

<style>
	:global(html) {
		box-sizing: border-box;
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		width: 100%;
		min-height: 100%;

		scroll-behavior: smooth;
		scroll-snap-type: y none;
	}
	:global(body) {
		margin: 0;
		width: 100%;
		height: 100%;
		background-color: antiquewhite;
		overflow-x: hidden;
	}
	:global(.showcaseimage) {
		object-fit: cover;
		min-width: 0;
		min-height: 0;
	}
	.ghosts {
		width: 100vh;
		height: 135vw;
		scroll-snap-align: start;
		box-sizing: border-box;
	}
	.title {
		position: sticky;
		top: 8vh;
		margin-left: 10vw;
	}
	.ghosts_div {
	}
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
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
	.fakesection {
		position: absolute;
		width: 100vw;
		height: 120vh;
		scroll-snap-align: start;
		overflow-x: hidden;
		overflow: hidden;
	}
	.section {
		position: sticky;
		top: 0;
		width: 100vw;
		height: 100vh;
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
		background-color: antiquewhite;
		z-index: 100;
		display: flex;
		justify-content: space-between;
		width: 80vw;
		height: 60vh;
		text-align: justify;
		hyphens: manual;
		max-width: 70vw;
	}
	.rev-explainer {
		flex-direction: row-reverse;
	}

	.showcasedesc {
		box-sizing: border-box;
		flex-shrink: 3;
		min-width: 25%;
		margin-left: 5%;
		margin-right: 5%;
	}

	.showcasedescdesc {
		overflow-y: auto;
	}

	.intro {
		box-sizing: border-box;
		width: fit-content;
		position: absolute;
		margin: 0;
		top: 30vh;
		container-name: title;
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

	@media (max-aspect-ratio: 4/3) {
		.image_explainer {
			max-width: 90vw;
		}
	}

	@media (max-aspect-ratio: 5/6) {
		.image_explainer {
			flex-direction: column;
			margin-top: 13vh;
			height: 80vh;
			justify-content: flex-start;
		}
		.showcasedesc {
			margin-right: 0;
			margin-left: 0;
		}
		.rev-explainer {
			flex-direction: column;
		}
		.intro_text {
			margin: 1em;
			margin-bottom: 0;
		}
	}
</style>
