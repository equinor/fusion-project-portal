
import { useContext, useEffect, useState } from "react";
import { AppServiceMessage, ServiceMessageContext } from "../provider/ServiceMessageProvider";

import { ServiceMessage } from "../types/types";

export const useServiceMessage = (appKey?: string) => {
  const context = useContext(ServiceMessageContext);

  if (!context) {
    throw new Error("ServiceMessageContext context used out of bounds");
  }

  useEffect(() => {
    if (appKey) context.serviceMessages.setCurrentApp(appKey)
  }, [appKey])

  const [messages, setMessages] = useState<ServiceMessage[]>([]);
  const [appsMessages, setAppsMessages] = useState<AppServiceMessage[]>([]);
  const [portalMessages, setPortalMessages] = useState<ServiceMessage[]>([]);
  const [currentMessages, setCurrentMessages] = useState<ServiceMessage[]>([]);

  useEffect(() => {
    const sub = context.serviceMessages.messages$.subscribe(setMessages);
    return () => {
      sub.unsubscribe()
    }
  }, []);

  useEffect(() => {
    const sub = context.serviceMessages.appMessages$.subscribe(setAppsMessages);
    return () => {
      sub.unsubscribe()
    }
  }, []);

  useEffect(() => {
    const sub = context.serviceMessages.currentAppMessages$.subscribe(setCurrentMessages);
    return () => {
      sub.unsubscribe()
    }
  }, []);


  useEffect(() => {
    const sub = context.serviceMessages.portal$.subscribe(setPortalMessages);
    return () => {
      sub.unsubscribe()
    }
  }, []);


  return {
    appsMessages,
    portalMessages,
    currentMessages,
    messages
  }
}