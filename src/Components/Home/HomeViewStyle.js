import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    marginTop: 90,
    fontSize: 40,
  },
  mainActionButton: {
    width: 204,
    height: 204,
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    borderRadius: 102,
  },
  buttonText: {
    fontSize: 25,
  },
  FinishButtonText: {
    fontSize: 29,
  },
  FinishButtonContainer: {
    marginTop: 15,
  },
  renderButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  renderFinish: {
      marginRight: 100,
  },
  renderReset: {
    marginTop: 15,
  }
});
export default styles;
