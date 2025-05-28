<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { RiTa } from 'rita';
  import { goto } from '$app/navigation';
  let poetry = '';
  let originalPoetry = '';
  let isGenerating = false;
  let showFragment = true;
  let markovLines = 5;

  async function generateMarkovPoetry() {
    const res = await fetch('/parallax.txt');
    originalPoetry = await res.text();
  }

  onMount(() => {
    generateMarkovPoetry();
  });

  async function generateTrace() {
    isGenerating = true;
    showFragment = false;
    poetry = 'Generating poetry...';
    await tick();
    await new Promise(r => setTimeout(r, 1500));
    const markov = RiTa.markov(2);
    markov.addText(originalPoetry);
    poetry = markov.generate(markovLines).join('\n');
    isGenerating = false;
  }

  function goAbout() {
    goto('/iterationsonline/about');
  }

  function saveTrace() {
    // Placeholder for save logic
    alert('Trace saved!');
  }

  function letItDrift() {
    showFragment = true;
    poetry = '';
  }
</script>

<main class="flex items-center justify-center min-h-screen pt-10 px-3 bg-black text-amber-50">
  <div class="flex flex-col items-center w-full max-w-[600px]">
    {#if showFragment}
      <div class="mb-8 text-center text-2xl py-10">
        <p class="italic  mb-2">This too, is just a fragment</p>
        <p>Trace it, hold it, or let it drift</p>
      </div>
      <div class="flex gap-4 mb-8">
        <button class="px-6 py-2 rounded bg-amber-700 text-amber-50 font-mono shadow transition hover:shadow-[0_0_12px_2px_rgba(255,191,71,0.7)] focus:outline-none" on:click={generateTrace} disabled={isGenerating}>
          Generate a Trace
        </button>
        <button class="px-6 py-2 rounded border border-amber-700 text-amber-50 font-mono transition hover:bg-amber-800/40" on:click={goAbout}>
          About
        </button>
      </div>
    {:else}
      <div class="max-w-[500px] w-full mx-auto mb-8 flex flex-col gap-4">
        {#each poetry.split('\n') as line, i}
          <div class="text-base font-mono whitespace-pre-wrap break-words bg-transparent px-3 text-left">{line}</div>
        {/each}
      </div>
      <div class="flex gap-4">
        <button class="px-6 py-2 rounded bg-amber-700 text-amber-50 font-mono shadow transition hover:shadow-[0_0_12px_2px_rgba(255,191,71,0.7)] focus:outline-none" on:click={saveTrace}>
          Save
        </button>
        <button class="px-6 py-2 rounded border border-amber-700 text-amber-50 font-mono transition hover:bg-amber-800/40" on:click={letItDrift}>
          Let it drift
        </button>
      </div>
    {/if}
  </div>
</main>

<style>
  /* No pulsating effect, keep color and font as before */
</style>