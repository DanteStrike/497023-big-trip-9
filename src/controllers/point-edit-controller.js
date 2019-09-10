import {Mode} from '../utils/enum.js';
import EditEvent from '../components/event-edit.js';


class PointEditController {
  constructor(eventData, mode, onEditClose, onEditSave) {
    this._data = eventData;
    this._mode = mode;

    this._onEditClose = onEditClose;
    this._onEditSave = onEditSave;

    //  От потери окружения
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    //  Обратная связь с формой редактирования при изменении пункта назначения
    this._tempDestinationData = null;
    this._onDestinationChange = this._onDestinationChange.bind(this);

    //  Обратная связь с формой редактирования при изменении типа точки
    this._onTypeChange = this._onTypeChange.bind(this);
  }

  getPointEditElement() {
    return this._pointEdit.getElement();
  }

  init() {
    const datalistOptions = [];
    this._pointEdit = new EditEvent(this._data, datalistOptions, this._mode, this._onDestinationChange, this._onTypeChange);
    this._hangHandlers();
  }

  removeOnEscKeyDown() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  //  При изменении типа точки менять доступные пункты назначения
  _onTypeChange(newType) {
    const newTypeData = [];
    const newDatalistOptions = [];
    return {
      newTypeData,
      newDatalistOptions
    };
  }

  //  При изменении пункты назначения загружать новые данные
  _onDestinationChange(newDestination) {
    this._tempDestinationData = [];
    return this._tempDestinationData;
  }

  _hangHandlers() {
    switch (this._mode) {
      case Mode.ADDING:
        this._pointEdit.getElement()
        .addEventListener(`submit`, (evt) => this._onSubmit(evt));
        this._pointEdit.getElement()
          .addEventListener(`reset`, (evt) => this._onReset(evt));
        break;

      case Mode.DEFAULT:
        this._pointEdit.getElement().querySelector(`.event__rollup-btn`)
          .addEventListener(`click`, () => this._onRollupBtnClick());
        this._pointEdit.getElement().querySelector(`form`)
          .addEventListener(`submit`, (evt) => this._onSubmit(evt));
        this._pointEdit.getElement().querySelector(`form`)
          .addEventListener(`reset`, (evt) => this._onReset(evt));
        document.addEventListener(`keydown`, this._onEscKeyDown);
        break;
    }
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
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
        this._onEditSave(null, null);
        break;
      case Mode.DEFAULT:
        this._onEditSave(this._data, null);
    }
  }

  _onSubmit(evt) {
    // evt.preventDefault();
    // let formData;

    // if (this._mode === Mode.ADDING) {
    //   formData = new FormData(this._pointEdit.getElement());
    // } else {
    //   formData = new FormData(this._pointEdit.getElement().querySelector(`form.event`));
    // }

    // //  Если пользователь выбрал и получил данные новой точки назначения с сервера,
    // //  изменить описание, предложение и фотографии текущей точки.
    // const newDestinationData = (this._tempDestinationData) ? this._tempDestinationData : this._data;

    // const entry = {
    //   id: this._data.id,
    //   type: getTypeData(formData.get(`event-type`)),
    //   destination: formData.get(`event-destination`),
    //   description: newDestinationData.description,
    //   time: {
    //     start: new Date(formData.get(`event-start-time`)).valueOf(),
    //     end: new Date(formData.get(`event-end-time`)).valueOf()
    //   },
    //   offers: newDestinationData.offers
    //     .map((offer, index) => {
    //       offer.isActive = formData.get(`event-offer-luggage-${index}`) ? true : false;
    //       return offer;
    //     }),
    //   price: Number(formData.get(`event-price`)),
    //   photos: newDestinationData.photos,
    //   isFavorite: formData.get(`event-favorite`) ? true : false
    // };

    // switch (this._mode) {
    //   case Mode.ADDING:
    //     this._onEditSave(null, entry);
    //     break;

    //   case Mode.DEFAULT:
    //     this._onEditSave(this._data, entry);
    //     break;
    // }
  }
}


export default PointEditController;
