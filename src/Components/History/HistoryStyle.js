import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    //flexDirection: 'row',
    flex: 1,
    height: 68,
    justifyContent: 'space-around',
  },
  nameView: {
    flex: 4,
  },
  title: {
    fontSize: 20,
  },
  timeDate: {
    alignItems: 'flex-end',
    flex: 6,
    marginBottom: 37,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default styles;
