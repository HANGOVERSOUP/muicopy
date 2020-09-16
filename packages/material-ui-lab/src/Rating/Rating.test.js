import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  getClasses,
  createMount,
  describeConformance,
  createClientRender,
  fireEvent,
  screen,
} from 'test/utils';
import Rating from './Rating';

describe('<Rating />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;
  const defaultProps = {
    name: 'rating-test',
    value: 2,
  };

  before(() => {
    classes = getClasses(<Rating {...defaultProps} />);
  });

  describeConformance(<Rating {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('renders radio buttons for no rating and rating 1 to max (5 by default)', () => {
    render(<Rating />);

    const radioValues = screen.getAllByRole('radio').map((radio) => radio.value);
    // The order and their values is important for assistive technology.
    // The position of the currently focused value is announced in e.g. NVDA.
    // This could lead to confusing announcements e.g. "Radio group no value 6/6".
    // This implies an order of `1,2,3,4,5,no value` when an incrementing order is expected.
    expect(radioValues).to.deep.equal(['', '1', '2', '3', '4', '5']);
  });

  it('should round the value to the provided precision', () => {
    const { container } = render(<Rating {...defaultProps} value={3.9} precision={0.2} />);

    expect(container.querySelector('input[name="rating-test"]:checked')).to.have.property(
      'value',
      '4',
    );
  });

  it('should handle mouse hover correctly', () => {
    const { container } = render(<Rating value={2} />);

    fireEvent.mouseMove(
      document.querySelector(`label[for="${screen.getByRole('radio', { name: '1 Star' }).id}"]`),
    );

    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(1);

    fireEvent.mouseMove(
      document.querySelector(`label[for="${screen.getByRole('radio', { name: '2 Stars' }).id}"]`),
    );

    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(2);
  });

  it('should clear the rating', () => {
    const handleChange = spy();
    const { getByRole } = render(<Rating {...defaultProps} onChange={handleChange} />);

    const input = getByRole('radio', { name: '2 Stars' });
    fireEvent.click(input, {
      clientX: 1,
    });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(null);
  });

  it('should select the rating', () => {
    const handleChange = spy();
    const { container, getByRole } = render(<Rating {...defaultProps} onChange={handleChange} />);

    fireEvent.click(getByRole('radio', { name: '3 Stars' }));

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(3);
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });

  it('should select the empty input if value is null', () => {
    const { container, getByRole } = render(<Rating {...defaultProps} value={null} />);
    const input = getByRole('radio', { name: 'Empty' });
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(input).to.equal(checked);
    expect(input.value).to.equal('');
  });

  it('should support a defaultValue', () => {
    const { container, getByRole } = render(
      <Rating {...defaultProps} value={undefined} defaultValue={3} />,
    );
    let checked;
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('3');

    fireEvent.click(getByRole('radio', { name: '2 Stars' }));
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });

  describe('<form> integration', () => {
    before(function beforeHook() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM has issues with form validation for certain elements.
        // We could adress them individually but that doesn't add much value if we already have a working environment.
        this.skip();
      }
    });

    [
      {
        ratingProps: { name: 'rating', defaultValue: 2 },
        formData: [['rating', '2']],
      },
      {
        ratingProps: { name: 'rating', defaultValue: 2, disabled: true },
        formData: [],
      },
      {
        ratingProps: { name: 'rating', defaultValue: 2, readOnly: true },
        formData: [['rating', '2']],
      },
      {
        ratingProps: { name: 'rating', required: true },
        // FIXME: `Rating` does not implement `required`.
        //        Native <input type="radio" /> would not pass validation
        // formData: undefined,
        formData: [['rating', '']],
      },
    ].forEach((testData, testNumber) => {
      it(`submits the expected form data #${testNumber + 1}`, () => {
        /**
         * @type FormData
         */
        let data;
        const handleSubmit = spy((event) => {
          // Prevent navigation
          event.preventDefault();
          // populate FormData with the submitted form
          data = new FormData(event.target);
        });
        render(
          <form onSubmit={handleSubmit}>
            <Rating {...testData.ratingProps} />
            <button type="submit" />
          </form>,
        );
        const submitter = document.querySelector('button[type="submit"]');

        act(() => {
          // form.submit() would not run form validation
          submitter.click();
        });

        if (testData.formData === undefined) {
          expect(handleSubmit.callCount).to.equal(0);
        } else {
          expect(Array.from(data.entries())).to.deep.equal(testData.formData);
        }
      });
    });
  });
});
