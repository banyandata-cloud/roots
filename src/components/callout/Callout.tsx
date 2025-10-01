import type { ReactElement, ReactNode } from 'react';
import { forwardRef } from 'react';
import { classes } from '../../utils/utils';
import { AlertIcon } from '../icons';
import type { CalloutProps } from './types';

const typeShadows: Record<string, { parent: string; icon: string }> = {
	info: {
		parent: 'bn-shadow-[0_0_0.125rem_0_rgba(0,0,0,0.25)]',
		icon: 'bn-shadow-[0_0_0.4rem_0_rgba(0,128,255,0.25)]',
	},
	success: {
		parent: 'bn-shadow-[0_0_0.125rem_0_rgba(0,0,0,0.25)]',
		icon: 'bn-shadow-[0_0_0.4rem_0_rgba(0,128,0,0.25)]',
	},
	danger: {
		parent: 'bn-shadow-[0_0_0.125rem_0_rgba(0,0,0,0.25)]',
		icon: 'bn-shadow-[0_0_0.4rem_0_rgba(255,0,0,0.25)]',
	},
	error: {
		parent: 'bn-shadow-[0_0_0.125rem_0_rgba(0,0,0,0.25)]',
		icon: 'bn-shadow-[0_0_0.4rem_0_rgba(255,0,0,0.25)]',
	},
	warning: {
		parent: 'bn-shadow-[0_0_0.125rem_0_rgba(0,0,0,0.25)]',
		icon: 'bn-shadow-[0_0_0.4rem_0_rgba(255,165,0,0.25)]',
	},
};

const shadowClass =
	'bn-shadow-[0_0_0.0625rem_0_rgba(0,0,0,0.25)] bn-shadow-[0_0_0.25rem_0_rgba(0,0,0,0.25)] bn-shadow-[0_0_0.1875rem_0_rgba(0,0,0,0.25)]';

const Callout = forwardRef<HTMLDivElement, CalloutProps>((props, ref): ReactElement | null => {
	const {
		showIcon = true,
		shadow,
		className = '',
		title,
		description,
		icon: CustomIcon,
		action: CustomAction,
		type = '',
	} = props;

	let Icon: ReactNode = null;

	if (CustomIcon != null) {
		Icon = <CustomIcon className='bn-w-6 bn-h-6' />;
	} else {
		switch (type) {
			case 'info':
				Icon = <AlertIcon.Info className='bn-w-6 bn-h-6' />;
				break;
			case 'error':
				Icon = <AlertIcon.Error className='bn-w-6 bn-h-6' />;
				break;
			case 'warning':
				Icon = <AlertIcon.Warning className='bn-w-6 bn-h-6' />;
				break;
			case 'success':
				Icon = <AlertIcon.Success className='bn-w-6 bn-h-6' />;
				break;
			case 'danger':
				Icon = <AlertIcon.Danger className='bn-w-6 bn-h-6' />;
				break;
			default:
				Icon = null;
		}
	}

	return (
		<div
			ref={ref}
			className={classes(
				'bn-flex bn-flex-row bn-justify-between bn-items-start bn-p-4 bn-w-full bn-bg-light-color3 bn-rounded-sm',
				type ? typeShadows[type]?.parent : '',
				shadow ? shadowClass : '',
				className
			)}>
			<div className='bn-flex bn-flex-row bn-justify-start bn-items-start'>
				<div
					className={classes(
						'bn-p-2 bn-w-10 bn-h-10 bn-rounded-[0.625rem] bn-bg-light-color3 bn-transition-shadow bn-duration-500',
						type ? typeShadows[type]?.icon : ''
					)}>
					{showIcon && Icon}
				</div>
				<div className='bn-flex bn-flex-col bn-justify-start bn-items-start bn-gap-1 bn-ml-5'>
					{title && (
						<span
							data-elem='title'
							className='bn-text-text-color bn-text-sm bn-font-semibold'>
							{title}
						</span>
					)}
					{description && (
						<span
							data-elem='desc'
							className='bn-text-text-color bn-text-sm bn-font-normal bn-break-words'>
							{description}
						</span>
					)}
				</div>
			</div>
			<div>{CustomAction && <CustomAction />}</div>
		</div>
	);
});

Callout.displayName = 'Callout';

export default Callout;
