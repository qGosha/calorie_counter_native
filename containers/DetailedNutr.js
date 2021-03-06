import React from 'react';
import { connect } from 'react-redux';
import { DetailedNutrPanel } from '../components/detailedNutrPanel'
import { Container, Content, } from 'native-base';

const DetailedNutr = props => {
  const basketItem = props.basket[props.id];
  if (!basketItem) return null
  return (
    <Container>
      <Content style={{ paddingHorizontal: 15, paddingVertical: 4 }}>
      <DetailedNutrPanel
        foodObj={basketItem}
        dailyCal={props.dailyCal}
        isFromBasket={true}/>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  basket: state.basket,
  dailyCal: state.dash.userInfo['daily_kcal'],
});
export default connect(
  mapStateToProps,
  null
)(DetailedNutr);
