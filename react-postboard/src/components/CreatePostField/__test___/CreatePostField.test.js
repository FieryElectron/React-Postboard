import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import CreatePostField from '../CreatePostField';
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


it("renders createPostField without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Provider store={store}><Router><CreatePostField/></Router></Provider>);
    });
});

it("renders createPostField class correctly", ()=>{
    const {getByTestId} = render(<Provider store={store}><Router><CreatePostField/></Router></Provider>);
    expect(getByTestId('createPostFieldContainer')).toHaveAttribute('class', 'createPostFieldContainer');
});



it("matchs snapshot 1", ()=>{
    const tree = renderer.create(<Provider store={store}><Router><CreatePostField/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
}); 
 



