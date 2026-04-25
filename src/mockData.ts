export type SignalTone = "good" | "warn" | "neutral";

export interface PipelineStep {
  title: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Signal {
  label: string;
  value: string;
  tone: SignalTone;
}

export interface DatasetMock {
  name: string;
  source: string;
  resolution: string;
  coverage: string;
  freshness: string;
}

export interface JobMock {
  id: string;
  name: string;
  status: "queued" | "running" | "review";
  eta: string;
  tags: string[];
}

export interface ExportPreset {
  format: string;
  description: string;
}

export interface ExternalDatasetSource {
  label: string;
  provider: string;
  url: string;
  rows: number;
  queryId: string;
  keyColumns: string[];
}

export const mockDashboard = {
  project: {
    name: "TerraQuant / Corn Yield Forecast",
    region: "Corn Belt",
    mode: "HLS + NASS fusion",
    updatedAt: "Apr 24, 2026 14:20 UTC",
  },
  dataSource: {
    label: "USDA NASS Quick Stats",
    provider: "USDA National Agricultural Statistics Service",
    url: "https://quickstats.nass.usda.gov/results/40B1D878-9E6C-30A2-88C4-7CDE7AD2FDE6",
    rows: 37504,
    queryId: "40B1D878-9E6C-30A2-88C4-7CDE7AD2FDE6",
    keyColumns: [
      "Program",
      "Year",
      "Geo Level",
      "State",
      "County",
      "Commodity",
      "Data Item",
      "Value",
      "CV (%)",
    ],
  } satisfies ExternalDatasetSource,
  metrics: [
    { label: "States monitored", value: "5" },
    { label: "Yield model RMSE", value: "4.1 bu/ac" },
    { label: "Counties analyzed", value: "485" },
    { label: "Season checkpoints", value: "4" },
  ] satisfies Metric[],
  signals: [
    { label: "NDVI trend (Aug 1)", value: "Above avg", tone: "good" },
    { label: "Precip. deviation", value: "−12%", tone: "warn" },
    { label: "Crop stress index", value: "Low", tone: "good" },
    { label: "Corn sweat (VPD)", value: "1.8 kPa", tone: "warn" },
  ] satisfies Signal[],
  pipelineSteps: [
    {
      title: "Fetch HLS imagery",
      description:
        "Pull Harmonized Landsat/Sentinel-2 tiles for Iowa, Colorado, Wisconsin, Missouri, and Nebraska at 30 m resolution.",
    },
    {
      title: "Compute vegetation indices",
      description:
        "Extract NDVI and EVI signals at four season checkpoints: Aug 1, Sep 1, Oct 1, and End-of-Season.",
    },
    {
      title: "Generate yield forecast",
      description:
        "Fuse satellite signals with historical NASS yields to produce county-level estimates with a cone of uncertainty.",
    },
  ] satisfies PipelineStep[],
  datasets: [
    {
      name: "USDA NASS Corn Yields",
      source: "Quick Stats API",
      resolution: "County-level",
      coverage: "5 target states",
      freshness: "2024 survey snapshot",
    },
    {
      name: "NASA HLS Sentinel-2",
      source: "NASA Earthdata",
      resolution: "30 m",
      coverage: "Corn Belt",
      freshness: "2–4 day global",
    },
    {
      name: "NOAA Weather Signals",
      source: "NOAA CDO",
      resolution: "County-level",
      coverage: "National",
      freshness: "Synced daily",
    },
  ] satisfies DatasetMock[],
  jobs: [
    {
      id: "JOB-201",
      name: "NDVI extraction",
      status: "running",
      eta: "03:14 remaining",
      tags: ["satellite", "priority"],
    },
    {
      id: "JOB-198",
      name: "Yield model inference",
      status: "review",
      eta: "Waiting for approval",
      tags: ["model", "gpu"],
    },
    {
      id: "JOB-197",
      name: "Uncertainty bands",
      status: "queued",
      eta: "Starts next",
      tags: ["forecast", "batch"],
    },
  ] satisfies JobMock[],
  exports: [
    { format: "GeoJSON", description: "State and county yield overlays with confidence bands" },
    { format: "CSV", description: "County-level estimates at each season checkpoint" },
    { format: "JSON", description: "Full cone of uncertainty data for visualization" },
  ] satisfies ExportPreset[],
};
