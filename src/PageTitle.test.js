import { render } from '@testing-library/react';
import PageTitle from './PageTitle';

describe('PageTitle Component', () => {
  test("Should render with `title` props", () => {
    const pageTitle = render(<PageTitle title="React JS" />);
    expect(pageTitle).toMatchSnapshot();
  })

  test("Should render without `title` props", () => {
    const pageTitle = render(<PageTitle />);
    expect(pageTitle).toMatchSnapshot();
  })
})