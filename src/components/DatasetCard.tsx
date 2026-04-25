import { mockDashboard } from "../mockData";
import { MappingPanel } from "./MappingPanel";
import type { ImportedDatasetPreview } from "../hooks/useColumnMapping";

interface DatasetCardProps {
  importedDataset: ImportedDatasetPreview | null;
  importError: string | null;
  isImporting: boolean;
  inputKey: number;
  columnMapping: Record<string, string>;
  mappedCount: number;
  missingRequiredColumns: string[];
  isMappingReady: boolean;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateMapping: (target: string, value: string) => void;
}

export function DatasetCard({
  importedDataset,
  importError,
  isImporting,
  inputKey,
  columnMapping,
  mappedCount,
  missingRequiredColumns,
  isMappingReady,
  onImport,
  onUpdateMapping,
}: DatasetCardProps) {
  const displayedRows = importedDataset?.rowCount ?? mockDashboard.dataSource.rows;
  const displayedColumns =
    importedDataset?.headers.slice(0, 12) ?? mockDashboard.dataSource.keyColumns;

  return (
    <article className="card mock-card mock-card-wide">
      <p className="card-kicker">Dataset source</p>
      <h2>{mockDashboard.dataSource.label}</h2>

      <div className="source-meta">
        <span>{mockDashboard.dataSource.provider}</span>
        <span>{displayedRows.toLocaleString()} rows</span>
        <span>Query ID {mockDashboard.dataSource.queryId}</span>
      </div>

      <a
        className="dataset-link"
        href={mockDashboard.dataSource.url}
        target="_blank"
        rel="noreferrer"
        aria-label="Open USDA Quick Stats result (opens in new tab)"
      >
        Open USDA Quick Stats result ↗
      </a>

      <div className="source-columns">
        {displayedColumns.map((column) => (
          <span key={column} className="tag-pill">
            {column}
          </span>
        ))}
      </div>

      {importedDataset && (
        <div className="import-results">
          <MappingPanel
            keyColumns={mockDashboard.dataSource.keyColumns}
            headers={importedDataset.headers}
            columnMapping={columnMapping}
            mappedCount={mappedCount}
            missingRequiredColumns={missingRequiredColumns}
            isMappingReady={isMappingReady}
            onUpdateMapping={onUpdateMapping}
          />

          <div className="table-wrap">
            <table className="preview-table" aria-label="Preview of imported dataset">
              <caption className="sr-only">First {importedDataset.sampleRows.length} rows of uploaded CSV, showing {importedDataset.headers.slice(0, 6).length} columns</caption>
              <thead>
                <tr>
                  {importedDataset.headers.slice(0, 6).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {importedDataset.sampleRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {importedDataset.headers.slice(0, 6).map((header) => (
                      <td key={`${rowIndex}-${header}`}>{row[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </article>
  );
}
