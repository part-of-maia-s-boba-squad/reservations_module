import React from 'react';

class PartySize extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="partySize">
        <div id="partySizeTitle">
            Party Size
        </div>
        <select id="partySize">
          <option value="2">For 2</option>
          <option value="3">For 3</option>
          <option value="4">For 4</option>
        </select>
      </div>
    );
  }
}

export default PartySize;
