import { mockDashboard } from "../mockData";

export function PipelineSection() {
  return (
    <section className="content-grid">
      <article className="card accent-card">
        <p className="card-kicker">Workflow</p>
        <h2>From satellite pixels to yield forecasts.</h2>
        <p>
          We fuse NASA HLS imagery with historical NASS survey data to generate
          county-level corn yield estimates with uncertainty bands at four key
          season checkpoints.
        </p>
      </article>

      <article className="card steps-card">
        <p className="card-kicker">Pipeline</p>
        <div className="steps">
          {mockDashboard.pipelineSteps.map((step, index) => (
            <div key={step.title} className="step-row">
              <span className="step-index">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
