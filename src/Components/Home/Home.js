import React from 'react';
import {Text, View, TouchableOpacity, AppState} from 'react-native';
import styles from './HomeViewStyle';
import i18n from '../../i18n/i18n';
import History from '../History/History';
import StopWatchButton from '../StopWatchButton/StopWatchButton';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleAppStateChange('initial');
  }

  async handleAppStateChange(nextAppState) {
    console.log('nextAppState', nextAppState);
    const now = new Date().getTime();
    const {time, paused} = this.state;
    const readTime = parseInt(await AsyncStorage.getItem('@time'), 10);
    const readStateTimestamp = parseInt(
      await AsyncStorage.getItem('@appStateChangeTimestamp'),
      10,
    );
    console.log('stored data', readTime, readStateTimestamp);
    const timeDifference = now - readStateTimestamp;

    const newTime = readTime + timeDifference;
    if (
      !isNaN(readTime) &&
      (nextAppState === 'active' || nextAppState === 'initial')
    ) {
      const isPaused = await AsyncStorage.getItem('@isPaused');
      const wasPaused = isPaused && isPaused === 'true';
      let newState = {
        time: readTime,
        paused: wasPaused,
      };
      if (!wasPaused) {
        newState.time = newTime;
      }
      this.setState(newState, this.startTimer);
    } else {
      // await AsyncStorage.setItem('@time', JSON.stringify(time));
      await AsyncStorage.setItem('@time', time.toString());
      await AsyncStorage.setItem(
        '@isPaused',
        paused === true ? 'true' : 'false',
      );
      await AsyncStorage.setItem(
        '@appStateChangeTimestamp',
        JSON.stringify(now),
      );
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  componentwillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  startTimer() {
    this.clearTimer();
    this.timerIntervalId = setInterval(() => {
      const {time, paused} = this.state;
      if (!paused) {
        this.setState({
          time: time + 1000,
        });
      }
    }, 1000);
  }

  pauseTimer() {
    const {paused} = this.state;
    this.setState({
      paused: !paused,
    });
  }

  clearTimer() {
    if (this.timerIntervalId) {
      clearInterval(this.timerIntervalId);
    }
  }

  renderFinishButton() {
    const {time, paused} = this.state;
    if (time > 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.clearTimer();
            this.setState({
              time: 0,
            });
            console.log('finish', time);
            this.props.navigation.navigate('Finish', {timeSpent: time});
          }}
          style={styles.FinishButtonContainer}>
          <Text style={styles.FinishButtonText}>{i18n.FINISH}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  resetButton() {
    const {time} = this.state;
    if (time > 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.clearTimer();
            this.setState({
              time: 0,
            });
            console.log('finish', time);
          }}>
          <Text style={styles.FinishButtonText}>Reset</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {time} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textStyleContainer}>
          <Text style={styles.textStyle}>{i18n.HOME.WELCOME_HEADER}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* {time > 0 ? this.renderrunningButton() : this.renderStartButton()} */}
          <StopWatchButton
            paused={this.paused}
            time={time}
            startOnPressAction={this.startTimer}
            timerOnPressAction={this.pauseTimer}
          />
          <View style={styles.renderButtonStyle}>
            <View style={styles.renderFinish}>{this.renderFinishButton()}</View>
            <View style={styles.renderReset}>{this.resetButton()}</View>
          </View>
        </View>
      </View>
    );
  }
}
export default Home;
