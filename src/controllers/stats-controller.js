import {Position, TimeValue, ChartType, Emoji, NOT_FOUND} from '../utils/enum.js';
import {render, hideElement, showElement} from '../utils/dom.js';
import {transferTypes} from '../configs/configs.js';
import Stats from '../components/stats';

/** Класс представляет управление над страницей статистики*/
class StatsController {
  constructor(container) {
    this._container = container;
    this._page = new Stats();
  }

  init() {
    this._page.init();
    render(this._container, this._page.getElement(), Position.BEFOREEND);
  }

  show() {
    showElement(this._page.getElement());
    this._page.renderCharts();
  }

  hide() {
    hideElement(this._page.getElement());
  }

  update(points) {
    this._statsByTypes = points.reduce((accum, point) => {
      const foundedIndex = accum.findIndex((element) => element.label === point.type.name);
      if (foundedIndex !== NOT_FOUND) {
        accum[foundedIndex].moneySpend += point.basePrice;
        accum[foundedIndex].amount++;
      } else {
        accum.push({
          label: point.type.name,
          moneySpend: point.basePrice,
          amount: 1
        });
      }
      return accum;
    }, []);

    this._statsByDestinations = points.reduce((accum, point) => {
      const foundedIndex = accum.findIndex((element) => element.label === point.destination.name);
      if (foundedIndex !== NOT_FOUND) {
        accum[foundedIndex].timeSpend += point.time.end - point.time.start;
      } else {
        accum.push({
          label: point.destination.name,
          timeSpend: point.time.end - point.time.start,
        });
      }
      return accum;
    }, [])
      .map((element) => {
        element.timeSpend = Number((element.timeSpend / TimeValue.MILLISECONDS_IN_HOUR).toFixed(1));
        return element;
      });

    this._updateChartsData();
  }

  _updateChartsData() {
    this._updateChartMoney();
    this._updateChartTransport();
    this._updateChartTime();
  }

  _updateChartMoney() {
    const sortedByMoneySpendStats = this._statsByTypes.sort((a, b) => b.moneySpend - a.moneySpend);
    const chartMoneyDataset = sortedByMoneySpendStats.reduce((dataset, stat) => {
      //  Привести ключ для Emoji в корректный вид: check-in соответствует эмоджи Emoji[CHECK_IN].
      dataset.labels.push(`${Emoji[stat.label.replace(`-`, `_`).toUpperCase()]}  ${stat.label}`.toUpperCase());
      dataset.values.push(stat.moneySpend);
      return dataset;
    }, {
      labels: [],
      values: []
    });
    this._page.updateChartData(ChartType.MONEY, chartMoneyDataset);
  }

  _updateChartTransport() {
    const sortedByAmountStats = this._statsByTypes.sort((a, b) => b.amount - a.amount);
    const chartTransportDataset = sortedByAmountStats.reduce((dataset, stat) => {
      if (transferTypes.has(stat.label)) {
        dataset.labels.push(`${Emoji[stat.label.toUpperCase()]}  ${stat.label}`.toUpperCase());
        dataset.values.push(stat.amount);
      }
      return dataset;
    }, {
      labels: [],
      values: []
    });
    this._page.updateChartData(ChartType.TRANSPORT, chartTransportDataset);
  }

  _updateChartTime() {
    const sortedByTimeSpend = this._statsByDestinations.sort((a, b) => b.timeSpend - a.timeSpend);
    const chartTimeDataset = sortedByTimeSpend.reduce((dataset, stat) => {
      dataset.labels.push(`${Emoji.FLAG}  ${stat.label}`.toUpperCase());
      dataset.values.push(stat.timeSpend);
      return dataset;
    }, {
      labels: [],
      values: []
    });
    this._page.updateChartData(ChartType.TIME, chartTimeDataset);
  }
}


export default StatsController;
