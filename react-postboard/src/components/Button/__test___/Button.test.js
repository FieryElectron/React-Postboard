import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders button without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Button />);
    });
});

it("renders button color correctly", ()=>{
    const {getByTestId} = render(<Button color='red'/>);
    expect(getByTestId('button')).toHaveStyle({'background-color': 'red'});
});

it("renders button text correctly", ()=>{
    const {getByTestId} = render(<Button text='click me please'/>);
    expect(getByTestId('button')).toHaveTextContent('click me please');
});

it("should call onClick callback", ()=>{
    const onClick = jest.fn();
    const {getByTestId} = render(<Button onClick={onClick}/>);
    fireEvent.click(getByTestId('button'));
    expect(onClick).toHaveBeenCalled();
});
 
it("matchs snapshot 1", ()=>{
    const onClick = jest.fn();
    const tree = renderer.create(<Button color='blue' text="click" onClick={onClick}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it("matchs snapshot 2", ()=>{
    const onClick = jest.fn();
    const tree = renderer.create(<Button color='green' text="save" onClick={onClick}/>).toJSON();
    expect(tree).toMatchSnapshot();
});