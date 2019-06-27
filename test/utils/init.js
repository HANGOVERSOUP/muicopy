import React from 'react';
import enzyme from 'enzyme/build/index';
import Adapter from 'enzyme-adapter-react-16';
import consoleError from './consoleError';
import { useIsSsr } from '@material-ui/core/test-utils/RenderMode';
import chai from 'chai';
import chaiDom from 'chai-dom';
import { prettyDOM } from '@testing-library/react';

chai.use(chaiDom);
chai.use((chaiAPI, utils) => {
  // better diff view for expect(element).to.equal(document.activeElement)
  chai.Assertion.addProperty('focused', function elementIsFocused() {
    const element = utils.flag(this, 'object');
    this.assert(
      element === document.activeElement,
      'expected #{exp} to be focused, but #{act} was instead',
      'expected #{exp} not to be focused',
      prettyDOM(element),
      prettyDOM(document.activeElement),
    );
  });

  chai.Assertion.addProperty('accessible', function elementIsAccessible() {
    const element = utils.flag(this, 'object');

    new chai.Assertion(element).to.be.visible;

    // "An element is considered hidden if it, or any of its ancestors are not
    // rendered or have their aria-hidden attribute value set to true."
    // -- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden
    let previousNode = element;
    let currentNode = element;
    let ariaHidden = false;
    while (
      currentNode !== null &&
      currentNode !== document.documentElement &&
      ariaHidden === false
    ) {
      ariaHidden = element.getAttribute('aria-hidden') === 'true';
      previousNode = currentNode;
      currentNode = currentNode.parentElement;
    }

    this.assert(
      ariaHidden === false,
      `expected ${utils.elToString(element)} to not be aria-hidden, but ${utils.elToString(
        previousNode,
      )} had aria-hidden="true" instead\n${prettyDOM(previousNode)}`,
      `expected ${utils.elToString(element)} to be aria-hidden\n${prettyDOM(previousNode)}`,
    );
  });
});

consoleError();

const useActualLayoutEffect = React.useLayoutEffect;

/* eslint-disable react-hooks/rules-of-hooks */
/**
 * during tests we are in a jsdom environment but will also call ReactDOM.renderToString
 * which triggers useLayoutEffect server warnings. On an actual server there's
 * no jsdom
 */
// eslint-disable-next-line camelcase
React.useLayoutEffect = function unstable_useIsomorphicLayoutEffect(fn, deps) {
  const isSsr = useIsSsr();
  // RulesOfHooks violation but this the context needs to be invariant anyway
  const useEffect = isSsr ? React.useEffect : useActualLayoutEffect;
  return useEffect(fn, deps);
};
/* eslint-enable react-hooks/rules-of-hooks */

enzyme.configure({ adapter: new Adapter() });
