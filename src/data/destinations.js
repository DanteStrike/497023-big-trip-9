/** Класс представляет адаптер между сервером и приложением по доступным точкам назначения*/
class Destinations {
  constructor(data) {
    this._data = data;
  }

  //  Получить все точки назначения
  getNames() {
    return this._data.reduce((accum, destination) => {
      accum.push(destination.name);
      return accum;
    }, []);
  }

  //  Получить информацию по конкретной точке назначения
  getInfo(name) {
    return this._data.find((destination) => destination.name === name);
  }
}


export default Destinations;
