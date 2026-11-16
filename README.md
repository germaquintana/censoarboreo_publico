# Observatorio de Arbolado Urbano y solicitudes OIRS — Recoleta

> **Abrir el dashboard en la web (versión vigente):** [Observatorio de Arbolado Urbano — Recoleta](https://germaquintana.github.io/censoarboreo_publico/). Esta URL es estable y se mantiene entre iteraciones, incluso preliminares. El enlace a `index.html` en GitHub es solo código fuente, no el visualizador.
>
> **Publicación verificada en GitHub Actions:** [pages build and deployment #3](https://github.com/germaquintana/censoarboreo_publico/actions/runs/43873413584) terminó con éxito el 16-11-2026; los logs de `deploy` confirmaron esta URL para V1.1. **Prueba de acceso externo:** no completada desde el visor de ChatGPT por bloqueo de acceso a `github.io`; esto no equivale a un error demostrado del sitio.

**Visualizador público exploratorio** de indicadores agregados, preparado con antecedentes del trabajo técnico de Gestión Ambiental. No constituye una publicación oficial de respuestas OIRS, un diagnóstico individual ni una recepción contractual del censo.

## Alcance

- Se analizan **300 solicitudes OIRS** recibidas en el corte documental del 5 de noviembre de 2026 y clasificadas preliminarmente en seis rutas: 61 alertas documentales, 135 individuales, 22 ambiguas, 27 podas sectoriales, 38 áreas verdes y 17 otros.
- La base de censo con direcciones calculadas tiene **25.957 registros**; los registros individuales **no están publicados**.
- El cruce exacto de dirección arroja 33 solicitudes con candidato único, 55 con varios y 212 sin igualdad textual. Un método ampliado distinto arroja 957 filas candidatas y 35 solicitudes con coincidencia domiciliaria orientativa. **Ninguno identifica inequívocamente un árbol**; los métodos no se suman.
- Cortes Cultiva: 22.530 registros en junio de 2026 y 25.128 en julio de 2026. El segundo no tiene el mismo esquema de variables de riesgo.
- Riesgo histórico documentado en junio: 191 altos, 1.029 medios, 1.571 bajos y 19.739 estables; **estable incluye tocones**, no debe interpretarse como árboles vivos sanos. Tocones, muertos en pie y urgencias son atributos superpuestos.

## Interpretación

El dashboard presenta resultados técnicos **preliminares**. Las 61 alertas no son emergencias acreditadas y las coincidencias de ubicación no prueban la identidad, condición o intervención de un árbol. La matriz de trabajo no contiene comprobación de estados del portal OIRS en sus 300 folios: el valor **0/300 verificado en la matriz** no significa que no se hayan realizado actuaciones municipales.

Los datos de riesgo corresponden al corte de junio de 2026 y no acreditan el estado actual. Las unidades vecinales mostradas son únicamente cinco registros agregados históricos de riesgo alto; **no existen aquí mapas de domicilios OIRS ni cruces territoriales caso a caso**. La comprobación de diagnósticos, intervenciones y estados del portal corresponde a las unidades competentes.

## Privacidad y seguridad

Solo se publica el visualizador estático con estadísticas **agregadas**. El repositorio no incluye nombres, RUT, teléfonos, correos de contacto, relatos individuales, direcciones particulares, coordenadas individualizadas ni folios OIRS enlazables. El CSV descargable contiene solamente categorías y totales agregados. La existencia de este repositorio **no autoriza cargar aquí originales o expedientes**.

## Cómo abrirlo

- Visualizador: [`index.html`](index.html), sin dependencias externas ni conexiones a APIs.
- Publicación mediante GitHub Pages: el despliegue de `main` se confirmó exitoso el 16-11-2026 ([run #43873413584](https://github.com/germaquintana/censoarboreo_publico/actions/runs/43873413584)); el enlace permanente del panel es https://germaquintana.github.io/censoarboreo_publico/. Ante una versión nueva, verificar nuevamente el despliegue y acceso web.
- Fecha de la primera versión: **10 de noviembre de 2026**. Actualización de datos: manual; no se presenta como monitoreo en tiempo real.

## Control del producto

Desarrollo técnico de Gestión Ambiental, DIMAO Recoleta, como apoyo analítico a la Sección de Ornato. Seguimiento de trabajo en el expediente institucional `GA-T-2026-0074` (acceso restringido). Ornato y las unidades competentes conservan la atribución de validar inspecciones, riesgos e intervenciones.

**QA de V1:** se probaron en Chromium la navegación, selección de las seis rutas, visualización de categorías/UV, CSV agregado y renderización de escritorio y móvil. No se acredita con ello validación técnica de expedientes individuales ni habilitación efectiva de GitHub Pages.


## Revisión V1.1 — 16-11-2026

El archivo [`index.html`](index.html) incorpora navegación por seis secciones con enlaces de ancla, filtro de las seis rutas OIRS, exportación CSV agregada, diseño adaptativo y un panel de **fuentes y pendientes**. La sección territorial mantiene explícito que no existe cartografía UV validada ni cruce geográfico caso a caso autorizado. Los cortes de junio (22.530), julio (25.128) y base con direcciones (25.957) se muestran por separado; las diferencias no acreditan plantaciones, talas, cambios de riesgo ni cumplimiento contractual.

- **Commit de V1.1:** `6e58512743383613ee54b7996bae4deff0b7b23f`.
- **QA:** sintaxis JavaScript válida; seis secciones, navegación y estado activo probados; filtro de categorías, exportación CSV (23 filas incl. encabezado), escritorio y móvil verificados en Chromium sin errores de página.
- **Publicación:** el código de V1.1 está en `main`; GitHub Pages debe habilitarse/verificarse de manera independiente. No presentar su URL como activa sin prueba real.
- **Privacidad:** solo agregados, sin nombres, RUT, teléfonos, correos de contacto, direcciones específicas, coordenadas de ejemplares ni folios OIRS enlazables.
- **Validaciones humanas:** Ornato confirma diagnósticos e inspecciones; el estado de 0/300 **verificado en la matriz** no significa que no existan actuaciones municipales.


## V1.2 — Gestión OIRS y filtros históricos (16-11-2026)

El observatorio se reorienta hacia la **preparación verificable de respuestas OIRS**, manteniendo el enlace web permanente [abrir dashboard](https://germaquintana.github.io/censoarboreo_publico/). La nueva pestaña «Gestión y respuestas» incluye el flujo de validación (portal, ejemplar, evaluación, orden/ruta, aprobación y acuse) y **distingue dos cohortes**: las 300 OIRS de noviembre y 15 registros históricos de julio **sin coincidencia de folio entre sí**. Estos últimos consisten en 13 con etiqueta documental `EVALUADO` y 2 `EN_RUTA`; 12 de los 15 figuran en una hoja de ruta histórica. **Ninguno de esos registros prueba emisión oficial ni ejecución vigente**. La cifra de respuestas listas/acreditadas permanece en 0 hasta verificar individualmente portal, fuentes y aprobación.

Se agregan filtros interactivos para **categoría de riesgo del corte junio** (191 alto, 1.029 medio, 1.571 bajo, 19.739 etiqueta estable) y cinco UV que reúnen 85 registros históricos de riesgo alto. No son filtros por árbol individual ni certifican condición actual. Especies, DAP, altura, fecha de inspección, actuaciones y cartografía por árbol siguen dependiendo de una fuente homogénea validada y permiso para un derivado apto para publicación. Sin microdatos OIRS, personas o domicilios en GitHub Pages.

**Despliegue:** commit de HTML `5de6fd882c0dfb5d93a7d16dcb20d8c96ba1977c`; [GitHub Pages Actions #43885554803](https://github.com/germaquintana/censoarboreo_publico/actions/runs/43885554803) en `success`, log de `deploy` confirmando `https://germaquintana.github.io/censoarboreo_publico/`. Prueba externa HTTP/navegador desde esta sesión no lograda; estado `DESPLIEGUE_CONFIRMADO_ACCESO_EXTERNO_NO_VERIFICADO`. Código, navegación y controles de interfaz sujetos a QA adicional tras la publicación; no atribuir funcionalidades que no se hayan probado en el sitio.
