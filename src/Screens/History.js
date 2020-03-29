import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import axios from 'axios';
import {Link} from '../Publics/env';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderHistory} from '../Components/Header';
import {getDetail} from '../Publics/Redux/actions/cart.js';

const urls = Link();

export const History = props => {
  const [history, setHistory] = useState([]);
  const [allhistory, setAll] = useState([]);
  // const [detailCart, setDetail] = useState([]);
  const [muncul, setShow] = useState(false);
  const [f, setF] = useState(false);
  const [loading, setLoading] = useState(true);
  const {token} = useSelector(state => state.auth);
  const {cartDetail} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const showData = faktur => {
    setF(faktur);
    dispatch(getDetail(faktur, token)).then(() => {
      setShow(true);
    });
  };

  const getHistory = async () => {
    setLoading(true);
    await axios
      .get(urls + `payment/all`, {
        headers: {
          token: token,
        },
      })
      .then(res => {
        setHistory(res.data.result[0]);
        setLoading(false);
      });
  };
  const getAllHistory = async () => {
    // const time = new Date()
    setLoading(true);
    await axios
      .get(urls + `payment`, {
        headers: {
          token: token,
        },
      })
      .then(res => {
        setAll(res.data.result);
        // console.warn(res);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getHistory();
      getAllHistory();
    });

    return unsubscribe;
  }, []);

  // UP
  const incomeToday = () => {
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

  const orderWeek = () => {
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

  const incomeYear = () => {
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

  const yesterday = Math.round(incomeToday());
  const order = Math.round(orderWeek());
  const year = Math.round(incomeYear());
  return (
    <>
      <HeaderHistory onPress={() => props.navigation.navigate('Acount')} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mountArea}>
            <View
              style={[
                styles.incomeArea1,
                {backgroundColor: 'rgb(13, 134, 214)'},
              ]}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                Today's Income
              </Text>
              <Text style={{color: '#fff', marginTop: 10, fontSize: 18}}>
                Rp. {history.INCOME_TODAY ? history.INCOME_TODAY : 0}
              </Text>
              <Text style={{color: '#fff', marginTop: 10}}>
                {yesterday} % Yesterday
              </Text>
            </View>
            <View
              style={[
                styles.incomeArea1,
                {backgroundColor: 'rgb(214, 160, 13)'},
              ]}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                Orders
              </Text>
              <Text style={{color: '#fff', marginTop: 10, fontSize: 18}}>
                {history.order_week ? history.order_week : 0}
              </Text>
              <Text style={{color: '#fff', marginTop: 10}}>
                {order} % Last Week
              </Text>
            </View>
            <View
              style={[
                styles.incomeArea1,
                {backgroundColor: 'rgb(128, 6, 57)'},
              ]}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                This Year's Income
              </Text>
              <Text style={{color: '#fff', marginTop: 10, fontSize: 18}}>
                Rp. {history.year_omzet ? history.year_omzet : 0}
              </Text>
              <Text style={{color: '#fff', marginTop: 10}}>
                {year} % Last year
              </Text>
            </View>
          </View>
          <View style={styles.history}>
            <View style={styles.historyArea}>
              {allhistory.map(data => {
                return (
                  <DataHistory
                    key={data.faktur}
                    data={data}
                    press={faktur => showData(faktur)}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      {loading ? (
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
      ) : null}

      {/* modal */}
      <Modal
        animationType="slide"
        visible={muncul}
        onRequestClose={() => setShow(false)}>
        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 10}}>
          <View style={[styles.list]}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                marginRight: 10,
              }}>
              #
            </Text>
            <Text style={styles.text}>{f}</Text>
          </View>
          <ScrollView
            style={{backgroundColor: '#fff'}}
            showsVerticalScrollIndicator={false}>
            {cartDetail.map((data, i) => {
              return <Item key={i} data={data} />;
            })}
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            shadowOffset: {width: 2, height: 5},
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 1,
            elevation: 4,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
            <TouchableOpacity
              onPress={() => setShow(false)}
              style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                  backgroundColor: 'rgb(128, 6, 57)',
                  borderRadius: 8,
                  padding: 10,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mountArea: {
    marginHorizontal: 30,
    marginTop: 10,
    paddingVertical: 10,
    height: 400,
  },
  incomeArea1: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 8, height: 9},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 4,
    paddingVertical: 20,
    position: 'relative',
    zIndex: -1,
  },
  historyArea: {
    backgroundColor: '#fff',
    marginTop: 15,
    flex: 1,
    padding: 16,
    marginBottom: 20,
  },
  history: {
    zIndex: 99,
  },
  list: {
    // backgroundColor: 'rgb(13, 134, 214)',
    backgroundColor: '#333',
    paddingVertical: 15,
    marginVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export const DataHistory = props => {
  return (
    <>
      <View style={myStyle.parent}>
        <View style={myStyle.row}>
          <Text style={myStyle.left}>{props.data.username}</Text>
          <Text style={[myStyle.left, {fontSize: 11}]}>
            {props.data.faktur}
          </Text>
        </View>
        <View style={myStyle.row}>
          <TouchableOpacity onPress={() => props.press(props.data.faktur)}>
            <Text
              style={[
                myStyle.center,
                {
                  backgroundColor: 'rgb(13, 134, 214)',
                  color: '#fff',
                  borderRadius: 10,
                  paddingVertical: 3,
                },
              ]}>
              {props.data.qty} item
            </Text>
          </TouchableOpacity>
        </View>
        <View style={myStyle.row}>
          <Text style={myStyle.right}>Rp. {props.data.total}</Text>
          <Text style={[myStyle.right, {fontSize: 11}]}>
            {props.data.date_pay}
          </Text>
        </View>
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  row: {
    backgroundColor: 'white',
    paddingVertical: 10,
    flex: 1,
  },
  left: {
    color: '#777',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  center: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  right: {
    color: '#777',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Item = props => {
  return (
    <View
      style={[
        styles.list,
        {
          backgroundColor: 'rgb(13, 134, 214)',
          justifyContent: 'space-between',
        },
      ]}>
      <Text style={styles.text}>
        {props.data.name} {props.data.qtyDetail}x
      </Text>
      <Text style={styles.text}>Rp. {props.data.totalDetail}</Text>
    </View>
  );
};
