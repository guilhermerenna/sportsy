import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Exercise } from './exercises';
import { Session } from './sessiontemplates';
import { format } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';

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

const getTodayDate = () => {
  const today = new Date();
  return format(today, 'yyyy-MMM-dd');
};

export default function NewSessionScreen() {

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [sessionDate, setSessionDate] = useState<string>(getTodayDate());
  const [difficulty, setDifficulty] = useState<string>('EASY');
  const [showExerciseOptions, setShowExerciseOptions] = useState<boolean>(false);
  const [sessionTemplates, setSessionTemplates] = useState<Session[]>(mySessionTemplates);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState<boolean>(false);

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

  const updateExercise = (exercise: Exercise, field: 'load' | 'repetitions' | 'name' | 'series', value: string | number) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === exercise.id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const handleTemplateSelection = (template: Session) => {
    setSelectedExercises(template.exercises);
    setShowTemplateDropdown(false);
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

  const renderSelectedExercises = () => {
    return (<><Text style={styles.text}>Selected Exercises:</Text><ScrollView style={styles.listContainer}>
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
            value={exercise.series?.toString()}
            onChangeText={(text) => updateExercise(exercise, 'series', text)}
            placeholder="# series"
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
    </ScrollView></>)
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>New Session</Text>
        <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => setShowTemplateDropdown(!showTemplateDropdown)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Select Template</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowExerciseOptions(!showExerciseOptions)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
        </View>

        {showTemplateDropdown && (
          <ScrollView style={styles.listContainer}>
            {sessionTemplates.map((template) => (
              <TouchableOpacity key={template.name ?? 'selectedTemplate'} onPress={() => handleTemplateSelection(template)} style={styles.exerciseRow}>
                <Text style={styles.exerciseText}>{template.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

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

        {selectedExercises.length == 0 
        ? <Text style={styles.text}>Select a workout template or Add Exercises manually!</Text>
        : renderSelectedExercises()
        }
        <View style={styles.dateContainer}>
          <Text style={styles.text}>Date:</Text>
          <TextInput
            style={styles.input}
            value={sessionDate}
            onChangeText={setSessionDate}
            placeholderTextColor="#aaa"
          />
        </View>
        
        <RNPickerSelect
          style={{
            inputIOS: styles.inputGlobal,
            inputAndroid: styles.inputGlobal,
            inputWeb: styles.inputGlobal
          }}
          onValueChange={(value) => setDifficulty(value)}
          items={[
            { label: 'EASY', value: 'EASY' },
            { label: 'MEDIUM', value: 'MEDIUM' },
            { label: 'HARD', value: 'HARD' },
          ]}
          value={difficulty}
      />
        <TouchableOpacity style={styles.addButton} onPress={createExecutedSession}>
          <Text style={styles.addButtonText}>Save Executed Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
