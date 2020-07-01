import { StyleSheet } from 'react-native';
import theme from './themes'

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
    flex: 1
  },
  header: {
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_HEADER,
    marginTop: 10,
    marginBottom: theme.STANDARD_SPACING,
    color: theme.SECONDARY_COLOR
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: theme.STANDARD_SPACING
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    width: theme.FORM_WIDTH,
    height: 45,
    marginBottom: theme.STANDARD_SPACING,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.STANDARD_SPACING,
    width: theme.FORM_WIDTH,
    borderRadius:30,
    backgroundColor: theme.SECONDARY_COLOR,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  fab: {
    backgroundColor: theme.SECONDARY_COLOR
  },
  picker: {
    marginBottom: theme.STANDARD_SPACING
  },
  chartHeader: {
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_STANDARD,
    marginBottom: theme.STANDARD_SPACING
  }
});