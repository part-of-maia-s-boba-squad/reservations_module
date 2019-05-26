import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import PartySize, {DownArrow} from '../client/src/components/partySize.jsx';

import { shallow, mount, render } from 'enzyme';

describe('PartySize', () => {
    it('should have a downward icon', () => {
        const wrapper = shallow(<PartySize />);
        expect(wrapper.find(DownArrow)).toHaveLength(1);
    });

    it('should have a select menu', () => {
        const wrapper = shallow(<PartySize />);
        expect(wrapper.find('#partySizeSelect')).toHaveLength(1);
    });

    it('should have 20 options', () => {
        const wrapper = shallow(<PartySize />);
        expect(wrapper.find('option')).toHaveLength(20);
    });
});