

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
