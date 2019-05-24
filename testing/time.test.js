import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Time from '../client/src/components/time.jsx';

import { shallow, mount, render } from 'enzyme';

describe('Time', () => {
    it('should have 48 options', () => {
        const wrapper = shallow(<Time />);
        expect(wrapper.find('option')).toHaveLength(48);
    });
});