import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import CreatePostField from '../CreatePostField';

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
        ReactDOM.createRoot(container).render(<CreatePostField/>);
    });
});

it("renders createPostField class correctly", ()=>{
    const {getByTestId} = render(<CreatePostField/>);
    expect(getByTestId('createPostFieldContainer')).toHaveAttribute('class', 'createPostFieldContainer');
});



it("matchs snapshot 1", ()=>{
    const tree = renderer.create(<CreatePostField/>).toJSON();
    expect(tree).toMatchSnapshot();
}); 
 



