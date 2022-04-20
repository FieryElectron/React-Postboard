import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router} from 'react-router-dom'

import SignInPage from '../SignInPage';
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

it("renders signInPage without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Provider store={store}><Router><SignInPage/></Router></Provider>);
    });
});

it("matchs snapshot 1", ()=>{
  const tree = renderer.create(<Provider store={store}><Router><SignInPage/></Router></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});