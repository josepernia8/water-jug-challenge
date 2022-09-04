import { render, unmountComponentAtNode } from "react-dom";
import ResultTable from "../app/components/ResultTable";
import { act } from "react-dom/test-utils";

describe('Render Table Succesfully', () => {
  let container: Element;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('Renders with Best Solution', () => {
    const data = [{
      'Bucket X': 2,
      'Bucket Y': 0,
      'Explanation': 'Fill bucket Bucket X'
    }];

    act(() => {
      render(<ResultTable data={data}/>, container);
    });

    const caption = container.querySelector('caption');
    expect(caption!.textContent).toBe('Best Solution');

    const td = container.querySelectorAll('td');
    expect(td[0].textContent).toBe('2');
    expect(td[1].textContent).toBe('0');
    expect(td[2].textContent).toBe('Fill bucket Bucket X');
  })
})