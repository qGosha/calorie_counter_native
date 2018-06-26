import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Content, View } from 'native-base';

// import { SearchResult } from '../components/showSearchResult';
// import { MyFoodPanel } from '../components/myFoodPanel';
// import { SearchBarPanel } from '../components/search-bar-panel';
import  debounce  from 'lodash.debounce';
// import { v4 } from 'uuid';
// import { BASKET } from './Modal';
import {
  searchFood,
  searchFoodSuccess,
  searchFoodFailure,
  showModal,
  getDetailedFoodInfo,
  getDetailedFoodInfoSuccess,
  getDetailedFoodInfoFailure,
  clearSearchResults
} from "../actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      searchPanelView: false,
      myFoodPanel: false
    };
    this.onDebouncedInput = debounce(this.props.searchFood, 300, {'leading': true});
    this.onInputChange = this.onInputChange.bind(this);
    // this.onSearchBarFocus = this.onSearchBarFocus.bind(this);
    // this.onSearchBarBlur = this.onSearchBarBlur.bind(this);
    // this.onItemClick = this.onItemClick.bind(this);
    // this.refreshBasket = this.refreshBasket.bind(this);

  }
// componentDidMount() {
//   this.nameInput.focus();
// }
  // refreshBasket(foodItem) {
  //   const oldBasket = localStorage.getItem('basket') || [];
  //   const newBasket = (oldBasket.length) ? JSON.parse(oldBasket) : [];
  //   const newBasketForStore = newBasket.concat(foodItem);
  //   const newBasketForStorage = JSON.stringify(newBasketForStore);
  //   localStorage.setItem('basket', newBasketForStorage);
  //   if (!this.props.isFromBasket) {
  //     this.props.showBasketModal(BASKET);
  //   }
  // }
  // onItemClick(foodItem) {
  //   this.setState({
  //     term: '',
  //     searchPanelView: false,
  //     myFoodPanel: false
  //   });
  //   const jwt = localStorage.getItem('jwt');
  //   this.props.getDetailedFoodInfo(jwt, foodItem)
  //   .then((response) => this.refreshBasket(response.payload))
  // }

  onInputChange(term) {
    if(!term) {
      this.setState({
        term: ''
      });
      return;
    }
    this.setState({term});
    this.onDebouncedInput(this.props.jwt, term);
  }

  // onSearchBarFocus() {
  //   if(this.state.searchPanelView || this.state.myFoodPanel) return;
  //   this.setState({
  //     myFoodPanel: true
  //   });
  // }

  // onSearchBarBlur(event) {
  // if(!document.hasFocus()) return;
  // if(event.relatedTarget && event.currentTarget.contains( event.relatedTarget )) return;
  //   this.setState({
  //     term: "",
  //     myFoodPanel: false,
  //     searchPanelView:false
  //   });
  //   this.props.clearSearchResults();
  // }

  render() {
   return (
      <Container>
      <Content>
      <Header searchBar rounded  style={{
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Item>
          <Icon type="FontAwesome" name="search" />
          <Input
          placeholder="Search food"
          autoFocus
          value={this.state.term}
          onChangeText={term => this.onInputChange(term)}/>
          <Icon type="FontAwesome" name="times" onPress={() =>
            this.setState({term: ''})
          }/>
        </Item>
        <Button transparent onPress={() => Actions.drawerOpen()}>
          <Text>Search</Text>
        </Button>
        <Icon type="FontAwesome" name="shopping-basket"/>
      </Header>
      <View style={{
        alignSelf: 'center',
        marginTop: 90,
        width: 170
      }}>
      <Icon type="FontAwesome" name="arrow-up" style={{color: 'grey', alignSelf:'center'}}/>
      <Text style={{color: 'grey', marginTop: 25}}>Start typing in the search field above to find food</Text>
      </View>
      </Content>
    </Container>
     )
}
}
const mapDispatchToProps = dispatch => {
  return {
    searchFood: (jwt,term) => {
      dispatch(searchFood(jwt, term)).then(response => {
        if (!response.error) {
          const data = response.payload.data;
          let idData;
          if (data) {
            Object.keys(data).map((item) => {
              if (data[item] && data[item].length) data[item].map( i => {
                if (i && !i['id']) {
                  // i.id = v4();
                  return  i;
                }
              })
            })
          }
          dispatch(searchFoodSuccess(response.payload.data));
        } else {
          dispatch(searchFoodFailure(response.payload.response));
        }
      });
    },
    getDetailedFoodInfo: (jwt, foodItem) => dispatch(getDetailedFoodInfo(jwt, foodItem))
      .then(response => {
        if (!response.error) {
          return dispatch(getDetailedFoodInfoSuccess(response.payload.data.foods));
        } else {
          return dispatch(getDetailedFoodInfoFailure(response.payload.response));
        }
      }),
    showBasketModal: modalType => dispatch(showModal(modalType)),
    clearSearchResults: () => dispatch(clearSearchResults())
  };
};
const mapStateToProps = state => ({
  jwt: state.auth.jwt,
  userInfo: state.dash.userInfo,
  suggestedFood: state.dash.suggestedFood,
  foundFood: state.foodSearch.foundFood,
  error: state.foodSearch.error
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
