# Bellarya

Proyecto Next.js con las últimas tecnologías de 2025.

## Tecnologías

- **Next.js 15** - Framework React con App Router y Turbopack
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Shadcn/ui** - Componentes UI accesibles y personalizables
- **MongoDB** - Base de datos NoSQL con Mongoose
- **Framer Motion** - Animaciones declarativas para React
- **GSAP** - Animaciones avanzadas de alto rendimiento

## Estructura del Proyecto

```
bellarya/
├── src/
│   ├── app/              # App Router de Next.js
│   ├── components/       # Componentes React reutilizables
│   ├── lib/              # Utilidades y configuraciones
│   │   ├── mongodb.ts    # Conexión a MongoDB
│   │   └── utils.ts      # Utilidades de Shadcn
│   ├── models/           # Modelos de Mongoose
│   ├── hooks/            # Custom React Hooks
│   ├── types/            # Tipos de TypeScript
│   └── animations/       # Configuración de animaciones
│       ├── gsap-config.ts
│       └── motion-variants.ts
├── public/               # Archivos estáticos
└── .env.example          # Variables de entorno de ejemplo
```

## Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env.local
   ```

   Edita `.env.local` y añade tu URI de MongoDB.

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## Animaciones

### Framer Motion
El proyecto incluye variantes predefinidas en `src/animations/motion-variants.ts`:
- `fadeInVariants`
- `slideUpVariants`
- `slideInLeftVariants`
- `scaleVariants`
- `staggerContainerVariants`
- `hoverScaleVariants`

### GSAP
Funciones de animación reutilizables en `src/animations/gsap-config.ts`:
- `fadeIn()`
- `slideIn()`
- `scaleIn()`

## Shadcn/ui

Para añadir componentes de Shadcn:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

## MongoDB

La conexión a MongoDB se maneja automáticamente mediante `src/lib/mongodb.ts`. Usa:
```typescript
import connectDB from '@/lib/mongodb';

// En tus API routes o Server Components
await connectDB();
```

## Scripts

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm start` - Servidor de producción
- `npm run lint` - Linter de ESLint

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [GSAP](https://gsap.com)
- [Mongoose](https://mongoosejs.com)
