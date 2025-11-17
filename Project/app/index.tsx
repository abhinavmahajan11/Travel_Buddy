import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.appTitle}>Travel Buddy</Text>
        <Text style={styles.subtitle}>Your personal AI trip planner</Text>

        <Pressable style={styles.card} onPress={() => router.push("/trends")}>
          <Text style={styles.cardTitle}>Travel Trends</Text>
          <Text style={styles.cardText}>
            See trending attractions and save places you love.
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/itinerary-builder")}
        >
          <Text style={styles.cardTitle}>Itinerary Builder</Text>
          <Text style={styles.cardText}>
            Build a smart daily plan from your destinations, dates, and budget.
          </Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push("/chat")}>
          <Text style={styles.cardTitle}>AI Travel Chat</Text>
          <Text style={styles.cardText}>
            Ask about attractions, food, and transportation.
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB" },
  content: { padding: 20 },
  appTitle: { fontSize: 28, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  cardText: { fontSize: 14, color: "#555" },
});
