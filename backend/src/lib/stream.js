import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY OR STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this is for chat
export const streamClient = new StreamClient(apiKey, apiSecret); // this is for video calls

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully:", userData);
  } catch (error) {
    console.error("Error upserting stream user", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUsers(userId);
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    console.error("Error deleting stream user", error);
  }
};
