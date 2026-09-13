// Simple hand-drawn SVG illustrations used where no source photo exists.
// Each is a small, self-contained, brand-colored diagram referenced by name
// from lesson content (`{ type: "diagram", name: "..." }`).

function FifoRotation() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-auto max-w-md mx-auto" role="img" aria-label="Принцип ротации FIFO">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#7A2138" />
        </marker>
      </defs>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const order = row * 3 + col;
          const isOldest = order === 0;
          return (
            <rect
              key={`${row}-${col}`}
              x={20 + col * 40}
              y={15 + row * 32}
              width={28}
              height={22}
              rx={5}
              fill={isOldest ? "#FFB800" : "#FFE7A0"}
              stroke="#7A2138"
              strokeWidth={isOldest ? 2 : 1}
            />
          );
        })
      )}
      <text x={34} y={30} fontSize="10" fill="#7A2138" fontWeight="bold">1</text>
      <line x1={155} y1={60} x2={230} y2={60} stroke="#7A2138" strokeWidth={2} markerEnd="url(#arrow)" />
      <text x={162} y={50} fontSize="11" fill="#7A2138" fontWeight="bold">первым приготовлен</text>
      <text x={172} y={78} fontSize="11" fill="#7A2138" fontWeight="bold">первым выдан</text>
    </svg>
  );
}

function OrderTypesMonitor() {
  const rows = [
    { label: "В зале", color: "#FFB800" },
    { label: "С собой", color: "#7A2138" },
    { label: "Доставка", color: "#3B82F6" },
    { label: "Мобильный", color: "#16A34A" },
  ];
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Виды заказов на мониторе">
      <rect x={10} y={10} width={300} height={140} rx={12} fill="#1F2937" />
      <rect x={22} y={22} width={276} height={116} rx={6} fill="#111827" />
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x={34} y={34 + i * 26} width={10} height={10} rx={2} fill={r.color} />
          <text x={52} y={43 + i * 26} fontSize="12" fill="#F9FAFB">{r.label}</text>
          <rect x={220} y={33 + i * 26} width={60} height={12} rx={3} fill="#374151" />
        </g>
      ))}
    </svg>
  );
}

function UhcStorage() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Шкаф UHC с ячейками хранения">
      <rect x={20} y={15} width={280} height={100} rx={10} fill="#FFE7A0" stroke="#7A2138" strokeWidth={2} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={32 + i * 65} y={28} width={55} height={40} rx={4} fill="#FFFFFF" stroke="#7A2138" strokeWidth={1.5} />
          <circle cx={59 + i * 65} cy={80} r={10} fill={i === 0 ? "#DC2626" : "#16A34A"} />
          <text x={59 + i * 65} y={84} fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">
            {i === 0 ? "!" : "✓"}
          </text>
        </g>
      ))}
      <text x={160} y={110} fontSize="10" fill="#7A2138" textAnchor="middle">
        Таймер истёк — списать · Таймер идёт — готово к выдаче
      </text>
    </svg>
  );
}

function GrillZones() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Зоны гриля">
      <rect x={15} y={20} width={290} height={80} rx={8} fill="#374151" />
      <rect x={25} y={30} width={130} height={60} rx={4} fill="#7A2138" opacity={0.85} />
      <rect x={165} y={30} width={130} height={60} rx={4} fill="#FFB800" opacity={0.9} />
      <text x={90} y={65} fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">Нижняя створка</text>
      <text x={230} y={65} fontSize="12" fill="#7A2138" textAnchor="middle" fontWeight="bold">Верхняя створка</text>
      <text x={160} y={115} fontSize="10" fill="#4B5563" textAnchor="middle">
        Скребком — нижнюю, резиновой линейкой — верхнюю
      </text>
    </svg>
  );
}

function FryerBaskets() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Ванны фритюрницы">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 100} y={20} width={80} height={70} rx={6} fill="#FDE68A" stroke="#7A2138" strokeWidth={2} />
          <path d={`M${30 + i * 100} 45 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0`} stroke="#7A2138" strokeWidth={2} fill="none" />
          <rect x={35 + i * 100} y={65} width={50} height={14} rx={3} fill="#7A2138" />
        </g>
      ))}
      <text x={160} y={112} fontSize="10" fill="#4B5563" textAnchor="middle">
        У каждой ванны — своя температура и время приготовления
      </text>
    </svg>
  );
}

function MenuAllergenTag() {
  return (
    <svg viewBox="0 0 260 90" className="w-full h-auto max-w-xs mx-auto" role="img" aria-label="Маркировка аллергенов">
      <rect x={10} y={10} width={240} height={70} rx={10} fill="#FFF7E0" stroke="#FFB800" strokeWidth={2} />
      <circle cx={40} cy={45} r={16} fill="#7A2138" />
      <text x={40} y={50} fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">09</text>
      <text x={70} y={38} fontSize="11" fill="#7A2138" fontWeight="bold">Молоко (09)</text>
      <text x={70} y={54} fontSize="11" fill="#7A2138" fontWeight="bold">Глютен (05)</text>
      <text x={70} y={70} fontSize="9" fill="#92620A">номер аллергена — в скобках</text>
    </svg>
  );
}

