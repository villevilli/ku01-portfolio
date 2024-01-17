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

	import metroKuva1 from '$lib/images/katukuvaus/metroKuva1.jpg';
	import metroKuva2 from '$lib/images/katukuvaus/metroKuva2.jpg';
	import metroIhmisKuva1 from '$lib/images/katukuvaus/metroIhmisKuva1.jpg';
	import cameraBottom from '$lib/images/katukuvaus/cameraBottom.jpg';
	import cameraSide from '$lib/images/katukuvaus/cameraSide.jpg';
	import cameraUp from '$lib/images/katukuvaus/cameraUp.jpg';
	import lahiKuva from '$lib/images/katukuvaus/lahiKuva.jpg';
	import paikalleenKuulumaton from '$lib/images/katukuvaus/paikalleenKuulumaton.jpg';
	import tuntematon from '$lib/images/katukuvaus/tuntematon.jpg';
	import harmaaKatto from '$lib/images/katukuvaus/harmaaKatto.jpg';
	import heijatus from '$lib/images/katukuvaus/heijastus_kavely.jpg';
	import kaverpiari from '$lib/images/katukuvaus/kaveripari.jpg';

	import kummituskadet from '$lib/images/aaveet/kummituskadet.jpg';
	import viivaviisaus from '$lib/images/viivojajaviisautta/creativity&madness.jpg';

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
		alt: string;
	}

	interface grid_image_date {
		src: string;
		description: string;
		alt: string;
		tall?: boolean;
		wide?: boolean;
	}

	const suitcase_images: Array<image_data> = [
		{
			src: av,
			title: 'Valosuunnittelu',
			description: `Kuvassa on otaniemen lukion vuoden 2023 vappugaalan lava. Olin mukana tapahtuman suunnittelussa, ja koko visuaalisen ilmeen luomisessa. Vaikka tapahtumatekniikan toteuttamisen voisi usein ajatella vain tylsäksi tekniseksi projektiksi, siinä pääsee todellisuudessa harjoittamaan omaa luovuuttan laajasti ja kiinostavasti, kun täytyy työskennellä projektin budjetin rajoissa luoden silti uniikin ja ikimuistoisen tapahtuman. Nautin itse tästä luovasta prosessista ja voisin nähdä itseni työskentelemässä alalla tulevaisuudessa.`,
			alt: 'Liilasti valaistu lava jolla seisoo muutama ihminen'
		},
		{
			src: vava,
			title: 'Partio',
			description: `Partio on aina ollut tärkeä osa elämääni. Olen harrastanut sitä jo pienestä lapsesta asti. Tunnen myös monia hyviä ystäviäni juuri partion kautta. Kuvassa on vuoden 2016 kohtaaminen, ja lippukuntani vaaran vaeltajat, jonka jäsen olen yhä.`,
			alt: 'Ryhmä partiolaisia portailla'
		},
		{
			src: valkouvaus,
			title: 'Valokuvaus',
			description: `Melkein jokainen matkalaukun kuvista on itseni kuvaama. Nautin valokuvaamisesta, sillä koen sen rauhalliseksi tekemiseksi, jossa pääsee samaan aikaan nauttimaan maailman yleisestä kauneudesta. Kuvassa on ystäväni, kuka harrastaa cosplayta Sinebrychoffin taidemuseossa helsingissä. Kuva on luonnolisesti itseni ottama.`,
			alt: 'Vaaleaan mekkoon pukeutunt cosplayaaja museossa seinäkellon edessä'
		},
		{
			src: rinkeliburgeri,
			title: 'Rinkeliburgeri',
			description: `Kuvassa on erään päivän aamupalani. Valitettavasti se ei löytäny tietään kannelle sillä kuvassa on erilainen estetiikka muihin kuviin verrattuna. Kuitenkin jokaisen nuoren elämään liittyy kuvan kaltaiset nopeat somepostaukset joten tämäkin on osa minun elämäni visuaalista olemusta.`,
			alt: 'Puolitettu rinkeli jonka sisään on laitettu salaatti, kinkku sekä voi'
		}
	];

	const urban_photos: Array<grid_image_date> = [
		{
			src: metroKuva1,
			description: 'kuva metrosta',
			alt: 'Metro joka on kuvattu pitkällä valotusajalla siten, että valot muodostavat pitkän janan'
		},
		{
			src: metroKuva2,
			wide: true,
			tall: true,
			description: 'kuva metrosta',
			alt: 'Metro joka on kuvattu pitkällä valotusajalla siten, että valot muodostavat pitkän janan'
		},
		{
			src: metroIhmisKuva1,
			description: 'Noin 4 sekunnin valotusajalla otettu kuva ihmisisistä astumassa metroon.',
			alt: ''
		},
		{
			src: cameraUp,
			description:
				'Valvontakamera kuvattuna hieman kyseenalaisesti. Kuvassa näkyy ylhäältäpäin perspektiivi.',
			alt: ''
		},
		{
			src: cameraSide,
			description:
				'Valvontakamera kuvattuna hieman kyseenalaisesti. Kuvassa näkyy sivustapäin perspektiivi.',
			alt: ''
		},
		{
			src: cameraBottom,
			tall: true,
			description:
				'Valvontakamera kuvattuna hieman kyseenalaisesti. Kuvassa näkyy alhaalta sivusta perspektiivi.',
			alt: ''
		},
		{
			src: lahiKuva,
			description: 'Lähikuva joka on muuten osa perspektiivikuvien kokoelmaa',
			alt: ''
		},
		{
			src: tuntematon,
			wide: true,
			description:
				'Tuntematon ja tunnistamaton ihminen istumassa Ainoassa olevan taidenäytöksen keskellä',
			alt: ''
		},
		{
			src: paikalleenKuulumaton,
			description: 'Sotkuinen pieno keskellää muutoin modernia ainoan bussiasemaa',
			tall: true,
			alt: ''
		},
		{
			src: harmaaKatto,
			description: 'Pilke väriä muutoin harmaassa katon ympäristössä',
			alt: ''
		},
		{
			src: kaverpiari,
			description: 'Muutama kaveri kadulla',
			alt: '',
			wide: true
		},
		{
			src: heijatus,
			description: 'vedenpinta heijastaa valoa nätisti, varsinkin ennen sen jäädyttämistä.',
			alt: ''
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

	<link rel="preload" as="image" href={av} />
	<link rel="preload" as="image" href={rakentelu} />
	<link rel="preload" as="image" href={sailing} />
	<link rel="preload" as="image" href={valkouvaus} />
	<link rel="preload" as="image" href={millie} />
	<link rel="preload" as="image" href={talvi} />
	<link rel="preload" as="image" href={vava} />
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerHeight={pageHeight} />

{#if intro_done}
	<div class="background" in:slide|global={{ duration: 650, axis: 'x' }}>
		<Img src={av} top="40vh" left="0" width="55vw" height="35vh" />
		<Img src={rakentelu} top="0" left="0" width="60vw" height="40vh" />
		<Img src={sailing} top="60vh" left="50vw" width="20vw" height="60vh" />
		<Img src={valkouvaus} top="40vh" left="70vw" width="30vw" height="60vh" />
		<Img src={millie} top="0" left="60vw" width="40vw" height="45vh" />
		<Img src={vava} top="75vh" left="0" width="50vw" height="30vh" />
		<Img src={talvi} top="30vh" left="40vw" width="35vw" height="30vh" />
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
				<Maximizableimage
					src={image.src}
					alt={image.alt}
					description={image.description}
					class="showcaseimage"
				/>
			</div>
		</section>
	{/each}
</div>
<div style="height: 210vh;">
	<h2 class="title ghosts_title">Otiksen Aaveita</h2>
	<section class="ghosts section">
		<div class="image_explainer">
			<div transition:fly={{ x: -1000, duration: 1200 }} class="showcasedesc">
				<p class="showcasedescdesc">
					{@html hyphenateSync(
						'Kuvassa olevat hiilipiirtotekniikalla tehdyt kädet kurottavat ulos katosta.',
						{ minWordLength: 7 }
					)}
				</p>
			</div>
			<Maximizableimage
				src={kummituskadet}
				description="Kädet kurottavat ulos ilmanvaihtokanavasta annellen jotaktua pelastamaan ne"
				style="height: 100%; object-fit: contain;"
			/>
			<div />
		</div>
	</section>
</div>
<div>
	<h2 class="title">Katukuvausta</h2>
	<section class="street_photo_section">
		{#each urban_photos as urban_photo}
			<Maximizableimage
				description={urban_photo.description}
				src={urban_photo.src}
				class={urban_photo.wide ? 'tall-photo-thing ' : ''}
				style="{urban_photo.tall ? 'grid-row-end: span 2;' : ''}
				object-fit: cover;
				display: block;
				width: 100%;
				height: 100%;"
			/>
		{/each}
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

	:global(.tall-photo-thing) {
		grid-column-end: span 2;
	}

	.ghosts {
		width: 100vh;
		height: 135vw;
		scroll-snap-align: start;
		box-sizing: border-box;
	}
	.ghosts_description {
		margin: 10px;
		box-sizing: border-box;
	}
	.title {
		background-color: antiquewhite;
		padding: 10px;
		width: fit-content;
		position: sticky;
		top: 8vh;
		margin-left: 10vw;
	}
	.ghosts_div {
		display: flex;
		padding: 0% 10%;
		box-sizing: border-box;
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

	.street_photo_section {
		box-sizing: border-box;
		width: 100vw;
		min-height: 100vh;
		padding: 5% 8%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
		grid-auto-rows: max-content;
		grid-auto-flow: row dense;
		/* grid-auto-flow: column dense; */

		gap: 20px;
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

	@media (max-width: 570px) {
		:global(.tall-photo-thing) {
			grid-column-end: auto;
		}
	}

	@media (min-aspect-ratio: 5/6) {
		.ghosts {
			padding-top: 120px;
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
