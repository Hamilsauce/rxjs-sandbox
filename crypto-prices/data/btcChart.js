const createChart = (chartType = 'pie') => {
  const labels = Object.keys(this.totals.data).map(_ => `${_[0].toUpperCase()}${_.slice(1)}`)
  const ctx = this.canvasElement.getContext('2d');
  const chart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: this.hoursPerDay.map(_ => `${_[0]} Hours`),
      datasets: [{
        label: 'Totals',
        data: this.hoursPerDay.map(_ => _[1]),
        backgroundColor: ['red', 'green', 'blue'],
        borderColor: ['red', 'green', 'blue'],
        borderWidth: 1
					}]
    },
    // options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
    options: {
      legend: {
        position: 'left'
      }
    }
  });
}