import { useTheme } from "./hooks/useTheme";
import { useDatasetImport } from "./hooks/useDatasetImport";
import { useColumnMapping } from "./hooks/useColumnMapping";
import { useForecast } from "./hooks/useForecast";
import { mockDashboard } from "./mockData";
import { Hero } from "./components/Hero";
import { PipelineSection } from "./components/PipelineSection";
import { DatasetCard } from "./components/DatasetCard";
import { MockDataSection } from "./components/MockDataSection";
import { ForecastChart } from "./components/ForecastChart";

function App() {
  const { theme, nextTheme, toggleTheme } = useTheme();
  const { importedDataset, importError, isImporting, inputKey, handleImport } =
    useDatasetImport();
  const {
    columnMapping,
    updateMapping,
    mappedCount,
    missingRequiredColumns,
    isMappingReady,
  } = useColumnMapping(importedDataset, mockDashboard.dataSource.keyColumns);
  const { forecast, cv } = useForecast();

  return (
    <main className="app-shell">
      <Hero
        theme={theme}
        nextTheme={nextTheme}
        onToggleTheme={toggleTheme}
        cv={cv}
        forecast={forecast}
      />

      <PipelineSection />

      {forecast && (
        <section className="content-grid">
          <article className="card accent-card">
            <p className="card-kicker">2025 Forecast</p>
            <h2>Corn Belt yield outlook.</h2>
            <p>
              Predicted end-of-season corn yields across 5 states with
              analog-year uncertainty bands. Cone narrows as the season
              progresses and the model gains confidence.
            </p>
          </article>
          <article className="card">
            <p className="card-kicker">Cone of uncertainty</p>
            <ForecastChart forecast={forecast} />
          </article>
        </section>
      )}

      <section className="mock-grid">
        <DatasetCard
          importedDataset={importedDataset}
          importError={importError}
          isImporting={isImporting}
          inputKey={inputKey}
          columnMapping={columnMapping}
          mappedCount={mappedCount}
          missingRequiredColumns={missingRequiredColumns}
          isMappingReady={isMappingReady}
          onImport={handleImport}
          onUpdateMapping={updateMapping}
        />

        <MockDataSection />
      </section>
    </main>
  );
}

export default App;
