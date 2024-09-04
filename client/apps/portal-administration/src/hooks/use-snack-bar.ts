import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { uuidv7 } from "uuidv7";

export type Message = {
  id: string;
  type: string;
  message: string;
};

const messages$ = new BehaviorSubject<Record<string, Message>>({});

export const useSnackBar = () => {
  const [messages, setMessages] = useState<Record<string, Message>>({});

  useEffect(() => {
    const sub = messages$.subscribe(setMessages);
    return () => sub.unsubscribe();
  }, []);

  const sendMessage = (message: string, type: string = "Info") => {
    const id = uuidv7();
    messages$.next(
      Object.assign({}, messages$.value, { [id]: { message, type, id } })
    );
  };

  const removeMessage = (id: string) => {
    delete messages$.value[id];
  };

  return { sendMessage, removeMessage, messages, messages$ };
};
