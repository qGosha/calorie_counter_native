import React from 'react';
import { FoodListItem } from '../components/foodListItem';
import { SepFoodList } from '../components/foodSepList';
import {
  List,
  ListItem,
  Text,
  Separator,
  Button,
  Content,
  View,
  Tab,
  Tabs,
} from 'native-base';

export const SearchResult = ({ foundFood, term, addToBasket }) => {
  if (!foundFood) return null;
  else {
    const foodAvatarUrl =
      'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
    const common = foundFood.common.slice(0, 5);
    const branded = foundFood.branded.slice(0, 3);
    const self = foundFood.self.slice(0, 5);

    const foodListGroup = (title, element) => {
      return (
        <List>
          <Separator bordered>
            <Text>{title}</Text>
          </Separator>
          {element}
        </List>
      );
    };
    return (
      <Tabs initialPage={0}>
        <Tab heading="All">
          <Content>
            {self.length
              ? foodListGroup(
                  'Your Foods',
                  <FoodListItem foods={self} addToBasket={addToBasket} />
                )
              : null}
            {common.length
              ? foodListGroup(
                  'Common food',
                  <FoodListItem foods={common} addToBasket={addToBasket} />
                )
              : null}
            {branded.length
              ? foodListGroup(
                  'Branded food',
                  <FoodListItem foods={branded} addToBasket={addToBasket} />
                )
              : null}
          </Content>
        </Tab>
        <Tab heading="Your foods">
          <Content>
            <SepFoodList
              addToBasket={addToBasket}
              foods={foundFood.self}
              title="Your food"
            />
          </Content>
        </Tab>
        <Tab heading="Common">
          <Content>
            <SepFoodList
              addToBasket={addToBasket}
              foods={foundFood.common}
              title="Common food"
            />
          </Content>
        </Tab>
        <Tab heading="Branded">
          <Content>
            <SepFoodList
              addToBasket={addToBasket}
              foods={foundFood.branded}
              title="Branded food"
            />
          </Content>
        </Tab>
      </Tabs>
    );
  }
};
