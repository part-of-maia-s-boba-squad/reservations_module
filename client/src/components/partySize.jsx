import React from 'react';
import styled from 'styled-components';

const PartySizeLabel = styled.div`
  font-size: .875rem;
  font-weight: 500;
  padding-bottom: .25rem;
  margin: 0;
  display: block;
`;

const PartySizeSelectMenu = styled.select`
  border: none;
  cursor: pointer;
  font-family: inherit;
  background-color: #fff;
  font-size: .875rem;
  display: blocl;
  width: 100%;
  height: 35px;
  -webkit-appearance: none;
  border-radius: 0;
  border-bottom: 1px solid #d8d9db;
`;


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
        <PartySizeLabel>
            Party Size
        </PartySizeLabel>
        <div>
          <div id="partySizeMenuText">
            For {this.props.selectedPartySize}
          </div>
          <PartySizeSelectMenu value={this.props.selectedPartySize} onChange={(e) => this.props.updatePartySize(e)}>
            {partySizeMenu}
          </PartySizeSelectMenu>
        </div>
      </div>
    );
  }
}

export default PartySize;
