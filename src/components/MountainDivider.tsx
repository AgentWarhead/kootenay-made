'use client';

interface MountainDividerProps {
  variant?: 1 | 2 | 3;
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

export default function MountainDivider({ variant = 1, fillColor = '#2D6A4F', className = '', flip = false }: MountainDividerProps) {
  const paths: Record<number, string> = {
    1: 'M0,80 L45,35 L78,55 L120,15 L165,45 L210,8 L255,38 L300,20 L345,50 L390,12 L435,42 L480,25 L525,55 L570,18 L615,48 L660,10 L705,40 L750,22 L795,52 L840,15 L885,45 L930,28 L975,58 L1020,5 L1065,35 L1110,20 L1155,50 L1200,30 L1245,55 L1290,12 L1335,42 L1380,25 L1440,35 L1440,80 L0,80 Z',
    2: 'M0,80 L60,28 L100,50 L150,10 L200,42 L260,18 L310,55 L370,5 L420,38 L470,22 L530,48 L580,15 L640,52 L700,8 L750,40 L810,25 L870,55 L920,12 L980,45 L1030,20 L1090,50 L1140,30 L1200,8 L1260,42 L1310,18 L1370,48 L1440,28 L1440,80 L0,80 Z',
    3: 'M0,80 L30,42 L80,58 L130,22 L180,48 L220,12 L280,38 L330,55 L380,18 L440,45 L490,8 L540,35 L600,52 L650,15 L710,42 L760,28 L820,50 L870,10 L930,38 L980,55 L1040,20 L1100,45 L1150,12 L1210,35 L1260,52 L1320,22 L1380,48 L1440,32 L1440,80 L0,80 Z',
  };

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[40px] sm:h-[60px] md:h-[80px]"
      >
        <path d={paths[variant]} fill={fillColor} />
      </svg>
    </div>
  );
}
