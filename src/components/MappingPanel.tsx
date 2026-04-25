interface MappingPanelProps {
  keyColumns: string[];
  headers: string[];
  columnMapping: Record<string, string>;
  mappedCount: number;
  missingRequiredColumns: string[];
  isMappingReady: boolean;
  onUpdateMapping: (target: string, value: string) => void;
}

export function MappingPanel({
  keyColumns,
  headers,
  columnMapping,
  mappedCount,
  missingRequiredColumns,
  isMappingReady,
  onUpdateMapping,
}: MappingPanelProps) {
  return (
    <div className="mapping-panel">
      <div className="mapping-header">
        <h3>Column mapping</h3>
        <span>
          {mappedCount}/{keyColumns.length} mapped
        </span>
      </div>
      <p>
        Auto-mapped what it could. Review and adjust fields before using this
        file downstream.
      </p>

      {isMappingReady ? (
        <p className="mapping-status ok">
          Required fields are mapped. This file is ready for downstream
          analysis.
        </p>
      ) : (
        <p className="mapping-status warn">
          Missing required fields: {missingRequiredColumns.join(", ")}
        </p>
      )}

      <div className="mapping-grid">
        {keyColumns.map((targetColumn) => (
          <label key={targetColumn} className="mapping-row">
            <span>{targetColumn}</span>
            <select
              value={columnMapping[targetColumn] ?? ""}
              onChange={(e) => onUpdateMapping(targetColumn, e.target.value)}
            >
              <option value="">Not mapped</option>
              {headers.map((header) => (
                <option key={`${targetColumn}-${header}`} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
