import React from 'react';
import { Container, Content, } from 'native-base';
import { DetailedNutrPanel } from './detailedNutrPanel'

export const DetailedPeriod = props => {
  return (
    <Container>
      <Content style={{ paddingHorizontal: 15, paddingVertical: 4 }}>
      <DetailedNutrPanel
        foodObj={props.foods}
        dailyCal={props.dailyCal} />
      </Content>
    </Container>
  );
};
