
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AddTodo from './AddTodo';
import TodoList from './TodoList';


Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AddTodo />
        <TodoList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;

