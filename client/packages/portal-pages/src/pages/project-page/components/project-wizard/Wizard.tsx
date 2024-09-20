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
						title="New Project Landing Page"
						onNext={() => {
							setActiveStep(currentStep + 1);
						}}
					>
						Check our new landing page, designed to be <br />
						flexible and personalized with more project information.
					</WizardStep>
				);
			case 2:
				return (
					<WizardStep
						id={currentStep}
						title="View project phase"
						onBack={() => {
							setActiveStep(currentStep - 1);
						}}
						onNext={() => {
							setActiveStep(currentStep + 1);
						}}
					>
						This section shows the dates for decision gates, as well as the last decision gate that has been
						passed.
					</WizardStep>
				);
			case 3:
				return (
					<WizardStep
						id={currentStep}
						title="Pinned apps"
						onBack={() => {
							setActiveStep(currentStep - 1);
						}}
						onNext={() => {
							setActiveStep(currentStep + 1);
						}}
					>
						Go to the tab ´all apps´ and click on the star next to an app to add to the section of Pinned
						apps. You can remove them by clicking the star from pinned apps.
					</WizardStep>
				);
			case 4:
				return (
					<WizardStep
						id={currentStep}
						title="My features"
						onBack={() => {
							setActiveStep(currentStep - 1);
						}}
						onNext={() => {
							localStorage.setItem(key, 'false');
							setIsOpen(false);
						}}
						next="Go to Landing Page"
					>
						Open My account at the top right, scroll down to ´My features´. <br />
						Click on the features that you would like to use. You can turn them on and off anytime.
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
