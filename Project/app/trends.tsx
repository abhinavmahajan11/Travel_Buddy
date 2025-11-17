import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getTrendingAttractions, searchAttractions } from "../services/fakeApi";
import { Attraction } from "../data/mockData";

export default function TrendsScreen() {
  const [loading, setLoading] = useState(true);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getTrendingAttractions();
      setAttractions(data);
      setLoading(false);
    })();
  }, []);

  const handleSearchChange = async (text: string) => {
    setSearch(text);
    setLoading(true);
    const results = await searchAttractions(text);
    setAttractions(results);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Trends</Text>
      <TextInput
        style={styles.search}
        placeholder="Search attractions or cities..."
        value={search}
        onChangeText={handleSearchChange}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={attractions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>
                {item.city}, {item.country}
              </Text>
              <Text style={styles.meta}>
                {item.category} • ⭐ {item.rating.toFixed(1)} • {item.priceLevel}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.tags}>
                {item.tags.map((t) => `#${t}`).join("  ")}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F7FB" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "600" },
  location: { fontSize: 13, color: "#555", marginTop: 2 },
  meta: { fontSize: 12, color: "#777", marginTop: 4 },
  description: { fontSize: 13, color: "#333", marginTop: 6 },
  tags: { fontSize: 12, color: "#007AFF", marginTop: 6 },
});
