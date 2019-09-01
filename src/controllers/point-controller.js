import Event from '../components/event.js';
import EditEvent from '../components/event-edit.js';
import {render, Position, shallowCopyObjsArray} from '../utils/utils.js';
import {destinationsData} from '../data/destination-data.js';


class PointController {
  constructor(container, eventData, onChangeView, onDataChange) {
    this._listNode = container;
    this._data = eventData;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.init();
  }

  init() {
    this._createNewPointView();
    render(this._listNode, this._pointView.getElement(), Position.BEFOREEND);
  }

  _createNewPointView() {
    this._pointView = new Event(this._data);
    this._pointView.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => this._onPointViewRollupBtnClick());
  }

  // _updatePointData(data) {
  //   let newData = Object.assign({}, this._data);
  //   for (const key in data) {
  //     if (newData.hasOwnProperty(key)) {
  //       newData[key] = data[key];
  //     }
  //   }

  //   //  Обновить данные в коллекции карточек "листа"
  //   this._onDataChange(this._data, newData);
  //   //  this._data = newData;
  // }

  _onPointViewRollupBtnClick() {
    this._pointEdit = new EditEvent(this._data);
    this._onChangeView();
    this._listNode.replaceChild(this._pointEdit.getElement(), this._pointView.getElement());

    const onPointEditRollupBtnClick = () => {
      this._listNode.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      // this._pointEdit = null;
    };

    this._pointEdit.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onPointEditRollupBtnClick);

    const onPointEditFormSubmit = (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._pointEdit.getElement().querySelector(`form.event`));
      const newDestination = formData.get(`event-destination`);
      const entry = {
        type: formData.get(`event-type`),
        destination: newDestination,
        description: destinationsData[newDestination].description,
        time: {
          start: new Date(formData.get(`event-start-time`)).valueOf(),
          end: new Date(formData.get(`event-end-time`)).valueOf()
        },
        offers: shallowCopyObjsArray(destinationsData[newDestination].offers)
          .map((offer, index) => {
            offer.isActive = formData.get(`event-offer-luggage-${index}`) ? true : false;
            return offer;
          }),
        price: formData.get(`event-price`),
        photos: destinationsData[newDestination].photos,
        isFavorite: formData.get(`event-favorite`) ? true : false
      };

      this._onDataChange(this._data, entry);

      // this._updatePointData(entry);
      // this._createNewPointView();

      // this._listNode.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
      // this._pointEdit = null;
    };

    this._onEscKeyDown = (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        this._listNode.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      }
    };

    this._pointEdit.getElement().querySelector(`form`)
      .addEventListener(`submit`, onPointEditFormSubmit);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (!this._pointEdit) {
      return;
    }

    if (this._listNode.contains(this._pointEdit.getElement())) {
      this._listNode.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}


export default PointController;

