import { NativeSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const TimePickerContainer = styled.div`
	margin: 1rem 0;
	display: flex;
	align-items: center;
	width: max-content;
	background-color: ${tokens.colors.ui.background__light.hex};
	box-shadow: inset 0 -1px 0 0 var(--eds_text__static_icons__tertiary, rgba(111, 111, 111, 1));
`;

const TimeSelect = styled(NativeSelect)`
	min-width: 30px;
	> select {
		background: none;
		padding: 5px;
		font-size: 16px;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		text-indent: 1px;
		text-overflow: '';
		width: auto; /* You can adjust the width as needed */

		:disabled {
			background: none;
		}
	}
`;

const hours = Array.from({ length: 24 }, (_, index) => ({
	value: index,
	label: index.toString().padStart(2, '0'),
}));

const minutes = Array.from({ length: 60 }, (_, index) => ({
	value: index,
	label: index.toString().padStart(2, '0'),
}));

export const MinutePicker = ({
	value,
	disabled,
	onChange,
}: {
	value?: number;
	disabled?: boolean;
	onChange?: (value: number) => void;
}) => {
	const [selectedHour, setSelectedHour] = useState(0);
	const [selectedMinute, setSelectedMinute] = useState(0);

	useEffect(() => {
		if (!value) return;

		const hours = Math.floor(value / 60);
		const remainingMinutes = value % 60;
		setSelectedHour(hours);
		setSelectedMinute(remainingMinutes);
	}, [value]);

	const handleHourChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
		(event) => {
			const selectedValue = Number(event.target.value);
			const min = selectedValue * 60;

			setSelectedHour(selectedValue);
			onChange && onChange(min + selectedMinute);
		},
		[selectedMinute]
	);

	const handleMinuteChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
		(event) => {
			const selectedValue = Number(event.target.value);
			const min = selectedHour * 60;
			setSelectedMinute(selectedValue);
			onChange && onChange(selectedValue + min);
		},
		[selectedHour]
	);

	return (
		<TimePickerContainer>
			<TimeSelect
				value={selectedHour}
				onChange={handleHourChange}
				id="default-select"
				label=""
				disabled={disabled}
			>
				{hours.map((hour) => (
					<option key={hour.value} value={hour.value}>
						{hour.label}
					</option>
				))}
			</TimeSelect>

			<span>:</span>

			<TimeSelect
				value={selectedMinute}
				onChange={handleMinuteChange}
				id="default-select"
				label=""
				disabled={disabled}
			>
				{minutes.map((minute) => (
					<option key={minute.value} value={minute.value}>
						{minute.label}
					</option>
				))}
			</TimeSelect>
		</TimePickerContainer>
	);
};
