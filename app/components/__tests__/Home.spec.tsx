import * as React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home';

it('renders the heading', () => {
  const result = shallow(<Home />).contains(<h1>Welcome to the React Starter</h1>);
  expect(result).toBeTruthy();
});
