import {Position, Mode} from '../utils/enum.js';
import {render, unrender} from '../utils/dom.js';
import Event from '../components/event.js';
import PointEditController from './point-edit-controller.js';


class PointController {
  constructor(container, data, mode, onChangeView, onDataChange) {
    this._container = container;
    this._data = data;
    this._mode = mode;

    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    //  Обратная связь с контроллером редактирования (закрытие формы редактирования без изменений и с сохранением).
    this._onEditClose = this._onEditClose.bind(this);
    this._onEditSave = this._onEditSave.bind(this);
  }

  init() {
    switch (this._mode) {
      case Mode.ADDING:
        this._newPointEditController = new PointEditController(this._data, this._mode, this._onEditClose, this._onEditSave);
        this._newPointEditController.init();
        render(this._container, this._newPointEditController.getPointEditElement(), Position.AFTEREND);
        break;

      case Mode.DEFAULT:
        this._pointView = new Event(this._data);
        this._pointView.getElement().querySelector(`.event__rollup-btn`)
          .addEventListener(`click`, () => this._onRollupBtnClick());
        render(this._container, this._pointView.getElement(), Position.BEFOREEND);
        break;
    }
  }

  _onEditClose() {
    this._container.replaceChild(this._pointView.getElement(), this._newPointEditController.getPointEditElement());
    this._newPointEditController.removeOnEscKeyDown();
    this._newPointEditController = null;
  }

  _onEditSave(oldData, newData) {
    if (this._mode === Mode.ADDING) {
      unrender(this._newPointEditController.getPointEditElement());
      this._newPointEditController = null;
    }

    this._onDataChange(oldData, newData);
  }

  _onRollupBtnClick() {
    this._onChangeView();
    this._newPointEditController = new PointEditController(this._data, this._mode, this._onEditClose, this._onEditSave);
    this._newPointEditController.init();
    this._container.replaceChild(this._newPointEditController.getPointEditElement(), this._pointView.getElement());
  }

  setDefaultView() {
    if (!this._newPointEditController) {
      return;
    }

    this._onEditClose();
  }
}


export default PointController;

