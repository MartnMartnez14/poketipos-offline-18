# PokéTipos Offline

PokéTipos Offline es una página liviana en español para consultar rápida y visualmente las fortalezas y debilidades de los 18 tipos Pokémon mientras jugás. No requiere cuenta, base de datos, instalación ni conexión para consultar la tabla. El enlace de apoyo a Ko-fi sí necesita internet si decidís abrirlo.

## Usarla sin conexión

1. En GitHub, descargá el ZIP del repositorio desde **Code → Download ZIP**.
2. Extraé la carpeta completa en el celular, computadora o laptop.
3. Abrí `index.html` con cualquier navegador moderno.

La consulta de tipos funciona localmente: los estilos, el código y la tabla están incluidos en los archivos descargados. No abras `index.html` desde dentro del ZIP; primero extraé la carpeta para que el navegador también encuentre `app.js`, `styles.css` y los iconos.

En un repositorio público, GitHub permite crear una copia ZIP desde **Code → Download ZIP**. Cualquiera puede bifurcar el proyecto y proponer mejoras mediante un pull request; solo el dueño o colaboradores autorizados pueden escribir directamente en el repositorio principal.

La PWA también está preparada para instalarse desde un sitio HTTPS y guardar sus archivos para uso offline después de la primera visita. La descarga ZIP no necesita hosting y se puede usar offline desde el inicio.

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
