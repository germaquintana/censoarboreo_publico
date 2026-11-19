# Contrato de conexión privada V3 — GitHub Pages + Worker

**Estado:** diseño y código sintético, NO servicio desplegado ni autorización de tratamiento de datos.

## Orígenes y frontera de confianza
- `https://germaquintana.github.io/censoarboreo_publico/consulta/` es una **maqueta pública** con agregados C0. No debe recibir respuestas OIRS nominativas, tokens ni endpoints de datos privados.
- El Worker aprobado debe servir **su propia copia de `consulta/index.html` y `consulta/app.js` desde el mismo origen HTTPS privado**. Sus rutas relativas `./api/v1/session`, `./api/v1/oirs`, `./api/v1/oirs/{folio}` quedan así bajo la misma política de Access y sin CORS entre dominios.
- La entrada desde Pages será únicamente un **enlace de navegación** hacia el origen privado aprobado; nunca una llamada fetch cross-origin, iframe, proxy público, token en URL o configuración de endpoint con PII.
- No incorporar la URL de producción a Pages hasta comprobar TLS, Access, identidad/MFA, R2 privado y las pruebas E2E. No activar despliegue sin autorización del custodio.

## Contrato
1. Access protege `/consulta/`, `/consulta/app.js` y todos los endpoints de expediente. El Worker valida JWT (firma, issuer, audience, RS256, email allowlist). El servicio debe devolver 403 sin identidad válida.
2. `GET /consulta/api/v1/session`: `{authenticated:true,authorized:true,mode:"SOLO_CONSULTA"}`.
3. `GET /consulta/api/v1/oirs?search=...&group=...&offset=...&limit=...`: `{total,items:[{folio,address,date,candidates,group}]}`, máximo 35 registros.
4. `GET /consulta/api/v1/oirs/{folio}`: `{case,trees,cutoff}`. Cada distancia es **entero JSON** entre -5 y 5; no se admiten valores vacíos, cadenas o decimales.
5. Todas las respuestas de expediente: `Cache-Control: private, no-store`; nunca logs con cuerpo, nombres, RUT, dirección o relato. No hay métodos de escritura.
6. Si faltan R2 o configuración de identidad, el servicio falla cerrado (403/503), sin fallback a datos públicos con expedientes.

## Aceptación posterior a autorización
- Sesión sin JWT, JWT inválido y correo no autorizado: 403.
- Sesión autorizada y datos R2: búsqueda por folio, calle y relato, un caso con candidatos y otro sin ellos.
- Copiar respuesta no genera escrituras; confirmar que no hay persistencia local ni envío.
- Revisar headers, redirecciones Access, logs, historial Actions y ausencia de datos personales en Pages.
- Validar Ornato antes de afirmar identidad de árbol, poda, tala o plan comunal.

**Puerta humana:** aprobación del proveedor, residencia/tratamiento de datos, controles de acceso, custodia del bucket y política de retención. GitHub administra código y CI, no expedientes.
