import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Exercise } from './exercises';

export interface ExecutedSession {
    exercises: Exercise[];
    date: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
  }

  const legExercises: Exercise[] = [
    { id: 1, name: 'Hip thrust', musclegroups: ['abdomen', 'glutes'], load: 10, repetitions: 12 },
    { id: 2, name: 'Squat', musclegroups: ['abdomen', 'legs', 'glutes'], load: 50, repetitions: 12 },
    { id: 3, name: 'Deadlift', musclegroups: ['back', 'abdomen', 'legs', 'lumbar', 'glutes'], load: 60, repetitions: 10 },
    { id: 4, name: 'Calf extension', musclegroups: ['legs'], load: 100, repetitions: 12 },
];

const pullExercises: Exercise[] = [
  { id: 1, name: 'Chin up', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 97, repetitions: 2 },
  { id: 3, name: 'Curl with machine', musclegroups: ['biceps'], series: 4, load: 36, repetitions: 10 },
  { id: 2, name: 'Pull down open', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 42, repetitions: 10 },
  { id: 4, name: 'Row', musclegroups: ['shoulders', 'biceps', 'forearm'], series: 3, load: 42, repetitions: 12 },
];

export default function SessionHistoryScreen() {

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [sessionDate, setSessionDate] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>("EASY");
  const [showExerciseOptions, setShowExerciseOptions] = useState<boolean>(false);
  const [executedSessions, setExecutedSessions] = useState<ExecutedSession[]>([
    {
        exercises: legExercises,
        date: '2025-feb-09',
        difficulty: "MEDIUM",
    },
    {
      exercises: pullExercises,
      date: '2025-feb-14',
      difficulty: "EASY",
    }
]);

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
      difficulty: difficulty as "EASY" | "MEDIUM" | "HARD"
    };

    // executedSessions.push(newExecutedSession)
    setExecutedSessions(executedSessions)
    console.log('Session History:', newExecutedSession);
    // Optionally, save the executed session to storage or a database here
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Session History</Text>
        <ScrollView style={styles.listContainer}>
          {executedSessions.map((session, index) => (
            <View key={index} style={styles.exerciseRow}>
              <Text style={styles.exerciseText}>Session Date: {session.date}</Text>
              <Text style={styles.exerciseText}>Difficulty: {session.difficulty}</Text>
              <Text style={styles.exerciseText}>Exercises:</Text>
              {session.exercises.map((exercise, i) => (
                <Text key={i} style={styles.exerciseText}>
                  {exercise.name} - {exercise.load}kg x {exercise.repetitions} reps
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
