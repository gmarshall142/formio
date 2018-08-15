import BaseComponent from '../../../../node_modules/formiojs/components/base/Base';
// import { BaseComponent } from 'formiojs';

//const _CustomComponentEdit = require('./editForm/CustomComponent2.edit.display');
//import CustomComponentEdit from './editForm/CustomComponent2.edit.display';

export class CustomComponent2 extends BaseComponent {
  constructor() {
    const component = {
      title: 'my-component',
      selector: 'my-component',
      template: '<p>My Component</p>',
      styles: [],
    };
    super(component, {}, {});
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'input';
    return info;
  }

  schema() {
    console.log(this);
    return {
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
      dataGridLabel: true,
    };
  }

  builderInfo() {
    return {
      title: 'CustomControl',
      group: 'basic',
      icon: 'fa fa-stop',
      documentation: 'http://help.form.io/userguide/#customcomponent',
      weight: 110,
      schema: this.schema(),
    };
  }

  editForm = function() {
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
