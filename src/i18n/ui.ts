import PeruFlag from '@partials/flags/Peru.astro';
import UnitedStatesFlag from '@layouts/partials/flags/UnitedStates.astro';
// Add missing imports
export const LANGUAGES: Record<
	string,
	{ code: string; name: string; flag: typeof PeruFlag}
> = {
	en: {
		code: 'en',
		name: 'EN',
		flag: UnitedStatesFlag,
	},
	es: {
		code: 'es',
		name: 'ES',
		flag: PeruFlag,
	},
};

export const defaultLang = 'es';
export const showDefaultLang = false;

export const ui = {
	es: {
		'nav.home': 'Inicio',
		'nav.about': 'Nosotros',
		'nav.products': 'Productos',
		'nav.educational': 'Educativo',
		'nav.entertainment': 'Entretenimiento',
		'nav.scientific': 'Científico',
		'nav.contact': 'Contacto',
	},
	en: {
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.products': 'Products',
		'nav.educational': 'Educational',
		'nav.entertainment': 'Entertainment',
		'nav.scientific': 'Scientific',
		'nav.contact': 'Contact',
	},
} as const;

export const routes = {
	es: {
		'home': '/',
		'about': 'about',
		'products': 'products',
		'educational': 'products/educational',
		'entertainment': 'products/entertainment',
		'scientific': 'products/scientific',
		'contact': 'contact',
	},
	en: {
		'home': '/',
		'about': 'about',
		'products': 'products',
		'products/educational': 'educational',
		'products/entertainment': 'entertainment',
		'products/scientific': 'scientific',
		'contact': 'contact',
	},
};
