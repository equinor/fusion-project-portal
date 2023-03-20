import { FC } from "react"

export const TimeStamp: FC<{ date: Date }> = ({ date }) => {

    const defaultDateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        year: '2-digit',
        minute: '2-digit'
    }
    return <time dateTime={new Date(Date.parse(date.toString())).toISOString()}>
        <span>{new Date(date.toString()).toLocaleDateString(defaultDateOptions.localeMatcher, defaultDateOptions)}</span>
    </time>
}

