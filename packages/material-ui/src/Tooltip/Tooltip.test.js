import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { spy, useFakeTimers } from 'sinon';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Tooltip, { testReset } from './Tooltip';
import Input from '../Input';
import { camelCase } from 'lodash/string';

function focusVisible(element) {
  act(() => {
    element.blur();
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
    element.focus();
  });
}

function simulatePointerDevice() {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  document.dispatchEvent(new window.Event('pointerdown'));
}

// See handleClose in Tooltip
const LEAVE_CONSTANT = 800;

const DEFAULT_ENTER_DELAY = 100;
const DEFAULT_LEAVE_DELAY = 0 + LEAVE_CONSTANT;
const DEFAULT_ENTER_TOUCH_DELAY = 700 + DEFAULT_ENTER_DELAY;
const DEFAULT_LEAVE_TOUCH_DELAY = 1500 + LEAVE_CONSTANT;

describe('<Tooltip />', () => {
  // StrictModeViolation: uses Grow and tests a lot of impl details
  const mount = createMount({ strict: null });
  let classes;
  const render = createClientRender({ strict: false });
  let clock;
  const defaultProps = {
    children: (
      <button id="testChild" type="submit">
        Hello World
      </button>
    ),
    title: 'Hello World',
  };

  before(() => {
    classes = getClasses(<Tooltip {...defaultProps} />);
  });

  beforeEach(() => {
    testReset();
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  describeConformance(<Tooltip {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'button',
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  it('should render a popper', () => {
    const { getByRole } = render(<Tooltip open {...defaultProps} />);
    expect(getByRole('tooltip')).to.have.class(classes.popper);
  });

  describe('prop: disableHoverListener', () => {
    it('should hide the native title', () => {
      const { getByRole } = render(
        <Tooltip {...defaultProps} title="Hello World" disableHoverListener>
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      expect(getByRole('button')).to.not.have.attribute('title', 'Hello World');
    });
  });

  describe('prop: title', () => {
    it('should display if the title is present', () => {
      const { getByRole } = render(<Tooltip {...defaultProps} open />);
      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should not display if the title is an empty string', () => {
      const { queryByRole } = render(<Tooltip {...defaultProps} title="" open />);
      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should be passed down to the child as a native title', () => {
      const { getByRole } = render(
        <Tooltip {...defaultProps} title="Hello World">
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      expect(getByRole('button')).to.have.attribute('title', 'Hello World');
    });
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const renderSpy = spy();
      function PopperSpy({ placement }) {
        renderSpy(placement);
        return null;
      }

      render(<Tooltip {...defaultProps} PopperComponent={PopperSpy} placement="top" />);
      expect(renderSpy.args[0][0]).to.equal('top');
    });
  });

  it('should respond to external events', async () => {
    const { queryByRole, getByRole } = render(<Tooltip {...defaultProps} />);
    expect(queryByRole('tooltip')).to.equal(null);
    fireEvent.mouseOver(getByRole('button'));
    clock.tick(DEFAULT_ENTER_DELAY);
    expect(getByRole('tooltip')).toBeVisible();
    fireEvent.mouseLeave(getByRole('button'));
    clock.tick(DEFAULT_LEAVE_DELAY);
    expect(queryByRole('tooltip')).to.equal(null);
  });

  it('should be controllable', async () => {
    const handleRequestOpen = spy();
    const handleClose = spy();

    const { getByRole } = render(
      <Tooltip {...defaultProps} open onOpen={handleRequestOpen} onClose={handleClose} />,
    );

    expect(handleRequestOpen.callCount).to.equal(0);
    expect(handleClose.callCount).to.equal(0);
    fireEvent.mouseOver(getByRole('button'));
    clock.tick(DEFAULT_ENTER_DELAY);
    expect(handleRequestOpen.callCount).to.equal(1);
    expect(handleClose.callCount).to.equal(0);
    fireEvent.mouseLeave(getByRole('button'));
    clock.tick(DEFAULT_LEAVE_DELAY);
    expect(handleRequestOpen.callCount).to.equal(1);
    expect(handleClose.callCount).to.equal(1);
  });

  describe('touch screen', () => {
    it('should not respond to quick events', () => {
      const { getByRole, queryByRole } = render(<Tooltip {...defaultProps} />);
      fireEvent.touchStart(getByRole('button'));
      fireEvent.touchEnd(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should open on long press', async () => {
      const { getByRole, queryByRole } = render(<Tooltip {...defaultProps} />);
      fireEvent.touchStart(getByRole('button'));
      clock.tick(DEFAULT_ENTER_TOUCH_DELAY);
      expect(getByRole('tooltip')).toBeVisible();

      fireEvent.touchEnd(getByRole('button'));
      getByRole('button').blur();
      clock.tick(DEFAULT_LEAVE_TOUCH_DELAY);

      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should not open if disableTouchListener', () => {
      const { getByRole, queryByRole } = render(<Tooltip {...defaultProps} disableTouchListener />);

      fireEvent.touchStart(getByRole('button'));
      fireEvent.mouseOver(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      render(<Tooltip {...defaultProps} open />);
    });

    it('should handle autoFocus + onFocus forwarding', () => {
      const AutoFocus = (props) => (
        <div>
          {props.open ? (
            <Tooltip {...defaultProps} title="Title">
              <Input value="value" autoFocus />
            </Tooltip>
          ) : null}
        </div>
      );
      AutoFocus.propTypes = {
        open: PropTypes.bool,
      };

      const { setProps, queryByRole } = render(<AutoFocus />);
      setProps({ open: true });
      clock.tick(DEFAULT_ENTER_DELAY);
      expect(queryByRole('tooltip')).toBeVisible();
    });
  });

  describe('prop: delay', () => {
    it('should take the enterDelay into account', () => {
      const { queryByRole, getByRole } = render(<Tooltip {...defaultProps} enterDelay={111} />);
      simulatePointerDevice();

      focusVisible(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
      clock.tick(111);
      expect(queryByRole('tooltip')).toBeVisible();
    });

    it('should use hysteresis with the enterDelay', async () => {
      const { queryByRole, getByRole } = render(
        <Tooltip
          {...defaultProps}
          enterDelay={111}
          enterNextDelay={30}
          leaveDelay={5}
          TransitionProps={{ timeout: 6 }}
        />,
      );
      const children = getByRole('button');
      focusVisible(children);
      expect(queryByRole('tooltip')).to.equal(null);
      clock.tick(111);
      expect(queryByRole('tooltip')).toBeVisible();
      document.activeElement.blur();
      clock.tick(5);
      clock.tick(6);
      expect(queryByRole('tooltip')).to.equal(null);

      focusVisible(children);
      // Bypass `enterDelay` wait, use `enterNextDelay`.
      expect(queryByRole('tooltip')).to.equal(null);
      clock.tick(30);
      expect(queryByRole('tooltip')).toBeVisible();
    });

    it('should take the leaveDelay into account', async () => {
      const { getByRole, queryByRole } = render(
        <Tooltip {...defaultProps} leaveDelay={111} enterDelay={0} title="tooltip" />,
      );
      simulatePointerDevice();

      focusVisible(getByRole('button'));
      clock.tick(0);
      expect(queryByRole('tooltip')).toBeVisible();
      getByRole('button').blur();
      expect(queryByRole('tooltip')).toBeVisible();
      clock.tick(111);
      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('prop: overrides', () => {
    [
      'onTouchStart',
      'onTouchEnd',
      'onMouseEnter',
      'onMouseOver',
      'onMouseLeave',
      'onFocus',
      'onBlur',
    ].forEach((name) => {
      it(`should be transparent for the ${name} event`, () => {
        const handler = spy();
        const { getByRole } = render(
          <Tooltip {...defaultProps} title="Hello World">
            <button id="testChild" type="submit" {...{ [name]: handler }}>
              Hello World
            </button>
          </Tooltip>,
        );
        const type = camelCase(name.slice(2));
        fireEvent[type](getByRole('button'));
        expect(handler.callCount).to.equal(1);
      });
    });

    it('should ignore event from the tooltip', () => {
      const handleMouseOver = spy();
      const { getByRole } = render(
        <Tooltip {...defaultProps} open interactive>
          <button type="submit" onMouseOver={handleMouseOver}>
            Hello World
          </button>
        </Tooltip>,
      );
      fireEvent.mouseOver(getByRole('tooltip'));
      expect(handleMouseOver.callCount).to.equal(0);
    });
  });

  describe('disabled button warning', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should not raise a warning if title is empty', () => {
      render(
        <Tooltip title="">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      expect(consoleErrorMock.callCount()).to.equal(0);
    });

    it('should raise a warning when we are uncontrolled and can not listen to events', () => {
      render(
        <Tooltip title="Hello World">
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.match(
        /Material-UI: You are providing a disabled `button` child to the Tooltip component/,
      );
    });

    it('should not raise a warning when we are controlled', () => {
      render(
        <Tooltip title="Hello World" open>
          <button type="submit" disabled>
            Hello World
          </button>
        </Tooltip>,
      );
      expect(consoleErrorMock.callCount()).to.equal(0);
    });
  });

  describe('prop: interactive', () => {
    it('should keep the overlay open if the popper element is hovered', async () => {
      const { getByRole } = render(
        <Tooltip {...defaultProps} title="Hello World" interactive leaveDelay={111}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(getByRole('button'));
      clock.tick(DEFAULT_ENTER_DELAY);
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseLeave(getByRole('button'));
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseOver(getByRole('tooltip'));
      clock.tick(111);
      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should not animate twice', async () => {
      const { getByRole } = render(
        <Tooltip title="Hello World" interactive enterDelay={500}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(getByRole('button'));
      clock.tick(500);
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseLeave(getByRole('button'));
      expect(getByRole('tooltip')).toBeVisible();
      fireEvent.mouseOver(getByRole('tooltip'));
      clock.tick(0);
      expect(getByRole('tooltip')).toBeVisible();
    });
  });

  describe('prop: PopperProps', () => {
    it('should pass PopperProps to Popper Component', () => {
      const { getByTestId } = render(
        <Tooltip {...defaultProps} open PopperProps={{ 'data-testid': 'popper' }} />,
      );

      expect(getByTestId('popper')).not.to.equal(null);
    });

    it('should merge popperOptions with arrow modifier', () => {
      const popperRef = React.createRef();
      render(
        <Tooltip
          {...defaultProps}
          open
          arrow
          PopperProps={{
            popperRef,
            popperOptions: {
              modifiers: {
                arrow: {
                  foo: 'bar',
                },
              },
            },
          }}
        />,
      );
      expect(popperRef.current.modifiers.find((x) => x.name === 'arrow').foo).to.equal('bar');
    });
  });

  describe('prop forwarding', () => {
    it('should forward props to the child element', () => {
      const { getByText } = render(
        <Tooltip {...defaultProps} className="foo">
          <h1 className="bar">H1</h1>
        </Tooltip>,
      );
      expect(getByText('H1')).to.have.class('foo');
      expect(getByText('H1')).to.have.class('bar');
    });

    it('should respect the props priority', () => {
      const { getByText } = render(
        <Tooltip {...defaultProps} name="tooltip">
          <h1 name="heading">H1</h1>
        </Tooltip>,
      );
      expect(getByText('H1')).to.have.attribute('name', 'heading');
    });
  });

  describe('focus', () => {
    function Test() {
      return (
        <Tooltip enterDelay={0} leaveDelay={0} title="Some information">
          <button id="target" type="button">
            Do something
          </button>
        </Tooltip>
      );
    }

    it('ignores base focus', () => {
      const { getByRole, queryByRole } = render(<Test />);
      simulatePointerDevice();

      expect(queryByRole('tooltip')).to.equal(null);

      getByRole('button').focus();

      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('opens on focus-visible', () => {
      const { queryByRole, getByRole } = render(<Test />);
      simulatePointerDevice();

      expect(queryByRole('tooltip')).to.equal(null);

      focusVisible(getByRole('button'));

      expect(queryByRole('tooltip')).toBeVisible();
    });

    // https://github.com/mui-org/material-ui/issues/19883
    it('should not prevent event handlers of children', () => {
      const handleFocus = spy((event) => event.currentTarget);
      // Tooltip should not assume that event handlers of children are attached to the
      // outermost host
      const TextField = React.forwardRef(function TextField(props, ref) {
        return (
          <div ref={ref}>
            <input type="text" {...props} />
          </div>
        );
      });
      const { getByRole } = render(
        <Tooltip interactive open title="test">
          <TextField onFocus={handleFocus} />
        </Tooltip>,
      );
      const input = getByRole('textbox');

      input.focus();

      // return value is event.currentTarget
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocus.returned(input)).to.equal(true);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const { rerender } = render(<Tooltip {...defaultProps} />);

      rerender(<Tooltip {...defaultProps} open />);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: A component is changing the uncontrolled open state of Tooltip to be controlled.',
      );
    });
  });

  it('should use the same popper.js instance between two renders', () => {
    const popperRef = React.createRef();
    const { forceUpdate } = render(
      <Tooltip
        {...defaultProps}
        open
        PopperProps={{
          popperRef,
        }}
      />,
    );
    const firstPopperInstance = popperRef.current;
    forceUpdate();
    expect(firstPopperInstance).to.equal(popperRef.current);
  });

  describe('prop: PopperComponent', () => {
    it('can render a different component', () => {
      const CustomPopper = () => <div data-testid="CustomPopper" />;
      const { getByTestId } = render(
        <Tooltip {...defaultProps} open PopperComponent={CustomPopper} />,
      );
      expect(getByTestId('CustomPopper')).toBeVisible();
    });
  });
});
