import React from "react";
import styled from "styled-components";
import { imageType,categoryType } from '../../types';

interface ICategoryProps {
  category: categoryType;
}

interface ICategoryState {
  page: number;
  items: imageType[];
}

const StyledCategory = styled.div`
  padding: 24px;
`;

const StyledHeader = styled.div`
  background: #f4f4f4;
  padding: 12px;
  border-radius: 8px;
  color: #1c7aff;
  font-weight: 700;
  text-transform: uppercase;

  @media(max-width: 590px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const StyledImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledItem = styled.div`
  margin-top: 8px;
`;

const StyledButton = styled.div`
  margin: 24px 0;
  display: flex;
  justify-content: center;
  text-align: center;

  div {
    width: 150px;
    background: #14b9b9;
    color: white;
    cursor: pointer;
    border-radius: 8px;
    padding: 4px;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
  }

  @media(max-width: 590px) {
    margin: 18px 0;
    div {
      width: 100px;
      border-radius: 4px;
      padding: 4px;
      font-size: 12px;
    }
  }
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 14px;

  @media(max-width: 590px) {
    width: 100px;
    height: 100px;
  }
`;

class Category extends React.Component<ICategoryProps,ICategoryState> {
  constructor(props: ICategoryProps) {
    super(props);
    this.state = {
      page: 1,
      items: [],
    }

    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.getCategory()
  }

  async getCategory() {
    try {
      await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${this.state.page}&category_ids=${this.props.category.id}`, {
        method: "GET",
        headers: {
          "x-api-key": "29197497-0a20-42ce-81bc-00673e6b6833",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) =>
          response.json().then((data) => {
            this.setState({items: [...this.state.items,...data], page: this.state.page+1})
          })
        )
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    const { items } = this.state;
    
    return (    
      <StyledCategory>
        <StyledHeader>
          {this.props.category.name}
        </StyledHeader>
        <StyledImages>
          {items.map(item =>
            <StyledItem key={item.id}>
              <StyledImage src={item.url}/>
            </StyledItem>
          )}
        </StyledImages>
        <StyledButton>
          <div onClick={this.getCategory}>
            Load more
          </div>
        </StyledButton>
      </StyledCategory>
    )
  }
}

export default Category;