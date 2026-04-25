export interface ParsedTable {
  headers: string[];
  rows: Array<Record<string, string>>;
}

function detectDelimiter(text: string): string {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const commaCount = (firstLine.match(/,/g) ?? []).length;
  const tabCount = (firstLine.match(/\t/g) ?? []).length;
  return tabCount > commaCount ? "\t" : ",";
}

function parseDelimitedText(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const nextChar = normalized[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      row.push(field.trim());
      field = "";
      continue;
    }

    if (!inQuotes && char === "\n") {
      row.push(field.trim());
      if (row.some((value) => value !== "")) {
        rows.push(row);
      }
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    if (row.some((value) => value !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

export function parseUsdaDelimitedFile(fileText: string): ParsedTable {
  const delimiter = detectDelimiter(fileText);
  const matrix = parseDelimitedText(fileText, delimiter);

  if (matrix.length < 2) {
    throw new Error("File did not include enough rows to parse.");
  }

  const headers = matrix[0].map(
    (header, index) => header || `Column ${index + 1}`,
  );
  const rows = matrix.slice(1).map((values) => {
    const mappedRow: Record<string, string> = {};
    headers.forEach((header, index) => {
      mappedRow[header] = values[index] ?? "";
    });
    return mappedRow;
  });

  return { headers, rows };
}
