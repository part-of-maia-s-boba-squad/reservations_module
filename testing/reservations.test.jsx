import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Reservations from '../client/src/components/reservations.jsx';

import { shallow, mount, render } from 'enzyme';
import { isTSAnyKeyword } from '@babel/types';



describe('Reservations', () => {
    it('should have two columns', () => {
        const wrapper = shallow(<Reservations />);
        var test = wrapper.find('.column');
        // console.log(test.debug());
        expect(test).toHaveLength(2);
    });
});



