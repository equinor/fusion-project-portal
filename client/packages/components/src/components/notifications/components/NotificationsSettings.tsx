import { Switch, Typography } from '@equinor/eds-core-react';
import { MinutePicker } from '@portal/ui';
import { useEffect } from 'react';
import { mutateArray } from '@portal/utils';
import styled from 'styled-components';
import { useNotificationSettings } from '../hooks/useNotificationsSettings';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const Style = {
	MailSettingsList: styled.div`
		display: flex;
		flex-direction: column;
	`,
};

export const NotificationsSettings = () => {
	const { settings, mutate, isFetching } = useNotificationSettings();

	useEffect(() => {
		console.log(settings);
	}, [settings]);

	return (
		<div>
			<div>
				<Typography variant="h6">General</Typography>
				<Switch
					title="send-email"
					label="Send Emails"
					checked={settings.email}
					disabled={isFetching}
					onChange={() => {
						mutate({
							...settings,
							email: !settings.email,
						});
					}}
				/>
			</div>
			<div>
				<Typography variant="h6">Delay emails for hours and minutes</Typography>
				<MinutePicker
					disabled={!settings.email}
					value={settings.delayInMinutes}
					onChange={(value) => mutate({ ...settings, delayInMinutes: value })}
				/>
			</div>
			<div>
				<Typography variant="h6">App e-mail settings</Typography>
				<Style.MailSettingsList>
					{settings.appConfig.map((item) => (
						<Switch
							disabled={!settings.email}
							key={item.appKey}
							title={item.appKey}
							label={capitalizeFirstLetter(item.appKey)}
							checked={item.enabled}
							onChange={() => {
								const appConfig = mutateArray(settings.appConfig, 'appKey')
									.mutate((a) => {
										a[item.appKey].enabled = !a[item.appKey].enabled;
										return a;
									})
									.getValue();
								mutate({
									...settings,
									appConfig,
								});
							}}
						/>
					))}
				</Style.MailSettingsList>
			</div>
		</div>
	);
};
