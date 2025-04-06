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
        overflow: auto; 
    }

    :global(.content *) {
        font-family: 'VT323', monospace;
        color: #006C35;
    }

    /* Add spacing between paragraphs */
    :global(.content p) {
        margin-bottom: 1.5rem; /* Increase space between paragraphs */
        line-height: 1.6;      /* Improve line spacing within paragraphs */
    }
    
    /* Ensure lists have proper spacing */
    :global(.content ul), 
    :global(.content ol) {
        margin-bottom: 1.5rem;
    }
    
    /* Add spacing between list items */
    :global(.content li) {
        margin-bottom: 0.5rem;
    }
    
    /* Add spacing after headings */
    :global(.content h1),
    :global(.content h2),
    :global(.content h3),
    :global(.content h4) {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    :global(.content a) {
        color: #006C35;
        text-decoration: none;
    }

    :global(.content a:hover) {
        text-decoration: underline;
    }
</style>