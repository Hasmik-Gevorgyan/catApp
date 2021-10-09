import React, {useState} from "react";
import styled ,{css }from "styled-components";
import {  Link } from "react-router-dom";
import { sidebarType, categoryType } from '../../types';
import { IoMdArrowDropup,IoMdArrowDropdown } from 'react-icons/io';

interface IMenuProps {
  items: sidebarType;
}

const StyledMenu = styled.div`
    background: #f4f4f4;
    padding: 4px;
    a {
      text-decoration: none;
      color: #0f62fe;
    }

    > div:first-child {
      display: flex;
      justify-content: space-between;
    }
`;

const StyledSideNavItems = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: #0f62fe;
  text-transform: uppercase;
  font-weight: 600;
  margin: 8px 0;
`;

const StyledDropdownHeader = styled.div`
  background: #14b9b9;    
  text-transform: capitalize;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  height: 26px;
  width: 100px;
  font-size: 14px;
  color: white;
`;

const StyledDropdownBody = styled.div<{isOpen: boolean}>`
  ${props=> !props.isOpen && css`
      display: none;
  `} ;
  background: #14b9b9;
  position: absolute;
  top: 30px;
  right: 4px;
  width: 108px;
  
  a {
    text-decoration: none;
    color: white;
    font-size: 14px;
  }
`;

const StyledDropdownItem = styled.div`
  padding: 4px;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
`;

const Menu = (props: IMenuProps) => {

  const [isOpen, setOpen] = useState(false);
  const { items } = props;
  
  return (
    <StyledMenu>
      <div>
        <StyledSideNavItems>
          <Link to={"/home"}>
            home
          </Link>          
        </StyledSideNavItems>
        <StyledDropdownHeader onClick={() => { setOpen(!isOpen) }}>
          {items.name}
          {isOpen ?
            <IoMdArrowDropup />
            :
            <IoMdArrowDropdown />
          } 
        </StyledDropdownHeader>
      </div>
      <StyledDropdownBody isOpen= {isOpen}>
        {items.items && items.items.map((link: categoryType) =>
          <StyledDropdownItem key = {link.id} onClick={()=>{setOpen(false)}}>
            <Link to={"/" + link.name}>
              {link.name}
              </Link>
          </StyledDropdownItem>         
        )}
      </StyledDropdownBody>
    </StyledMenu>
  )
}

export default Menu;