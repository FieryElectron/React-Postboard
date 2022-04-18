import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Header from '../Header';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders header without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Header/>);
    });
});

it("renders header class correctly", ()=>{
    const {getByTestId} = render(<Header/>);
    expect(getByTestId('headerContainer')).toHaveAttribute('class', 'headerContainer');
    expect(getByTestId('header')).toHaveAttribute('class', 'header');
});

it("renders header title correctly", ()=>{
    const {getByTestId} = render(<Header title="PostBoard"/>);
    expect(getByTestId('header')).toHaveTextContent("PostBoard");
});

it("matchs snapshot 1", ()=>{
    const tree = renderer.create(<Header title="Sign In"/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 
 
it("matchs snapshot 2", ()=>{
    const tree = renderer.create(<Header title="PostBoard"/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 


