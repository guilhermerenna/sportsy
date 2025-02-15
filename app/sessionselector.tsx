import { useState } from "react";
import { Session } from "./sessiontemplates";
import { View, Text, TouchableOpacity } from "react-native";

export default function SessionSelectorScreen() {
    const [sessions] = useState<Session[]>([]); // Constant for sessions list
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    
    return (
      <View>
        <Text>Select or Create a Session:</Text>
        <TouchableOpacity onPress={() => setSelectedSession(null)}>
          <Text>Create New Session</Text>
        </TouchableOpacity>
        {/* Render existing sessions and allow user to select one */}
        {sessions.map((session) => (
          <TouchableOpacity onPress={() => setSelectedSession(session)} key={session.date}>
            <Text>{session.date}</Text>
          </TouchableOpacity>
        ))}
        {/* If a session is selected, show its details and allow modifying exercises */}
      </View>
    );
  }