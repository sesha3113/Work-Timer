import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  styles: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  headerView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityView: {
    flex: 1,
    alignItems: 'center',
  },
  buttonView: {
    flex: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 40,
  },
  headerTime: {
    fontSize: 30,
    marginTop: 35,
  },
  textInput: {
    // backgroundColor: 'grey',
    width: 300,
    height: 40,
    marginTop: 50,
    backgroundColor: '#C0C0C0',
  },
  activityNameText: {
    fontSize: 20,
  },
});
export default styles;
