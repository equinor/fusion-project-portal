import {  Button, Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';


import { StyledCardWrapper, StyledContent, StyledHeader, StyledContentRow, StyledContentItem } from './styles';



export const ProjectDescription = () => {


	return (
		<StyledCardWrapper color={tokens.colors.ui.background__info.rgba}>
			<StyledHeader>
				<Typography variant="h5">Project Description</Typography>
			</StyledHeader>
			<StyledContent>
			<Typography>
				The field development project´s resource base consists of the three oil discoveries Skrugard, Havis and Drivis, located in PL 532. The field is expected to come on stream in 2023 and will produce for 30 years.
				<br/><br/>
				FPSO: Design capacity 190 000 BOEPD - 30 years design life - 1.1 mbbls oil storage - 295 m long - 55 m wide - Topsides dry weight: 25 000 Mt
				<br/><br/>
				Subsea: 30 wells (18 P / 8 WI 4 GI) - 10 templates - 2 satellites - 9 flexible risers - 2 umbilical risers - 180 seismic cables (PRM) - flexible flowlines 22 km - rigid flowlines 35 km - umbilicals 36 km - DC/FO cables 55 km - Fibre optic cable 255 km.
				</Typography>
			</StyledContent>
				<StyledCardWrapper.Actions alignRight={true}>
                    <Button variant='ghost'>
                        View in Sharepoint
                        <Icon name="chevron_right"/>
                    </Button>
			</StyledCardWrapper.Actions>
		</StyledCardWrapper>
	);
};
