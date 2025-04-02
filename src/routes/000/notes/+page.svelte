<script>
    import { onMount } from 'svelte';
    import Markdown from '@magidoc/plugin-svelte-marked'

    let markdownContent = '';

    onMount(() => {
        fetch('https://raw.githubusercontent.com/kolown2007/Notes/main/Internetpavilion2025/000_notes.md')
            .then(response => response.text())
            .then(text => {
                markdownContent = text;
            })
            .catch(error => {
                console.error('Error fetching markdown:', error);
                markdownContent = 'Error loading content. Please try again later.';
            });
    });
</script>

<main class="container"> 
    <div class="content">
        <Markdown source={markdownContent}/>
    </div>
</main>

<style>
    .container {
        display: flex;
        justify-content: center;
        padding: 2rem;
        background-color: #f0f0f0;
        min-height: 100vh;
    }

    .content {
        max-width: 600px;
        font-family: 'VT323', monospace;
    }

    :global(.content *) {
        font-family: 'VT323', monospace;
        color: #006C35;
    }

    :global(.content a) {
        color: #006C35;
        text-decoration: none;
    }

    :global(.content a:hover) {
        text-decoration: underline;
    }
</style>
