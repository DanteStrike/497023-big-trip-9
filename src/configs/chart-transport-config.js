import ChartDataLabels from 'chartjs-plugin-datalabels';


export const chartTransportConfig = {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [],
    datasets: [{
      backgroundColor: `rgb(250, 250, 250)`,
      borderWidth: 0,
      data: []
    }]
  },
  options: {
    plugins: {
      datalabels: {
        color: `rgb(0, 0, 0)`,
        clamp: true,
        anchor: `end`,
        align: `left`,
        formatter(value) {
          return `${value}x`;
        }
      }
    },
    layout: {
      padding: {
        left: 28,
        right: 20,
        top: 0,
        bottom: 30
      }
    },

    legend: {
      display: false
    },

    tooltips: {
      callbacks: {
        label(tooltipItem) {
          return `${tooltipItem.xLabel}x`;
        }
      },
    },

    title: {
      display: true,
      text: `TRANSPORT`,
      position: `left`,
      color: `rgb(0, 0, 0)`,
      fontSize: `30`,
      fullWidth: true,
      padding: 20
    },

    scales: {
      xAxes: [{
        display: false,
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          padding: 5
        },
        barPercentage: 1,
        categoryPercentage: 0.8,
        gridLines: {
          display: false,
          drawBorder: false,
        }
      }]
    }
  }
};
