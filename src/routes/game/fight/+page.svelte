<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card } from '$lib/components/ui/card';
</script>

<div class="flex h-dvh flex-col justify-center">
	<div class="flex items-center justify-center pb-12">
		<h1>Kazamata neve:</h1>
	</div>

	<div class="flex flex-col items-center justify-center pb-12">
		<h1>Kazamata kártyái:</h1>
		<Card
			class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 pt-12 pb-12"
		>
			<!--kazamata cards-->
		</Card>
	</div>

	<div class="flex flex-col items-center justify-center pb-12">
		<h1>Játékos kártyái:</h1>
		<Card
			class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 pt-12 pb-12"
		>
			<!--player cards-->
		</Card>
	</div>

	<div class="flex flex-col items-center justify-center pt-12">
		<Button href="/game/upgrade">Tovább</Button>
	</div>
</div>
