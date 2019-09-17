import {ChartType} from '../utils/enum.js';
import {chartContainerConfig} from '../configs/configs.js';
import {chartMoneyConfig} from '../configs/chart-money-config.js';
import {chartTimeConfig} from '../configs/chart-time-config.js';
import {chartTransportConfig} from '../configs/chart-transport-config.js';
import AbstractComponent from './abstract.js';
import Chart from 'chart.js';

//  Отключить автоматический подсчет размера холста графиков
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.responsive = false;

class Stats extends AbstractComponent {
  constructor() {
    super();

    this._moneyChartElement = this.getElement().querySelector(`.statistics__chart--money`);
    this._transportChartElement = this.getElement().querySelector(`.statistics__chart--transport`);
    this._timeChartElement = this.getElement().querySelector(`.statistics__chart--time`);
  }

  init() {
    this._moneyChart = new Chart(this._moneyChartElement, chartMoneyConfig);
    this._transportChart = new Chart(this._transportChartElement, chartTransportConfig);
    this._timeChart = new Chart(this._timeChartElement, chartTimeConfig);
    //  Для корректной перерисовки и масштабирования графиков все контейнеры canvas должны быть "relative"
    this.getElement().querySelectorAll(`.statistics__item`).forEach((item) => {
      item.style.position = `relative`;
    });
  }

  renderCharts() {
    //  При переключении на страницу статистики перерисовать графики под новый размер контейнеров (без анимации).
    this._moneyChart.resize(0);
    this._transportChart.resize(0);
    this._timeChart.resize(0);
  }

  updateChartData(type, {labels, values}) {
    //  Контроль высоты контейнера canvas. По возможности все bar всех графиков будут фиксированной высоты.
    let optimalChartContainerHeight = chartContainerConfig.rowHeight * labels.length;
    //  Высота контейнера canvas не может быть меньшие высоты названия графики, чтобы не вызывать размывание надписи.
    if (optimalChartContainerHeight < chartContainerConfig.minContainerHeight) {
      optimalChartContainerHeight = chartContainerConfig.minContainerHeight;
    }

    switch (type) {
      case ChartType.MONEY:
        this._moneyChartElement.parentNode.style.height = `${optimalChartContainerHeight}px`;
        this._updateData(this._moneyChart, labels, values);
        break;

      case ChartType.TRANSPORT:
        this._transportChartElement.parentNode.style.height = `${optimalChartContainerHeight}px`;
        this._updateData(this._transportChart, labels, values);
        break;

      case ChartType.TIME:
        this._timeChartElement.parentNode.style.height = `${optimalChartContainerHeight}px`;
        this._updateData(this._timeChart, labels, values);
        break;
    }
  }

  _updateData(chart, labels, values) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    //  Обновить данные (без анимации)
    chart.update(0);
    //  Масштабировать график под новый размер контейнера (без анимации)
    chart.resize(0);
  }

  _getTemplate() {
    return `<section class="statistics">
              <h2 class="visually-hidden">Trip statistics</h2>

              <div class="statistics__item statistics__item--money">
                <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
              </div>

              <div class="statistics__item statistics__item--transport">
                <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
              </div>

              <div class="statistics__item statistics__item--time-spend">
                <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
              </div>
            </section>`;
  }
}


export default Stats;
