import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import ListCategory from '../Components/ListCategory';
import {connect} from 'react-redux';
import {
  deleteCategory,
  getAllCategory,
} from '../Publics/Redux/actions/category';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category.categoryData,
      loading: false,
      search: '',
      refreshing: false,
      token: props.auth.token,
    };
  }

  handleDelete = id => {
    Alert.alert(
      'Sure ?',
      'Do you want to delete this item',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.delete(id)},
      ],
      {cancelable: false},
    );
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        category: this.props.category.categoryData,
      });
    });
  }

  delete = async id => {
    await this.props.dispatch(deleteCategory(id, this.state.token));
    this.setState({
      category: this.props.category.categoryData,
    });
  };

  showData = data => {
    this.props.navigation.navigate('EditCategory', {data: data});
  };

  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            flexDirection: 'row',
            shadowOffset: {width: 8, height: 9},
            shadowColor: '#000',
            shadowRadius: 10,
            shadowOpacity: 1,
            elevation: 8,
          }}>
          <TextInput
            onChangeText={key => this.onSearch(key)}
            placeholder="I want to search..."
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#ddd',
              paddingVertical: 5,
              paddingHorizontal: 20,
              paddingLeft: 40,
            }}
          />
          <Icon
            name="search"
            size={20}
            color="#3f026b"
            style={{position: 'absolute', top: 20, left: 25}}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('InputCategory')}>
            <Icon
              name="plus-circle"
              size={25}
              color="#F4A501"
              style={{marginHorizontal: 20}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor: '#fff'}}>
          {this.state.category.map(data => {
            return (
              <ListCategory
                key={data.id}
                data={data}
                onDelete={this.handleDelete}
                edit={this.showData}
              />
            );
          })}
          {!this.props.category.isPending ? null : (
            <View style={{flex: 1, backgroundColor: '#fff', marginTop: '50%'}}>
              <ActivityIndicator size="large" color="#ff33ff" />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({category, auth}) => {
  return {
    category,
    auth,
  };
};

export default connect(mapStateToProps)(Category);
