<script>
    import "@babylonjs/viewer";
</script>



<svelte:head>
    <title>Internet Pavilion 2025</title>

</svelte:head>


<main class="">


<div class="min-h-screen bg-black flex items-center justify-center">
 

    <babylon-viewer 
    source="https://kolown.net/assets/ip25/salawaki.glb"
    environment="auto"


    camera-auto-orbit
    camera-auto-orbit-speed="0.260"
    camera-auto-orbit-delay="2"

        templates.tool-bar="null/false/hide"
    
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
    