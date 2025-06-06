
type AlertType = 'info' | 'error' | 'warning' | 'success' | 'danger';
type AlertPosition = 'bottom-right' | 'bottom-center' | 'top-right' | 'top-center';

export interface AlertProps {
	showIcon?: boolean;
	shadow?: boolean;
	position?: AlertPosition;
	animation?: boolean;
	className?: string;
}

 export interface AlertConfig {
	title: string | null | undefined;
	description: string | null | undefined;
	icon?: React.ComponentType<{ className?: string }> | undefined;
	type: AlertType;
	action?: React.ComponentType | undefined;
	position?: AlertPosition | null | undefined;
	onClose?: () => void;
	autoDismiss?: boolean;
	dismissTime?: number;
}

export interface AlertHandle {
	alert: (props: Partial<AlertConfig>) => void;
}

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg' | 'auto';
  variant?: 'text' | 'contained' | 'outlined';
  onClick?: () => void;
  className?: string;
  leftComponent?: () => React.ReactNode;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
