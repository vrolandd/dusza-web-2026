<script>
	import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import CardFooter from "$lib/components/ui/card/card-footer.svelte";
	import CardHeader from "$lib/components/ui/card/card-header.svelte";
	import CardTitle from "$lib/components/ui/card/card-title.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	import FieldGroup from "$lib/components/ui/field/field-group.svelte";
	import FieldLabel from "$lib/components/ui/field/field-label.svelte";
	import FieldSet from "$lib/components/ui/field/field-set.svelte";
	import Field from "$lib/components/ui/field/field.svelte";
	import Input from "$lib/components/ui/input/input.svelte";

</script>
<form method="post" class="flex items-center justify-center h-dvh overflow-auto" autocomplete="off" use:enhance>
    <Card class="w-full max-w-md mx-4">
        <CardHeader>
            <CardTitle class="text-2xl font-semibold">Azonosítás</CardTitle>
        </CardHeader>

        <CardContent>
            <FieldSet>
                <FieldGroup>
                    <FieldLabel for="email">Email cím</FieldLabel>  
                    <Input id="email" name="email" type="email" placeholder="jane.doe@example.com" />
                </FieldGroup>
                <FieldGroup>
                    <FieldLabel for="password">Jelszó</FieldLabel>  
                    <Input id="password" name="password" type="password" placeholder="••••••••" />
                </FieldGroup>
            </FieldSet>
        </CardContent>

        <CardFooter class="flex flex-col gap-2">
            <Button type="submit" class="w-full text-lg" size="lg" formaction="?/login">Bejelentkezés</Button>
            <Button type="submit" variant="outline" class="w-full text-lg" size="lg" formaction="?/signup">Regisztráció</Button>
        </CardFooter>
    </Card>
</form>