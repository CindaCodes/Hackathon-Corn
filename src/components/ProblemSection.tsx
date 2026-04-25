const callouts = [
  {
    stat: "$140B+",
    label: "Annual US corn market value sensitive to yield estimate accuracy",
  },
  {
    stat: "↓ 30%",
    label: "Decline in voluntary USDA farmer survey response rates since 2012",
  },
  {
    stat: "4 dates",
    label: "USDA publishes estimates on Aug 1, Sep 1, Oct 1, and End of Season — each moves markets",
  },
];

export function ProblemSection() {
  return (
    <section className="problem-section">
      <div className="problem-text card">
        <p className="card-kicker">The problem</p>
        <h2>Inaccurate yield data acts like bad GPS for the global food economy.</h2>
        <p>
          Accurate crop yield forecasting is critical for global food security.
          When the USDA publishes an inaccurate yield estimate, it sends bad
          directions to the entire food economy — disrupting commodity pricing,
          supply chain logistics, and farmer livelihoods across the country.
        </p>
        <p>
          With voluntary survey response rates from farmers in long-term decline,
          there is an urgent need to supplement traditional surveys with
          automated, satellite-driven AI models that can observe crop conditions
          objectively and at scale.
        </p>
        <p>
          TerraQuant directly answers that need: a geospatial ML pipeline that
          fuses NASA satellite imagery, NOAA climate records, and USDA ground
          truth to produce county-level forecasts at each of the four official
          USDA crop-progress checkpoints.
        </p>
      </div>

      <div className="problem-callouts">
        {callouts.map((c) => (
          <div key={c.stat} className="callout-card card">
            <strong className="callout-stat">{c.stat}</strong>
            <p className="callout-label">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
