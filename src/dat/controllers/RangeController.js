import NumberController from './NumberController';
import dom from '../dom/dom';

class RangeController extends NumberController {
  constructor(object, property, params) {
    super(object, property, params);

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    this.__range = [object[property][0], object[property][1]];

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    this.__foreground2 = document.createElement('div');

    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');
    dom.addClass(this.__foreground2, 'slider-fg');

    this.__background.appendChild(this.__foreground);
    this.__background.appendChild(this.__foreground2);
    this.domElement.appendChild(this.__background);

    this.updateDisplay();
  }

  setValue(v) {
    if (Array.isArray(v) && v.length === 2) {
      this.__range = v;
      this.object[this.property] = v;
      this.updateDisplay();
      if (this.__onChange) {
        this.__onChange.call(this, v);
      }
      return this;
    }
    return super.setValue(v);
  }

  updateDisplay() {
    const pct1 = (this.__range[0] - this.__min) / (this.__max - this.__min);
    const pct2 = (this.__range[1] - this.__min) / (this.__max - this.__min);
    this.__foreground.style.width = pct1 * 100 + '%';
    this.__foreground2.style.width = (pct2 - pct1) * 100 + '%';
    this.__foreground2.style.left = pct1 * 100 + '%';
    return super.updateDisplay();
  }

  min(minValue) {
    this.__min = minValue;
    return this;
  }

  max(maxValue) {
    this.__max = maxValue;
    return this;
  }

  step(stepValue) {
    this.__step = stepValue;
    return this;
  }
}

export default RangeController;
