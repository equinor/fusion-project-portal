import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { Banner, StyledMessageType } from './ServiceMessageBannerStyles';
import { ServiceMessage } from '../types/types';

interface SystemBannerProps {
    message?: ServiceMessage;
    handleClose(message?: ServiceMessage): void;
}

interface SystemBannerMap {
    [key: string]: {
        iconColor: string;
        buttonColor: 'primary' | 'danger' | 'secondary' | undefined;
        background: string;
    };
}

const systemBannerMap: SystemBannerMap = {
    Info: {
        iconColor: tokens.colors.infographic.substitute__blue_ocean.rgba,
        buttonColor: 'primary',
        background: tokens.colors.ui.background__info.rgba,
    },
    Issue: {
        iconColor: tokens.colors.interactive.danger__text.rgba,
        buttonColor: 'danger',
        background: tokens.colors.ui.background__danger.rgba,
    },
    Maintenance: {
        iconColor: tokens.colors.infographic.substitute__blue_ocean.rgba,
        buttonColor: 'secondary',
        background: tokens.colors.ui.background__default.rgba,
    },
};



export function ServiceMessageBanner({
    handleClose,
    message,
}: SystemBannerProps): JSX.Element | null {
    if (!message) return null;
    const { iconColor, buttonColor, background } = systemBannerMap[message.type || 'default'];
    return (
        <Banner iconColor={iconColor} background={background}>
            <div>
                <span>
                    {message.scope}
                </span>
                <span>
                    {message.appliesTo && typeof message.appliesTo === "string" && Date.parse(message.appliesTo).toString()}
                </span>
                <span>
                    {message.title}
                </span>
            </div>

            <Banner.Actions>

                {message.type}

            </Banner.Actions>
        </Banner>
    );
}