from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json, os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

OUTPUTS = "/notebooks/outputs"


def _read_json(filename: str):
    path = os.path.join(OUTPUTS, filename)
    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail=f"{filename} not found — run the notebook first.",
        )
    with open(path) as f:
        return json.load(f)


@app.get("/api/forecast")
def get_forecast():
    return _read_json("forecast_results.json")


@app.get("/api/cv")
def get_cv():
    return _read_json("cv_results.json")
