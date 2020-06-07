import React from 'react';
import {Text, View, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './HistoryStyle';
import moment from 'moment';
import i18n from '../../i18n/i18n';
import {useIsFocused} from '@react-navigation/native';

function Item({item}) {
  return (
    <View style={styles.item}>
      <View style={styles.nameView}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.timeDate}>
        <Text>{moment.utc(item.date).format(i18n.DATE_FORMAT)}</Text>
        <Text>{moment.utc(item.timeSpent).format(i18n.TIME_FORMAT)}</Text>
      </View>
    </View>
  );
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parsedActivities: [],
    };
    this.getActivities = this.getActivities.bind(this);

    props.navigation.addListener('focus', () => {
      this.getActivities();
    });
  }

  async getActivities() {
    const activities = await AsyncStorage.getItem('@activities');
    if (activities !== null) {
      console.log(activities);
    }
    let parsedActivities = [];
    if (activities !== null) {
      parsedActivities = JSON.parse(activities);
      console.log('parsedseshaaaaa', parsedActivities);
    }
    this.setState({parsedActivities: parsedActivities.reverse()});
  }
  render() {
    const {parsedActivities} = this.state;
    return (
      <SafeAreaView style={{backgroundColor: '#cdcdcd', flex:1}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Saved Activities</Text>
        </View>
        <FlatList
          data={parsedActivities}
          // renderItem={({item}) => <Item title={item.name} />}
          renderItem={Item}
          keyExtractor={(item, index) => {
            return item.name + index;
          }}
        />
      </SafeAreaView>
    );
  }
}
export default History;
