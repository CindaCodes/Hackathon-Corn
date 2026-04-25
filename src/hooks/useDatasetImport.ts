import { useCallback, useRef, useState } from "react";
import { parseUsdaDelimitedFile } from "../usdaImport";
import type { ImportedDatasetPreview } from "./useColumnMapping";

export function useDatasetImport() {
  const [importedDataset, setImportedDataset] =
    useState<ImportedDatasetPreview | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  // Changing this key forces the file input to remount and clear its value,
  // which is more reliable than mutating event.target.value directly.
  const [inputKey, setInputKey] = useState(0);

  const handleImport = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsImporting(true);
      setImportError(null);

      try {
        const text = await file.text();
        const parsed = parseUsdaDelimitedFile(text);
        setImportedDataset({
          fileName: file.name,
          rowCount: parsed.rows.length,
          headers: parsed.headers,
          sampleRows: parsed.rows.slice(0, 5),
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown parse error.";
        setImportedDataset(null);
        setImportError(`Could not parse file. ${message}`);
      } finally {
        setIsImporting(false);
        // Reset the input so the same file can be re-uploaded if needed.
        setInputKey((k) => k + 1);
      }
    },
    [],
  );

  return { importedDataset, importError, isImporting, inputKey, handleImport };
}
