
import { useEffect, useState } from "react";
import { useSignalRTopic } from "../module-signalr";
import { ServiceMessage } from "./types";
import { useServiceMessageQuery } from "./use-service-message-query";

export const useServiceMessage = () => {
  const [messages, setMessages] = useState<ServiceMessage[]>([])
  const { data } = useServiceMessageQuery()

  useEffect(() => {
    if (data)
      setMessages(data)
  }, [data])

  useSignalRTopic("service-messages", (message: unknown[]) => {
    message = message.shift() as unknown[];
    const messages = JSON.parse(JSON.stringify(message)) as ServiceMessage[];
    setMessages(messages)
  });



  return messages
}