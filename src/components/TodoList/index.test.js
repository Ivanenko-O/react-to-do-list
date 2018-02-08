import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import TodoList from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<TodoList />);

describe('TodoList component: ', () => {

    test(` should have one element with `, () => {
        expect(true);
    });
});
