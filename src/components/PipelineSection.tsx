const steps = [
  {
    index: "01",
    title: "Data Ingestion & Masking",
    tags: ["USDA QuickStats API", "Cropland Data Layer"],
    description:
      "We pulled historical state-level corn yields (2005–2024) via the USDA QuickStats API as ground truth. The USDA Cropland Data Layer (CDL) was used to mask out non-corn pixels — roads, water bodies, and early-harvested corn silage — ensuring the model trains only on true grain-corn fields.",
  },
  {
    index: "02",
    title: "Tracking the Growing Season",
    tags: ["NASA HLS", "NDVI", "AWS Open Data"],
    description:
      "Using Harmonized Landsat Sentinel-2 (HLS) multi-spectral imagery from the AWS Registry of Open Data, we calculated NDVI to track each crop's biophysical greenness curve — from emergence through peak tasseling (VT/R1 stage) and into senescence — at 30 m resolution across the Corn Belt.",
  },
  {
    index: "03",
    title: "Weather & Soil Integration",
    tags: ["NASA SMAP", "NOAA CDO", "Growing Degree Days"],
    description:
      "Because a healthy-looking crop can still fail under sudden drought, we integrated NASA SMAP root-zone soil moisture data and NOAA daily weather records — maximum and minimum temperature, precipitation — to calculate Growing Degree Days (GDD) and precipitation stress indices at each checkpoint.",
  },
  {
    index: "04",
    title: "AI Engine — Prithvi-100M",
    tags: ["IBM/NASA Prithvi-100M", "768-dim embeddings", "QRF"],
    description:
      "To process massive spatial data, we utilized the IBM/NASA Prithvi-100M geospatial foundation model to extract 768-dimensional embeddings of crop fields, directly answering NASA's call to improve agricultural classifications. A Quantile Regression Forest (QRF) then fuses these embeddings with climate features to produce calibrated yield estimates with uncertainty bands.",
  },
];

export function PipelineSection() {
  return (
    <section className="methodology-section">
      <div className="methodology-intro">
        <p className="card-kicker">Our methodology</p>
        <h2>From satellite pixels to yield forecasts in four steps.</h2>
        <p>
          A multi-source data fusion pipeline combining NASA imagery, NOAA
          climate records, and a 100M-parameter geospatial foundation model —
          calibrated against two decades of USDA survey data.
        </p>
      </div>

      <div className="methodology-steps">
        {steps.map((step) => (
          <article key={step.index} className="step-card card">
            <span className="step-card-index">{step.index}</span>
            <h3>{step.title}</h3>
            <div className="step-card-tags">
              {step.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
