import Event from '../components/event.js';
import EditEvent from '../components/event-edit.js';
import {render, Position} from '../utils/utils.js';


class PointController {
  constructor(container, eventData, onChangeView, onDataChange) {
    this._listNode = container;
    this._data = eventData;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    //  Обратная связь с формой редактирования при изменении пункта назначения
    this._tempDestinationData = null;
    this._onDestinationDataFromServerReceive = this._onDestinationDataFromServerReceive.bind(this);
  }

  init() {
    this._pointView = new Event(this._data);
    this._pointView.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => this._onPointViewRollupBtnClick());
    render(this._listNode, this._pointView.getElement(), Position.BEFOREEND);
  }

  _onDestinationDataFromServerReceive(newDestinationData) {
    this._tempDestinationData = newDestinationData;
  }

  _onPointViewRollupBtnClick() {
    this._pointEdit = new EditEvent(this._data, this._onDestinationDataFromServerReceive);
    this._onChangeView();
    this._listNode.replaceChild(this._pointEdit.getElement(), this._pointView.getElement());

    const onPointEditRollupBtnClick = () => {
      this._listNode.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    };

    this._pointEdit.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onPointEditRollupBtnClick);

    const onPointEditFormSubmit = (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._pointEdit.getElement().querySelector(`form.event`));

      //  Если пользователь выбрал и получил данные новой точки назначения с сервера,
      //  изменить описание, предложение и фотографии текущей точки.
      const newDestinationData = (this._tempDestinationData) ? this._tempDestinationData : this._data;

      const entry = {
        type: formData.get(`event-type`),
        destination: formData.get(`event-destination`),
        description: newDestinationData.description,
        time: {
          start: new Date(formData.get(`event-start-time`)).valueOf(),
          end: new Date(formData.get(`event-end-time`)).valueOf()
        },
        offers: newDestinationData.offers
          .map((offer, index) => {
            offer.isActive = formData.get(`event-offer-luggage-${index}`) ? true : false;
            return offer;
          }),
        price: formData.get(`event-price`),
        photos: newDestinationData.photos,
        isFavorite: formData.get(`event-favorite`) ? true : false
      };

      this._onDataChange(this._data, entry);
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

