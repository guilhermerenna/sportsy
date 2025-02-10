// 2025-feb-09: deadlift 130lbs 3x 10, squat 70+bar lbs 3x 12, hip thrust 20lbs 3x 12, calf extension 45deg 97kg 3x 12
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export interface Exercise {
  id: number;
  name: string;
  musclegroups: string[];
  load: number;
  repetitions: number;
}

interface Session {
  exercises: Exercise[];
  date: string;
}

export default function SessionScreen() {
  const availableExercises: Exercise[] = [
    { id: 1, name: 'Push-up', musclegroups: ['Chest'], load: 0, repetitions: 15 },
    { id: 2, name: 'Squat', musclegroups: ['Legs'], load: 20, repetitions: 10 },
    { id: 3, name: 'Deadlift', musclegroups: ['Back'], load: 50, repetitions: 8 },
    // More exercises...
  ];

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [sessionDate, setSessionDate] = useState<string>('');
  const [showExerciseOptions, setShowExerciseOptions] = useState<boolean>(false);

  const addExerciseToSession = (exercise: Exercise | null) => {
    if (exercise) {
      setSelectedExercises((prevExercises) => [
        ...prevExercises,
        { ...exercise, load: exercise.load, repetitions: exercise.repetitions },
      ]);
    } else {
      // Add an empty exercise row when "New" is selected
      setSelectedExercises((prevExercises) => [
        ...prevExercises,
        { id: Date.now(), name: '', musclegroups: [], load: 0, repetitions: 0 },
      ]);
    }
    setShowExerciseOptions(false); // Hide the exercise options once an exercise is added
  };

  const removeExerciseFromSession = (exerciseToRemove: Exercise) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== exerciseToRemove.id)
    );
  };

  const updateExercise = (exercise: Exercise, field: 'load' | 'repetitions' | 'name', value: string | number) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === exercise.id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const createSession = () => {
    if (selectedExercises.length === 0) {
      alert('Please select at least one exercise');
      return;
    }

    const newSession: Session = {
      exercises: selectedExercises,
      date: sessionDate,
    };

    console.log('Session Created:', newSession);
    // Optionally, save the session to storage or a database here
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Create Exercise Session</Text>

        <Text style={styles.text}>Select Exercises:</Text>
        <TouchableOpacity
          onPress={() => setShowExerciseOptions(!showExerciseOptions)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>

        {showExerciseOptions && (
          <ScrollView style={styles.listContainer}>
            {availableExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => addExerciseToSession(exercise)}
                style={styles.exerciseRow}
              >
                <Text style={styles.exerciseText}>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => addExerciseToSession(null)} // Add an empty row when "New" is selected
              style={styles.exerciseRow}
            >
              <Text style={styles.exerciseText}>New</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        <Text style={styles.text}>Selected Exercises:</Text>
        <ScrollView style={styles.listContainer}>
          {selectedExercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseRow}>
              <TextInput
                style={styles.input}
                value={exercise.name}
                onChangeText={(text) =>
                  updateExercise(exercise, 'name', text)
                }
                placeholder="Exercise name"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={exercise.load.toString()}
                onChangeText={(text) =>
                  updateExercise(exercise, 'load', parseFloat(text) || 0)
                }
                placeholder="Load (kg)"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={exercise.repetitions.toString()}
                onChangeText={(text) =>
                  updateExercise(exercise, 'repetitions', parseInt(text) || 0)
                }
                placeholder="Repetitions"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                onPress={() => removeExerciseFromSession(exercise)}
                style={styles.addButton}
              >
                <Ionicons name="remove-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TextInput
          style={styles.input}
          value={sessionDate}
          onChangeText={setSessionDate}
          placeholder="Enter session date (e.g., 2025-02-09)"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.addButton} onPress={createSession}>
          <Text style={styles.addButtonText}>Create Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
