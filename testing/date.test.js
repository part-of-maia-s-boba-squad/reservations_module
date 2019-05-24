import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Date from '../client/src/components/date.jsx';

import { shallow, mount, render } from 'enzyme';

describe('Date', () => {
    it('should toggle calendar', () => {
        const wrapper = shallow(<Date />);
        wrapper.find('#displayDiv').simulate('click');
        expect(wrapper.state().showCalendar).toBe(true);
    });
});