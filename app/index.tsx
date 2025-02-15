import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import styles from './styles';

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/exercises" style={styles.button}>
        Exercises
      </Link>
      <Link href="/sessiontemplates" style={styles.button}>
        Session Templates
      </Link>
      <Link href="/newsession" style={styles.button}>
        New Session
      </Link>
      <Link href="/sessionhistory" style={styles.button}>
        Session History
      </Link>
    </View>
  );
}