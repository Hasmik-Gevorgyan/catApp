import React from "react";
import styled from "styled-components";
import { imageType } from '../../types';

interface IHomeProps {}

interface IHomeState {
  images: imageType[];
}

const StyledHome = styled.div`
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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

class Home extends React.Component<IHomeProps,IHomeState> {
  constructor(props:IHomeProps) {
    super(props);
    this.state = {
      images: []
    }

    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    this.getImages()
  }

  async getImages() {
    try {
      await fetch(`https://api.thecatapi.com/v1/images/search?limit=10`, {
        method: "GET",
        headers: {
          "x-api-key": "29197497-0a20-42ce-81bc-00673e6b6833",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) =>
          response.json().then((data) => {
            this.setState({images: data})
          })
        )
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { images } = this.state;

    return (
      <StyledHome className="App">
        {images.map((image: imageType) => 
          <StyledImage key={image.id} src={image.url}/>
        )}
      </StyledHome>
    );
  }
}

export default Home