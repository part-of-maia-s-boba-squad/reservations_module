import React from 'react';

class PartySize extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var partySizeMenu = [];
    for (let size = 1; size <= 20; size++) {
      partySizeMenu.push((<option value={`${size}`} key={`${size}`}>{size}</option>))
    }

    return (
      <div id="partySize">
        <div id="partySizeTitle">
            Party Size
        </div>
        <div>
          <div id="partySizeMenuText">
            For {this.props.selectedPartySize}
          </div>
          <select id="partySizeMenu" value={this.props.selectedPartySize} onChange={(e) => this.props.updatePartySize(e)}>
            {partySizeMenu}
          </select>
        </div>
      </div>
    );
  }
}

export default PartySize;
