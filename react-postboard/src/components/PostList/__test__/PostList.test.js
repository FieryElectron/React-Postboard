import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import PostList from '../PostList';


let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders postList without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<PostList/>);
    });
});


it("matchs snapshot 1", ()=>{
  const tree = renderer.create(<PostList/>).toJSON();
  expect(tree).toMatchSnapshot();
});