import Chart from "chart.js/auto";

export function renderRadarChart(canvasEl, results, previousChart) {
  if (!canvasEl) return previousChart;

  const labels = results.map(r => r.label);
  const data = results.map(r => r.level);
  const ctx = canvasEl.getContext("2d");

  if (previousChart) previousChart.destroy();

  return new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: "Niveau",
          data,
          backgroundColor: "rgba(79,70,229,0.3)",
          borderColor: "#4f46e5",
          borderWidth: 2,
          pointBackgroundColor: "#4f46e5",
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            showLabelBackdrop: false
          },
          grid: {
            color: "rgba(148,163,184,0.4)"
          },
          angleLines: {
            color: "rgba(148,163,184,0.4)"
          },
          pointLabels: {
            font: { size: 11 },
            padding: 10
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => "Niveau " + ctx.parsed.r
          }
        }
      }
    }
  });
}
