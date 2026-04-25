import conePlot from "../assets/cone_plot.png";

export function ConeSection() {
  return (
    <section className="cone-section">
      <div className="cone-header">
        <p className="card-kicker">Forecast uncertainty</p>
        <h2>2025 Corn Yield Forecast — Cone of Uncertainty</h2>
        <p className="cone-lede">
          Quantile Regression Forest predictions across four USDA reporting
          checkpoints for five Corn Belt states, showing how forecast confidence
          tightens as the growing season unfolds.
        </p>
      </div>

      <div className="cone-img-bleed">
        <img
          src={conePlot}
          alt="Cone of uncertainty forecast charts for Iowa, Colorado, Wisconsin, Missouri, and Nebraska across four USDA checkpoints"
          className="cone-img-full"
        />
      </div>

      <div className="cone-explainer-grid">
        <div className="cone-explainer-card card">
          <span className="cone-explainer-icon">📅</span>
          <h3>Four USDA Checkpoints</h3>
          <p>
            The USDA mandates yield estimates at four fixed dates each season:
            August 1, September 1, October 1, and End of Season (EOS). Each
            dot on the line represents the model's point estimate for that
            checkpoint, giving decision-makers a consistent update cadence
            throughout the season.
          </p>
        </div>

        <div className="cone-explainer-card card">
          <span className="cone-explainer-icon">🔺</span>
          <h3>Reading the Cone</h3>
          <p>
            The shaded band is a <strong>90% prediction interval</strong> — the
            range within which the true yield is expected to fall nine times out
            of ten. The cone is widest in August, when most of the season's
            weather is still unknown, and narrows as observed conditions replace
            simulated scenarios each month.
          </p>
        </div>

        <div className="cone-explainer-card card">
          <span className="cone-explainer-icon">🌦️</span>
          <h3>Why Uncertainty Shrinks</h3>
          <p>
            Early forecasts rely on probabilistic weather simulations across
            many possible futures. As the season progresses, actual rainfall and
            temperature data locks in, eliminating unlikely scenarios. By EOS,
            the cone collapses to a narrow range — the model has seen the full
            growing season.
          </p>
        </div>

        <div className="cone-explainer-card card">
          <span className="cone-explainer-icon">📍</span>
          <h3>State Highlights</h3>
          <p>
            <strong>Iowa</strong> leads at 212 bu/acre — prime Corn Belt
            conditions with consistent moisture. <strong>Nebraska</strong>{" "}
            follows at 195 bu/acre. <strong>Colorado</strong> sits lowest at
            123 bu/acre, reflecting its drier, semi-arid climate and lower
            historical baseline. Interval widths also vary by state, tracking
            each region's weather variability.
          </p>
        </div>
      </div>
    </section>
  );
}
