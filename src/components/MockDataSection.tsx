import { mockDashboard } from "../mockData";

export function MockDataSection() {
  return (
    <>
      <article className="card mock-card">
        <p className="card-kicker">Input datasets</p>
        <h2>Satellite and survey data driving the forecast.</h2>
        <div className="mock-list">
          {mockDashboard.datasets.map((dataset) => (
            <div key={dataset.name} className="mock-row">
              <div>
                <strong>{dataset.name}</strong>
                <p>{dataset.source}</p>
              </div>
              <div className="mock-row-meta">
                <span>{dataset.resolution}</span>
                <span>{dataset.coverage}</span>
                <span>{dataset.freshness}</span>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="card mock-card">
        <p className="card-kicker">Analysis pipeline</p>
        <h2>Active inference jobs across the Corn Belt.</h2>
        <div className="mock-list">
          {mockDashboard.jobs.map((job) => (
            <div key={job.id} className="mock-row">
              <div>
                <strong>
                  {job.id} · {job.name}
                </strong>
                <p>{job.eta}</p>
              </div>
              <div className="mock-tags">
                <span className={`status-pill ${job.status}`}>
                  {job.status}
                </span>
                {job.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="card mock-card mock-card-wide">
        <p className="card-kicker">Output formats</p>
        <h2>Forecast outputs ready for review and handoff.</h2>
        <div className="export-grid">
          {mockDashboard.exports.map((item) => (
            <div key={item.format} className="export-item">
              <strong>{item.format}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
