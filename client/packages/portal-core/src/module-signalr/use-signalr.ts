import { useFramework } from "@equinor/fusion-framework-react";
import { useCallback, useEffect, useState } from "react";
import { SignalRModule } from "./module";
import { Topic } from "./provider";


export const useSignalRTopic = <T>(topicId: string, cb: (data: T) => void, args?: any) => {
    const [topic, setTopic] = useState<Topic<T>>();
    const hub = useFramework<[SignalRModule]>().modules.signalr;

    useEffect(() => {
        setTopic(hub.connect(topicId, args));
    }, [topicId, args]);

    useEffect(() => {
        if (!topic) return;
        topic.subscribe(cb)
        return () => topic.close()
    }, [topic]);

    return topic
}