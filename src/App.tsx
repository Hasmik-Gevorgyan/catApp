import React,{lazy,Suspense} from 'react';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import Menu from './components/Menu';
import { categoryType } from './types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Category = lazy(() => import("./components/Categories"));

interface IAppProps{}

interface IAppState {
  categories: categoryType[];
}

const StyledApp = styled.div`
  display: flex;
  justify-content: space-between;

  @media(max-width: 590px) {
    display: block;
  }
`;

const StyledBody = styled.div`
  width: 100%;
`;

class App extends  React.Component<IAppProps,IAppState>{
  constructor(props:IAppProps) {
    super(props);
    this.state = {
      categories: [],
    }

    this.getCategories = this.getCategories.bind(this);
  }

  public componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    try {
      await fetch(`https://api.thecatapi.com/v1/categories`, {
        method: "GET",
        headers: {
          "x-api-key": "29197497-0a20-42ce-81bc-00673e6b6833",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) =>
          response.json().then((data) => {
            this.setState({categories: data})
          })
        )
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    
    let items = { name: 'categories', items: this.state.categories };
    let isMobile = window.innerWidth <= 590;
    console.log(isMobile)
    return (
      <Router>
        <StyledApp>
          {isMobile ?
            <Menu
              items = {items}
            />
            :
            <SideBar
              items = {items}
            />
          }
          <StyledBody> 
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route exact path={["/home", "/"]}>
                <Home />
              </Route>
              {this.state.categories.map(category =>
                <Route exact key={category.id} path={`/${category.name}`}>
                  <Category
                    key={category.id}
                    category={category}
                  />
                </Route>
              )} 
              </Switch>
              </Suspense>
          </StyledBody>
        </StyledApp>
      </Router>
    )
  }
}

export default App;
