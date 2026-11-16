# RUN-20261116T1708CL-MANUAL-MESA-REVISION-CORTE-DINAMICO-001 — QA de mesa pública OIRS V1.5

**Fecha/hora Chile verificada:** 2026-11-16 17:08:29 -03:00 (commit GitHub 20:08:29Z). **Responsable funcional:** Gestión Ambiental; **ejecución asistida:** ChatGPT manual, solicitado por el responsable al pedir abrir y mejorar el dashboard. **Producto revisado:** [Mesa pública Censo × OIRS](https://germaquintana.github.io/censoarboreo_publico/mesa.html). **Repositorio:** germaquintana/censoarboreo_publico, rama main.

## Intervención
- Se inspeccionaron el contrato `AGENTS.md`, `mesa.html`, `data/oirs_curados.json`, `index.html` y README de este repositorio. Se comprobó el lock activo de otro chat sobre GA-T-2026-0017 en el repositorio institucional DIMAO y **no se modificó ni liberó ese lock**. No se tocó ningún expediente institucional ni dato original.
- Se identificó una leyenda fija que decía «300 OIRS de noviembre» y quedaría incorrecta para futuros cortes. Se sustituyó por el total y fecha derivados del JSON cargado en ese momento.
- Se amplió la validación de frontend: cada clase de coincidencia debe aparecer una sola vez, con recuento entero no negativo; las cuatro clases deben sumar el universo y las dos clases con candidato deben igualar el total de OIRS con candidatura.
- Se confirmó por lectura posterior de GitHub que el contenido de `mesa.html` coincide exactamente con el enviado. Commit: [`d6618896cbfdb8ec65b645b4bd57c40ff74547c9`](https://github.com/germaquintana/censoarboreo_publico/commit/d6618896cbfdb8ec65b645b4bd57c40ff74547c9).

## Fuente publicada y límites
- `data/oirs_curados.json` sin identificadores ciudadanos ni datos individuales: 300 OIRS, 25.957 registros censales, 691 candidatos, clases 93/53/122/32, corte fuente 05-11-2026 y paquete curado 16-11-2026.
- La página pública no pide Drive, OAuth ni archivos locales; por diseño **no permite abrir fichas personales OIRS** ni confirmar asociaciones reales. Esa capacidad depende de mesa operativa privada con autenticación y autorización institucional todavía pendiente.
- El archivo curado se genera por pipeline de curaduría ya versionado en repositorio institucional; **no hay garantía demostrada de actualización automática desde los Excel originales**.

## Pruebas, bloqueos y reanudación
- **PASS:** escritura SHA/CAS de `mesa.html` y readback idéntico; validación lógica del contrato de cuatro categorías para corte publicado; fuentes JSON y HTML inspeccionadas; ninguna clave personal detectada en el dataset agregado.
- **Pendiente:** GitHub Pages Actions sobre el commit de corrección y prueba HTTP/navegador independiente. Si el proveedor confirma éxito, clasificar `DESPLIEGUE_CONFIRMADO_ACCESO_EXTERNO_NO_VERIFICADO` cuando la carga desde este entorno no pueda ser probada. No declarar prueba del nuevo código en Chrome del usuario.
- **Próxima acción:** solicitar revisión visual al titular en URL permanente; corregir observaciones concretas. Separadamente, desarrollar mesa privada nominativa y proceso de refresco curado de origen en GA-T-0074 cuando corresponda, con lock, RUN y permisos del nodo.

No se envió ninguna respuesta OIRS ni se modificaron nombres, direcciones, contactos o estados del portal.
