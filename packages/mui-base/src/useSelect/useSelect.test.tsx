import { expect } from 'chai';
import sinon from 'sinon';
import { act, renderHook } from '@testing-library/react';
import { useSelect } from './useSelect';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';

describe('useSelect', () => {
  describe('param: options', () => {
    it('lets define options explicitly', () => {
      const options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C', disabled: true },
      ];

      const { result } = renderHook(() => useSelect({ options }));

      expect(result.current.options).to.deep.equal(['a', 'b', 'c']);
      expect(result.current.getOptionMetadata('a')?.label).to.equal('A');
      expect(result.current.getOptionMetadata('b')?.label).to.equal('B');
      expect(result.current.getOptionMetadata('c')?.label).to.equal('C');
      expect(result.current.getOptionMetadata('c')?.disabled).to.equal(true);
    });
  });

  describe('getHiddenInputProps', () => {
    it('returns props for hidden input', () => {
      const options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C', disabled: true },
      ];

      const { result } = renderHook(() =>
        useSelect({ options, defaultValue: 'b', name: 'foo', required: true }),
      );

      sinon.assert.match(result.current.getHiddenInputProps(), {
        name: 'foo',
        tabIndex: -1,
        'aria-hidden': true,
        required: true,
        value: 'b',
        style: {
          clip: 'rect(1px, 1px, 1px, 1px)',
          clipPath: 'inset(50%)',
          height: '1px',
          width: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          left: '50%',
          bottom: 0,
        },
      });
    });

    it('[multiple] returns correct value for the hidden input', () => {
      const options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C', disabled: true },
      ];

      const { result } = renderHook(() =>
        useSelect({
          multiple: true,
          options,
          defaultValue: ['a', 'b'],
          name: 'foo',
          required: true,
        }),
      );

      sinon.assert.match(result.current.getHiddenInputProps(), {
        name: 'foo',
        tabIndex: -1,
        'aria-hidden': true,
        required: true,
        value: JSON.stringify(['a', 'b']),
      });
    });

    it('[multiple with object value] returns correct value for the hidden input', () => {
      const options = [
        { value: { name: 'a' }, label: 'A' },
        { value: { name: 'b' }, label: 'B' },
        { value: { name: 'c' }, label: 'C', disabled: true },
      ];

      const { result } = renderHook(() =>
        useSelect<{ name: string }, true>({
          multiple: true,
          options,
          areOptionsEqual: (a, b) => a.name === b.name,
          defaultValue: [{ name: 'a' }, { name: 'b' }],
          name: 'foo',
          required: true,
        }),
      );

      sinon.assert.match(result.current.getHiddenInputProps(), {
        name: 'foo',
        tabIndex: -1,
        'aria-hidden': true,
        required: true,
        value: JSON.stringify([{ name: 'a' }, { name: 'b' }]),
      });
    });

    describe('onChange handler', () => {
      it('calls external onChange handler', () => {
        const externalOnChangeSpy = sinon.spy();

        const { result } = renderHook(() => useSelect({}));

        const { getHiddenInputProps } = result.current;
        const { onChange: hiddenInputOnChange } = getHiddenInputProps({
          onChange: externalOnChangeSpy,
        });

        // @ts-ignore We only need the target value for this test
        hiddenInputOnChange({ target: { value: 'foo' } });
        expect(externalOnChangeSpy.calledOnce).to.equal(true);
        expect(externalOnChangeSpy.calledWith({ target: { value: 'foo' } })).to.equal(true);
      });

      describe('browser autofill', () => {
        it('sets reducer value when called with valid option', () => {
          const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ];

          const { result } = renderHook(() => useSelect({ options }));

          const { value: initialValue, getHiddenInputProps } = result.current;
          const { onChange: hiddenInputOnChange } = getHiddenInputProps();

          expect(initialValue).to.equal(null);

          act(() => {
            // @ts-ignore We only need the target value for this test
            hiddenInputOnChange({ target: { value: 'a' } });
          });

          const { value: updatedValue } = result.current;

          expect(updatedValue).to.equal('a');
        });

        it('does not set reducer value when called with invalid option', () => {
          const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ];

          const { result } = renderHook(() => useSelect({ options }));

          const { value: initialValue, getHiddenInputProps } = result.current;
          const { onChange: hiddenInputOnChange } = getHiddenInputProps();

          expect(initialValue).to.equal(null);

          act(() => {
            // @ts-ignore We only need the target value for this test
            hiddenInputOnChange({ target: { value: 'c' } });
          });

          const { value: updatedValue } = result.current;

          expect(updatedValue).to.equal(null);
        });

        it('clears reducer value when called with empty string', () => {
          const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ];

          const { result } = renderHook(() => useSelect({ options, defaultValue: 'a' }));

          const { value: initialValue, getHiddenInputProps } = result.current;
          const { onChange: hiddenInputOnChange } = getHiddenInputProps();

          expect(initialValue).to.equal('a');

          act(() => {
            // @ts-ignore We only need the target value for this test
            hiddenInputOnChange({ target: { value: '' } });
          });

          const { value: updatedValue } = result.current;

          expect(updatedValue).to.equal(null);
        });

        it('should be preventable', () => {
          const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ];

          const onHiddenInputChange = (
            event: React.ChangeEvent<HTMLInputElement> & MuiCancellableEvent,
          ) => {
            event.defaultMuiPrevented = true;
          };

          const { result } = renderHook(() => useSelect({ options }));

          const { value: initialValue, getHiddenInputProps } = result.current;
          const { onChange: hiddenInputOnChange } = getHiddenInputProps({
            onChange: onHiddenInputChange,
          });

          expect(initialValue).to.equal(null);

          act(() => {
            // @ts-ignore We only need the target value for this test
            hiddenInputOnChange({ target: { value: 'a' } });
          });

          const { value: updatedValue } = result.current;

          expect(updatedValue).to.equal(null);
        });
      });
    });
  });
});
