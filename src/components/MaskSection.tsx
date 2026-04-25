import maskImg from "../assets/mask.png";

export function MaskSection() {
  return (
    <section className="mask-section">
      <article className="mask-card card">
        <div className="mask-card-body">
          <div className="mask-text">
            <p className="card-kicker">Step 01 — Deep dive</p>
            <h2>Isolating the Crop: Solving the "Mixed Pixel" Problem</h2>

            <div className="mask-block">
              <h3>The Challenge</h3>
              <p>
                When looking at satellite imagery, pixels are often "impure"
                because they capture a mixture of different land types — patches
                of corn mixed with bare soil, roads, weeds, or water. In remote
                sensing, this is known as the <em>mixed pixel problem</em>. A
                machine learning model fed this raw data learns from the noisy
                background rather than the actual crop.
              </p>
              <p>
                Furthermore, corn harvested early while still green for silage
                can look like a sudden crop failure from space, which completely
                skews historical yield training data.
              </p>
            </div>

            <div className="mask-block">
              <h3>Our Solution</h3>
              <p>
                To ensure the AI engine only evaluated the health of mature
                grain corn, we utilized the USDA's Cropland Data Layer (CDL) —
                a highly specialized, 30-meter resolution land cover dataset
                that accurately delineates specific crop types.
              </p>
            </div>

            <div className="mask-block">
              <h3>How It Works</h3>
              <p>
                As visualized in the map to the right, we used the CDL to
                generate a binary mask for our target states. By multiplying
                our satellite imagery by this mask, we excluded all non-corn
                pixels from the dataset. This preprocessing step eliminated
                background noise and guaranteed that our NDVI calculations
                strictly measured the canopy health of pure corn fields.
              </p>
            </div>
          </div>

          <figure className="mask-figure">
            <div className="mask-img-wrap">
              <img
                src={maskImg}
                alt="64x64 geospatial grid of Iowa showing corn mask: dark green pixels are corn fields, white pixels are excluded non-corn areas"
                className="mask-img"
              />
            </div>
            <figcaption>
              A 64×64 geospatial grid of Iowa (2022). Dark green pixels
              (<code>1</code>) represent isolated corn fields; white pixels
              (<code>0</code>) represent excluded non-corn areas including
              roads, water, and silage corn.
            </figcaption>
          </figure>
        </div>
      </article>
    </section>
  );
}
