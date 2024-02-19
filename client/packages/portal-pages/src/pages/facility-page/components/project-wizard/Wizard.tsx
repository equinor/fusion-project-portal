import { useCallback, useEffect, useState } from 'react';
import { Scrim } from '@equinor/eds-core-react';
import { WizardStep } from './WizardStep';

const key = `FUSION_SHOW_NEW_PROJECT_PAGE_WIZARD`;

export const WizardScrim = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState<number>(1);
	const showWizard = JSON.parse(localStorage.getItem(key) ?? 'true');

	useEffect(() => {
		if (showWizard) {
			setIsOpen(true);
		}
	}, []);

	const handleClose = () => {
		setIsOpen(false);
	};

	const renderStep = useCallback((currentStep: number) => {
		switch (currentStep) {
			default:
			case 1:
				return (
					<WizardStep
						id={currentStep}
						title="The new Project Page is here."
						onNext={() => {
							setActiveStep(currentStep + 1);
						}}
					>
						Check out our new Landing Page, designed to be
						<br /> flexible and personalized wit more project information.
					</WizardStep>
				);
			case 2:
				return (
					<WizardStep
						id={currentStep}
						title="Save your favorite app"
						onBack={() => {
							setActiveStep(currentStep - 1);
						}}
						onNext={() => {
							setActiveStep(currentStep + 1);
						}}
					>
						Click on the star icon next to an app to instantly add it to your Favorites. If you're in a
						hurry right now, you can always come back later to build your list of Favorites.
					</WizardStep>
				);
			case 3:
				return (
					<WizardStep
						id={currentStep}
						title="Project Phases"
						onBack={() => {
							setActiveStep(currentStep - 1);
						}}
						onNext={() => {
							setActiveStep(currentStep + 1);
						}}
					>
						The project phases KPIs serve as the guiding stars, illuminating the path forward and marking
						significant milestones.
					</WizardStep>
				);
			case 4:
				return (
					<WizardStep
						id={currentStep}
						title="Project Information"
						onBack={() => {
							setActiveStep(currentStep - 1);
						}}
						onNext={() => {
							localStorage.setItem(key, 'false');
							setIsOpen(false);
						}}
						next="Go to Landing Page"
					>
						A search feature empowers you to find and launch apps quickly.
						<br /> Just hit the enter key.
					</WizardStep>
				);
		}
	}, []);

	return (
		<Scrim open={isOpen} onClose={handleClose} isDismissable={false}>
			{renderStep(activeStep)}
		</Scrim>
	);
};
