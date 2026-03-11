# Design System: ZenTrack (by Stitch)

## Paleta de Colores

| Elemento                 | Hex Code  | Uso                                            |
| :----------------------- | :-------- | :--------------------------------------------- |
| **Primary (Zen Green)**  | `#10b981` | Botones principales, estados activos, acentos. |
| **Secondary (Zen Blue)** | `#309ce8` | Burbujas de usuario, elementos informativos.   |
| **Background**           | `#0f172a` | Fondo principal de la aplicación.              |
| **Surface/Card**         | `#1e293b` | Tarjetas de historial, fondos de secciones.    |
| **Text Primary**         | `#f8fafc` | Títulos y cuerpo de texto principal.           |
| **Text Secondary**       | `#94a3b8` | Textos de apoyo, fechas y estados secundarios. |

## Componentes UI

### MoodCard

- **Bordes:** Redondeados a `16px` (`rounded-2xl` en Tailwind).
- **Padding:** Generoso para dar aire al contenido.
- **Efectos:** Sombras suaves (`shadow-sm`).
- **Estados:** Cuando una tarjeta está activa o seleccionada, debe mostrar un borde de `2px` con el color **Primary**.

### ChatBubble

- **Bordes:** Esquinas redondeadas a `16px`.
- **Asistente:** Fondo gris oscuro (usar `Surface` o similar) con texto `Text Primary`.
- **Usuario:** Fondo azul vibrante (`Secondary`) con texto `Text Primary`.

## Layout

- **Estructura:** Mobile-first basada íntegramente en Flexbox.
- **Navegación:** Barra inferior persistente para acceso rápido a "Registro" y "Chat".
- **Espaciado:** Basado en una escala de `4px` (multiplos de `p-1`, `m-1` en Tailwind) para mantener una estética minimalista y equilibrada.
