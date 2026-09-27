const imagesId = '\0virtual:varangian-theme/images';
const iconsId = '\0virtual:varangian-theme/icons';

/** Register the theme. Each site keeps images in src/assets/images. */
export default function varangianTheme() {
	return {
		name: 'varangian-theme',
		hooks: {
			'astro:config:setup'({ updateConfig }) {
				updateConfig({
					vite: {
						ssr: {
							noExternal: ['varangian-theme'],
						},
						plugins: [
							{
								name: 'varangian-theme-assets',
								enforce: 'pre',
								resolveId(id) {
									if (id === 'virtual:varangian-theme/images') return imagesId;
									if (id === 'virtual:varangian-theme/icons') return iconsId;
								},
								load(id) {
									if (id === imagesId) {
										return `export const imageModules = import.meta.glob('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp,avif}', { eager: true });`;
									}
									if (id === iconsId) {
										return `export const icons = import.meta.glob('/src/assets/images/icons/*.svg', { eager: true });`;
									}
								},
							},
						],
					},
				});
			},
		},
	};
}
