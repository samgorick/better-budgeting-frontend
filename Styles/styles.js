import {StyleSheet} from 'react-native';
import theme from './themes';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
    flex: 1
  },
  nativeContainer: {
    backgroundColor: theme.PRIMARY_COLOR
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
    marginTop: 20,
    marginBottom: 150
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: 'white',
    borderRadius: 30,
    width: theme.FORM_WIDTH,
    height: 45,
    marginBottom: theme.STANDARD_SPACING,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 45,
    color: theme.SECONDARY_COLOR,
    marginLeft: 16,
    borderBottomColor: 'white',
    flex: 1,
    fontSize: theme.FONT_SIZE_STANDARD
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.SMALL_SPACING,
    width: theme.FORM_WIDTH,
    borderRadius: 30,
    backgroundColor: theme.ACCENT_COLOR
  },
  loginButtonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.LARGE_SPACING,
    marginBottom: theme.SMALL_SPACING,
    width: theme.FORM_WIDTH,
    borderRadius: 30,
    backgroundColor: theme.ACCENT_COLOR
  },
  negativeButtonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.SMALL_SPACING,
    marginBottom: theme.SMALL_SPACING,
    width: theme.FORM_WIDTH,
    borderRadius: 30,
    backgroundColor: theme.NEGATIVE_COLOR
  },
  disabledButton: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.SMALL_SPACING,
    width: theme.FORM_WIDTH,
    borderRadius: 30,
    backgroundColor: '#E0E0E2'
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  fab: {
    backgroundColor: theme.ACCENT_COLOR
  },
  picker: {
    marginBottom: theme.STANDARD_SPACING
  },
  chartHeader: {
    textAlign: 'center',
    color: theme.SECONDARY_COLOR,
    fontSize: theme.FONT_SIZE_STANDARD,
    marginBottom: theme.STANDARD_SPACING
  },
  signupText: {
    marginTop: 20,
    textTransform: 'uppercase',
    color: theme.SECONDARY_COLOR
  },
  listSpendingCategory: {
    color: theme.SECONDARY_COLOR
  },
  listAmount: {
    color: theme.SECONDARY_COLOR,
    fontWeight: 'bold'
  },
  error: {
    color: theme.NEGATIVE_COLOR,
    fontSize: theme.FONT_SIZE_STANDARD,
    marginBottom: theme.SMALL_SPACING
  }
});
