import { useFramework } from "@equinor/fusion-framework-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { SignalRModule } from "./module";
import { Topic } from "./provider";


export const useSignalRTopic = <T>(topicId: string, cb: (data: T) => void, args?: any) => {
    const [topic, setTopic] = useState<Topic<T>>();
    const hub = useFramework<[SignalRModule]>().modules.signalr;
    const subscription = useRef<Subscription>()

    useEffect(() => {
        hub.connect<T>(topicId, args).then((topicConnection) => {
            if (topicConnection)
                setTopic(topicConnection);
        })
    }, [topicId, args]);

    useEffect(() => {
        if (!topic) return;
        subscription.current = topic.subscribe(cb)
    }, [topic]);

    useEffect(() => {
        return () => {
            if (subscription.current) subscription.current.unsubscribe()
        }
    }, [])

    return topic
}