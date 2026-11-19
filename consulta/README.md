# Visor de OIRS × Censo Arbóreo — implementación GitHub-first V3

**Fecha de iteración:** 19-11-2026 (Chile). **Alcance autorizado:** desarrollar directamente en GitHub, sin Apps Script, una interfaz integrada de **solo consulta**, con una fuente interna de expedientes y sin persistencia de las acciones del usuario.

## Enlaces y estado verificable

- **Visor GitHub Pages (frontend):** https://germaquintana.github.io/censoarboreo_publico/consulta/ (fuente `consulta/index.html`, `consulta/app.js`). Este enlace **sirve la interfaz y cifras públicas agregadas**, pero **no permite todavía consultar folios con datos personales**.
- **Observatorio público anterior:** https://germaquintana.github.io/censoarboreo_publico/ (fuente `data/oirs_curados.json`). El archivo publicado es un corte agregado de 300 OIRS, 691 apariciones de candidatos censales, 146 OIRS con candidatos, corte fuente 05-11-2026; no debe confundirse con lectura del portal OIRS en tiempo real.
- **No desplegado:** API institucional autenticada para datos individuales, su almacenamiento autorizado, verificación E2E de sesión segura y despliegue unificado. **Ni GitHub Pages ni un repositorio GitHub privado de cuenta personal aportan control de acceso a las páginas publicadas por sí mismos.**

## Estructura de la pantalla de consulta

1. **Buscador de casos:** folio/dirección/relato y filtro de proximidad, lista paginada.
2. **OIRS íntegra:** persona solicitante, fecha, dirección, solicitud original y otros campos realmente disponibles (teléfono/correo como «No informado» cuando no existan).
3. **Árboles relacionados:** candidatos de la misma calle con distancia absoluta de numeración ≤5, ID, especie, condición estructural histórica, ubicación aproximada, DAP/altura, observación.
4. **Interpretación y propuesta:** el usuario puede incluir/excluir candidatos **solo en memoria de la página**, sin registrar cambios; el texto es copiable, no enviado.
5. **Advertencias:** `MALO`/`URGENCIA` requiere revisión de Ornato. No atribuir poda/tala ni coherencia con el plan comunal salvo constancia de evaluación/acto/plan en la fuente y evidencia.

## Contrato de API privada (NO implementada en Pages)

La UI exige tres endpoints **en el mismo origen que la página**, bajo el prefijo de despliegue `/consulta/api/v1/`. La ruta actual de GitHub Pages no tiene backend, por eso muestra un aviso de conexión pendiente en lugar de inventar expedientes. Todos los endpoints deben responder únicamente después de autenticación institucional, autorización explícita de cuenta/rol, verificación de sesión en servidor y controles de caché. **Una URL pública con parámetros o un encabezado controlable por visitante no constituye autenticación.**

```
GET /consulta/api/v1/session
→ 200 application/json: {"authenticated":true,"authorized":true}
→ 401/403 en sesión o rol no autorizados

GET /consulta/api/v1/oirs?search=&group=todos&offset=0&limit=30
→ 200 application/json:
   {"total":300,"items":[{"folio":"...", "address":"...", "date":"...",
     "candidates":3}]}
   [Solo tras autenticación. Los tres puntos representan valores que proveerá la fuente, no ejemplos reales.]

GET /consulta/api/v1/oirs/{folio}
→ 200 application/json:
   {"case":{"folio":"...","date":"...","name":"...","rut":"...",
      "address":"...","request":"...","phone":"...","email":"...",
      "portal":"...","inspection":"...","order":"...","plan":"...",
      "ornatoReview":"...","reference":"...","approvedMeasure":"..."},
    "trees":[{"treeId":"...","species":"...","commonName":"...",
      "approximateAddress":"...","distance":2,"structuralState":"...",
      "observation":"...","height":"...","dap":"...","growth":"..."}]}
```

**Contrato de seguridad y QA obligatorio:**

