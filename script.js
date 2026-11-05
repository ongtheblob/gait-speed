<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gait Speed Calculator</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f0f4f8;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 1.6rem;
      color: #1a202c;
      margin-bottom: 6px;
    }

    .subtitle {
      font-size: 0.9rem;
      color: #718096;
      margin-bottom: 28px;
    }

    .input-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 6px;
    }

    input[type="number"] {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid #cbd5e0;
      border-radius: 8px;
      font-size: 1rem;
      color: #2d3748;
      transition: border-color 0.2s;
      outline: none;
    }

    input[type="number"]:focus {
      border-color: #4299e1;
    }

    .speed-hint {
      font-size: 0.78rem;
      color: #a0aec0;
      margin-top: 4px;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #4299e1;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
      transition: background 0.2s;
    }

    button:hover {
      background: #3182ce;
    }

    .reset-btn {
      background: #e2e8f0;
      color: #4a5568;
      margin-top: 10px;
    }

    .reset-btn:hover {
      background: #cbd5e0;
    }

    .results {
      margin-top: 28px;
      background: #ebf8ff;
      border-radius: 12px;
      padding: 20px;
      display: none;
    }

    .results h2 {
      font-size: 1rem;
      color: #2b6cb0;
      margin-bottom: 14px;
    }

    .result-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: #2d3748;
      padding: 6px 0;
      border-bottom: 1px solid #bee3f8;
    }

    .result-row:last-child {
      border-bottom: none;
    }

    .result-row.average {
      font-weight: 700;
      font-size: 1rem;
      color: #2b6cb0;
      padding-top: 12px;
    }

    .error {
      color: #e53e3e;
      font-size: 0.85rem;
      margin-top: 10px;
      display: none;
    }

    .interpretation {
      margin-top: 14px;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .interp-normal  { background: #c6f6d5; color: #276749; }
    .interp-caution { background: #fefcbf; color: #744210; }
    .interp-risk    { background: #fed7d7; color: #9b2c2c; }
  </style>
</head>
<body>

<div class="card">
  <h1>Gait Speed Calculator</h1>
  <p class="subtitle">Enter 3 timed trials over a 6-metre walk. Speed = 6 ÷ time (m/s).</p>

  <div class="input-group">
    <label for="t1">Trial 1 — Time (seconds)</label>
    <input type="number" id="t1" placeholder="e.g. 5.2" min="0.1" step="0.01" />
  </div>

  <div class="input-group">
    <label for="t2">Trial 2 — Time (seconds)</label>
    <input type="number" id="t2" placeholder="e.g. 5.4" min="0.1" step="0.01" />
  </div>

  <div class="input-group">
    <label for="t3">Trial 3 — Time (seconds)</label>
    <input type="number" id="t3" placeholder="e.g. 5.1" min="0.1" step="0.01" />
  </div>

  <p class="error" id="error-msg">⚠ Please enter valid positive values for all 3 trials.</p>

  <button onclick="calculate()">Calculate</button>
  <button class="reset-btn" onclick="reset()">Reset</button>

  <div class="results" id="results">
    <h2>Results</h2>
    <div class="result-row">
      <span>Trial 1 Speed</span>
      <span id="s1">—</span>
    </div>
    <div class="result-row">
      <span>Trial 2 Speed</span>
      <span id="s2">—</span>
    </div>
    <div class="result-row">
      <span>Trial 3 Speed</span>
      <span id="s3">—</span>
    </div>
    <div class="result-row average">
      <span>Average Gait Speed</span>
      <span id="avg">—</span>
    </div>
    <div class="interpretation" id="interpretation"></div>
  </div>
</div>

<script>
  function calculate() {
    const errorMsg = document.getElementById('error-msg');
    const resultsDiv = document.getElementById('results');

    const t1 = parseFloat(document.getElementById('t1').value);
    const t2 = parseFloat(document.getElementById('t2').value);
    const t3 = parseFloat(document.getElementById('t3').value);

    // Validate inputs
    if (isNaN(t1) || isNaN(t2) || isNaN(t3) || t1 <= 0 || t2 <= 0 || t3 <= 0) {
      errorMsg.style.display = 'block';
      resultsDiv.style.display = 'none';
      return;
    }

    errorMsg.style.display = 'none';

    const s1 = 6 / t1;
    const s2 = 6 / t2;
    const s3 = 6 / t3;
    const avg = (s1 + s2 + s3) / 3;

    document.getElementById('s1').textContent = s1.toFixed(3) + ' m/s';
    document.getElementById('s2').textContent = s2.toFixed(3) + ' m/s';
    document.getElementById('s3').textContent = s3.toFixed(3) + ' m/s';
    document.getElementById('avg').textContent = avg.toFixed(3) + ' m/s';

    // Clinical interpretation (common thresholds)
    const interpEl = document.getElementById('interpretation');
    if (avg >= 1.0) {
      interpEl.textContent = '✅ Normal gait speed (≥ 1.0 m/s)';
      interpEl.className = 'interpretation interp-normal';
    } else if (avg >= 0.6) {
      interpEl.textContent = '⚠️ Reduced gait speed (0.6–0.99 m/s) — monitor closely';
      interpEl.className = 'interpretation interp-caution';
    } else {
      interpEl.textContent = '🔴 Low gait speed (< 0.6 m/s) — elevated fall/frailty risk';
      interpEl.className = 'interpretation interp-risk';
    }

    resultsDiv.style.display = 'block';
  }

  function reset() {
    ['t1', 't2', 't3'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('results').style.display = 'none';
    document.getElementById('error-msg').style.display = 'none';
  }
</script>

</body>
</html>
