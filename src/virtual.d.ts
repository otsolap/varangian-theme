declare module 'virtual:varangian-theme/images' {
	import type { ImageMetadata } from 'astro';

	export const imageModules: Record<string, { default: ImageMetadata }>;
}

declare module 'virtual:varangian-theme/icons' {
	import type { SvgComponent } from 'astro/types';

	export const icons: Record<string, { default: SvgComponent }>;
}