- Sesión institucional validada **en servidor**, no solamente mostrando un login en JavaScript; MFA/SSO y lista autorizada de personal según política municipal.
- Respuestas con `Cache-Control: no-store`, `Content-Type: application/json`, no registrar PII en logs de acceso, analítica ni URL. No incluir nombres/RUT/domicilios/relatos en repositorios, builds, artefactos de Actions, Pages o CSV públicos.
- El servidor solo lee un almacenamiento institucional restringido que el ecosistema mantiene mediante curaduría. Para identidad del árbol: misma calle normalizada, `abs(numero_oirs-numero_censo) <= 5` **y candidato no confirmado** si no hay identificación humana.
- Validar `folio` en servidor, verificar que pertenezca al conjunto al que el usuario tiene derecho, limitar paginación, impedir enumeración masiva y aplicar controles de auditoría de acceso conforme a las políticas del custodio (la versión V3 **no guarda acciones de consulta**, distinto de los logs técnicos mínimos que exige seguridad).
- Aislamiento de despliegues: **el frontend y la API deben compartir un origen bajo un hosting que tenga backend y control de acceso**, por ejemplo aplicación en infraestructura institucional con deploy desde GitHub Actions. GitHub Pages no proporciona rutas API ni sesión de servidor. Si se requiere mantener la URL de Pages para resúmenes, usarla como portada pública y servir el área privada en dominio autenticado separado; la UI se despliega desde el mismo repositorio GitHub mediante CI.
- Ninguna ruta `POST`/`PUT`/`PATCH`/`DELETE` forma parte del contrato V3. No modificar Google Sheets, OIRS, confirmaciones ni borradores por esta interfaz.

## Siguiente unidad implementable

1. **Seleccionar hosting/identidad institucional con acceso autorizado** y exponer backend protegido con el contrato anterior (puede desplegarse desde GitHub Actions; no Apps Script).
2. Conectar el backend al dataset privado curado bajo permisos del custodio; evitar almacenar las OIRS en GitHub público aunque se oculten por rutas o extensiones.
3. Configurar despliegue privado, probar sesión real y un caso con/sin árbol; confirmar que sin sesión nunca salen nombres/RUT/relatos. Obtener URL de aplicación **real y verificada**.
4. Enlazar acceso privado autenticado desde observatorio público conservando datos agregados allí.

**Bloqueo institucional concurrente (19-11-2026):** el repositorio `Gestionambientaltrabajo_recoleta` tenía `run_lock.active=true` de otra conversación (mesa olas de calor). En esta iteración no se escribió en dicho repositorio, no se creó ni alteró GA-T/estado/RUN institucional y no se liberó el lock ajeno. Esta documentación vive en el repositorio público del visualizador, y su reconciliación en GA-T-0074 debe esperar a la liberación del lock.


## Implementación backend GitHub-first preparada — 19-11-2026

- [Worker de API privada](../backend/worker.js) escrito en GitHub, validación de JWT firmados Cloudflare Access con issuer/audience/allowlist; depósito R2 privado `oirs-v3.json` **no habilitado** hasta evaluación/permiso institucional.
- [Configuración ejemplo](../backend/wrangler.example.jsonc) y [workflow manual protegido](../.github/workflows/oirs-private-worker.yml). Sin secretos ni datos personales en repos.
- [Pruebas de backend](https://github.com/germaquintana/censoarboreo_publico/actions/runs/44546587388) PASS con datos sintéticos. Verificador de dataset rechaza folios duplicados, ID inválidos y distancias mayores a ±5; endpoints privados 403 sin JWT válido.
- El Worker propuesto **puede servir la interfaz y API en el mismo origen bajo protección Access** cuando haya hosting aprobado. La URL de GitHub Pages sigue pública y no proporciona expedientes nominativos. No configurar OAuth ni App Script en el navegador.
- La autoridad y el exportador interno que reúne OIRS originales con candidatos están documentados en [expediente institucional GA-T-0074](https://github.com/germaquintana/Gestionambientaltrabajo_recoleta/blob/main/02_PRODUCTOS/CENSO_ARBOREO_OIRS_CURA/GITHUB_FIRST_BACKEND_PRIVADO_V1.md).
- **Estado:** backend codificado y probado con fixtures; **no desplegado**, sin fuente R2 real ni URL privada de consulta. No presentar como funcional en producción.
