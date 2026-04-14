import { Figma, Github } from '../icons';

const LinkHeader = ({ figmaLink = '', githubLink = '' }) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
			}}>
			<Github link={githubLink} />
			{figmaLink && <Figma link={figmaLink} />}
		</div>
	);
};

export default LinkHeader;
