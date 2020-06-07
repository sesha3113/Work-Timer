import React from 'react';
import {Text, Animated, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import i18n from '../../i18n/i18n';
import styles from './StopWatchButtonStyles';

const StopWatchButton = ({
  time,
  paused,
  startOnPressAction,
  timerOnPressAction,
}) => {
  const timerOpacity = new Animated.Value(1);
  const BLINK_DELAY = 1500;
  const blinker = toValue => {
    if (!paused) {
      Animated.timing(timerOpacity, {
        toValue,
        duration: BLINK_DELAY,
        useNativeDriver: true,
      }).start(() => {
        blinker(toValue === 1 ? 0 : 1);
      });
    } else {
      Animated.timing(timerOpacity, {
        toValue: 0,
        duration: BLINK_DELAY,
        useNativeDriver: true,
      }).start();
    }
  };
  blinker({toValue: 0});

  if (time > 0) {
    return (
      <TouchableOpacity
        onPress={timerOnPressAction}
        style={styles.mainActionButton}>
        <Animated.View
          style={[styles.mainActionButton, {opacity: timerOpacity}]}>
          <Text style={styles.buttonText}>
            {' '}
            {moment.utc(time).format(i18n.TIME_FORMAT)}{' '}
          </Text>
          <Text>{i18n.STOP_WATCH.PAUSE}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={startOnPressAction}
      style={styles.mainActionButton}>
      <Text style={styles.buttonText}> {i18n.STOP_WATCH.START} </Text>
    </TouchableOpacity>
  );
};
export default StopWatchButton;
