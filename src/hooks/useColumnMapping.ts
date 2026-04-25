import { useCallback, useEffect, useMemo, useState } from "react";

export interface ImportedDatasetPreview {
  fileName: string;
  rowCount: number;
  headers: string[];
  sampleRows: Array<Record<string, string>>;
}

const FIELD_ALIASES: Record<string, string[]> = {
  Program: ["program"],
  Year: ["year", "program year", "reference_period_desc"],
  "Geo Level": ["geo level", "level_desc"],
  State: ["state", "state_name", "state_alpha"],
  County: ["county", "county_name"],
  Commodity: ["commodity", "commodity_desc"],
  "Data Item": ["data item", "short_desc", "statisticcat_desc"],
  Value: ["value", "Value"],
  "CV (%)": ["cv (%)", "cv", "cv_percent"],
};

export const REQUIRED_MAPPING_COLUMNS = ["Year", "County", "Data Item", "Value"];

function getInitialColumnMapping(
  headers: string[],
  keyColumns: string[],
): Record<string, string> {
  const lowerToOriginal = new Map(
    headers.map((h) => [h.trim().toLowerCase(), h]),
  );
  const mapping: Record<string, string> = {};
  for (const target of keyColumns) {
    const aliases = FIELD_ALIASES[target] ?? [target.toLowerCase()];
    const match = aliases
      .map((alias) => lowerToOriginal.get(alias.toLowerCase()))
      .find(Boolean);
    mapping[target] = match ?? "";
  }
  return mapping;
}

export function useColumnMapping(
  importedDataset: ImportedDatasetPreview | null,
  keyColumns: string[],
) {
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});

  // Only reset mapping when the file's headers actually change, not on every render.
  // We stringify headers to get a stable comparison value.
  const headersKey = importedDataset?.headers.join("\0") ?? "";

  useEffect(() => {
    if (!importedDataset) {
      setColumnMapping({});
      return;
    }
    setColumnMapping(getInitialColumnMapping(importedDataset.headers, keyColumns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headersKey]);

  const updateMapping = useCallback((target: string, value: string) => {
    setColumnMapping((prev) => ({ ...prev, [target]: value }));
  }, []);

  const mappedCount = useMemo(
    () => keyColumns.filter((col) => (columnMapping[col] ?? "") !== "").length,
    [columnMapping, keyColumns],
  );

  const missingRequiredColumns = useMemo(
    () => REQUIRED_MAPPING_COLUMNS.filter((col) => (columnMapping[col] ?? "") === ""),
    [columnMapping],
  );

  const isMappingReady = missingRequiredColumns.length === 0;

  return {
    columnMapping,
    updateMapping,
    mappedCount,
    missingRequiredColumns,
    isMappingReady,
  };
}
