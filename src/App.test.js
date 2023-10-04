import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';


describe("App Component", () => {
  test("Should render successfully", () => {
    const appComponent = render(<App />);
    expect(appComponent).toMatchSnapshot();
  })

  test("Process CSV to Table", () => {

    const FILE_CONTENT = `Name,Job
    Lakshmi,  UI Engineer
    Kalyan, DevOPS
    Haseena, React Developer`;

    const FILE_NAME = 'data.csv';

    const readAsTextMock = jest.fn();
    jest.spyOn(global, 'FileReader').mockImplementation(function () {
      const self = this;
      this.readAsText = readAsTextMock.mockImplementation(() => {
        self.onload({ target: { result: FILE_CONTENT } });
      });
    });

    const appComponent = render(<App />);
    const input = screen.getByTestId("inputFile"); // <element data-testid="inputFile"  />
    expect(input).toBeInTheDocument();



    const file = new File([FILE_CONTENT], FILE_NAME)
    fireEvent.change(input, {
      target: {
        files: [file]
      }
    })

  })
})
