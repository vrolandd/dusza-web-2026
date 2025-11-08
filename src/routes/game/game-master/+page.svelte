<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card } from '$lib/components/ui/card';
</script>

<h1 class="pt-5 text-center text-4xl">Játékmester - Új játékkörnyezet létrehozása</h1>
<div class="flex flex-col items-center pt-25">
	<Card class="flex w-full max-w-xl flex-col items-center justify-center gap-8 pt-12 pb-12">
		<div class="flex w-full max-w-xl flex-row justify-between pr-10 pl-10">
			<div class="flex flex-col gap-5">
				<Button><a href="/game/create-new-basic-card">Új sima kártya létrehozása</a></Button>
				<Button>Új vezér kártya létrehozása</Button>
				<Button><a href="/game/create-new-dungeon"> Új kazamata létrehozása</a></Button>
			</div>
			<div class="flex flex-col justify-center gap-5">
				<Button>Meglévő kártyák</Button>
				<Button>Játékkörnyezet elnevezése</Button>
			</div>
		</div>
	</Card>
</div>
