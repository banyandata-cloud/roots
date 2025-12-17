import { render, screen, fireEvent } from '@testing-library/react';
import RichEditor from './RichEditor';
import * as TipTap from '@tiptap/react';

//  MOCKS
const mockChain = {
	focus: jest.fn().mockReturnThis(),
	toggleBold: jest.fn().mockReturnThis(),
	toggleItalic: jest.fn().mockReturnThis(),
	toggleUnderline: jest.fn().mockReturnThis(),
	toggleStrike: jest.fn().mockReturnThis(),
	toggleHeading: jest.fn().mockReturnThis(),
	setParagraph: jest.fn().mockReturnThis(),
	run: jest.fn(),
};

const mockEditor = {
	chain: jest.fn(() => mockChain),
	isActive: jest.fn(() => false),
	getAttributes: jest.fn(() => ({})),
	commands: {
		clearContent: jest.fn(),
	},
	state: {
		selection: {
			$head: {
				parent: {
					type: { name: 'paragraph' },
					attrs: {},
				},
			},
		},
	},
};

// TipTap Mock
jest.mock('@tiptap/react', () => ({
	EditorContent: ({ className }: any) => (
		<div data-testid='editor-content' className={className} />
	),
	useEditor: jest.fn(),
}));

// DialogBox Mock
jest.mock('../../modal/dialogBox/DialogBox', () => {
	const React = jest.requireActual('react') as typeof import('react');

	return React.forwardRef((_props: any, ref: any) => {
		React.useImperativeHandle(ref, () => ({
			dialog: jest.fn(),
		}));
		return <div data-testid='dialog-box' />;
	});
});

// Dropdown Mock
jest.mock('../dropdown', () => ({
	Dropdownv2: ({ onChange }: any) => (
		<button data-testid='text-type-dropdown' onClick={() => onChange({}, 'h1')}>
			Dropdown
		</button>
	),
	DropdownItemv2: () => null,
}));

// TextField Mock
jest.mock('../textField', () => ({
	TextFieldv2: () => <div data-testid='text-field' />,
}));

//  HAPPY PATH
describe('RichEditor – basic rendering & core actions', () => {
	beforeEach(() => {
		(TipTap.useEditor as jest.Mock).mockReturnValue(mockEditor);
	});

	test('renders editor content and toolbar buttons', () => {
		render(<RichEditor />);

		expect(screen.getByTestId('editor-content')).toBeInTheDocument();
		expect(screen.getByText('B')).toBeInTheDocument();
		expect(screen.getByText('I')).toBeInTheDocument();
		expect(screen.getByText('U')).toBeInTheDocument();
	});

	test('applies bold formatting on click', () => {
		render(<RichEditor />);

		fireEvent.click(screen.getByText('B'));

		expect(mockChain.toggleBold).toHaveBeenCalled();
		expect(mockChain.run).toHaveBeenCalled();
	});

	test('applies italic formatting on click', () => {
		render(<RichEditor />);

		fireEvent.click(screen.getByText('I'));

		expect(mockChain.toggleItalic).toHaveBeenCalled();
	});

	test('applies underline formatting on click', () => {
		render(<RichEditor />);

		fireEvent.click(screen.getByText('U'));

		expect(mockChain.toggleUnderline).toHaveBeenCalled();
	});
});

//  MEDIUM PATH
describe('RichEditor – props & state driven behavior', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(TipTap.useEditor as jest.Mock).mockReturnValue(mockEditor);
	});

	test('changes heading level via text type dropdown', () => {
		render(<RichEditor />);

		fireEvent.click(screen.getByTestId('text-type-dropdown'));

		expect(mockChain.toggleHeading).toHaveBeenCalledWith({ level: 1 });
	});

	test('calls setContent when editor content updates (controlled mode)', () => {
		const setContent = jest.fn();

		(TipTap.useEditor as jest.Mock).mockImplementation((config) => {
			config.onUpdate({
				editor: {
					getHTML: () => '<p>Updated content</p>',
				},
			});
			return mockEditor;
		});

		render(<RichEditor setContent={setContent} />);

		expect(setContent).toHaveBeenCalledWith('<p>Updated content</p>');
	});

	test('clears content when defaultContent is empty', () => {
		render(<RichEditor defaultContent='' />);

		expect(mockEditor.commands.clearContent).toHaveBeenCalled();
	});

	test('respects editable=false prop', () => {
		render(<RichEditor editable={false} />);

		expect(screen.getByTestId('editor-content')).toBeInTheDocument();
	});
});

//  RISKY PATH
describe('RichEditor – edge cases & defensive checks', () => {
	test('does not crash when editor instance is null', () => {
		(TipTap.useEditor as jest.Mock).mockReturnValueOnce(null);

		expect(() => render(<RichEditor />)).not.toThrow();
	});

	test('hides toolbar items when hiddenMenu is provided', () => {
		(TipTap.useEditor as jest.Mock).mockReturnValue(mockEditor);

		render(<RichEditor hiddenMenu={{ bold: true, italic: true }} />);

		expect(screen.queryByText('B')).not.toBeInTheDocument();
		expect(screen.queryByText('I')).not.toBeInTheDocument();
	});
});

//  SNAPSHOT TEST
describe('RichEditor – Snapshot', () => {
	beforeEach(() => {
		(TipTap.useEditor as jest.Mock).mockReturnValue(mockEditor);
	});

	test('matches snapshot for default state', () => {
		const { container } = render(<RichEditor />);
		expect(container).toMatchSnapshot();
	});
});
