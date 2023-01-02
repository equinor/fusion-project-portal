import { useState, useEffect } from "react";
import { useAppGroupsQuery } from "../queries";
import { AppGroup } from "../types";

export const useCurrentAppGroup = (appKey?: string) => {

    const { data, isLoading } = useAppGroupsQuery()
    const [currentAppGroup, setCurrentAppGroup] = useState<AppGroup>()

    useEffect(() => {
        const nextAppGroup = data?.find(app => !!app.apps.find(a => a.appKey === appKey));
        setCurrentAppGroup(s => nextAppGroup ? nextAppGroup : undefined);

    }, [appKey, data])

    return { currentAppGroup, isLoading }
}