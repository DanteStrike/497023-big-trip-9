import {Position, TimeValue, ChartType, Emoji} from '../utils/enum.js';
import {render, hideElement, showElement} from '../utils/dom.js';
import {transferTypes} from '../configs/configs.js';
import Stats from '../components/stats';


class StatsController {
  constructor(container) {
    this._container = container;
    this._stats = new Stats();
  }

  init() {
    this._stats.init();
    render(this._container, this._stats.getElement(), Position.BEFOREEND);
  }

  show() {
    showElement(this._stats.getElement());
    this._stats.renderCharts();
  }

  hide() {
    hideElement(this._stats.getElement());
  }

  update(points) {
    this._statsByTypes = points.reduce((accum, point) => {
      const foundedIndex = accum.findIndex((element) => element.label === point.type.name);
      if (foundedIndex !== -1) {
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
      if (foundedIndex !== -1) {
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
        element.timeSpend = Math.ceil(element.timeSpend / TimeValue.MILLISECONDS_IN_HOUR);
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
    const sortedByMoneySpend = this._statsByTypes.sort((a, b) => b.moneySpend - a.moneySpend);
    const chartMoneyLabels = sortedByMoneySpend.reduce((labels, stat) => {
      labels.push(`${Emoji[stat.label.replace(`-`, `_`).toUpperCase()]}  ${stat.label}`.toUpperCase());
      return labels;
    }, []);
    const chartMoneyData = sortedByMoneySpend.reduce((data, stat) => {
      data.push(stat.moneySpend);
      return data;
    }, []);
    this._stats.updateChartData(ChartType.MONEY, chartMoneyLabels, chartMoneyData);
  }

  _updateChartTransport() {
    const sortedByAmount = this._statsByTypes.sort((a, b) => b.amount - a.amount);
    const chartTransportLabels = sortedByAmount.reduce((labels, stat) => {
      if (transferTypes.has(stat.label)) {
        labels.push(`${Emoji[stat.label.toUpperCase()]}  ${stat.label}`.toUpperCase());
      }
      return labels;
    }, []);
    const chartTransportData = sortedByAmount.reduce((data, stat) => {
      if (transferTypes.has(stat.label)) {
        data.push(stat.amount);
      }
      return data;
    }, []);
    this._stats.updateChartData(ChartType.TRANSPORT, chartTransportLabels, chartTransportData);
  }

  _updateChartTime() {
    const sortedByTimeSpend = this._statsByDestinations.sort((a, b) => b.timeSpend - a.timeSpend);
    const chartTimeLabels = sortedByTimeSpend.reduce((labels, stat) => {
      labels.push(`${Emoji.FLAG}  ${stat.label}`.toUpperCase());
      return labels;
    }, []);
    const chartTimeData = sortedByTimeSpend.reduce((data, stat) => {
      data.push(stat.timeSpend);
      return data;
    }, []);
    this._stats.updateChartData(ChartType.TIME, chartTimeLabels, chartTimeData);
  }
}


export default StatsController;
