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
      >
        Open USDA Quick Stats result
      </a>

      <div className="source-columns">
        {displayedColumns.map((column) => (
          <span key={column} className="tag-pill">
            {column}
          </span>
        ))}
      </div>

      <div className="import-panel">
        <label className="upload-label" htmlFor="usda-upload">
          Import USDA Spreadsheet Export (CSV/TSV)
        </label>
        <input
          key={inputKey}
          id="usda-upload"
          className="upload-input"
          type="file"
          accept=".csv,.tsv,.txt"
          onChange={onImport}
        />

        {importError ? (
          <p className="import-error">{importError}</p>
        ) : isImporting ? (
          <p className="import-note import-note--loading">Parsing file…</p>
        ) : importedDataset ? (
          <p className="import-note">
            Loaded {importedDataset.fileName} with{" "}
            {importedDataset.rowCount.toLocaleString()} rows.
          </p>
        ) : (
          <p className="import-note">
            No local file loaded yet. Upload an exported Quick Stats file to
            preview columns.
          </p>
        )}
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
            <table className="preview-table">
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
