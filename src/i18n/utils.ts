import { ui, defaultLang, showDefaultLang, routes } from './ui';

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		const pathName = path.replaceAll('/', '');
		const hasTranslation =
			defaultLang !== l &&
			(routes[l as keyof typeof routes] as Record<string, string>)[
				pathName
			] !== undefined;
		const translatedPath = hasTranslation
			? '/' +
			  (routes[l as keyof typeof routes] as Record<string, string>)[
					pathName
			  ]
			: path;

		return !showDefaultLang && l === defaultLang
			? translatedPath
			: `/${l}${translatedPath}`;
	};
}

function splitArrayAtElement(arr: string[], element: string): [string[], string[]] {
  const index = arr.indexOf(element);

  if (index !== -1) {
      const firstPart = arr.slice(0, index);
      const secondPart = arr.slice(index);
      return [firstPart, secondPart];
  } else {
      // Si el elemento no se encuentra en el array, devolver el array original y un array vacío
      return [arr, []];
  }
}

function concatenateWithDelimiter(str: string, arr: string[]): string {
  return `${str}/${arr.join('/')}`;
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  console.log('Pathname:', pathname);

  const parts = pathname?.split('/');
  console.log('Parts:', parts);

  const [firstPart, secondPart] = splitArrayAtElement(parts, 'page');
  const path = firstPart.pop() || firstPart.pop();
  console.log('Path:', path);

  if (path === undefined) {
      console.log('Path is undefined');
      return undefined;
  }

  const currentLang = getLangFromUrl(url);
  console.log('Current language:', currentLang);

  if (defaultLang === currentLang) {
      console.log(routes)
      console.log(Object.values(routes)[0])
      const route = Object.values(routes)[0];
      console.log(route)
      const routeValue = route[path as keyof typeof route];
      console.log('Route for default language:', routeValue);
      const concatenatedString = concatenateWithDelimiter(routeValue, secondPart);
      return routeValue !== undefined ? concatenatedString : undefined;
  }

  const getKeyByValue = (
      obj: Record<string, string>,
      value: string
  ): string | undefined => {
      return Object.keys(obj).find(key => obj[key] === value);
  };

  console.log(routes)
  const reversedKey = getKeyByValue(routes[currentLang], path);
  console.log('Reversed key:', reversedKey);

  if (reversedKey !== undefined) {
      const concatenatedString = concatenateWithDelimiter(reversedKey, secondPart);
      return concatenatedString;
  }

  return undefined;
}

{/* 
export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  console.log('Pathname:', pathname);

  const parts = pathname?.split('/');
  console.log('Parts:', parts);

  // Remove elements after '/page/2/' if present
  const index = parts.lastIndexOf('page');
  const pathParts = index !== -1 ? parts.slice(0, index).join('/') : pathname;
  console.log('Path parts:', pathParts);

  const path = pathParts === '' ? undefined : pathParts;
  console.log('Path:', path);

  if (path === undefined) {
      console.log('Path is undefined');
      return undefined;
  }

  const currentLang = getLangFromUrl(url);
  console.log('Current language:', currentLang);

  if (defaultLang === currentLang) {
      console.log(routes)
      console.log(Object.values(routes)[0])
      const route = Object.values(routes)[0];
      console.log(route)
      const routeValue = route[path as keyof typeof route];
      console.log('Route for default language:', routeValue);
      return routeValue !== undefined ? routeValue : undefined;
  }

  const getKeyByValue = (
      obj: Record<string, string>,
      value: string
  ): string | undefined => {
      return Object.keys(obj).find(key => obj[key] === value);
  };

  console.log(routes)
  const reversedKey = getKeyByValue(routes[currentLang], path);
  console.log('Reversed key:', reversedKey);

  if (reversedKey !== undefined) {
      return reversedKey;
  }

  return undefined;
}
*/}