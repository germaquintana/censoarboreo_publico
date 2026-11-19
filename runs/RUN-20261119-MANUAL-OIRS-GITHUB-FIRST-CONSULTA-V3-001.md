# RUN-20261119-MANUAL-OIRS-GITHUB-FIRST-CONSULTA-V3-001 — visor V3 nativo GitHub

**Fecha:** 2026-11-19, America/Santiago. **Mandato del titular:** continuar Censo Arbóreo × OIRS sin usar Apps Script; gestionar código/despliegue directamente desde GitHub. **Unidad efectivamente realizada:** desarrollo del frontend integrado y su contrato de API segura **en el repositorio público de visualización**, sin alterar datos privados ni la tarea institucional ocupada.

## Resultado material
- [Interfaz GitHub Pages V3](https://germaquintana.github.io/censoarboreo_publico/consulta/): `consulta/index.html` y `consulta/app.js`, commits `5b009da5be288e45153ebdc951883645183eceeb` y `12c65d366667d26b57689f34dd2b2852607f7ad0`. Una pantalla con buscador, caso íntegro, candidatos censo ±5, interpretación y respuesta copiable. Las selecciones son **solo de sesión**: no se guardan, no se emite correo ni se modifica portal.
- **Estado del dato accesible al público:** el visor obtiene el resumen agregado real desde `../data/oirs_curados.json` (300 OIRS, 146 con candidatura, 691 apariciones de candidatos, corte original 05-11-2026, procesado 16-11). **No incorpora ni expone nombres, RUT, folios, direcciones individuales ni relatos**. La conexión a expediente individual **NO está implementada**.
- [Contrato API de servidor restringido](https://github.com/germaquintana/censoarboreo_publico/blob/main/consulta/README.md), commit `8e8f11123f98d4381e52ddf269407f7115ff545e`: sesiones y roles validados en backend, `GET /consulta/api/v1/session`, `/oirs`, `/oirs/{folio}`, lectura de fuente privada sin publicar en GitHub Pages, respuesta con `Cache-Control: no-store`; scopes/rutas de lectura únicamente. Pendiente selección de hosting del backend y habilitación del origen real.
- [Portada actualizada](https://germaquintana.github.io/censoarboreo_publico/), commit `3fc5123ea7c20d63b5d3b161c2545a574452a0ca`: enlace explícito al visor V3 e indicación de que solo los agregados son consultables hasta contar con servidor autenticado.
- GitHub Pages de repositorio **personal** no ofrece protección de acceso privado a folios incluso si el repositorio es privado. No copiar expedientes a Pages o Actions públicos; el backend requiere un hosting con autenticación real. Referencia documental: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site .

## Calidad
Prueba de sintaxis JS con `new Function` PASS; DOM usa `textContent`, requests mismo origen `credentials:same-origin`, sin `POST/PUT/PATCH/DELETE`, sin `localStorage/sessionStorage`, sin contenido personal incrustado, regla de proximidad absoluta ≤5, y lectura del derivado de cuatro cohortes que suman 300: **12/12 validaciones estáticas PASS**. Lectura de archivos GitHub tras cada commit coincide con el contenido escrito. La prueba del backend seguro y la consulta individual reales son **PENDIENTES**, y el frontend informa esta limitación expresamente. No se generaron ni enviaron respuestas OIRS.

## Concurrencia institucional y seguimiento
Antes de operar se leyeron `AGENTS.md`, `estado_sistema.json`, índice, GA-T-2026-0074, protocolo de cascadas, último RUN y AGENTS del repo público. `Gestionambientaltrabajo_recoleta` estaba ocupado por **RUN-20261119T1032CL-MANUAL-CALOR-T01-GENERO-001** de otra conversación. No se tomó, alteró ni liberó ese lock; **no se escribió GA-T, estado ni RUN institucional** en este ciclo. Este RUN documenta exclusivamente cambios propios del repositorio visualizador y deberá reconciliarse en GA-T-0074 al liberarse el origen. Sin cambios en los cinco ejecutores ni en su rotación.

## Próxima unidad real
1. Acordar/obtener hosting institucional autenticado de backend, con identidad y permisos sobre el dataset privado curado; un repositorio GitHub privado o Pages personal no basta.
2. Implementar esos tres endpoints desde código GitHub con despliegue por GitHub Actions a ese hosting, sin valores sensibles en repositorios ni artefactos públicos.
3. Prueba E2E con sesión autorizada y denegada, casos OIRS con/sin candidatos, validación de texto y cero persistencia; obtener URL privada funcional y enlazarla desde el sitio público.
4. Reconciliar este avance en GA-T-0074 / Trello y registrar RUN institucional **cuando el lock local sea libre**.

**Estado de entrega:** `FRONTEND_GITHUB_PUBLICADO` sujeto a comprobación del workflow Pages; `API_PRIVADA_NO_IMPLEMENTADA`; `CONSULTA_INDIVIDUAL_NO_OPERATIVA`.
