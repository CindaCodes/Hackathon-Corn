import type { ThemeMode } from "../hooks/useTheme";

interface HeroProps {
  theme: ThemeMode;
  nextTheme: ThemeMode;
  onToggleTheme: () => void;
}

const metrics = [
  { label: "Target states", value: "5" },
  { label: "EOS model RMSE", value: "4.1 bu/ac" },
  { label: "Foundation model", value: "Prithvi-100M" },
  { label: "USDA checkpoints", value: "4" },
];

export function Hero({ theme, nextTheme, onToggleTheme }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-top-row">
          <p className="eyebrow">USDA × NASA · 2026 Hackathon</p>
          <button
            type="button"
            className="secondary-button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} mode`}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <h1>Geospatial AI for Corn Yield Forecasting.</h1>
        <p className="lede">
          Bridging the gap between satellite imagery, climate data, and
          agricultural ground truth to deliver real-time, multi-stage yield
          predictions with a quantified cone of uncertainty.
        </p>

        <div className="project-meta">
          <span>TerraQuant</span>
          <span>HLS + NASS + SMAP fusion</span>
          <span>Quantile Regression Forest</span>
          <span>Updated Apr 24, 2026</span>
        </div>

        <div className="hero-actions">
          <button type="button" className="primary-button">
            View results
          </button>
          <button type="button" className="secondary-button">
            Read methodology
          </button>
        </div>

        <dl className="metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
