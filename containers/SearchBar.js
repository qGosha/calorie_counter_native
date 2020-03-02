import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  Icon,
  Text,
  View,
} from 'native-base';
import { SearchResult } from '../components/showSearchResult';
import { MyFoodPanel } from '../components/myFoodPanel';
import { SearchBarPanel } from '../components/searchBarPanel';
import debounce from 'lodash.debounce';
import uuid from 'react-native-uuid';
import {
  searchFood,
  searchFoodSuccess,
  searchFoodFailure,
  showModal,
  getDetailedFoodInfo,
  getDetailedFoodInfoSuccess,
  getDetailedFoodInfoFailure,
  clearSearchResults,
} from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      searchPanelView: false,
      myFoodPanel: false,
    };
    this.onDebouncedInput = debounce(this.props.searchFood, 300, {
      leading: true,
    });
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchBarFocus = this.onSearchBarFocus.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.refreshBasket = this.refreshBasket.bind(this);
  }

  refreshBasket(newBasket) {
    const newBasketForStorage = JSON.stringify(newBasket);
    return AsyncStorage.setItem('basket', newBasketForStorage);
  }
  onItemClick(foodItem) {
    this.setState({
      term: '',
      searchPanelView: false,
      myFoodPanel: false,
    });

    this.props
      .getDetailedFoodInfo(this.props.jwt, foodItem)
      .then(() => {
        Actions.basket();
        this.refreshBasket(this.props.basket);
      })
      .catch(er => {
        Actions.error({ title: 'Error', text: er });
      });
  }

  onInputChange(term) {
    if (!term) {
      const suggestedFood = this.props.suggestedFood;
      this.setState({
        term: '',
        searchPanelView: false,
        myFoodPanel: suggestedFood && suggestedFood.foods.length,
      });
      this.props.clearSearchResults();
      return;
    }
    this.setState({
      term: term,
      searchPanelView: true,
      myFoodPanel: false,
    });
    this.onDebouncedInput(this.props.jwt, term);
  }

  onSearchBarFocus() {
    if (this.state.searchPanelView || this.state.myFoodPanel) return;
    const suggestedFood = this.props.suggestedFood;
    if (suggestedFood && suggestedFood.foods.length) {
      this.setState({
        myFoodPanel: true,
      });
    }
  }

  render() {
    let currentPanel;
    if (this.state.searchPanelView) {
      currentPanel = (
        <SearchResult
          foundFood={this.props.foundFood}
          term={this.state.term}
          addToBasket={this.onItemClick}
        />
      );
    } else if (this.state.myFoodPanel) {
      currentPanel = (
        <MyFoodPanel
          suggestedFood={this.props.suggestedFood}
          addToBasket={this.onItemClick}
        />
      );
    } else currentPanel = null;
    const initialScreen = (
      <View
        style={{
          alignSelf: 'center',
          marginTop: 90,
          width: 170,
        }}>
        <Icon
          type="FontAwesome"
          name="arrow-up"
          style={{ color: 'grey', alignSelf: 'center' }}
        />
        <Text style={{ color: 'grey', marginTop: 25, textAlign: 'center' }}>
          Start typing in the search field above to find food
        </Text>
      </View>
    );
    const panel =
      !this.state.searchPanelView && !this.state.myFoodPanel
        ? initialScreen
        : currentPanel;
    return (
      <SearchBarPanel
        term={this.state.term}
        onSearchBarFocus={this.onSearchBarFocus}
        onInputChange={this.onInputChange}
        panel={panel}
        onItemClick={this.onItemClick}
      />
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchFood: (jwt, term) => {
      dispatch(searchFood(jwt, term)).then(response => {
        if (!response.error) {
          const data = response.payload.data;
          let idData;
          if (data) {
            Object.keys(data).map(item => {
              if (data[item] && data[item].length)
                data[item].map(i => {
                  if (i && !i['id']) {
                    i.id = uuid.v4();
                    return i;
                  }
                });
            });
          }
          dispatch(searchFoodSuccess(response.payload.data));
        } else {
          dispatch(searchFoodFailure(response.payload.response));
        }
      });
    },
    getDetailedFoodInfo: (jwt, foodItem) =>
      dispatch(getDetailedFoodInfo(jwt, foodItem)).then(response => {
        if (!response.error) {
          return dispatch(
            getDetailedFoodInfoSuccess(response.payload.data.foods)
          );
        } else {
          return dispatch(
            getDetailedFoodInfoFailure(response.payload.response)
          );
        }
      }),
    showBasketModal: modalType => dispatch(showModal(modalType)),
    clearSearchResults: () => dispatch(clearSearchResults()),
  };
};
const mapStateToProps = state => ({
  jwt: state.auth.jwt,
  userInfo: state.dash.userInfo,
  suggestedFood: state.dash.suggestedFood,
  foundFood: state.foodSearch.foundFood,
  error: state.foodSearch.error,
  basket: state.basket,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
