import { useEffect, useState } from "react";

export interface ForecastDateResult {
  predicted_yield: number;
  cone_low: number;
  cone_high: number;
  cone_width: number;
  analog_years: number[];
  analog_yields: number[];
}

export type ForecastResults = Record<string, Record<string, ForecastDateResult>>;

export interface CvResults {
  aug1: { mae: number; rmse: number };
  sep1: { mae: number; rmse: number };
  oct1: { mae: number; rmse: number };
  eos:  { mae: number; rmse: number };
}

interface ForecastState {
  forecast: ForecastResults | null;
  cv: CvResults | null;
  isLoading: boolean;
}

export function useForecast(): ForecastState {
  const [state, setState] = useState<ForecastState>({
    forecast: null,
    cv: null,
    isLoading: true,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/forecast").then((r) => {
        if (!r.ok) throw new Error("forecast unavailable");
        return r.json();
      }),
      fetch("/api/cv").then((r) => {
        if (!r.ok) throw new Error("cv unavailable");
        return r.json();
      }),
    ])
      .then(([forecast, cv]) => setState({ forecast, cv, isLoading: false }))
      .catch(() => setState({ forecast: null, cv: null, isLoading: false }));
  }, []);

  return state;
}
