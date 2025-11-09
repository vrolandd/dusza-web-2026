<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	export let data

    let cards = data.cards

	function formatElement(element: string): string {
		const map: Record<string, string> = {
			tuz: "Tűz",
			viz: "Víz",
			fold: "Föld",
			levego: "Levegő"
		};

		return map[element] ?? element;
	}
</script>

<h1 class="pt-5 text-center text-4xl">Játékmester - Meglévő</h1>
<div class="flex flex-col items-center pt-25">
	<Card class="flex w-full max-w-7xl flex-col items-center justify-center gap-8 pt-12 pb-12">
		<div class="w-[900px] border border-white flex flex-row justify-center gap-5 pt-5 pb-5 flex-wrap">
            {#each cards as card}
                <div class="flex flex-col items-center justify-center">
					<div class="h-[270px] w-[190px] border border-white ">
						
					</div>
					<div class="flex flex-col h-[180px] w-[190px] border border-white pl-5 pr-5">
						<p class="flex items-center justify-center pt-2 h-[60px]">{card.name}</p>
						<div class="flex flex-row justify-between items-center h-[60px] pl-12 pr-12">
							<p>{card.attack}</p>
							<p>/</p>
							<p>{card.hp}</p>
						</div>
						<p class="flex pb-2 h-[60px] justify-center items-center">{formatElement(card.element)}</p>
					</div>	
				</div>
            {/each}
        </div>
	</Card>
</div>
