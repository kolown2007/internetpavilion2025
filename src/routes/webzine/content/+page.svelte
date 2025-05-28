<script>
	// ...existing code...
</script>

<style>
	.image-container {
		width: 100%;
		overflow-y: auto;
	}

	.image-container img {
		width: 100%;
		height: auto;
		display: block;
	}

	@media (min-width: 801px) {
		.image-container img {
			max-width: 800px;
			margin: 0 auto;
		}
	}
</style>

<div class="image-container">
	<img src="/content.png" alt="Long vertical content" />
</div>