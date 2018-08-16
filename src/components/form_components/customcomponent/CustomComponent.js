import BaseComponent from '../../../../node_modules/formiojs/components/base/Base';
// import { BaseComponent } from 'formiojs';

//const _CustomComponentEdit = require('./editForm/CustomComponent.edit.display');
//import CustomComponentEdit from './editForm/CustomComponent.edit.display';
var _Base = require('../../../../node_modules/formiojs/components/base/Base');

var _Base2 = _interopRequireDefault(_Base);

var _builder = require('../../../../node_modules/formiojs/utils/builder');

var _builder2 = _interopRequireDefault(_builder);

var _CustomComponentEdit = require('./editForm/CustomComponent.edit.display');

var _CustomComponent2 = _interopRequireDefault(_CustomComponentEdit);

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

  schema() {
    console.log(this);
    for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
      extend[_key] = arguments[_key];
    }

    return _Base2.default.schema.apply(_Base2.default, [{
      type: 'button',
      label: 'Submit',
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
  }

  static get builderInfo() {
    return {
      title: 'CustomControl',
      group: 'basic',
      icon: 'fa fa-stop',
      documentation: 'http://help.form.io/userguide/#customcomponent',
      weight: 110,
      schema: this.schema(),
    };
  }

  static get editForm() {
    return exports.default = [{
      type: 'select',
      key: 'action',
      label: 'Action',
      input: true,
      dataSrc: 'values',
      weight: 110,
      tooltip: 'This is the action to be performed by this customcomponent.',
      data: {
        values: [{ label: 'Submit', value: 'submit' }, { label: 'Event', value: 'event' }, { label: 'Custom', value: 'custom' }, { label: 'Reset', value: 'reset' }, { label: 'OAuth', value: 'oauth' }, { label: 'POST to URL', value: 'url' }]
      }
    }, {
      type: 'checkbox',
      input: true,
      inputType: 'checkbox',
      key: 'showValidations',
      label: 'Show Validations',
      weight: 115,
      tooltip: 'When the customcomponent is pressed, show any validation errors on the form.',
      conditional: {
        json: { '!==': [{ var: 'data.action' }, 'submit'] }
      }
    }, {
      type: 'textfield',
      label: 'Button Event',
      key: 'event',
      input: true,
      weight: 120,
      tooltip: 'The event to fire when the customcomponent is clicked.',
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'event'] }
      }
    }, {
      type: 'textfield',
      inputType: 'url',
      key: 'url',
      input: true,
      weight: 120,
      label: 'Button URL',
      tooltip: 'The URL where the submission will be sent.',
      placeholder: 'https://example.form.io',
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'url'] }
      }
    }, {
      type: 'datagrid',
      key: 'headers',
      input: true,
      weight: 130,
      label: 'Headers',
      addAnother: 'Add Header',
      tooltip: 'Headers Properties and Values for your request',
      components: [{
        key: 'header',
        label: 'Header',
        input: true,
        type: 'textfield'
      }, {
        key: 'value',
        label: 'Value',
        input: true,
        type: 'textfield'
      }],
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'url'] }
      }
    }, {
      type: 'textarea',
      key: 'custom',
      label: 'Button Custom Logic',
      tooltip: 'The custom logic to evaluate when the customcomponent is clicked.',
      rows: 5,
      editor: 'ace',
      input: true,
      weight: 120,
      placeholder: "data['mykey'] = data['anotherKey'];",
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'custom'] }
      }
    }, {
      type: 'select',
      key: 'theme',
      label: 'Theme',
      input: true,
      tooltip: 'The color theme of this customcomponent.',
      dataSrc: 'values',
      weight: 140,
      data: {
        values: [{ label: 'Default', value: 'default' }, { label: 'Primary', value: 'primary' }, { label: 'Info', value: 'info' }, { label: 'Success', value: 'success' }, { label: 'Danger', value: 'danger' }, { label: 'Warning', value: 'warning' }]
      }
    }, {
      type: 'select',
      key: 'size',
      label: 'Size',
      input: true,
      tooltip: 'The size of this customcomponent.',
      dataSrc: 'values',
      weight: 150,
      data: {
        values: [{ label: 'Extra Small', value: 'xs' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }]
      }
    }, {
      type: 'textfield',
      key: 'leftIcon',
      label: 'Left Icon',
      input: true,
      placeholder: 'Enter icon classes',
      tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
      weight: 160
    }, {
      type: 'textfield',
      key: 'rightIcon',
      label: 'Right Icon',
      input: true,
      placeholder: 'Enter icon classes',
      tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
      weight: 170
    }, {
      type: 'select',
      input: true,
      weight: 180,
      label: 'Shortcut',
      key: 'shortcut',
      tooltip: 'Shortcut for this component.',
      dataSrc: 'custom',
      data: {
        custom: function custom(values, component, data, row, utils, instance, form) {
          return _builder2.default.getAvailableShortcuts(form, component);
        }
      }
    }, {
      type: 'checkbox',
      key: 'block',
      label: 'Block',
      input: true,
      weight: 610,
      tooltip: 'This control should span the full width of the bounding container.'
    }, {
      type: 'checkbox',
      key: 'disableOnInvalid',
      label: 'Disable on Form Invalid',
      tooltip: 'This will disable this field if the form is invalid.',
      input: true,
      weight: 620
    }];
  }
}
