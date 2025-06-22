import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, onChangeText, multiline = false }) => {
  return (
    <TextInput
      style={[styles.input, multiline && styles.textarea]}
      placeholder={placeholder}
      placeholderTextColor="#a9a9a9"
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#004a80',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default Input;