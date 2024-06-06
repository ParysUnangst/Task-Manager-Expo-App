import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    const newTask = {
      id: Date.now(), // Using timestamp as unique id
      title: `Task ${tasks.length + 1}`,
      completed: false,
    };
    setTasks([...tasks, newTask]); // Immutably update tasks array
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const enterEditMode = (taskId, currentTitle) => {
    setIsEditing(taskId);
    setNewTaskName(currentTitle);
  };

  const saveTaskName = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, title: newTaskName } : task
    ));
    setIsEditing(null);
    setNewTaskName('');
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setNewTaskName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Add Task" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.task}>
            {isEditing === item.id ? (
              <TextInput
                style={styles.input}
                value={newTaskName}
                onChangeText={setNewTaskName}
              />
            ) : (
              <Text style={item.completed ? styles.completed : styles.incomplete}>
                {item.title}
              </Text>
            )}
            <View style={styles.taskButtons}>
              {isEditing === item.id ? (
                <>
                  <Button title="Save" onPress={() => saveTaskName(item.id)} />
                  <Button title="Cancel" onPress={cancelEdit} />
                </>
              ) : (
                <>
                  <Button
                    title={item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    onPress={() => toggleTaskCompletion(item.id)}
                  />
                  <Button title="Edit" onPress={() => enterEditMode(item.id, item.title)} />
                </>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 75,
  },
  buttonContainer: {
    marginBottom: 20, // Add space below the button
    alignItems: 'center', // Center the button horizontally
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskButtons: {
    flexDirection: 'row',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  incomplete: {
    color: 'black',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '60%',
  },
});

export default TaskManager;

