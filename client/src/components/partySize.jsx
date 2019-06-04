import React from 'react';
import styled from 'styled-components';

const PartySizeDiv = styled.div`
  grid-column: 1/3;
  position: relative;
  @media(max-width:1055px) {
    grid-column: 1/2;
  }
`;

const PartySizeLabel = styled.div`
  font-size: .875rem;
  font-weight: 500;
  padding: 0;
  margin: 0;
  display: block;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
`;
  
const PartySizeDisplay = styled.div`
  font-family: inherit;
  background-color: #fff;
  font-size: .875rem;
  height: 35px;
  position: absolute;
  top: 20px;
  display: table;
  width: 100%;
  z-index: -1;
`;

const PartySizeSpan = styled.div`
  display: table-cell;
  vertical-align:middle;
  text-align: left;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
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
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  &:focus {outline:0;}
  &:hover{border-bottom: 2px solid #da3743;};
`;

export const DownArrow = styled.svg`
  position: absolute;
  top: 0;
  right: 4px;
  height: 100%;
  width: .5rem;
  fill: #6f737b;
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
            <DownArrow className="f6180ebd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24"><path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}} /></DownArrow>
          </PartySizeDisplay>
          <PartySizeSelectMenu id="partySizeSelect" value={this.props.selectedPartySize} onChange={(e) => this.props.updatePartySize(e)}>
            {partySizeMenu}
          </PartySizeSelectMenu>
      </PartySizeDiv>
    );
  }
}

export default PartySize;
