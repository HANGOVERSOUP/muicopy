import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import ImageList from './ImageList';

const itemsData = [
  {
    img: 'images/image-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/image-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'director90',
  },
];

describe('<ImageList />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<ImageList />);
  });

  describeConformance(
    <ImageList>
      <div />
    </ImageList>,
    () => ({
      classes,
      inheritComponent: 'ul',
      mount,
      refInstanceof: window.HTMLUListElement,
      testComponentPropWith: 'li',
    }),
  );

  const children = itemsData.map((item) => (
    <span
      key={item.img}
      title={item.title}
      subtitle={<span>by: {item.author}</span>}
      data-testid="test-children"
    >
      <img src={item.img} alt="foo" />
    </span>
  ));

  it('should render children by default', () => {
    const { getAllByTestId } = render(<ImageList>{children}</ImageList>);

    expect(getAllByTestId('test-children').length).to.equal(2);
  });

  describe('classes:', () => {
    it('should render with the root and standard classes by default', () => {
      const { getByTestId } = render(<ImageList data-testid="test-root">{children}</ImageList>);

      expect(getByTestId('test-root')).to.have.class(classes.root);
      expect(getByTestId('test-root')).to.have.class(classes.standard);
    });

    it('should render with the masonry class', () => {
      const { getByTestId } = render(
        <ImageList data-testid="test-root" variant="masonry">
          {children}
        </ImageList>,
      );

      expect(getByTestId('test-root')).to.have.class(classes.root);
      expect(getByTestId('test-root')).to.have.class(classes.masonry);
    });

    it('should render with the quilted class', () => {
      const { getByTestId } = render(
        <ImageList data-testid="test-root" variant="woven">
          {children}
        </ImageList>,
      );

      expect(getByTestId('test-root')).to.have.class(classes.root);
      expect(getByTestId('test-root')).to.have.class(classes.woven);
    });

    it('should render with the woven class', () => {
      const { getByTestId } = render(
        <ImageList data-testid="test-root" variant="woven">
          {children}
        </ImageList>,
      );

      expect(getByTestId('test-root')).to.have.class(classes.root);
      expect(getByTestId('test-root')).to.have.class(classes.woven);
    });
  });

  describe('style attribute:', () => {
    it('should render with default grid-template-columns and gap styles', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByTestId } = render(<ImageList data-testid="test-root">{children}</ImageList>);

      expect(getByTestId('test-root').style['grid-template-columns']).to.equal('repeat(2, 1fr)');
      expect(getByTestId('test-root').style.gap).to.equal('4px');
    });

    it('should overwrite style', () => {
      const style = { backgroundColor: 'red' };
      const { getByTestId } = render(
        <ImageList style={style} data-testid="test-root">
          {children}
        </ImageList>,
      );

      expect(getByTestId('test-root').style).to.have.property('backgroundColor', 'red');
    });
  });

  describe('props:', () => {
    describe('prop: component', () => {
      it('should render a ul by default', () => {
        const { container } = render(<ImageList>{children}</ImageList>);
        expect(container.firstChild).to.have.property('nodeName', 'UL');
      });

      it('should render a different component', () => {
        const { container } = render(<ImageList component="div">{children}</ImageList>);
        expect(container.firstChild).to.have.property('nodeName', 'DIV');
      });
    });

    describe('prop: className', () => {
      it('should append the className to the root element', () => {
        const { container } = render(<ImageList className="foo">{children}</ImageList>);
        expect(container.firstChild).to.have.class('foo');
      });
    });

    describe('prop: variant', () => {
      it('should render with column-count and column-gap styles', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }

        const { getByTestId } = render(
          <ImageList data-testid="test-root" variant="masonry">
            {children}
          </ImageList>,
        );

        expect(getByTestId('test-root').style['column-count']).to.equal('2');
        expect(getByTestId('test-root').style['column-gap']).to.equal('4px');
      });
    });

    describe('prop: cols', () => {
      it('should render with modified grid-template-columns style', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }

        const { getByTestId } = render(
          <ImageList data-testid="test-root" cols={4}>
            {children}
          </ImageList>,
        );

        expect(getByTestId('test-root').style['grid-template-columns']).to.equal('repeat(4, 1fr)');
      });

      it('should render with modified column-count style', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }

        const { getByTestId } = render(
          <ImageList data-testid="test-root" variant="masonry" cols={4}>
            {children}
          </ImageList>,
        );

        expect(getByTestId('test-root').style['column-count']).to.equal('4');
      });
    });

    describe('prop: gap', () => {
      it('should render with modified grid-template-columns style', () => {
        const { getByTestId } = render(
          <ImageList data-testid="test-root" gap={8}>
            {children}
          </ImageList>,
        );

        expect(getByTestId('test-root').style.gap).to.equal('8px');
      });

      it('should render with modified column-gap style', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }

        const { getByTestId } = render(
          <ImageList data-testid="test-root" variant="masonry" gap={8}>
            {children}
          </ImageList>,
        );

        expect(getByTestId('test-root').style['column-gap']).to.equal('8px');
      });
    });
  });
});
