import choropleth from "../assets/choropleth.png";
import shapBar from "../assets/shap_bar.png";
import shapBeeswarm from "../assets/shap_beeswarm.png";

const statePredictions = [
  { state: "Iowa", abbr: "IA", value: 212.0, tone: "good" },
  { state: "Nebraska", abbr: "NE", value: 195.0, tone: "good" },
  { state: "Wisconsin", abbr: "WI", value: 182.0, tone: "good" },
  { state: "Missouri", abbr: "MO", value: 181.0, tone: "good" },
  { state: "Colorado", abbr: "CO", value: 123.0, tone: "warn" },
];

export function VisualizationsSection() {
  return (
    <section className="results-section">
      <div className="results-intro">
        <p className="card-kicker">Results dashboard</p>
        <h2>2025 Corn Yield Forecast — Model Outputs.</h2>
        <p>
          Pre-computed results from the TerraQuant pipeline. Three panels cover
          temporal uncertainty, state-level spatial predictions, and model
          explainability via SHAP analysis.
        </p>
      </div>

      {/* Panel B — Choropleth */}
      <div className="results-panel panel-map card">
        <div className="panel-label-row">
          <p className="card-kicker">Panel A</p>
          <span className="panel-badge">End of Season · bu/acre</span>
        </div>
        <div className="panel-map-body">
          <div className="panel-img-wrap panel-img-wrap--map">
            <img
              src={choropleth}
              alt="Choropleth map of predicted 2025 EOS corn yield by state"
              className="panel-img"
            />
          </div>
          <div className="panel-text">
            <h3>2025 State-by-State Predictions</h3>
            <p>
              Our model generated end-of-season yield predictions for each of
              the five target states. Iowa leads at 212.0 bu/acre, while
              Colorado's drier climate and lower average yields are reflected
              in its 123.0 bu/acre estimate.
            </p>
            <table className="state-table" aria-label="2025 EOS yield predictions by state">
              <caption className="sr-only">Predicted 2025 end-of-season corn yield in bushels per acre for five Corn Belt states</caption>
              <thead>
                <tr>
                  <th>State</th>
                  <th>EOS Yield (bu/ac)</th>
                  <th>vs. 5-yr avg</th>
                </tr>
              </thead>
              <tbody>
                {statePredictions.map((s) => (
                  <tr key={s.state}>
                    <td><span className="state-abbr">{s.abbr}</span> {s.state}</td>
                    <td className={`state-value signal ${s.tone}`}>{s.value.toFixed(1)}</td>
                    <td className="state-trend">{s.tone === "good" ? "↑ Above" : "↓ Below"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Panel C — SHAP */}
      <div className="results-panel panel-shap card">
        <div className="panel-label-row">
          <p className="card-kicker">Panel B</p>
          <span className="panel-badge">SHAP Explainability</span>
        </div>
        <h3 className="panel-shap-title">What Drives the Model — Feature Importance</h3>
        <p className="panel-shap-desc">
          To ensure TerraQuant is not a "black box," we ran SHAP (SHapley
          Additive exPlanations) analysis on the EOS Yield Model. The results
          prove that environmental stressors dominate: precipitation standard
          deviation (<code>precip_std</code>), mean minimum temperature, and
          total precipitation lead the ranking. These are closely followed by
          high-dimensional spatial features extracted from the Prithvi-100M
          foundation model (<code>emb_578</code>, <code>emb_692</code>).
        </p>
        <div className="shap-grid">
          <figure className="shap-figure">
            <img
              src={shapBar}
              alt="SHAP bar chart ranking feature importance for the EOS yield model"
              className="panel-img"
            />
            <figcaption>
              <strong>Feature Importance (SHAP bar)</strong> — Mean absolute
              SHAP values. Higher = more impact on final yield estimate.
            </figcaption>
          </figure>
          <figure className="shap-figure">
            <img
              src={shapBeeswarm}
              alt="SHAP beeswarm plot showing direction and magnitude of feature impact per county"
              className="panel-img"
            />
            <figcaption>
              <strong>Impact Direction (SHAP beeswarm)</strong> — Each dot is
              one county. Color encodes raw feature value: blue = low, red =
              high. Left = pushes yield down, right = pushes yield up.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
