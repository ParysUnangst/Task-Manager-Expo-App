# Task Manager App

A simple task manager application built with React Native and Expo. Users can add new tasks, edit task names, and mark tasks as completed.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new tasks
- Edit task names
- Mark tasks as completed or incomplete

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   cd task-manager-app

2. **Install the dependencies**
npm install

3.**Start the Expo development server**
expo start

Usage
Start the application using the Expo development server.
The application will open in your default web browser.
You can also use the Expo Go app on your mobile device to scan the QR code and run the application.
C
omponents

TaskManager.js
The TaskManager component handles the main functionality of the app, including adding tasks, editing task names, and marking tasks as completed.

javascript
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: `Task ${tasks.length + 1}`,
      completed: false,
    };
    setTasks([...tasks, newTask]);
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
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',
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



App.js
The main entry point of the application, importing and rendering the TaskManager component.

import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaskManager from './src/TaskManager';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});


Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.