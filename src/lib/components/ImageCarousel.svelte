<script>
	let { currentImage = $bindable(0), images = [], alt = '' } = $props();

	let isDragging = $state(false);
	let dragStartX = $state(0);

	function prev() {
		currentImage = (currentImage - 1 + images.length) % images.length;
	}

	function next() {
		currentImage = (currentImage + 1) % images.length;
	}

	function goTo(index) {
		currentImage = index;
	}

	function onDragStart(e) {
		isDragging = true;
		dragStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
	}

	function onDragEnd(e) {
		if (!isDragging) return;
		isDragging = false;
		const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
		const diff = dragStartX - endX;
		if (Math.abs(diff) > 50) {
			diff > 0 ? next() : prev();
		}
	}

	function onKeyDown(e) {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<div
	class="carousel"
	role="region"
	aria-label="Product image gallery"
>
	<!-- Images -->
	<div class="carousel-track">
		{#each images as src, i}
			<div class="carousel-slide" class:active={i === currentImage} aria-hidden={i !== currentImage}>
				<img
					{src}
					alt="{alt} — image {i + 1}"
					loading="lazy"
					class="carousel-img"
					onerror={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'; }}
				/>
			</div>
		{/each}
	</div>

	<!-- Arrows (only if multiple images) -->
	{#if images.length > 1}
		<button class="carousel-btn prev" onclick={prev} aria-label="Previous image" tabindex="-1">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
				<path d="m15 18-6-6 6-6" />
			</svg>
		</button>
		<button class="carousel-btn next" onclick={next} aria-label="Next image" tabindex="-1">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
				<path d="m9 18 6-6-6-6" />
			</svg>
		</button>

		<!-- Dots -->
		<div class="carousel-dots" role="tablist" aria-label="Select image">
			{#each images as _, i}
				<button
					class="dot {i === currentImage ? 'active' : ''}"
					onclick={() => goTo(i)}
					role="tab"
					aria-selected={i === currentImage}
					aria-label="Image {i + 1}"
					tabindex="-1"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		overflow: hidden;
		border-radius: inherit;
		width: 100%;
		aspect-ratio: 4/3;
	}

	.carousel-track {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.carousel-slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	.carousel-slide.active {
		opacity: 1;
		pointer-events: auto;
	}

	.carousel-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: white;
		opacity: 0;
		transition: opacity 0.2s ease, background 0.2s ease;
		z-index: 10;
	}

	.carousel:hover .carousel-btn {
		opacity: 1;
	}

	.carousel-btn svg {
		width: 16px;
		height: 16px;
	}

	.carousel-btn:hover {
		background: rgba(124, 58, 237, 0.7);
	}

	.prev { left: 0.5rem; }
	.next { right: 0.5rem; }

	.carousel-dots {
		position: absolute;
		bottom: 0.625rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.375rem;
		z-index: 10;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
	}

	.dot.active {
		background: white;
		width: 18px;
		border-radius: 3px;
	}
</style>
