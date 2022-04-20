import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import PostList from '../PostList';
import { BrowserRouter as Router} from 'react-router-dom'
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


it("renders postList without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Provider store={store}><Router><PostList/></Router></Provider>);
    });
});


it("matchs snapshot 1", ()=>{
  const tree = renderer.create(<Provider store={store}><Router><PostList/></Router></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});