import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import TimeSelector from '../TimeSelector';

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../../../store';


let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders timeSelector without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Provider store={store}><Router><TimeSelector/></Router></Provider>);
    });
});

it("renders timeSelector class correctly", ()=>{
    const {getByTestId} = render(<Provider store={store}><Router><TimeSelector/></Router></Provider>);
    expect(getByTestId('timeSelectorContainer')).toHaveAttribute('class', 'timeSelectorContainer');
    expect(getByTestId('timeSelectorTitle1')).toHaveAttribute('class', 'timeSelectorTitle');
    expect(getByTestId('timeSelectorDate1')).toHaveAttribute('class', 'timeSelectorDate');
    expect(getByTestId('timeSelectorTitle2')).toHaveAttribute('class', 'timeSelectorTitle');
    expect(getByTestId('timeSelectorDate2')).toHaveAttribute('class', 'timeSelectorDate');
});

 
it("matchs snapshot 1", ()=>{
    const tree = renderer.create(<Provider store={store}><Router><TimeSelector/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });