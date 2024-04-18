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

function findIndexConvertibleToNumber(arr: string[]): number {
    for (let i = 0; i < arr.length; i++) {
        // Intentar convertir el elemento en un número
        const num = parseInt(arr[i]);
        // Verificar si la conversión fue exitosa y el número es un entero
        if (!isNaN(num) && Number.isInteger(num)) {
            // Devolver el índice del elemento que puede convertirse en número
            return i;
        }
    }
    // Si no se encuentra ningún elemento que pueda convertirse en número, devolver -1
    return -1;
}

function splitArrayAtElement(arr: string[]): [string[], string[]] {
    // Verificar si la palabra "page" está en el array
    const pageIndex = arr.indexOf('page');
    if (pageIndex !== -1) {
        // Si la palabra "page" está presente, dividir el array en dos partes en ese punto
        const firstPart = arr.slice(0, pageIndex);
        const secondPart = arr.slice(pageIndex);
        return [firstPart, secondPart];
    } else {
        // Si la palabra "page" no está presente, buscar un elemento que pueda convertirse en número
        const index = findIndexConvertibleToNumber(arr);
        console.log(index)
        if (index !== -1) {
            // Si se encuentra un elemento que puede convertirse en número, dividir el array en dos partes
            const firstPart = arr.slice(0, index);
            const secondPart = arr.slice(index);
            return [firstPart, secondPart];
        } else {
            // Si no se encuentra ningún elemento que pueda convertirse en número, devolver el array original y un array vacío
            return [arr, []];
        }
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

  const [firstPart, secondPart] = splitArrayAtElement(parts);

  console.log(secondPart)
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
      console.log(concatenatedString)
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