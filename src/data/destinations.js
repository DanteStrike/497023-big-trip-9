class Destinations {
  constructor(data) {
    this._data = data;
  }

  getNames() {
    return this._data.reduce((accum, destination) => accum.push(destination.name), []);
  }

  getInfo(name) {
    return this._data.find((destination) => destination.name === name);
  }
}


export default Destinations;
