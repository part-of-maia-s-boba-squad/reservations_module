import React from 'react';
import styled from 'styled-components';

const PartySizeDiv = styled.div`
  position: relative;
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
  top: 20px;
  display: table;
  width: 290px;
  z-index: -1;
`;

const PartySizeSpan = styled.div`
  display: table-cell;
  vertical-align:middle;
  text-align: left;
`;

  const PartySizeSelectMenu = styled.select`
  border: none;
  cursor: pointer;
  font-family: inherit;
  background-color: Transparent;
  color: Transparent;
  font-size: .875rem;
  display: absolute;
  width: 100%;
  height: 35px;
  -webkit-appearance: none;
  border-radius: 0;
  border-bottom: 1px solid #d8d9db;
  z-index: 1;
  &:focus {outline:0;}

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
          <PartySizeDisplay>
            <PartySizeSpan>For {this.props.selectedPartySize}</PartySizeSpan>
          </PartySizeDisplay>
          <PartySizeSelectMenu value={this.props.selectedPartySize} onChange={(e) => this.props.updatePartySize(e)}>
            {partySizeMenu}
          </PartySizeSelectMenu>
      </PartySizeDiv>
    );
  }
}

export default PartySize;
