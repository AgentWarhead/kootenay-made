'use client';

export default function PineTreeline({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] sm:h-[80px] md:h-[120px]" fill="#232629" opacity="0.06">
        {/* Tree 1 */}
        <polygon points="50,120 65,40 80,120" />
        <polygon points="55,80 65,20 75,80" />
        {/* Tree 2 */}
        <polygon points="120,120 140,30 160,120" />
        <polygon points="128,75 140,10 152,75" />
        {/* Tree 3 */}
        <polygon points="200,120 212,50 224,120" />
        <polygon points="204,85 212,30 220,85" />
        {/* Tree 4 */}
        <polygon points="290,120 310,25 330,120" />
        <polygon points="298,70 310,5 322,70" />
        {/* Tree 5 */}
        <polygon points="380,120 395,45 410,120" />
        <polygon points="384,80 395,25 406,80" />
        {/* Tree 6 */}
        <polygon points="460,120 478,35 496,120" />
        <polygon points="466,75 478,15 490,75" />
        {/* Tree 7 */}
        <polygon points="550,120 562,55 574,120" />
        <polygon points="554,88 562,38 570,88" />
        {/* Tree 8 */}
        <polygon points="640,120 658,28 676,120" />
        <polygon points="646,72 658,8 670,72" />
        {/* Tree 9 */}
        <polygon points="730,120 745,42 760,120" />
        <polygon points="734,78 745,22 756,78" />
        {/* Tree 10 */}
        <polygon points="820,120 838,32 856,120" />
        <polygon points="826,74 838,12 850,74" />
        {/* Tree 11 */}
        <polygon points="910,120 925,48 940,120" />
        <polygon points="914,82 925,28 936,82" />
        {/* Tree 12 */}
        <polygon points="1000,120 1018,22 1036,120" />
        <polygon points="1006,68 1018,5 1030,68" />
        {/* Tree 13 */}
        <polygon points="1090,120 1105,40 1120,120" />
        <polygon points="1094,78 1105,20 1116,78" />
        {/* Tree 14 */}
        <polygon points="1180,120 1198,30 1216,120" />
        <polygon points="1186,72 1198,10 1210,72" />
        {/* Tree 15 */}
        <polygon points="1270,120 1285,50 1300,120" />
        <polygon points="1274,85 1285,32 1296,85" />
        {/* Tree 16 */}
        <polygon points="1360,120 1378,35 1396,120" />
        <polygon points="1366,75 1378,15 1390,75" />
      </svg>
    </div>
  );
}
