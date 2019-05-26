import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Reservations from '../client/src/components/reservations.jsx';

import { shallow, mount, render } from 'enzyme';
import { isTSAnyKeyword, tsImportEqualsDeclaration } from '@babel/types';



describe('Reservations', () => {
    it('should have a title', () => {
        const wrapper = shallow(<Reservations />);
        var test = wrapper.find('#title');
        // console.log(test.debug());
        expect(test).toHaveLength(1);
    });

    it('should render a title for this component', () => {
        const wrapper = shallow(<Reservations />);
        expect(wrapper.find('#title').text()).toBe('Make a reservation');
    });


    it('should have default time of 12:30 PM', () => {
        const wrapper = shallow(<Reservations />);
        expect(wrapper.state().selectedTime).toBe('12:30 PM');
    });

    it('should have function getAvailableReservations button', () => {
        const spy = jest.spyOn(Reservations.prototype, 'getAvailableReservations');
        const wrapper = shallow(<Reservations />);
        wrapper.find('#selectButton').simulate('click');
        expect(spy).toHaveBeenCalled();
    });


});