function MentorCycle() {
  return (
    <svg viewBox="0 0 300 120" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Цикл наставничества">
      <defs>
        <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#7A2138" />
        </marker>
      </defs>
      <circle cx={60} cy={55} r={26} fill="#FFB800" />
      <text x={60} y={60} fontSize="11" fill="#7A2138" textAnchor="middle" fontWeight="bold">Наставник</text>
      <circle cx={240} cy={55} r={26} fill="#FFE7A0" stroke="#7A2138" strokeWidth={1.5} />
      <text x={240} y={60} fontSize="11" fill="#7A2138" textAnchor="middle" fontWeight="bold">Новичок</text>
      <path d="M90 42 Q165 10 210 42" stroke="#7A2138" strokeWidth={2} fill="none" markerEnd="url(#arrow2)" />
      <path d="M210 68 Q165 100 90 68" stroke="#7A2138" strokeWidth={2} fill="none" markerEnd="url(#arrow2)" />
      <text x={150} y={22} fontSize="9" fill="#7A2138" textAnchor="middle">Показывает и объясняет</text>
      <text x={150} y={112} fontSize="9" fill="#7A2138" textAnchor="middle">Повторяет и задаёт вопросы</text>
    </svg>
  );
}

function ChecklistMarks() {
  const rows = [true, true, false, true];
  return (
    <svg viewBox="0 0 260 130" className="w-full h-auto max-w-xs mx-auto" role="img" aria-label="Контрольный лист наблюдения">
      <rect x={10} y={10} width={240} height={110} rx={10} fill="white" stroke="#7A2138" strokeWidth={2} />
      {rows.map((ok, i) => (
        <g key={i}>
          <rect x={24} y={24 + i * 24} width={16} height={16} rx={3} fill={ok ? "#16A34A" : "#E5E7EB"} stroke="#7A2138" strokeWidth={1} />
          {ok && <path d={`M27 ${32 + i*24} l4 4 l7 -8`} stroke="white" strokeWidth={2} fill="none" />}
          <rect x={50} y={28 + i * 24} width={170} height={8} rx={3} fill="#F3D98B" />
        </g>
      ))}
    </svg>
  );
}

function ProgramTimeline() {
  const steps = ["Безопасность", "Качество", "Контроль", "Показатели", "Цели", "Команда"];
  return (
    <svg viewBox="0 0 320 90" className="w-full h-auto max-w-md mx-auto" role="img" aria-label="Этапы программы обучения менеджеров">
      <line x1={20} y1={45} x2={300} y2={45} stroke="#F3D98B" strokeWidth={4} />
      {steps.map((s, i) => {
        const x = 20 + (i * 280) / (steps.length - 1);
        return (
          <g key={s}>
            <circle cx={x} cy={45} r={10} fill="#7A2138" />
            <text x={x} y={49} fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">{i + 1}</text>
            <text x={x} y={70} fontSize="8.5" fill="#7A2138" textAnchor="middle">{s}</text>
          </g>
        );
      })}
    </svg>
  );
}

