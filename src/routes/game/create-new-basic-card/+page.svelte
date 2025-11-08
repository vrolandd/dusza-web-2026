<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import Input from "$lib/components/ui/input/input.svelte";
	import { Button } from '$lib/components/ui/button/index.js';

	let cardName = "";
	let cardDamage = "";
	let cardHealth = "";
	let cardType = "";

	function createCard() {
		//TODO Implement card creation logic and instert into database
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

<h1 class="pt-5 text-center text-4xl">Játékmester - Új sima kártya létrehozása</h1>
<div class="flex flex-col items-center pt-25">
	<Card class="flex w-full max-w-xl flex-col items-center justify-center gap-8 pt-12 pb-12">
		<div class="flex w-full max-w-xl flex-row justify-between pr-10 pl-10">
			<div class="flex flex-col items-center justify-center">
				<div class="h-[270px] w-[190px] border border-white ">
					
				</div>
				<div class="flex flex-col h-[180px] w-[190px] border border-white pl-5 pr-5">
					<p class="flex items-center justify-center pt-2 h-[60px]">{cardName}</p>
					<div class="flex flex-row justify-between items-center h-[60px] pl-12 pr-12">
						<p>{cardDamage}</p>
						<p>/</p>
						<p>{cardHealth}</p>
					</div>
					<p class="flex pb-2 h-[60px] justify-center items-center">{cardType}</p>
				</div>	
			</div>
			<div class="flex flex-col items-center justify-center gap-5">
				<label for="">Kártya neve</label>
				<Input type="text" placeholder="Aragorn" bind:value={cardName} />
				<label for="">Kártya sebzése</label>
				<Input type="number" min="1" max="100" bind:value={cardDamage} placeholder="6" />
				<label for="">Kártya életereje</label>
				<Input type="number" min="2" max="100" bind:value={cardHealth} placeholder="10" />
				<label for="">Kártya típusa</label>
				<select name="" id="" class="border border-white bg-black w-full p-2 rounded-[4px] text-center" bind:value={cardType}>
					<option value="Tűz">Tűz</option>
					<option value="Víz">Víz</option>
					<option value="Föld">Föld</option>
					<option value="Levegő">Levegő</option>
				</select>
				<div role="button" tabindex="0" onclick={createCard}>
					<Button class="mt-5 rounded-[4px] cursor-pointer w-full p-2" >Kártya létrehozása</Button>
				</div>
				
			</div>
		</div>
	</Card>
</div>
