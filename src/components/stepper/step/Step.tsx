import { COLORS } from '../../../styles';
import { classes } from '../../../utils';
import { CrossIcon, TickIcon } from '../../icons';
import styles from './Step.module.css';

export interface StepProps {
	title?: string | null;
	description?: string;
	active?: boolean;
	completion?: number;
	error?: boolean;
	index?: number;
	noTail?: boolean;
	orientation?: 'horizontal' | 'vertical';
	total?: number;
	renderIcon?: React.ComponentType<StepProps>;
	renderTitle?: React.ComponentType<StepProps>;
	renderDescription?: React.ComponentType<StepProps>;
}

const Step = (props: StepProps): React.ReactElement => {
	const {
		title,
		description,
		active = false,
		completion = 0,
		error = false,
		index = 0,
		noTail = false,
		orientation = 'horizontal',
		renderIcon: RenderIcon,
		renderTitle: RenderTitle,
		renderDescription: RenderDescription,
	} = props;

	let display = <span className={styles.text}>{index + 1}</span>;

	if (error === true) {
		display = <CrossIcon className={classes(styles.icon, styles['error-icon'])} />;
	} else if (completion === 1) {
		display = (
			<TickIcon
				className={classes(
					styles.icon,
					styles['completion-icon'],
					active ? styles.active : ''
				)}
			/>
		);
	}

	let IconContainer = (
		<div className={styles['icon-container']}>
			{display}
			{active === true && completion > 0 && completion <= 1 && (
				<div
					className={styles.progress}
					style={{
						backgroundImage: `conic-gradient(${
							(COLORS as Record<string, string>).highlight
						}, ${completion * 100}%, transparent 0%)`,
					}}
				/>
			)}
		</div>
	);

	if (RenderIcon) {
		IconContainer = <RenderIcon {...props} />;
	}

	let Title = <span className={classes(styles.title)}>{title}</span>;

	if (RenderTitle) {
		Title = <RenderTitle {...props} />;
	}

	let Description = description != null && (
		<span className={styles.description}>{description}</span>
	);

	if (RenderDescription) {
		Description = <RenderDescription {...props} />;
	}

	return (
		<div
			className={classes(
				styles.root,
				active ? styles.active : '',
				completion === 1 ? styles.completed : '',
				error ? styles.error : '',
				noTail ? styles['no-tail'] : '',
				styles[orientation]
			)}
			data-elem='step'>
			<div className={styles.left}>{IconContainer}</div>
			<div className={styles.right}>
				{Title}
				{Description}
			</div>
		</div>
	);
};

Step.defaultProps = {
	title: null,
	description: '',
	active: false,
	completion: 0,
	error: false,
	index: 0,
	noTail: false,
	orientation: 'horizontal',
	renderIcon: null,
	renderTitle: null,
	renderDescription: null,
};

export default Step;