function AppearanceCommonRules() {
  const items: { ok: boolean; title: string; subtitle: string }[] = [
    { ok: true, title: "Бейдж обязателен", subtitle: "без сколов, трещин, пятен" },
    { ok: false, title: "Кольца, браслеты", subtitle: "кроме гладкого кольца" },
    { ok: false, title: "Цепочки, серьги", subtitle: "на шее недопустимы" },
    { ok: false, title: "Пирсинг, тату", subtitle: "на лице недопустимы" },
  ];
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto max-w-md mx-auto" role="img" aria-label="Общие требования к внешнему виду">
      {items.map((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 10 + col * 170;
        const y = 10 + row * 70;
        return (
          <g key={item.title}>
            <rect x={x} y={y} width={160} height={58} rx={10} fill="white" stroke="#E5D9B8" strokeWidth={1.5} />
            <circle cx={x + 26} cy={y + 29} r={14} fill={item.ok ? "#16A34A" : "#DC2626"} />
            {item.ok ? (
              <path d={`M${x + 19} ${y + 29} l5 5 l9 -10`} stroke="white" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <line x1={x + 20} y1={y + 22} x2={x + 32} y2={y + 36} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
                <line x1={x + 32} y1={y + 22} x2={x + 20} y2={y + 36} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
              </>
            )}
            <text x={x + 48} y={y + 24} fontSize="9" fill="#3F2A12" fontWeight="bold">
              {item.title}
            </text>
            <text x={x + 48} y={y + 38} fontSize="8.5" fill="#6B5B3A">
              {item.subtitle}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function AppearanceOutfits() {
  type Outfit = {
    label: string;
    top: string;
    bottom: string;
    headwear: "tie" | "bandana" | "none";
    apron?: boolean;
    net?: boolean;
    dress?: boolean;
  };
  const outfits: Outfit[] = [
    { label: "Менеджер", top: "#FFFFFF", bottom: "#1F2937", headwear: "tie" },
    { label: "Сервис", top: "#9CA3AF", bottom: "#1F2937", headwear: "bandana" },
    { label: "Бариста", top: "#7A2138", bottom: "#1F2937", headwear: "bandana", apron: true },
    { label: "Производство", top: "#9CA3AF", bottom: "#1F2937", headwear: "bandana", apron: true, net: true },
    { label: "Хостес", top: "#7A2138", bottom: "#7A2138", headwear: "none", dress: true },
  ];
  const colW = 66;
  return (
    <svg viewBox={`0 0 ${colW * outfits.length} 150`} className="w-full h-auto max-w-2xl mx-auto" role="img" aria-label="Пять форм одежды по должностям">
      {outfits.map((o, i) => {
        const cx = colW * i + colW / 2;
        return (
          <g key={o.label}>
            {/* head */}
            <circle cx={cx} cy={22} r={11} fill="#F3D9B5" stroke="#7A2138" strokeWidth={1} />
            {/* headwear */}
            {o.headwear === "bandana" && (
              <path d={`M${cx - 12} 16 q12 -12 24 0 l-3 6 q-9 -8 -18 0 z`} fill="#7A2138" />
            )}
            {o.headwear === "tie" && <rect x={cx - 2} y={30} width={4} height={20} fill="#1F2937" />}
            {o.net && (
              <path d={`M${cx - 11} 14 a11 11 0 0 1 22 0`} fill="none" stroke="#FFB800" strokeWidth={1.5} strokeDasharray="2 2" />
            )}
            {/* body / dress */}
            {o.dress ? (
              <path d={`M${cx - 14} 40 L${cx + 14} 40 L${cx + 20} 95 L${cx - 20} 95 Z`} fill={o.top} stroke="#7A2138" strokeWidth={1} />
            ) : (
              <>
                <rect x={cx - 15} y={38} width={30} height={34} rx={5} fill={o.top} stroke="#7A2138" strokeWidth={1} />
                <rect x={cx - 13} y={72} width={26} height={26} fill={o.bottom} />
              </>
            )}
            {o.apron && (
              <path d={`M${cx - 9} 46 L${cx + 9} 46 L${cx + 11} 90 L${cx - 11} 90 Z`} fill="#FFF7E0" stroke="#FFB800" strokeWidth={1.5} />
            )}
            {/* badge */}
            <rect x={cx - 4} y={50} width={8} height={5} rx={1} fill="#FFB800" />
            {/* shoes */}
            <rect x={cx - 13} y={98} width={11} height={6} rx={2} fill="#1F2937" />
            <rect x={cx + 2} y={98} width={11} height={6} rx={2} fill="#1F2937" />
            <text x={cx} y={122} fontSize="9" fill="#3F2A12" textAnchor="middle" fontWeight="bold">
              {o.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TableServingOrder() {
  const seats = [
    { x: 160, y: 20 },
    { x: 260, y: 60 },
    { x: 260, y: 140 },
    { x: 160, y: 180 },
    { x: 60, y: 140 },
    { x: 60, y: 60 },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Порядок подачи блюд по часовой стрелке">
      <defs>
        <marker id="arrow3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#7A2138" />
        </marker>
      </defs>
      <ellipse cx={160} cy={100} rx={70} ry={50} fill="#FFF7E0" stroke="#FFB800" strokeWidth={2} />
      <path
        d="M160 42 A 62 42 0 1 1 159 42"
        fill="none"
        stroke="#7A2138"
        strokeWidth={2}
        strokeDasharray="5 4"
        markerEnd="url(#arrow3)"
      />
      {seats.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={12} fill={i === 0 ? "#FFB800" : "#FFE7A0"} stroke="#7A2138" strokeWidth={1.5} />
      ))}
      <text x={160} y={104} fontSize="10" fill="#7A2138" textAnchor="middle" fontWeight="bold">
        по часовой
      </text>
      <text x={160} y={118} fontSize="10" fill="#7A2138" textAnchor="middle" fontWeight="bold">
        стрелке
      </text>
    </svg>
  );
}

const DIAGRAMS: Record<string, () => React.JSX.Element> = {
  "fifo-rotation": FifoRotation,
  "order-types-monitor": OrderTypesMonitor,
  "uhc-storage": UhcStorage,
  "grill-zones": GrillZones,
  "fryer-baskets": FryerBaskets,
  "menu-allergen-tag": MenuAllergenTag,
  "mentor-cycle": MentorCycle,
  "checklist-marks": ChecklistMarks,
  "program-timeline": ProgramTimeline,
  "appearance-common-rules": AppearanceCommonRules,
  "appearance-outfits": AppearanceOutfits,
  "table-serving-order": TableServingOrder,
};

export function Diagram({ name, caption }: { name: string; caption?: string }) {
  const Component = DIAGRAMS[name];
  if (!Component) return null;
  return (
    <figure className="my-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <Component />
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-neutral-500">{caption}</figcaption>
      )}
    </figure>
  );
}
