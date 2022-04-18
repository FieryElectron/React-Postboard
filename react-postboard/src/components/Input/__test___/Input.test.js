import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Input from '../Input';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders input without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Input />);
    });
});

it("renders input class correctly", ()=>{
    const {getByTestId} = render(<Input/>);
    expect(getByTestId('inputContainer')).toHaveAttribute('class', 'inputContainer');
    expect(getByTestId('input')).toHaveAttribute('class', 'input');
});

it("renders input placeholder correctly", ()=>{
    const {getByTestId} = render(<Input placeholder="Input some text"/>);
    expect(getByTestId('input')).toHaveAttribute('placeholder', 'Input some text');
});

it("renders input type correctly", ()=>{
    const {getByTestId} = render(<Input type="Password"/>);
    expect(getByTestId('input')).toHaveAttribute('type', 'Password');
});

it("should call onChange callback", ()=>{
    const onChange = jest.fn();
    const {getByTestId} = render(<Input onChange={onChange}/>);
    fireEvent.change(getByTestId('input'), {target: {value: 'some text'}});
    expect(onChange).toHaveBeenCalled();
});

it("matchs snapshot 1", ()=>{
    const onChange = jest.fn();
    const tree = renderer.create(<Input placeholder='placeholder' type="Password" onChange={onChange}/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 

it("matchs snapshot 2", ()=>{
    const onChange = jest.fn();
    const tree = renderer.create(<Input placeholder='username' onChange={onChange}/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 

