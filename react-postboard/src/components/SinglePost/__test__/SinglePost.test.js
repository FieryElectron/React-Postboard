import ReactDOM from "react-dom/client";
import { render, fireEvent  } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import SinglePost from '../SinglePost';


let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders singlePost without crashing", ()=>{
    act(() => {
        ReactDOM.createRoot(container).render(<SinglePost/>);
    });
});


it("renders singlePost class correctly", ()=>{
    const {getByTestId} = render(<SinglePost/>);
    expect(getByTestId('singlePostContainer')).toHaveAttribute('class', 'singlePostContainer');
    expect(getByTestId('ownerName')).toHaveAttribute('class', 'ownerName');
    expect(getByTestId('postContent')).toHaveAttribute('class', 'postContent');
    expect(getByTestId('timeStampContainer')).toHaveAttribute('class', 'timeStampContainer');
    expect(getByTestId('timeStamp')).toHaveAttribute('class', 'timeStamp');
});

it("matchs snapshot 1", ()=>{
  const tree = renderer.create(<SinglePost/>).toJSON();
  expect(tree).toMatchSnapshot();
});