import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ScanEntry {
  /** Unix timestamp in milliseconds */
  timestamp: number;
  balance: string;
  lastTransaction: string;
}

const STORAGE_KEY = "scanHistory";
const MAX_ENTRIES = 50;

const isScanEntry = (value: unknown): value is ScanEntry => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.timestamp === "number" &&
    Number.isFinite(entry.timestamp) &&
    typeof entry.balance === "string" &&
    typeof entry.lastTransaction === "string"
  );
};

export const getHistory = async (): Promise<ScanEntry[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    // Drop malformed entries (corruption, older formats) so rendering is safe
    return parsed.filter(isScanEntry).slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
};

/**
 * Persists a scan result. Newest entry first, capped at MAX_ENTRIES.
 * Skips the entry if it matches the most recent one (same balance scanned
 * again within a minute) to keep the history meaningful.
 */
export const addScan = async (entry: Omit<ScanEntry, "timestamp">): Promise<ScanEntry[]> => {
  const history = await getHistory();
  const latest = history[0];

  const isDuplicate =
    latest &&
    latest.balance === entry.balance &&
    Date.now() - latest.timestamp < 60_000;

  if (isDuplicate) {
    return history;
  }

  const updated: ScanEntry[] = [
    { ...entry, timestamp: Date.now() },
    ...history,
  ].slice(0, MAX_ENTRIES);

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Persisting history must never break the scan flow
  }
  return updated;
};

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
