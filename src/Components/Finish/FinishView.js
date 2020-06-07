import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './FinishStyles';
import i18n from '../../i18n/i18n';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
const Finish = ({route, navigation}) => {
  const [name, setName] = useState('');
  const {timeSpent} = route.params;
  const savetime = async () => {
    const storagekey = '@activities';
    let activities = await AsyncStorage.getItem(storagekey);
    if (activities === null) {
      activities = [];
    } else {
      activities = JSON.parse(activities);
    }
    const date = new Date().getTime();
    activities.push({
      name,
      timeSpent,
      date,
    });
    console.log(activities);
    await AsyncStorage.setItem(storagekey, JSON.stringify(activities));
    navigation.goBack();
    console.log('store', storagekey);
  };

  return (
    <SafeAreaView style={styles.styles}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{i18n.FINISH_VIEW.YOU_SPENT}</Text>
        <Text style={styles.headerTime}>
          {moment.utc(timeSpent).format(i18n.TIME_FORMAT)}
        </Text>
      </View>
      <View style={styles.activityView}>
        <Text style={styles.activityNameText}>
          {i18n.FINISH_VIEW.ACTIVITY_NAME}
        </Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={savetime}>
          <Text>save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Finish;
