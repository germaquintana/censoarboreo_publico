# Observatorio de Arbolado Urbano y solicitudes OIRS — Recoleta

> **Mesa pública OIRS V1.5:** [Abrir visualizador de indicadores curados](https://germaquintana.github.io/censoarboreo_publico/mesa.html). Esta versión NO pide Google Drive, OAuth, Client ID ni carga local. Consulta [`data/oirs_curados.json`](data/oirs_curados.json), derivado agregado de fuentes restringidas por el proyecto institucional.
>
> **Alcance y privacidad:** solo hay indicadores globales y calidad del cruce. Las fichas de OIRS con persona, domicilio, contacto, relato y confirmaciones se conservan en el entorno institucional y requieren una **mesa privada autenticada** que no está desplegada. **Nunca** incorporar microdatos a GitHub Pages. La sincronización desde fuentes originales al JSON público sigue siendo **por curaduría y publicación controlada**; no está acreditada una ingesta automática continua.
>
> **Corte actual:** 300 OIRS / 25.957 registros censales / 691 candidaturas; 93 OIRS con misma numeración, 53 con proximidad ±5, 122 sin candidato y 32 sin dirección interpretable. Candidaturas no equivalen a árboles confirmados ni respuestas aprobadas. [Motor de derivación en el repositorio institucional](https://github.com/germaquintana/Gestionambientaltrabajo_recoleta/blob/main/02_PRODUCTOS/CENSO_ARBOREO_OIRS_CURA/scripts/build_public_oirs.py). La V1.4 y su OAuth de visitante quedan **obsoletos** y permanecen documentados solo como antecedente histórico.


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


## V1.3 — Mesa privada de casos OIRS (16-11-2026)

La pestaña **«Mesa de casos»** del [dashboard web permanente](https://germaquintana.github.io/censoarboreo_publico/#mesa) incorpora revisión por solicitud: folio y fecha, relato, ubicación, candidatos censales, atributos del árbol (especie, DAP, altura, estado estructural), razón y límites de coincidencia, estado documental de gestión y borrador orientativo no autorizado.

**Importante: el contenido individual NO está publicado en GitHub Pages.** El usuario autorizado debe obtener el paquete `MESA_PRIVADA_OIRS_CENSO_CASOS_V0_2_2026-11-16.json` desde la carpeta privada del expediente OIRS en Google Drive, descargarlo con su cuenta y cargarlo **localmente** desde el selector de archivos de la pestaña. El navegador lo usa en memoria; la interfaz pública no emplea solicitudes externas para subirlo, no lo guarda en el repositorio ni lo incorpora al CSV público. Al actualizar/cerrar la página, se descarta la selección. Requiere cautela frente a equipos compartidos, extensiones de navegador, descargas y portapapeles. **No es un sistema autenticado integrado**: la conexión privada automática con Drive/portal OIRS sigue pendiente.

**Derivado restringido bajo custodia de Drive:** 300 folios únicos y relatos sustantivos con supresión automática básica de posibles identificadores de contacto; no conserva columnas de nombres, RUT, teléfono o correo. Contiene folio, domicilio y contenido de solicitud, que son **datos de acceso restringido y potencialmente reidentificables**, por lo que no se publica ni se comparte libremente. El documento original del área conserva precedencia sobre esta proyección. El trabajo fue preparado desde los dos archivos remitidos por Ornato el 05-11-2026: `03_OIRS_ornato_recoleta.xlsx` y `01_censo_direcciones.xlsx`.

**Nueva heurística de vinculación (NO comparable con cruce previo v02):** por calle/numeración normalizada del domicilio OIRS frente a la dirección aproximada calculada del árbol, con búsqueda adicional de numeraciones en la misma calle con diferencia de hasta 40. En esta ejecución arroja **105 OIRS con al menos una coincidencia de numeración, 91 adicionales con solo numeración cercana y 104 sin candidato**; se limitan a 8 candidatos mostrados por solicitud (1.441 candidatos presentados en total). No son 105 árboles identificados ni 91 casos inspeccionados, y no sustituyen las series 33/55/212 o 35 orientativas de otros métodos. Las distancias de números no son metros, y nombres de calle/numeración pueden producir falsos positivos o negativos.

El borrador automático no afirma ejecución, programación ni diagnóstico: todas las actuaciones quedan **por verificar** hasta contrastar portal, evaluación, orden, fecha y validación de Ornato. La mesa permite copiarlo para revisión humana, nunca enviarlo. Las correcciones o cambios en el texto hechos en el navegador **no se guardan automáticamente**.

**Despliegue:** HTML de V1.3 commit `5e46568077da13f8cc810fec23d863a3e7ea21c8`, [Pages run #43890300330](https://github.com/germaquintana/censoarboreo_publico/actions/runs/43890300330) concluido `success` y log del paso `deploy` con `Reported success!` y misma URL permanente. El acceso HTTP/QA visual real desde ChatGPT permanece sin verificar por limitaciones de red; la prueba manual con paquete restringido queda como próximo control.

**Actualización V0.2 del paquete:** mismo ID privado de Drive, datos derivados con 300 borradores orientativos por folio, motivo textual inferido y explicación de coincidencia; 945.910 bytes, solo permiso del propietario y carpeta original. No se acredita estado del portal ni aprobación de Ornato. La vista ahora incluye UV, etapa, fecha y observaciones del censo si están disponibles. El código incorpora una política CSP que impide conexiones de red iniciadas por scripts desde el sitio.


## V1.4 — Mesa OIRS en línea (16-11-2026)

**Abrir interfaz:** https://germaquintana.github.io/censoarboreo_publico/mesa.html ; el observatorio original en `/#mesa` ofrece este acceso. La aplicación está hospedada por GitHub Pages, pero **los expedientes individuales no son públicos ni están en este repositorio**.

**Cambios frente a V1.3:**
- Tres secciones: (1) solicitud completa según campos efectivamente existentes en las fuentes autorizadas, (2) árboles censales candidatos, criterio estricto de **misma calle normalizada y diferencia numérica ≤5**, selección/confirmación/rechazo, (3) borrador condicionado a la decisión y a evidencia técnica. La asociación no acredita intervención ni respuesta OIRS emitida.
- Fuente privada preparada [paquete interno V0.3 de 300 OIRS](https://drive.google.com/file/d/14HsQ95qz9-8tOdH8TSCkdyuRP84H6f_u/view) (en Drive restringido, no copiar JSON aquí), generado con cruce sobre los 25.957 registros censales: 93 folios con al menos un candidato de misma numeración, 53 con proximidad ±5, 122 sin candidato y 32 con numeración no interpretable. **691 filas candidatas**, ninguna fuera del umbral. La clasificación histórica V1.3 (105/91/104 con ±40) está obsoleta para decisiones.
- Cliente web usa Google Identity Services OAuth y Google Drive API para **leer desde Drive tras autorización**, sin descarga/carga de archivo local; busca automáticamente el paquete privado V0.3 y la matriz OIRS vigente por nombre. Es posible conectar adicionalmente el XLSX OIRS original y el censo original (si existen en Drive con permisos adecuados) para mostrar detalles originales y rehacer coincidencias sobre la fuente actual en cada conexión. Campos que no estén en la fuente (p. ej. teléfono/correo en archivo original que solo contiene ID/NOMBRE/RUT/FECHA/DIRECCIÓN/SOLICITUD) se muestran como «No informado» y no se inventan.
- La confirmación humana se guarda por cuenta en **Google Drive appDataFolder** mediante Drive API, con revisor y fecha, sin escribir al archivo de origen ni al portal OIRS. No hay sincronización multiusuario/portal ni emisión oficial. Es una arquitectura de uso personal autorizado, no un backend institucional aprobado.
- **Puerta pendiente (no declarar sistema conectado):** registrar un **cliente OAuth tipo web** de Google Cloud para el origen autorizado `https://germaquintana.github.io`, habilitar Drive API y configurar la pantalla de consentimiento/usuarios permitidos. Introducir **solo el Client ID público** en «Acceder a los expedientes» y conectar la cuenta institucional. No ingresar secretos en el navegador ni GitHub. Sin esa configuración, la mesa web muestra interfaz pero no carga los archivos. Una conexión válida y guardado en appData **no han sido verificados contra Google** en esta iteración.
- **Protección:** datos no enviados a GitHub; el navegador usa `textContent` para mostrar relatos, no persiste tokens ni registros individuales en `localStorage`, y conserva únicamente ID público de cliente e IDs de Drive de fuentes que el usuario autoriza. El acceso lo gobiernan los permisos de cada archivo en Drive. **No es un sistema de acceso institucional auditado y multicuenta**; requiere revisión de seguridad y competencia antes de operación formal.
- **Estado de actualización de datos:** lectura nueva del paquete V0.3 al conectarse, pero la generación de ese paquete **no está automatizada**. El censo se recalcula directamente en navegador solo cuando el XLSX censal se encuentra en Drive y se configura su ID. No confundir hosting web actualizado con sincronización completa desde el origen.

**QA ejecutada:** cruce Python sobre 25.957 filas y 300 OIRS, 691 candidatos todos con diferencia ≤5; sintaxis JavaScript verificada con Node, 3 secciones y controles de interfaz inspeccionados. No se logró E2E real de Google OAuth ni prueba de navegador HTTP por restricciones de acceso a host en este entorno.


### Mesa pública V1.5 — separación de datos y actualización (16-11-2026)

- La página [`mesa.html`](mesa.html) consume datos del propio repositorio mediante `fetch('./data/oirs_curados.json')`, sin credenciales, script de Google ni acceso a Drive. Se quitaron el código de carga manual de expedientes oculto en el observatorio principal y el componente OAuth V1.4; enlaces internos actualizados.
- El paquete V0.3 institucional de 300 casos permanece en Drive restringido, **no** en la web. La herramienta `build_public_oirs.py` del expediente privado genera solamente cuatro grupos agregados, tamaños del universo, límites y fecha de corte; falla si detecta nueva evidencia de portal que exija revisión de las estadísticas. No copia folios ni direcciones ni relatos.
- **Cadencia vigente:** instantánea derivada el 16-11-2026. El usuario no carga archivos, pero la *preparación del siguiente corte* requiere disparador/ejecutor autorizado, lectura de fuente, QA y escritura GitHub aprobada. **No afirmar actualización en tiempo real ni sincronización automática ya probada**.
- La Mesa interna para acceso caso a caso necesita alojamiento protegido y decisión sobre custodio de roles, autenticación y almacenamiento de confirmaciones. No se debe sustituir por una página GitHub Pages que muestre datos nominativos.
- Verificación de despliegue: comprobar GitHub Actions del commit de esta actualización; la ausencia de prueba de navegación independiente debe declararse.
