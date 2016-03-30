import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import floatingButtonReadmeText from 'material-ui/FloatingActionButton/examples/README';
import floatingButtonExampleSimpleCode from '!raw!material-ui/FloatingActionButton/examples/ExampleSimple';
import FloatingButtonExampleSimple from 'material-ui/FloatingActionButton/examples/ExampleSimple';
import floatingButtonCode from '!raw!material-ui/lib/FloatingActionButton/FloatingActionButton';

const descriptions = {
  simple: 'Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.',
};

const FloatingActionButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Floating Action Button - ${previousTitle}`} />
    <MarkdownElement text={floatingButtonReadmeText} />
    <CodeExample description={descriptions.simple} code={floatingButtonExampleSimpleCode}>
      <FloatingButtonExampleSimple />
    </CodeExample>
    <PropTypeDescription code={floatingButtonCode} />
  </div>
);

export default FloatingActionButtonPage;
