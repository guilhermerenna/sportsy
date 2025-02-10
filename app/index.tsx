import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import styles from './styles';

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/exercise" style={styles.button}>
        Exercises
      </Link>
      <Link href="/sessions" style={styles.button}>
        Sessions
      </Link>
    </View>
  );
}