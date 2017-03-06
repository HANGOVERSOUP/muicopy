import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default class SelectFieldExampleMultiSelect extends Component {
  state = {
    values: [],
  };

  menuItems(values) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.includes(name)}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const {values} = this.state;

    return (
      <SelectField
        multiple={true}
        hintText="Select a name"
        value={this.state.values}
        onChange={(event, index, values) => this.setState({values})}
      >
        {this.menuItems(values)}
      </SelectField>
    );
  }
}
