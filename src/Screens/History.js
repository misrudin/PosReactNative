import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
} from 'react-native';
import axios from 'axios';
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      allhistory: [],
      refreshing: false,
    };
  }

  getHistory = () => {
    axios
      .get(urls + `payment/all`, {
        headers: {
          token: token,
        },
      })
      .then(res => {
        this.setState({
          history: res.data.result[0],
        });
      });
  };
  getAllHistory = () => {
    axios
      .get(urls + `payment`, {
        headers: {
          token: token,
        },
      })
      .then(res => {
        this.setState({
          allhistory: res.data.result,
        });
      });
  };

  _onRefresh = async () => {
    this.setState({refreshing: true});
    await this.getHistory();
    await this.getAllHistory();
    this.setState({refreshing: false});
  };
  componentDidMount() {
    this.getHistory();
    this.getAllHistory();
  }

  // UP
  incomeToday = () => {
    const history = this.state.history;
    if (history.INCOME_TODAY > history.Yesterday) {
      const yesterday =
        (((history.INCOME_TODAY - history.Yesterday) / history.INCOME_TODAY) *
          100 *
          100) /
        100;
      return +yesterday;
    } else if (history.INCOME_TODAY < history.Yesterday) {
      const yesterday =
        (((history.Yesterday - history.INCOME_TODAY) / history.Yesterday) *
          100 *
          100) /
        100;
      return -yesterday;
    } else {
      return 0;
    }
  };

  orderWeek = () => {
    const history = this.state.history;
    if (history.order_week > history.last_week) {
      const order =
        (((history.order_week - history.last_week) / history.order_week) *
          100 *
          100) /
        100;
      return +order;
    } else if (history.order_week < history.last_week) {
      const order =
        (((history.last_week - history.order_week) / history.last_week) *
          100 *
          100) /
        100;
      return -order;
    } else {
      return 0;
    }
  };

  incomeYear = () => {
    const history = this.state.history;
    if (history.year_omzet > history.last_year) {
      const year =
        (((history.year_omzet - history.last_year) / history.year_omzet) *
          100 *
          100) /
        100;
      return +year;
    } else if (history.year_omzet < history.last_year) {
      const year =
        (((history.last_year - history.year_omzet) / history.last_year) *
          100 *
          100) /
        100;
      return -year;
    } else {
      return 0;
    }
  };

  render() {
    const yesterday = Math.round(this.incomeToday());
    const order = Math.round(this.orderWeek());
    const year = Math.round(this.incomeYear());
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3f026b"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <View style={styles.mountArea}>
          <View style={styles.incomeArea1}>
            <Text style={{color: '#cfbfe0', fontSize: 20, fontWeight: 'bold'}}>
              Today's Income
            </Text>
            <Text style={{color: '#ccc', marginTop: 10, fontSize: 18}}>
              Rp. {this.state.history.INCOME_TODAY}
            </Text>
            <Text style={{color: '#bbb', marginTop: 10}}>
              {yesterday} % Yesterday
            </Text>
          </View>
          <View style={styles.incomeArea1}>
            <Text style={{color: '#cfbfe0', fontSize: 20, fontWeight: 'bold'}}>
              Orders
            </Text>
            <Text style={{color: '#ccc', marginTop: 10, fontSize: 18}}>
              {this.state.history.order_week}
            </Text>
            <Text style={{color: '#bbb', marginTop: 10}}>
              {order} % Last Week
            </Text>
          </View>
          <View style={styles.incomeArea1}>
            <Text style={{color: '#cfbfe0', fontSize: 20, fontWeight: 'bold'}}>
              This Year's Income
            </Text>
            <Text style={{color: '#ccc', marginTop: 10, fontSize: 18}}>
              Rp. {this.state.history.year_omzet}
            </Text>
            <Text style={{color: '#bbb', marginTop: 10}}>
              {year} % Last year
            </Text>
          </View>
        </View>

        <View style={styles.historyArea}>
          {this.state.allhistory.map(data => {
            return <DataHistory key={data.faktur} data={data} />;
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f026b',
    paddingTop: 20,
  },
  mountArea: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  incomeArea1: {
    backgroundColor: '#450673',
    height: 200,
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyArea: {
    backgroundColor: '#441874',
    marginTop: 15,
    flex: 1,
    padding: 16,
    marginBottom: 20,
  },
});

export const DataHistory = props => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{marginRight: 10}}>{props.data.faktur}</Text>
      <Text style={{marginRight: 10}}>{props.data.date_pay}</Text>
      <Text style={{marginRight: 10}}>{props.data.username}</Text>
      <Text style={{marginRight: 10}}>{props.data.qty}</Text>
      <Text>{props.data.total}</Text>
    </View>
  );
};
