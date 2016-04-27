import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import {green500, yellow500} from 'material-ui/styles/colors';


const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const FlatButtonExampleComplex = () => (
  <div>
    <FlatButton label="Choose an Image" labelPosition="before">
      <input type="file" style={styles.exampleImageInput} />
    </FlatButton>

    <FlatButton
      label="Label before"
      labelPosition="before"
      primary={true}
      style={styles.button}
      icon={<ActionAndroid />}
    />

    <FlatButton
      label="GitHub Link"
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      icon={<FontIcon className="muidocs-icon-custom-github" />}
    />

    <FlatButton
      label="Color Change On Hover"
      primary={true}
      hoverColor={green500}
      hoverTextColor={yellow500}
      style={styles.button}
      icon={<ActionAndroid />}
    />

  </div>
);

export default FlatButtonExampleComplex;
