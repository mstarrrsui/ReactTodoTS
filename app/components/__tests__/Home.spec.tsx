import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Home from '../Home';

it('renders the heading', () => {
  const result = shallow(<Home />).contains(<h1>Welcome to the React Starter</h1>);
  expect(result).toBeTruthy();
});

it('renders the mainimgcontainer', () => {
  const wrapper = shallow(<Home />);
  console.log(wrapper);
  expect(wrapper.find('.mainimgcontainer')).toHaveLength(1);
  expect(wrapper.find('.mainimg')).toHaveLength(1);
});
