import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { generateItinerary } from "../services/fakeApi";
import { Itinerary } from "../data/mockData";

export default function ItineraryBuilderScreen() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("2025-06-01");
  const [endDate, setEndDate] = useState("2025-06-05");
  const [budgetLevel, setBudgetLevel] = useState<"budget" | "standard" | "luxury">(
    "standard"
  );
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const handleGenerate = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    const result = await generateItinerary({
      destination,
      startDate,
      endDate,
      budgetLevel,
    });
    setItinerary(result);
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Itinerary Builder</Text>
      <Text style={styles.label}>Destination city</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Paris"
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>Start date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text style={styles.label}>End date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} />

      <Text style={styles.label}>Budget level</Text>
      <View style={styles.budgetRow}>
        {(["budget", "standard", "luxury"] as const).map((level) => (
          <Pressable
            key={level}
            style={[
              styles.budgetChip,
              budgetLevel === level && styles.budgetChipActive,
            ]}
            onPress={() => setBudgetLevel(level)}
          >
            <Text
              style={[
                styles.budgetChipText,
                budgetLevel === level && styles.budgetChipTextActive,
              ]}
            >
              {level}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleGenerate}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generate Itinerary</Text>
        )}
      </Pressable>

      {itinerary && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>
            {itinerary.destination} – {itinerary.totalDays} day plan
          </Text>
          {itinerary.days.map((d) => (
            <View key={d.day} style={styles.dayCard}>
              <Text style={styles.dayTitle}>Day {d.day}</Text>
              <Text style={styles.dayLine}>Morning: {d.morning}</Text>
              <Text style={styles.dayLine}>Afternoon: {d.afternoon}</Text>
              <Text style={styles.dayLine}>Evening: {d.evening}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F7FB" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "500", marginTop: 8, marginBottom: 4 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  budgetRow: { flexDirection: "row", marginTop: 4, marginBottom: 12 },
  budgetChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#E2E6F0",
    marginRight: 8,
  },
  budgetChipActive: { backgroundColor: "#007AFF" },
  budgetChipText: { fontSize: 12, color: "#333" },
  budgetChipTextActive: { color: "#fff" },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  result: { marginTop: 10 },
  resultTitle: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  dayCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  dayTitle: { fontWeight: "600", marginBottom: 4 },
  dayLine: { fontSize: 13, color: "#333", marginBottom: 2 },
});
