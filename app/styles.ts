import { StyleSheet } from 'react-native';

const input = {
  flex: 1,
  borderWidth: 1,
  paddingLeft: 10,
  paddingRight: 10,
  color: '#fff',
  backgroundColor: '#000',
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input,
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 100,  // Ensure enough space to scroll when the keyboard is visible
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 20,
    maxHeight: '60%',
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingVertical: 8,
  },
  columnHeader: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  actionColumn: {
    width: 40,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  exerciseText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputGlobal: {
    ...StyleSheet.flatten([input]), // Inherit styles from 'input'
  },
});

export default styles;