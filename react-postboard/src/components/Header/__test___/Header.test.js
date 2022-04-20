import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Header from '../Header';
import { Provider } from 'react-redux';
import store from '../../../store';
import { BrowserRouter as Router} from 'react-router-dom'

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("", ()=>{

})

it("renders header without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Provider store={store}><Router><Header/></Router></Provider>);
    });
});

it("renders header class correctly", ()=>{
    const {getByTestId} = render(<Provider store={store}><Router><Header/></Router></Provider>);
    expect(getByTestId('headerContainer')).toHaveAttribute('class', 'headerContainer');
    expect(getByTestId('header')).toHaveAttribute('class', 'header');
});

it("renders header title correctly", ()=>{
    const {getByTestId} = render(<Provider store={store}><Router><Header title="PostBoard"/></Router></Provider>);
    expect(getByTestId('header')).toHaveTextContent("PostBoard");
});

it("matchs snapshot 1", ()=>{
    const tree = renderer.create(<Provider store={store}><Router><Header title="Sign In"/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
}); 
 
it("matchs snapshot 2", ()=>{
    const tree = renderer.create(<Provider store={store}><Router><Header title="PostBoard"/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
}); 


