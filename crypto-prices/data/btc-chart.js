

const config = {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fill: true,

        // data = closing = day/record.ohlc.c
        data: [5, 20, 0, 81, 56, 85, 40],

        // width = high + low = day/record.ohlc.h + day/record.ohlc.l
        width: [5, 120, 15, 13, 12, 2, 19],

        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        pointRadius: 2
    },
      {
        label: "My Second dataset",
        fill: false,
        data: [80, 81, 56, 85, 40, 65, 20],
        width: [4, 5, 13, 12, 2, 19, 12],
        borderColor: "rgba(192,75,192,1)",
        backgroundColor: "rgba(192,75,192,0.4)",
        pointRadius: 0
    },
      {
        label: "My Third dataset",
        fill: true,
        data: [81, 56, 85, 40, 65, 20, 80],
        width: [5, 13, 12, 2, 19, 12, 4],
        borderColor: "rgba(192,102,75,1)",
        backgroundColor: "rgba(192,192,75,0.4)",
        pointRadius: 0
    }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 70000
        }
      }]
    }
  }
};

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, config);


/*
BACKUP
const chart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['red', 'green', 'blue'],
		datasets: [{
			label: '# of Votes',
			data: [12, 19, 3],
			backgroundColor: ['red', 'green', 'blue'],
			borderColor: ['red', 'green', 'blue'],
			borderWidth: 1
			}]
	},
	options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
});

*/