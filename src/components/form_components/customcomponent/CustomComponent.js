import BaseComponent from '../../../../node_modules/formiojs/components/base/Base';

var _Base = require('../../../../node_modules/formiojs/components/base/Base');

var _Base2 = _interopRequireDefault(_Base);

var _builder = require('../../../../node_modules/formiojs/utils/builder');

var _builder2 = _interopRequireDefault(_builder);

// var _CustomComponentEdit = require('./editForm/CustomComponentSv.edit.display');
//
// var _CustomComponent2 = _interopRequireDefault(_CustomComponentEdit);

var _utils = require('../../../../node_modules/formiojs/utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

export class CustomComponent extends BaseComponent {
  constructor() {
    const component = {
      title: 'my-component',
      selector: 'my-component',
      template: '<p>My Component</p>',
      styles: [],
    };
    super(component, {}, {});


  }

  build() {
    var _this2 = this;

    if (this.viewOnly || this.options.hideButtons) {
      this.component.hidden = true;
    }

    this.dataValue = false;
    this.hasError = false;
    this.createElement();
    this.createInput(this.element);
    this.addShortcut(this.buttonElement);
    if (this.component.leftIcon) {
      this.buttonElement.appendChild(this.ce('span', {
        class: this.component.leftIcon
      }));
      this.buttonElement.appendChild(this.text(' '));
    }

    if (!this.labelIsHidden()) {
      this.labelElement = this.text(this.addShortcutToLabel());
      this.buttonElement.appendChild(this.labelElement);
      this.createTooltip(this.buttonElement, null, this.iconClass('question-sign'));
    }
    if (this.component.rightIcon) {
      this.buttonElement.appendChild(this.text(' '));
      this.buttonElement.appendChild(this.ce('span', {
        class: this.component.rightIcon
      }));
    }
    if (this.component.action === 'submit') {
      var message = this.ce('div');
      this.on('submitButton', function () {
        _this2.loading = true;
        _this2.disabled = true;
      });
      this.on('submitDone', function () {
        _this2.loading = false;
        _this2.disabled = false;
        _this2.empty(message);
        _this2.addClass(_this2.buttonElement, 'btn-success submit-success');
        _this2.removeClass(_this2.buttonElement, 'btn-danger submit-fail');
        _this2.addClass(message, 'has-success');
        _this2.removeClass(message, 'has-error');
        _this2.append(message);
      });
      this.on('change', function (value) {
        _this2.loading = false;
        var isValid = _this2.root.isValid(value.data, true);
        _this2.disabled = _this2.options.readOnly || _this2.component.disableOnInvalid && !isValid;
        _this2.removeClass(_this2.buttonElement, 'btn-success submit-success');
        _this2.removeClass(_this2.buttonElement, 'btn-danger submit-fail');
        if (isValid && _this2.hasError) {
          _this2.hasError = false;
          _this2.empty(message);
          _this2.removeChild(message);
          _this2.removeClass(message, 'has-success');
          _this2.removeClass(message, 'has-error');
        }
      });
      this.on('error', function () {
        _this2.loading = false;
        _this2.hasError = true;
        _this2.removeClass(_this2.buttonElement, 'btn-success submit-success');
        _this2.addClass(_this2.buttonElement, 'btn-danger submit-fail');
        _this2.empty(message);
        _this2.removeClass(message, 'has-success');
        _this2.addClass(message, 'has-error');
        _this2.append(message);
      });
    }

    if (this.component.action === 'url') {
      this.on('requestButton', function () {
        _this2.loading = true;
        _this2.disabled = true;
      });
      this.on('requestDone', function () {
        _this2.loading = false;
        _this2.disabled = false;
      });
      this.on('change', function (value) {
        _this2.loading = false;
        _this2.disabled = _this2.component.disableOnInvalid && !_this2.root.isValid(value.data, true);
      });
      this.on('error', function () {
        _this2.loading = false;
      });
    }
    this.addEventListener(this.buttonElement, 'click', function (event) {
      _this2.dataValue = true;
      if (_this2.component.action !== 'submit' && _this2.component.showValidations) {
        _this2.emit('checkValidity', _this2.data);
      }
      switch (_this2.component.action) {
        case 'saveState':
        case 'submit':
          event.preventDefault();
          event.stopPropagation();
          _this2.emit('submitButton', {
            state: _this2.component.state || 'submitted'
          });
          break;
        case 'event':
          _this2.emit(_this2.component.event, _this2.data);
          _this2.events.emit(_this2.component.event, _this2.data);
          _this2.emit('customEvent', {
            type: _this2.component.event,
            component: _this2.component,
            data: _this2.data,
            event: event
          });
          break;
        case 'custom':
        {
          // Get the FormioForm at the root of this component's tree
          var form = _this2.getRoot();
          // Get the form's flattened schema components
          var flattened = (0, _utils.flattenComponents)(form.component.components, true);
          // Create object containing the corresponding HTML element components
          var components = {};
          _lodash2.default.each(flattened, function (component, key) {
            var element = form.getComponent(key);
            if (element) {
              components[key] = element;
            }
          });

          _this2.evaluate(_this2.component.custom, {
            form: form,
            flattened: flattened,
            components: components
          });
          break;
        }
        case 'url':
          _this2.emit('requestButton');
          _this2.emit('requestUrl', {
            url: _this2.component.url,
            headers: _this2.component.headers
          });
          break;
        case 'reset':
          _this2.emit('resetForm');
          break;
        case 'delete':
          _this2.emit('deleteSubmission');
          break;
        case 'oauth':
          if (_this2.root === _this2) {
            console.warn('You must add the OAuth button to a form for it to function properly');
            return;
          }

          // Display Alert if OAuth config is missing
          if (!_this2.component.oauth) {
            _this2.root.setAlert('danger', 'You must assign this button to an OAuth action before it will work.');
            break;
          }

          // Display Alert if oAuth has an error is missing
          if (_this2.component.oauth.error) {
            _this2.root.setAlert('danger', 'The Following Error Has Occured' + _this2.component.oauth.error);
            break;
          }

          _this2.openOauth(_this2.component.oauth);

          break;
      }
    });
    if (this.shouldDisable) {
      this.disabled = true;
    }

    function getUrlParameter(name) {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      if (!results) {
        return results;
      }
      return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // If this is an OpenID Provider initiated login, perform the click event immediately
    if (this.component.action === 'oauth' && this.component.oauth && this.component.oauth.authURI) {
      var iss = getUrlParameter('iss');
      if (iss && this.component.oauth.authURI.indexOf(iss) === 0) {
        this.openOauth();
      }
    }

    this.autofocus();
  }
  /* eslint-enable max-statements */

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'input';
    return info;
  }

  // No label needed for buttons.
  createLabel() {}

  createInput(container) {
    this.buttonElement = _get(CustomComponent.prototype.__proto__ || Object.getPrototypeOf(CustomComponent.prototype), 'createInput', this).call(this, container);
    return this.buttonElement;
  };

  getValue() {
    return this.dataValue;
  };

  buttonMessage(message) {
    return this.ce('span', { class: 'help-block' }, this.text(message));
  };

  /* eslint-disable max-statements */

  destroy() {
    _get(CustomComponent.prototype.__proto__ || Object.getPrototypeOf(CustomComponent.prototype), 'destroy', this).apply(this, Array.prototype.slice.apply(arguments));
    this.removeShortcut(this.buttonElement);
  };

  focus() {
    this.buttonElement.focus();
  };

  static get builderInfo() {
    return {
      title: 'Custom Control',
      group: 'basic',
      icon: 'fa fa-stop',
      documentation: 'http://help.form.io/userguide/#customcomponent',
      weight: 110,
      schema: this.schema(),
    };
  }

}

CustomComponent.schema = function() {
  console.log(this);
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.schema.apply(_Base2.default, [{
    type: 'button',
    label: 'Custom Btn',
    key: 'submit',
    size: 'md',
    leftIcon: '',
    rightIcon: '',
    block: false,
    action: 'submit',
    persistent: false,
    disableOnInvalid: false,
    theme: 'default',
    dataGridLabel: true
  }].concat(extend));
};

CustomComponent.prototype = {
  get defaultSchema() {
    return CustomComponent.schema();
  },
  set loading(loading) {
    this.setLoading(this.buttonElement, loading);
  },
  set disabled(disabled) {
    _set(CustomComponent.prototype.__proto__ || Object.getPrototypeOf(CustomComponent.prototype), 'disabled', disabled, this);
    this.setDisabled(this.buttonElement, disabled);
  },
  get emptyValue() {
    return false;
  },
  get clicked() {
    return this.dataValue;
  },
  get defaultValue() {
    return false;
  },
  set dataValue(value) {
    if (!this.component.input) {
      return;
    }
    _set(CustomComponent.prototype.__proto__ || Object.getPrototypeOf(CustomComponent.prototype), 'dataValue', value, this);
  },
  get className() {
    var className = _get(CustomComponent.prototype.__proto__ || Object.getPrototypeOf(CustomComponent.prototype), 'className', this);
    className += ' form-group';
    return className;
  }
};

