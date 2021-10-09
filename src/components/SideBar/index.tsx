import React from "react";
import styled from "styled-components";
import {  Link } from "react-router-dom";
import { sidebarType, categoryType } from '../../types';

interface ISidebarProps {
  items: sidebarType;
}

const StyledSidebar = styled.div`
    background: #f4f4f4;
    width: 330px;
    max-width: 33%;
    min-height:100vh;
    padding: 16px;

    > div{
      position: fixed;
    }
`;

const StyledSideNavItems = styled.div`
  cursor: pointer;
  font-size: 18px;
  color: #0f62fe;
  text-transform: uppercase;
  font-weight: 600;
  margin: 8px 0;
  a {
    text-decoration: none;
    color: #0f62fe;
  }
`;

const StyledSideNavLink = styled.div`
  cursor: pointer;
  padding: 4px;
  color: #0f62fe;
  font-size: 16px;
`;

const SideBar = (props: ISidebarProps) => {

  const { items } = props;
  
  return (
    <StyledSidebar>
      <div>
        <StyledSideNavItems>
          <Link to={"/home"}>
            home
          </Link>          
        </StyledSideNavItems>
        <StyledSideNavItems>
          {items.name}
          {items.items && items.items.map((link: categoryType) =>
            <StyledSideNavLink key = {link.id}>
              <Link to={"/" + link.name}>
                {link.name}
                </Link>
            </StyledSideNavLink>         
          )}
        </StyledSideNavItems>
      </div>
    </StyledSidebar>
  )
}

export default SideBar;