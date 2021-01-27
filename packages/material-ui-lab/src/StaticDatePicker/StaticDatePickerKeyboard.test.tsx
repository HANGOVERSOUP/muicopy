import * as React from 'react';
import { expect } from 'chai';
import TextField from '@material-ui/core/TextField';
import { fireEvent, screen } from 'test/utils';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<StaticDatePicker /> keyboard interactions', () => {
  const render = createPickerRender();

  describe('Calendar keyboard navigation', () => {
    it('autofocus selected day on mount', () => {
      // Important: Use <StaticDatePicker /> here in order to avoid async waiting for focus because of packages/material-ui-lab/src/internal/pickers/hooks/useCanAutoFocus.tsx logic
      render(
        <StaticDatePicker
          allowKeyboardControl // required to enable focus management in static mode
          displayStaticWrapperAs="desktop"
          value={adapterToUse.date('2020-08-13T00:00:00.000')}
          onChange={() => {}}
          renderInput={(params) => <TextField placeholder="10/10/2018" {...params} />}
        />,
      );

      expect(screen.getByLabelText('Aug 13, 2020')).toHaveFocus();
    });

    [
      { keyCode: 35, key: 'End', expectFocusedDay: 'Aug 15, 2020' },
      { keyCode: 36, key: 'Home', expectFocusedDay: 'Aug 9, 2020' },
      { keyCode: 37, key: 'ArrowLeft', expectFocusedDay: 'Aug 12, 2020' },
      { keyCode: 38, key: 'ArrowUp', expectFocusedDay: 'Aug 6, 2020' },
      { keyCode: 39, key: 'ArrowRight', expectFocusedDay: 'Aug 14, 2020' },
      { keyCode: 40, key: 'ArrowDown', expectFocusedDay: 'Aug 20, 2020' },
    ].forEach(({ key, keyCode, expectFocusedDay }) => {
      it(key, () => {
        // Important: Use <StaticDatePicker /> here in order to avoid async waiting for focus because of packages/material-ui-lab/src/internal/pickers/hooks/useCanAutoFocus.tsx logic
        render(
          <StaticDatePicker
            allowKeyboardControl // required to enable focus management in static mode
            displayStaticWrapperAs="desktop"
            value={adapterToUse.date('2020-08-13T00:00:00.000')}
            onChange={() => {}}
            renderInput={(params) => <TextField placeholder="10/10/2018" {...params} />}
          />,
        );

        // Don't care about what's focused.
        // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
        fireEvent.keyDown(document.activeElement!, { keyCode, key });

        expect(document.activeElement).toHaveAccessibleName(expectFocusedDay);
      });
    });
  });

  it("doesn't allow to select disabled date from keyboard", async () => {
    render(
      <StaticDatePicker
        allowKeyboardControl
        displayStaticWrapperAs="desktop"
        value={adapterToUse.date('2020-08-13T00:00:00.000')}
        minDate={adapterToUse.date('2020-08-13T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(document.activeElement).to.have.attr('aria-label', 'Aug 13, 2020');

    for (let i = 0; i < 3; i += 1) {
      // Don't care about what's focused.
      // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
      fireEvent.keyDown(document.activeElement!, { keyCode: 37, key: 'ArrowLeft' });
    }

    // leaves focus on the same date
    expect(document.activeElement).to.have.attr('aria-label', 'Aug 13, 2020');
  });

  context('YearPicker keyboard navigation', () => {
    [
      { keyCode: 37, key: 'ArrowLeft', expectFocusedYear: '2019' },
      { keyCode: 38, key: 'ArrowUp', expectFocusedYear: '2016' },
      { keyCode: 39, key: 'ArrowRight', expectFocusedYear: '2021' },
      { keyCode: 40, key: 'ArrowDown', expectFocusedYear: '2024' },
    ].forEach(({ key, keyCode, expectFocusedYear }) => {
      it(key, () => {
        render(
          <StaticDatePicker
            open
            openTo="year"
            reduceAnimations
            allowKeyboardControl
            displayStaticWrapperAs="desktop"
            value={adapterToUse.date('2020-08-13T00:00:00.000')}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} />}
          />,
        );

        // Don't care about what's focused.
        // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
        fireEvent.keyDown(document.activeElement!, { keyCode, key });

        expect(document.activeElement).to.have.text(expectFocusedYear);
      });
    });
  });
});
