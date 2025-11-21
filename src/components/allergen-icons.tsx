import { Alergeno } from '@/types/menu';
import { Circle, Drop, Egg, Fish, Shrimp, Nut, Plant, Leaf, Jar } from '@phosphor-icons/react';

interface AllergenIconsProps {
  alergenos?: Alergeno[];
}

const allergenConfig: Record<Alergeno, { icon: React.ElementType; label: string; labelEn: string }> = {
  'gluten': { icon: Circle, label: 'Gluten', labelEn: 'Gluten' },
  'lacteos': { icon: Drop, label: 'Lácteos', labelEn: 'Dairy' },
  'huevo': { icon: Egg, label: 'Huevo', labelEn: 'Egg' },
  'pescado': { icon: Fish, label: 'Pescado', labelEn: 'Fish' },
  'mariscos': { icon: Shrimp, label: 'Mariscos', labelEn: 'Shellfish' },
  'frutos-secos': { icon: Nut, label: 'Frutos secos', labelEn: 'Nuts' },
  'soja': { icon: Plant, label: 'Soja', labelEn: 'Soy' },
  'apio': { icon: Leaf, label: 'Apio', labelEn: 'Celery' },
  'mostaza': { icon: Jar, label: 'Mostaza', labelEn: 'Mustard' },
  'sesamo': { icon: Circle, label: 'Sésamo', labelEn: 'Sesame' },
  'sulfitos': { icon: Drop, label: 'Sulfitos', labelEn: 'Sulfites' },
};

export function AllergenIcons({ alergenos }: AllergenIconsProps) {
  if (!alergenos || alergenos.length === 0) return null;

  // Get language from localStorage
  const language = typeof window !== 'undefined'
    ? (localStorage.getItem('preferred-language') as 'es' | 'en') || 'es'
    : 'es';

  return (
    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/20">
      {alergenos.map((alergeno) => {
        const config = allergenConfig[alergeno];
        if (!config) return null;

        const Icon = config.icon;
        const label = language === 'en' ? config.labelEn : config.label;

        return (
          <div
            key={alergeno}
            className="group relative"
            title={label}
          >
            <div className="flex items-center gap-1 px-2 py-1 border border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
              <Icon weight="thin" className="h-3.5 w-3.5 text-foreground/60" />
              <span className="text-[10px] text-foreground/60 uppercase tracking-wide">{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
