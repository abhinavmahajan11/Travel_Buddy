import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { ChatMessage } from "../data/mockData";
import { sendChat } from "../services/fakeApi";

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    const newMsgs = await sendChat(input.trim());
    setMessages((prev) => [...prev, ...newMsgs]);
    setInput("");
    setSending(false);
  };

  const sortedMessages = [...messages].sort(
    (a, b) => a.createdAt - b.createdAt
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>AI Travel Chat</Text>

        <FlatList
          data={sortedMessages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.sender === "user" ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  item.sender === "user" ? styles.userText : styles.aiText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask about attractions, food, transit..."
            value={input}
            onChangeText={setInput}
          />
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>{sending ? "..." : "Send"}</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB" },
  inner: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 6,
    maxWidth: "80%",
  },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
  aiBubble: { alignSelf: "flex-start", backgroundColor: "#fff" },
  bubbleText: { fontSize: 14 },
  userText: { color: "#fff" },
  aiText: { color: "#333" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sendText: { color: "#fff", fontWeight: "600" },
});
