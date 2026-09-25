# PokéTipos Offline

PokéTipos Offline es una página liviana en español para consultar rápida y visualmente las fortalezas y debilidades de los 18 tipos Pokémon mientras jugás. No requiere cuenta, base de datos, instalación ni conexión para consultar la tabla. El enlace de apoyo a Ko-fi sí necesita internet si decidís abrirlo.

## Abrir la app

**En Android, abrí [PokéTipos Offline](https://martnmartnez14.github.io/poketipos-offline-18/) en Chrome o Brave.** Es la forma recomendada para el celular. Después de la primera visita, los archivos se guardan y la app puede volver a abrirse sin conexión. Si el navegador lo ofrece, también podés usar «Añadir a pantalla de inicio» para tener un acceso directo.

En una computadora podés abrir el mismo enlace HTTPS o descargar el ZIP desde **Code → Download ZIP**, extraer toda la carpeta y abrir `index.html` con un navegador moderno.

La versión ZIP contiene la app y sus datos para consultar los tipos sin conexión. Primero hay que extraer toda la carpeta para que el navegador encuentre `app.js`, `styles.css` y los iconos. En algunos Android, abrir HTML desde el administrador de archivos restringe el acceso a esos archivos vecinos; por eso recomendamos el enlace HTTPS en el teléfono.

Cualquiera puede bifurcar el proyecto y proponer mejoras mediante un pull request; solo el dueño o colaboradores autorizados pueden escribir directamente en el repositorio principal.

## Archivos

- `index.html`, `styles.css`, `app.js`: interfaz y lógica local.
- `manifest.webmanifest`: nombre, iconos y modo de presentación instalable.
- `sw.js`: caché de archivos para el uso offline.
- `icons/`: iconos para la pantalla de inicio.
- `preview/poketipos-fuego.png`: captura estática de referencia.

## Licencia y contribuciones

El proyecto se distribuye con licencia [MIT](LICENSE), con `MartnMartnez14` como titular del aviso de copyright. Podés bifurcarlo, modificarlo y compartir tus mejoras; las contribuciones se pueden proponer mediante pull requests.

## Tabla de tipos

Los datos corresponden a los 18 tipos clásicos y las reglas de Generación VI en adelante, basados en la [tabla de tipos de Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Type/Type_chart). La primera versión no calcula combinaciones de dos tipos, habilidades o movimientos especiales.
