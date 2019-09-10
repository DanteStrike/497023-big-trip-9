class Offers {
  constructor(data) {
    this._data = data;
  }

  getTypeOffers(type) {
    return this._data.find((offer) => offer.type === type);
  }
}


export default Offers;
