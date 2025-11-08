<script lang="ts">
	import { Card } from '$lib/components/ui/card';
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

</style>

<h1 class="pt-5 text-center text-4xl">Játékmester - Új vezér kártya létrehozása</h1>
<div class="flex flex-col items-center pt-25">
	<Card class="flex w-full max-w-5xl flex-col items-center justify-center gap-8 pt-12 pb-12">
		<h1>Válaszd ki melyik sima kártyából szeretnéd a vezér kártyát létrehozni</h1>
        <div class="flex flex-row justify-center items-center gap-10 ml-10 mr-10">
            <!-- Ide kéne berenderelni a sima kártyákat adatbázisból
            
            <div class="flex flex-col items-center justify-center">
                <div class="h-[270px] w-[190px] border border-white ">
                    
                </div>
                <div class="flex flex-col h-[180px] w-[190px] border border-white pl-5 pr-5">
                    <p class="flex items-center justify-center pt-2 h-[60px]">asd</p>
                    <div class="flex flex-row justify-between items-center h-[60px] pl-12 pr-12">
                        <p>asd</p>
                        <p>/</p>
                        <p>asd3</p>
                    </div>
                    <p class="flex pb-2 h-[60px] justify-center items-center">asd</p>
                </div>
            </div>-->

            <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 15 15">
                <path fill="#fff" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"></path>
            </svg>
            
            <select name="" id="" class="border border-white bg-black w-[70%] p-2 rounded-[4px] text-center">
                <option value="Sebzés">Sebzés</option>
                <option value="Életerő">Életerő</option>
            </select>

            <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 15 15">
                <path fill="#fff" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"></path>
            </svg>

            <!-- Ide meg a módosított kártya 
            
            <div class="flex flex-col items-center justify-center">
                <div class="h-[270px] w-[190px] border border-white ">
                    
                </div>
                <div class="flex flex-col h-[180px] w-[190px] border border-white pl-5 pr-5">
                    <p class="flex items-center justify-center pt-2 h-[60px]">asd</p>
                    <div class="flex flex-row justify-between items-center h-[60px] pl-12 pr-12">
                        <p>asd</p>
                        <p>/</p>
                        <p>asd3</p>
                    </div>
                    <p class="flex pb-2 h-[60px] justify-center items-center">asd</p>
                </div>
            </div>-->
        </div>
        
	</Card>
</div>