import ReactDOM from "react-dom/client";
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import SinglePost from '../SinglePost';

import { BrowserRouter as Router } from 'react-router-dom'
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

it("renders singlePost without crashing", () => {
  const post = {
    post: {
      username: "username",
      content: "content",
      timestamp: "timestamp",
    }
  }
  act(() => {
    ReactDOM.createRoot(container).render(<Provider store={store}><Router><SinglePost post={post} /></Router></Provider>);
  });
});


it("renders singlePost class correctly", ()=>{
    const post = {
      post: {
        username: "username",
        content: "content",
        timestamp: "timestamp",
      }
    }
    const {getByTestId} = render(<Provider store={store}><Router><SinglePost post={post} /></Router></Provider>);
    expect(getByTestId('singlePostContainer')).toHaveAttribute('class', 'singlePostContainer');
    expect(getByTestId('ownerName')).toHaveAttribute('class', 'ownerName');
    expect(getByTestId('postContent')).toHaveAttribute('class', 'postContent');
    expect(getByTestId('timeStampContainer')).toHaveAttribute('class', 'timeStampContainer');
    expect(getByTestId('timeStamp')).toHaveAttribute('class', 'timeStamp');
});

it("matchs snapshot 1", ()=>{
  const post = {
    post: {
      username: "username",
      content: "content",
      timestamp: "timestamp",
    }
  }

  const tree = renderer.create(<Provider store={store}><Router><SinglePost post={post} /></Router></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});