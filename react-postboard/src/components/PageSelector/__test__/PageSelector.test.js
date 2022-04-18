import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import PageSelector from '../PageSelector';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders pageSelector without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<PageSelector/>);
    });
});

it("renders pageSelector class correctly", ()=>{
    const {getByTestId} = render(<PageSelector/>);
    expect(getByTestId('pageSelectorContainer')).toHaveAttribute('class', 'pageSelectorContainer');
    expect(getByTestId('pageSelectorTitle')).toHaveAttribute('class', 'pageSelectorTitle');
    expect(getByTestId('pageSelectorSelect')).toHaveAttribute('class', 'pageSelectorSelect');
});

it("matchs snapshot 1", ()=>{
    const tree = renderer.create(<PageSelector/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 
 



