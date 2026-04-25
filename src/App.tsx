import { useTheme } from "./hooks/useTheme";
import { useDatasetImport } from "./hooks/useDatasetImport";
import { useColumnMapping } from "./hooks/useColumnMapping";
import { mockDashboard } from "./mockData";
import { Hero } from "./components/Hero";
import { PipelineSection } from "./components/PipelineSection";
import { DatasetCard } from "./components/DatasetCard";
import { MockDataSection } from "./components/MockDataSection";

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

  return (
    <main className="app-shell">
      <Hero
        theme={theme}
        nextTheme={nextTheme}
        onToggleTheme={toggleTheme}
      />

      <PipelineSection />

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
