import {Mode, Action} from '../utils/enum.js';
import {render, unmount} from '../utils/dom.js';
import PointView from '../components/point-view.js';
import PointEditController from './point-edit-controller.js';

/** Класс представляет управление отображением точки*/
class PointController {
  constructor({container, renderPosition, data, destinations, offers, mode, onChangeView, onDataChange, onTripListAddPointClose}) {
    this._container = container;
    this._renderPosition = renderPosition;
    this._data = data;
    this._mode = mode;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._onTripListAddPointClose = onTripListAddPointClose;
    this._pointEditOptions = {
      destinations,
      offers,
      data,
      mode,
      onEditClose: this._onEditClose.bind(this),
      onEditSave: this._onEditSave.bind(this),
      onAddPointClose: this._onAddPointClose.bind(this)
    };
  }

  init() {
    switch (this._mode) {
      case Mode.ADDING:
        this._newPointEditController = new PointEditController(this._pointEditOptions);
        this._newPointEditController.init();
        render(this._container, this._newPointEditController.getPointEditElement(), this._renderPosition);
        break;

      case Mode.DEFAULT:
        this._pointView = new PointView(this._data);
        this._pointView.getElement().querySelector(`.event__rollup-btn`)
          .addEventListener(`click`, () => this._onRollupBtnClick());
        render(this._container, this._pointView.getElement(), this._renderPosition);
        break;
    }
  }

  setDefaultView() {
    if (!this._newPointEditController) {
      return;
    }
    this._onEditClose();
  }

  _onEditClose() {
    this._container.replaceChild(this._pointView.getElement(), this._newPointEditController.getPointEditElement());
    this._newPointEditController.removeOnEscKeyDown();
    this._newPointEditController = null;
  }

  _onEditSave(action, data) {
    if (this._mode === Mode.ADDING && action === Action.NONE) {
      this._onAddPointClose();
    }
    this._onDataChange(action, data, this._newPointEditController);
  }

  _onAddPointClose() {
    unmount(this._newPointEditController.getPointEditElement());
    this._newPointEditController = null;
    this._onTripListAddPointClose();
  }

  _onRollupBtnClick() {
    this._onChangeView();
    this._newPointEditController = new PointEditController(this._pointEditOptions);
    this._newPointEditController.init();
    this._container.replaceChild(this._newPointEditController.getPointEditElement(), this._pointView.getElement());
  }
}


export default PointController;

