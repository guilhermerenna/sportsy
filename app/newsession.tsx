import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Exercise } from './exercises';
import { Session } from './sessiontemplates';

export interface ExecutedSession extends Session {
    exercises: Exercise[];
    date: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
  }

let mySessionTemplates: Session[] = [
  {
    name: "legs",
    exercises: [
      { id: 1, name: 'Hip thrust', musclegroups: ['abdomen', 'glutes'], load: 10, repetitions: 12 },
      { id: 2, name: 'Squat', musclegroups: ['abdomen', 'legs', 'glutes'], load: 50, repetitions: 12 },
      { id: 3, name: 'Deadlift', musclegroups: ['back', 'abdomen', 'legs', 'lumbar', 'glutes'], load: 60, repetitions: 10 },
      { id: 4, name: 'Calf extension', musclegroups: ['legs'], load: 100, repetitions: 12 },
    ]
  },
  {
    name: "pull",
    exercises: [
      { id: 1, name: 'Chin up', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 97, repetitions: 2 },
      { id: 3, name: 'Curl with machine', musclegroups: ['biceps'], series: 4, load: 36, repetitions: 10 },
      { id: 2, name: 'Pull down open', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 42, repetitions: 10 },
      { id: 4, name: 'Row', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 42, repetitions: 12 },
    ]
  }
]

let exercises: Exercise[] = [
  { id: 1, name: 'Hip thrust', musclegroups: ['abdomen', 'glutes'], load: 10, repetitions: 12 },
  { id: 2, name: 'Squat', musclegroups: ['abdomen', 'legs', 'glutes'], load: 50, repetitions: 12 },
  { id: 3, name: 'Deadlift', musclegroups: ['back', 'abdomen', 'legs', 'lumbar', 'glutes'], load: 60, repetitions: 10 },
  { id: 4, name: 'Calf extension', musclegroups: ['legs'], load: 100, repetitions: 12 },
  { id: 1, name: 'Chin up', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 97, repetitions: 2 },
  { id: 3, name: 'Curl with machine', musclegroups: ['biceps'], series: 4, load: 36, repetitions: 10 },
  { id: 2, name: 'Pull down open', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 42, repetitions: 10 },
  { id: 4, name: 'Row', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 42, repetitions: 12 },
]

export default function NewSessionScreen() {

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [sessionDate, setSessionDate] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [showExerciseOptions, setShowExerciseOptions] = useState<boolean>(false);
  const [sessionTemplates, setSessionTemplates] = useState<Session[]>(mySessionTemplates);

  const addExerciseToSession = (exercise: Exercise | null) => {
    if (exercise) {
      setSelectedExercises((prevExercises) => [
        ...prevExercises,
        { ...exercise, load: exercise.load, repetitions: exercise.repetitions },
      ]);
    } else {
      setSelectedExercises((prevExercises) => [
        ...prevExercises,
        { id: Date.now(), name: '', musclegroups: [], load: 0, repetitions: 0 },
      ]);
    }
    setShowExerciseOptions(false);
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

  const createExecutedSession = () => { 
    if (selectedExercises.length === 0) {
      alert('Please select at least one exercise');
      return;
    }

    const newExecutedSession: ExecutedSession = {
      exercises: selectedExercises,
      date: sessionDate,
      difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
    };

    setSessionTemplates(sessionTemplates)
    console.log('Placeholder! Save it to the database and flush the data in this variable: ', newExecutedSession);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>New Session</Text>
        <Text style={styles.text}>Select Exercises:</Text>
        <TouchableOpacity onPress={() => setShowExerciseOptions(!showExerciseOptions)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>

        {showExerciseOptions && (
          <ScrollView style={styles.listContainer}>
            {exercises.map((exercise) => (
              <TouchableOpacity key={exercise.id} onPress={() => addExerciseToSession(exercise)} style={styles.exerciseRow}>
                <Text style={styles.exerciseText}>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => addExerciseToSession(null)} style={styles.exerciseRow}>
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
                onChangeText={(text) => updateExercise(exercise, 'name', text)}
                placeholder="Exercise name"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={exercise.load.toString()}
                onChangeText={(text) => updateExercise(exercise, 'load', parseFloat(text) || 0)}
                placeholder="Load (kg)"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={exercise.repetitions.toString()}
                onChangeText={(text) => updateExercise(exercise, 'repetitions', parseInt(text) || 0)}
                placeholder="Repetitions"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity onPress={() => removeExerciseFromSession(exercise)} style={styles.addButton}>
                <Ionicons name="remove-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TextInput
          style={styles.input}
          value={sessionDate}
          onChangeText={setSessionDate}
          placeholder="Enter session date (e.g., 2025-02-13)"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={difficulty}
          onChangeText={setDifficulty}
          placeholder="Enter difficulty level"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.addButton} onPress={createExecutedSession}>
          <Text style={styles.addButtonText}>Save Executed Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
