# Observatorio de Arbolado Urbano y solicitudes OIRS — Recoleta

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
- Publicación mediante GitHub Pages: **Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save**. La disponibilidad de la URL pública debe comprobarse después de activar Pages.
- Fecha de la primera versión: **10 de noviembre de 2026**. Actualización de datos: manual; no se presenta como monitoreo en tiempo real.

## Control del producto

Desarrollo técnico de Gestión Ambiental, DIMAO Recoleta, como apoyo analítico a la Sección de Ornato. Seguimiento de trabajo en el expediente institucional `GA-T-2026-0074` (acceso restringido). Ornato y las unidades competentes conservan la atribución de validar inspecciones, riesgos e intervenciones.

**QA de V1:** se probaron en Chromium la navegación, selección de las seis rutas, visualización de categorías/UV, CSV agregado y renderización de escritorio y móvil. No se acredita con ello validación técnica de expedientes individuales ni habilitación efectiva de GitHub Pages.
