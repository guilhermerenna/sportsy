import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface Exercise {
  name: string;
  musclegroups: string[];
  load: number;
  repetitions: number;
}

export default function ExerciseScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: '',
    musclegroups: [],
    load: 0,
    repetitions: 0,
  });

  const removeExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    if (newExercise.name.trim()) {
      setExercises([...exercises, newExercise]);
       // Clear input fields after adding:
      setNewExercise({
        name: '',
        musclegroups: [],
        load: 0,
        repetitions: 0,
      });
    }
  };

  const renderHeaderAndExercises = (): React.ReactNode => {
    return (
        <View style={styles.listContainer}>
        <View style={styles.exerciseRow}>
        
        <Text style={styles.columnHeader}>Name</Text>
        <Text style={styles.columnHeader}>Muscle Groups</Text>
        <Text style={styles.columnHeader}>Load (kg)</Text>
        <Text style={styles.columnHeader}>Reps</Text>
        <Text style={styles.actionColumn}></Text>
        </View>

        {exercises.map((exercise, index) => (
        <View style={styles.exerciseRow} key={index}>
            <Text style={styles.exerciseText}>{exercise.name}</Text>
            <Text style={styles.exerciseText}>{exercise.musclegroups.join(', ')}</Text>
            <Text style={styles.exerciseText}>{exercise.load} kg</Text>
            <Text style={styles.exerciseText}>{exercise.repetitions}</Text>
            <TouchableOpacity style={styles.actionColumn} onPress={() => removeExercise(index)}>
            <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
        </View>
        ))}
    </View>
    )
  }

  const renderNewExerciseForm = (): React.ReactNode => {
    return (<>
      <Text style={styles.text}>Enter a new exercise:</Text>
      <TextInput
      style={styles.input}
      value={newExercise.name}
      onChangeText={(text) => setNewExercise({ ...newExercise, name: text })}
      placeholder="Exercise name"
      placeholderTextColor="#aaa"
      />
      <TextInput
      style={styles.input}
      value={newExercise.musclegroups.join(', ')}
      onChangeText={(text) =>
          setNewExercise({ ...newExercise, musclegroups: text.split(', ') })
      }
      placeholder="Muscle groups (comma-separated)"
      placeholderTextColor="#aaa"
      />
      <TextInput
      style={styles.input}
      keyboardType="numeric"
      value={newExercise.load ? newExercise.load.toString() : ''}
      onChangeText={(text) =>
          setNewExercise({ ...newExercise, load: parseFloat(text) || 0 })
      }
      placeholder="Load (kg)"
      placeholderTextColor="#aaa"
      />
      <TextInput
      style={styles.input}
      keyboardType="numeric"
      value={newExercise.repetitions ? newExercise.repetitions.toString() : ''}
      onChangeText={(text) =>
          setNewExercise({ ...newExercise, repetitions: parseInt(text) || 0 })
      }
      placeholder="Repetitions"
      placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.addButton} onPress={addExercise}>
      <Text style={styles.addButtonText}>Add Exercise</Text>
      </TouchableOpacity>
    </>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // TODO: Adjust based on the platform
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Exercise List</Text>

        {exercises.length > 0 && renderHeaderAndExercises()}

        { renderNewExerciseForm()}
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}