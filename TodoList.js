import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from './src/graphql/queries';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      setTodos(todoData.data.listTodos.items);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  todo: {
    marginBottom: 15,
    padding: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
  },
});

export default TodoList;
