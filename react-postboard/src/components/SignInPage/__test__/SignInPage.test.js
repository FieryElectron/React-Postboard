import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router} from 'react-router-dom'

import SignInPage from '../SignInPage';


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
        ReactDOM.createRoot(container).render(<Router><SignInPage/></Router>);
    });
});

it("matchs snapshot 1", ()=>{
  const tree = renderer.create(<Router><SignInPage/></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});