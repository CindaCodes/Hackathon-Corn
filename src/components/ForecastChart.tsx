import { useState } from "react";
import type { ForecastResults } from "../hooks/useForecast";

const STATES = ["Iowa", "Colorado", "Wisconsin", "Missouri", "Nebraska"];
const DATE_KEYS = ["aug1", "sep1", "oct1", "eos"];
const DATE_LABELS = ["Aug 1", "Sep 1", "Oct 1", "EOS"];

const W = 520;
const H = 240;
const PAD = { top: 28, right: 24, bottom: 44, left: 56 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

interface Props {
  forecast: ForecastResults;
}

export function ForecastChart({ forecast }: Props) {
  const [activeState, setActiveState] = useState("Iowa");
  const sr = forecast[activeState] ?? {};

  const preds = DATE_KEYS.map((d) => sr[d]?.predicted_yield ?? null);
  const lows  = DATE_KEYS.map((d) => sr[d]?.cone_low  ?? null);
  const highs = DATE_KEYS.map((d) => sr[d]?.cone_high ?? null);

  const all = [...preds, ...lows, ...highs].filter((v): v is number => v !== null);
  const raw_min = all.length ? Math.min(...all) : 100;
  const raw_max = all.length ? Math.max(...all) : 220;
  const span = raw_max - raw_min || 40;
  const yMin = Math.floor((raw_min - span * 0.12) / 5) * 5;
  const yMax = Math.ceil((raw_max + span * 0.12) / 5) * 5;

  const cx = (i: number) => PAD.left + (i / (DATE_KEYS.length - 1)) * CW;
  const cy = (v: number) => PAD.top + CH - ((v - yMin) / (yMax - yMin)) * CH;

  const conePoints = [
    ...DATE_KEYS.map((_, i) => highs[i] !== null ? `${cx(i)},${cy(highs[i]!)}` : "").filter(Boolean),
    ...[3, 2, 1, 0].map((i) => lows[i] !== null ? `${cx(i)},${cy(lows[i]!)}` : "").filter(Boolean),
  ].join(" ");

  const linePath = DATE_KEYS.reduce<string>((acc, _, i) => {
    if (preds[i] === null) return acc;
    const cmd = acc ? ` L` : "M";
    return acc + `${cmd}${cx(i)},${cy(preds[i]!)}`;
  }, "");

  const tickCount = 4;
  const yStep = (yMax - yMin) / tickCount;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.round(yMin + yStep * i),
  );

  const eosPred = sr["eos"]?.predicted_yield;
  const augWidth = sr["aug1"]?.cone_width;
  const eosWidth = sr["eos"]?.cone_width;
  const narrows = augWidth !== undefined && eosWidth !== undefined && eosWidth < augWidth;

  return (
    <div className="forecast-chart-wrap">
      <div className="forecast-state-tabs">
        {STATES.map((s) => (
          <button
            key={s}
            type="button"
            className={`state-tab${s === activeState ? " active" : ""}`}
            onClick={() => setActiveState(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="cone-svg"
        aria-label={`2025 yield forecast for ${activeState}`}
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left} y1={cy(tick)}
              x2={W - PAD.right} y2={cy(tick)}
              stroke="currentColor" strokeOpacity={0.1} strokeWidth={1}
            />
            <text
              x={PAD.left - 8} y={cy(tick)}
              textAnchor="end" dominantBaseline="middle"
              fontSize={10} fill="currentColor" opacity={0.55}
            >
              {tick}
            </text>
          </g>
        ))}

        {DATE_KEYS.map((_, i) => (
          <text
            key={i}
            x={cx(i)} y={H - 10}
            textAnchor="middle"
            fontSize={10} fill="currentColor" opacity={0.55}
          >
            {DATE_LABELS[i]}
          </text>
        ))}

        <text
          x={14} y={PAD.top + CH / 2}
          textAnchor="middle" fontSize={10}
          fill="currentColor" opacity={0.45}
          transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
        >
          bu / acre
        </text>

        {conePoints && (
          <polygon
            points={conePoints}
            fill="var(--accent)" fillOpacity={0.14}
          />
        )}

        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="var(--accent)" strokeWidth={2.5}
            strokeLinejoin="round" strokeLinecap="round"
          />
        )}

        {DATE_KEYS.map((_, i) =>
          preds[i] !== null ? (
            <g key={i}>
              <circle cx={cx(i)} cy={cy(preds[i]!)} r={4} fill="var(--accent)" />
              <text
                x={cx(i)} y={cy(preds[i]!) - 11}
                textAnchor="middle"
                fontSize={10} fill="var(--accent)" fontWeight={500}
              >
                {preds[i]!.toFixed(1)}
              </text>
            </g>
          ) : null,
        )}
      </svg>

      {eosPred !== undefined && (
        <div className="forecast-chart-footer">
          <span>
            EOS: <strong>{eosPred.toFixed(1)} bu/ac</strong>
          </span>
          {eosWidth !== undefined && (
            <span>
              Cone: <strong>±{(eosWidth / 2).toFixed(1)} bu/ac</strong>
            </span>
          )}
          {narrows && (
            <span className="forecast-narrows">Cone narrows</span>
          )}
        </div>
      )}
    </div>
  );
}
