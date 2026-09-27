import type { ImageMetadata } from 'astro';
import { imageModules } from 'virtual:varangian-theme/images';

function toAssetKey(src: string): string {
	if (src.startsWith('/src/assets/')) return src;
	if (src.startsWith('src/assets/')) return `/${src}`;
	if (src.startsWith('/images/')) return `/src/assets${src}`;
	return `/src/assets/images/${src.replace(/^\//, '')}`;
}

/** Map a JSON `image.src` such as `/images/hero.jpg` to `src/assets/images/hero.jpg`. */
export function resolveLocalImage(src: string): ImageMetadata | undefined {
	const key = toAssetKey(src);
	const match = imageModules[key];

	if (!match) {
		console.warn(
			`[images] "${src}" not found. Add the file under src/assets/images/ (looked up as ${key}).`,
		);
		return undefined;
	}

	return match.default;
}
