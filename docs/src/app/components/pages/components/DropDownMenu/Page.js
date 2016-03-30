import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dropDownMenuReadmeText from 'material-ui/DropDownMenu/examples/README';
import DropDownMenuSimpleExample from 'material-ui/DropDownMenu/examples/ExampleSimple';
import dropDownMenuSimpleExampleCode from '!raw!material-ui/DropDownMenu/examples/ExampleSimple';
import DropDownMenuOpenImmediateExample from 'material-ui/DropDownMenu/examples/ExampleOpenImmediate';
import dropDownMenuOpenImmediateExampleCode from '!raw!material-ui/DropDownMenu/examples/ExampleOpenImmediate';
import DropDownMenuLongMenuExample from 'material-ui/DropDownMenu/examples/ExampleLongMenu';
import dropDownMenuLongMenuExampleCode from '!raw!material-ui/DropDownMenu/examples/ExampleLongMenu';
import DropDownMenuLabeledExample from 'material-ui/DropDownMenu/examples/ExampleLabeled';
import dropDownMenuLabeledExampleCode from '!raw!material-ui/DropDownMenu/examples/ExampleLabeled';
import dropDownMenuCode from '!raw!material-ui/lib/DropDownMenu/DropDownMenu';

const descriptions = {
  simple: '`DropDownMenu` is implemented as a controlled component, with the current selection set through the ' +
  '`value` property.',
  openImmediate: 'With `openImmediately` property set, the menu will open on mount.',
  long: 'With the `maxHeight` property set, the menu will be scrollable if the number of items causes the height ' +
  'to exceed this limit.',
  label: 'With a `label` applied to each `MenuItem`, `DropDownMenu` displays a complementary description ' +
  'of the selected item.',
};

const DropDownMenuPage = () => (
  <div>
    <Title render={(previousTitle) => `Drop Down Menu - ${previousTitle}`} />
    <MarkdownElement text={dropDownMenuReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={dropDownMenuSimpleExampleCode}
    >
      <DropDownMenuSimpleExample />
    </CodeExample>
    <CodeExample
      title="Open Immediate example"
      description={descriptions.openImmediate}
      code={dropDownMenuOpenImmediateExampleCode}
    >
      <DropDownMenuOpenImmediateExample />
    </CodeExample>
    <CodeExample
      title="Long example"
      description={descriptions.long}
      code={dropDownMenuLongMenuExampleCode}
    >
      <DropDownMenuLongMenuExample />
    </CodeExample>
    <CodeExample
      title="Label example"
      description={descriptions.label}
      code={dropDownMenuLabeledExampleCode}
    >
      <DropDownMenuLabeledExample />
    </CodeExample>
    <PropTypeDescription code={dropDownMenuCode} />
  </div>
);

export default DropDownMenuPage;
