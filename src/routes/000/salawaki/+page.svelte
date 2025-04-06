<script>
    import "@babylonjs/viewer";
</script>

<svelte:head>
    <title>PBB House</title>
</svelte:head>


<main>

<div class="min-h-screen bg-black flex items-center justify-center">
 

    <babylon-viewer 
    source="https://kolown.net/assets/ip25/salawaki.glb"
    environment="auto"

    camera-orbit="-2.178 1.344 5.675"
    camera-target="0.049 1.173 0.525"
    camera-auto-orbit
    animation-auto-play
></babylon-viewer>

</div>
</main>




<style>
    /* Global styles */
    :global(html), :global(body) {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
    
    :global(babylon-viewer) {
        width: 100vw;
        height: 100vh;
    }

    :global(.bar.bar-min.tool-bar) {
        display: none;
    }




</style>
