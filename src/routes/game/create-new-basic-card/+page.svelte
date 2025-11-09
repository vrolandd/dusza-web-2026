<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import Input from "$lib/components/ui/input/input.svelte";
	import { Button } from '$lib/components/ui/button/index.js';

	type ElementType = 'tuz' | 'viz' | 'fold' | 'levego';

	let cardName = "";
	let cardDamage = "";
	let cardHealth = "";
	let cardType: ElementType | "" = "";
	let cardImage = "";

	console.log(cardName, cardDamage, cardHealth, cardType);

	function formatElement(e: string) {
		const map: Record<string, string> = {
			tuz: "Tűz",
			viz: "Víz",
			fold: "Föld",
			levego: "Levegő"
		};
		return map[e] ?? e;
	}

	const images = {
		tuz: [
			"fire/akalith.png",
			"fire/emberchain.png",
			"fire/gnarrik.png",
			"fire/headless_horseman.png",
			"fire/pyrehelm.png",
			"fire/pyron.png",
			"fire/Solara.png",
			"fire/zyraen.png",
		],
		viz: [
			"water/ezrafel.png",
			"water/fyzar.png",
			"water/galion.png",
			"water/hekarion.png",
			"water/kha'zir.png",
			"water/mordakar.png",
			"water/olavorn.png",
			"water/tharash.png",
		],
		fold: [
			"earth/amurak.png",
			"earth/janett.png",
			"earth/leonara.png",
			"earth/malphor.png",
			"earth/malzareth.png",
			"earth/pantheor.png",
			"earth/renekar.png",
			"earth/skarneth.png",
		],
		levego: [
			"air/anyvia.png",
			"air/bateria.png",
			"air/corgi.png",
			"air/frostwing.png",
			"air/kaelyn.png",
			"air/lightwing.png",
			"air/lumosz.png",
			"air/zephyros.png",
		]
	};
	
	$: filteredImages = cardType ? images[cardType] : [];
	$: if(filteredImages.length && !filteredImages.includes(cardImage)) cardImage = filteredImages[0];

	// Supabase public URL előállítása (például)
	function getImageUrl(path: string) {
		return `https://ljogpuxophtjfqxllkgs.supabase.co/storage/v1/object/public/cards/${path}`;
	}
</script>

<style>

	option {
		background-color: black;
		color: white;
	}

	select option:hover {
		background-color: rgb(60, 60, 60);
		color: white;
	}

	select option:checked {
		background-color: rgb(80, 80, 80);
		color: white;
	}
</style>

<form method="POST">

	<h1 class="pt-5 text-center text-4xl">Játékmester - Új sima kártya létrehozása</h1>
	<div class="flex flex-col items-center pt-25">
		<Card class="flex w-full max-w-xl flex-col items-center justify-center gap-8 pt-12 pb-12">
			<div class="flex w-full max-w-xl flex-row justify-between pr-10 pl-10">
				<div class="flex flex-col items-center justify-center">
					<div class="h-[270px] w-[190px] border border-white ">
						<img src={getImageUrl(cardImage)} alt="">
					</div>
					<div class="flex flex-col h-[180px] w-[190px] border border-white pl-5 pr-5">
						<p class="flex items-center justify-center pt-2 h-[60px]">{cardName}</p>
						<div class="flex flex-row justify-between items-center h-[60px] pl-12 pr-12">
							<p>{cardDamage}</p>
							<p>/</p>
							<p>{cardHealth}</p>
						</div>
						<p class="flex pb-2 h-[60px] justify-center items-center">{formatElement(cardType)}</p>
					</div>	
				</div>
				<div class="flex flex-col items-center justify-center gap-5">
					<label for="">Kártya neve</label>
					<Input type="text" name="title" placeholder="Aragorn" bind:value={cardName} />
					<label for="">Kártya sebzése</label>
					<Input type="number" name="damage" min="1" max="100" bind:value={cardDamage} placeholder="6" />
					<label for="">Kártya életereje</label>
					<Input type="number" name="hp" min="2" max="100" bind:value={cardHealth} placeholder="10" />
					<label for="">Kártya típusa</label>
					<select name="type" id="" class="border border-white bg-black w-full p-2 rounded-[4px] text-center" bind:value={cardType}>
						<option value="tuz">Tűz</option>
						<option value="viz">Víz</option>
						<option value="fold">Föld</option>
						<option value="levego">Levegő</option>
					</select>

					{#if filteredImages.length > 0}
						<p>Kártya képe</p>
						<select name="image" class="border border-white bg-black w-full p-2 rounded-[4px] text-center" bind:value={cardImage}>
							{#each filteredImages as img}
								<option value={img}>{img.split("/")[1]}</option>
							{/each}
						</select>
					{/if}
					<Button class="mt-5 rounded-[4px] cursor-pointer w-full p-2" type="submit">Kártya létrehozása</Button>
				</div>
			</div>
		</Card>
	</div>

</form>