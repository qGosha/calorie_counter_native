import React from 'react';
import '../style/show_search_result.css';
import { FoodListItem } from '../components/foodListItem';
import { SepFoodList } from '../components/foodSepList';
import { ListGroup, ListGroupItem, Tab, Image, Row, Col, NavItem, NavDropdown, MenuItem, Nav
} from 'react-bootstrap';
export const SearchResult = ({ foundFood, term, addToBasket }) => {
  if (!foundFood) return null;
  else {
    const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
    const common = foundFood.common.slice(0,5);
    const branded = foundFood.branded.slice(0, 3);
    const self = foundFood.self.slice(0, 5);

    const foodListGroup = (title, element) => {
      return (
        <ListGroup>
           <h5 className='food-group-title'>{title}</h5>
           {element}
        </ListGroup>
      )
    }

    return (
      <Tab.Container id="tabs-with-dropdown" defaultActiveKey="1">
        <Row className="clearfix">
          <Col sm={12} xsHidden className='dropdown-tab-cont'>
            <Nav bsStyle="tabs" className='dropdown-tab-list flex'>
              <NavItem eventKey="1">All</NavItem>
              <NavItem eventKey="2">Your foods</NavItem>
              <NavItem eventKey="4">Common</NavItem>
              <NavItem eventKey="5">Branded</NavItem>
            </Nav>
          </Col>
          <Col sm={12} smHidden mdHidden lgHidden className='dropdown-tab-cont'>
            <Nav bsStyle="tabs" className='dropdown-tab-list'>
              <NavItem eventKey="1">All</NavItem>
              <NavDropdown eventKey="3" title="Other options">
                <MenuItem eventKey="2">Your foods</MenuItem>
                <MenuItem eventKey="4">Common</MenuItem>
                <MenuItem eventKey="5">Branded</MenuItem>
              </NavDropdown>
            </Nav>
          </Col>
          <Col sm={12} >
            <Tab.Content animation mountOnEnter>
              <Tab.Pane eventKey="1">
                {self.length ? foodListGroup('Your Foods', <FoodListItem foods={self} addToBasket={addToBasket}/>) : null}
                {common.length ? foodListGroup('Common food', <FoodListItem foods={common} addToBasket={addToBasket}/>) : null}
                {branded.length ? foodListGroup('Branded food', <FoodListItem foods={branded} addToBasket={addToBasket}/>) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="2"><SepFoodList addToBasket={addToBasket} foods={foundFood.self} title='Your food'/></Tab.Pane>
              <Tab.Pane eventKey="4"><SepFoodList addToBasket={addToBasket} foods={foundFood.common} title='Common food'/></Tab.Pane>
              <Tab.Pane eventKey="5"><SepFoodList addToBasket={addToBasket} foods={foundFood.branded} title='Branded food'/></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }

}
