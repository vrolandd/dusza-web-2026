<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card } from '$lib/components/ui/card';
</script>

<div class="flex h-dvh flex-col justify-center">
	<div class="flex flex-col items-center justify-center pb-12">
		<h1>Jelenlegi pakli:</h1>
		<Card
			class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 pt-12 pb-12"
		>
			<!--current deck-->
		</Card>
	</div>

	<div class="flex flex-col items-center justify-center pb-12">
		<h1>Gyűjtemény:</h1>
		<Card
			class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 pt-12 pb-12"
		>
			<!--collection cards-->
		</Card>
	</div>

	<div class="flex flex-col items-center justify-center pb-12">
		<h1>Új pakli:</h1>
		<Card
			class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 pt-12 pb-12"
		>
			<!--new deck-->
		</Card>
	</div>

	<div class="flex flex-col items-center justify-center pt-12">
		<Button href="/game/player">Tovább</Button>
	</div>
</div>
