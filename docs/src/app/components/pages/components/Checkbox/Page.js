import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import checkboxReadmeText from 'material-ui/Checkbox/examples/README';
import checkboxCode from '!raw!material-ui/lib/Checkbox/Checkbox';
import CheckboxExampleSimple from 'material-ui/Checkbox/examples/ExampleSimple';
import checkboxExampleSimpleCode from '!raw!material-ui/Checkbox/examples/ExampleSimple';

const description = 'The second example is selected by default using the `defaultChecked` property. The third ' +
  'example is disabled using the `disabled` property. The fourth example uses custom icons through the ' +
  '`checkedIcon` and `uncheckedIcon` properties. The final example uses the `labelPosition` property to position the ' +
  'label on the left. ';

const CheckboxPage = () => (
  <div>
    <Title render={(previousTitle) => `Checkbox - ${previousTitle}`} />
    <MarkdownElement text={checkboxReadmeText} />
    <CodeExample
      title="Examples"
      description={description}
      code={checkboxExampleSimpleCode}
    >
      <CheckboxExampleSimple />
    </CodeExample>
    <PropTypeDescription code={checkboxCode} />
  </div>
);

export default CheckboxPage;
