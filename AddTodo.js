import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './src/graphql/mutations';

const AddTodo = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = async () => {
    try {
      const todo = { name, description };
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Todo" onPress={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddTodo;
