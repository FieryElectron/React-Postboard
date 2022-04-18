import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import PostBoardPage from '../PostBoardPage';
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

it("renders postBoardPage without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<Router><PostBoardPage/></Router>);
    });
});


it("matchs snapshot 1", ()=>{
  const tree = renderer.create(<Router><PostBoardPage/></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
