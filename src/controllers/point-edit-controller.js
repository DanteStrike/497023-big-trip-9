import {Mode, Key, Action} from '../utils/enum.js';
import PointEditView from '../components/point-edit-view.js';


class PointEditController {
  constructor(data, destinations, offers, mode, onEditClose, onEditSave) {
    this._data = data;
    this._mode = mode;

    this._destinations = destinations;
    this._offers = offers;

    this._onEditClose = onEditClose;
    this._onEditSave = onEditSave;

    //  От потери окружения. Сохраняем событие, чтобы потом корректно удалить.
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    //  Обратная связь с формой редактирования при изменении пункта назначения
    this._onDestinationChange = this._onDestinationChange.bind(this);
    //  Обратная связь с формой редактирования при изменении типа точки
    this._isTypeChange = false;
    this._onTypeChange = this._onTypeChange.bind(this);
  }

  getPointEditElement() {
    return this._pointEdit.getElement();
  }

  init() {
    this._pointEdit = new PointEditView(this._data, this._destinations.getNames(), this._mode, this._onDestinationChange, this._onTypeChange);
    this._formElement = (this._mode === Mode.ADDING) ? this._pointEdit.getElement() : this._pointEdit.getElement().querySelector(`form`);
    this._rollupButtonElement = this._formElement.querySelector(`.event__rollup-btn`);
    this._hangHandlers();
  }

  removeOnEscKeyDown() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  //  При изменении типа точки менять предложения
  _onTypeChange(newType) {
    this._isTypeChange = true;
    return this._offers.getTypeOffers(newType);
  }

  //  При изменении пункты назначения загружать новые данные
  _onDestinationChange(newDestination) {
    return this._destinations.getInfo(newDestination);
  }

  _update(data) {
    const formData = new FormData(this._formElement);
    const typeData = this._offers.getTypeOffers(formData.get(`event-type`));
    const offers = this._isTypeChange ? typeData.offers : this._data.offers;

    data.type = typeData.type;
    data.destination = this._destinations.getInfo(formData.get(`event-destination`));
    data.time = {
      start: new Date(formData.get(`event-start-time`)).valueOf(),
      end: new Date(formData.get(`event-end-time`)).valueOf()
    };
    data.basePrice = Number(formData.get(`event-price`));
    data.offers = offers.map((offer, index) => {
      offer.accepted = formData.get(`event-offer-${index}`) ? true : false;
      return offer;
    });
    data.isFavorite = Boolean(formData.get(`event-favorite`));

    return data;
  }

  _hangHandlers() {
    this._formElement.addEventListener(`submit`, (evt) => this._onSubmit(evt));
    this._formElement.addEventListener(`reset`, (evt) => this._onReset(evt));

    if (this._mode === Mode.DEFAULT) {
      this._rollupButtonElement.addEventListener(`click`, () => this._onRollupBtnClick());
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onEscKeyDown(evt) {
    if (evt.key === Key.IE_ESC || evt.key === Key.ESCAPE) {
      this._onEditClose();
      this.removeOnEscKeyDown();
    }
  }

  _onRollupBtnClick() {
    this._onEditClose();
    this.removeOnEscKeyDown();
  }

  _onReset(evt) {
    evt.preventDefault();

    switch (this._mode) {
      case Mode.ADDING:
        this._onEditSave(Action.NONE, null);
        break;
      case Mode.DEFAULT:
        this._onEditSave(Action.DELETE, this._data);
        break;
    }
  }

  _onSubmit(evt) {
    evt.preventDefault();

    const update = this._update(this._data);

    switch (this._mode) {
      case Mode.ADDING:
        this._onEditSave(Action.CREATE, update);
        break;

      case Mode.DEFAULT:
        this._onEditSave(Action.UPDATE, update);
        break;
    }
  }
}


export default PointEditController;
