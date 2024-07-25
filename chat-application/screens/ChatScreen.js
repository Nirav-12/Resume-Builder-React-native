import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { db, firebase } from "../firebase";
import { collection } from "firebase/firestore";

const ChatScreen = ({ route }) => {
  const { name } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = collection(db, "chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messagesFirestore = snapshot.docs.map((doc) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        });
        setMessages(messagesFirestore);
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    collection(db, "chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // _id: firebase.auth().currentUser.uid,
        name: name,
      }}
    />
  );
};

export default ChatScreen;
