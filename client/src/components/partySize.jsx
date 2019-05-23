import React from 'react';
import styled from 'styled-components';

const PartySizeDiv = styled.div`
  position: static;
`;

const PartySizeLabel = styled.div`
  font-size: .875rem;
  font-weight: 500;
  padding-bottom: .25rem;
  margin: 0;
  display: block;
  `;
  
const PartySizeDisplay = styled.div`
  font-family: inherit;
  background-color: #fff;
  font-size: .875rem;
  height: 35px;
  position: absolute;
  display: table;
`;

const PartySizeSpan = styled.div`
  display: table-cell;
  vertical-align:middle;
  text-align: center;
`;

  const PartySizeSelectMenu = styled.select`
  border: none;
  cursor: pointer;
  font-family: inherit;
  background-color: #fff;
  font-size: .875rem;
  display: block;
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
      <PartySizeDiv>
        <PartySizeLabel>
            Party Size
        </PartySizeLabel>
        <div>
          <PartySizeDisplay>
            <PartySizeSpan>For {this.props.selectedPartySize}</PartySizeSpan>
          </PartySizeDisplay>
          <PartySizeSelectMenu value={this.props.selectedPartySize} onChange={(e) => this.props.updatePartySize(e)}>
            {partySizeMenu}
          </PartySizeSelectMenu>
        </div>
      </PartySizeDiv>
    );
  }
}

export default PartySize;
