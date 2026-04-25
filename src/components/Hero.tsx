import type { ThemeMode } from "../hooks/useTheme";
import { mockDashboard } from "../mockData";

interface HeroProps {
  theme: ThemeMode;
  nextTheme: ThemeMode;
  onToggleTheme: () => void;
}

export function Hero({ theme, nextTheme, onToggleTheme }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">USDA × NASA · 2026 Hackathon</p>
        <h1>Corn yield forecasting from space.</h1>
        <p className="lede">
          A geospatial ML pipeline fusing NASA Harmonized Landsat/Sentinel-2
          imagery with USDA NASS survey data to forecast corn-for-grain yields
          across the Corn Belt with a cone of uncertainty.
        </p>

        <div className="project-meta">
          <span>{mockDashboard.project.name}</span>
          <span>{mockDashboard.project.mode}</span>
          <span>{mockDashboard.project.updatedAt}</span>
        </div>

        <div className="hero-actions">
          <button type="button" className="primary-button">
            Run forecast
          </button>
          <button type="button" className="secondary-button">
            View methodology
          </button>
          <button
            type="button"
            className="secondary-button theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} mode`}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <dl className="metrics-grid">
          {mockDashboard.metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-panel">
        <div className="panel-header">
          <span>{mockDashboard.project.region}</span>
          <span className="panel-badge">Forecast ready</span>
        </div>

        <div className="map-card" aria-label="Corn Belt region preview">
          <div className="map-orbit map-orbit-one" />
          <div className="map-orbit map-orbit-two" />
          <div className="map-core">
            <span>{mockDashboard.project.region}</span>
            <strong>5 States</strong>
            <span className="map-placeholder-label">IA · CO · WI · MO · NE</span>
          </div>
        </div>

        <div className="signal-list">
          {mockDashboard.signals.map((signal) => (
            <div key={signal.label} className="signal-row">
              <span>{signal.label}</span>
              <strong className={`signal ${signal.tone}`}>
                {signal.value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
