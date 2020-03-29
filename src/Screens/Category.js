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
import {HeaderCategory} from '../Components/Header';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category.categoryData,
      loading: false,
      search: '',
      refreshing: false,
      token: props.auth.token,
      keyword: '',
    };
  }

  handleDelete = data => {
    Alert.alert(
      'Sure ?',
      `Do you want to delete ${data.nama_category}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.delete(data.id)},
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
    await this.props.dispatch(deleteCategory(id, this.state.token)).then(() => {
      this.setState({
        category: this.props.category.categoryData,
      });
    });
  };

  showData = data => {
    this.props.navigation.navigate('EditCategory', {data: data});
  };

  getData = e => {
    this.setState({
      keyword: e,
    });
  };

  render() {
    let filterData = this.state.category.filter(data => {
      return (
        data.nama_category
          .toLowerCase()
          .indexOf(this.state.keyword.toLowerCase()) !== -1
      );
    });
    return (
      <>
        <HeaderCategory
          onPress={() => this.props.navigation.navigate('InputCategory')}
          onSearch={e => this.getData(e)}
        />
        <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal: 20}}>
          <ScrollView
            style={{backgroundColor: '#fff'}}
            showsVerticalScrollIndicator={false}>
            {filterData.map(data => {
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
              <ActivityIndicator
                size="large"
                color="#ff33ff"
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
            )}
          </ScrollView>
        </View>
      </>
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
