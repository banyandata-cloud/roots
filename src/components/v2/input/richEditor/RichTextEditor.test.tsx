import { fireEvent, render, screen } from '@testing-library/react';
import RichTextEditor from './RichTextEditor';
import * as TipTap from '@tiptap/react';

const mockChain = {
	focus: jest.fn().mockReturnThis(),
	toggleBold: jest.fn().mockReturnThis(),
	toggleItalic: jest.fn().mockReturnThis(),
	toggleUnderline: jest.fn().mockReturnThis(),
	toggleStrike: jest.fn().mockReturnThis(),
	toggleBulletList: jest.fn().mockReturnThis(),
	setTextAlign: jest.fn().mockReturnThis(),
	extendMarkRange: jest.fn().mockReturnThis(),
	setLink: jest.fn().mockReturnThis(),
	unsetLink: jest.fn().mockReturnThis(),
	toggleCode: jest.fn().mockReturnThis(),
	toggleHighlight: jest.fn().mockReturnThis(),
	setParagraph: jest.fn().mockReturnThis(),
	setHeading: jest.fn().mockReturnThis(),
	run: jest.fn(),
};

const mockEditor = {
	chain: jest.fn(() => mockChain),
	isActive: jest.fn(() => false),
	getAttributes: jest.fn((name: string) => {
		if (name === 'highlight') return { color: '#161616' };
		return {};
	}),
	getText: jest.fn(() => 'hello world'),
	getHTML: jest.fn(() => '<p>hello world</p>'),
	commands: {
		clearContent: jest.fn(),
		setContent: jest.fn(),
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

jest.mock('@tiptap/react', () => ({
	EditorContent: ({ className }: any) => (
		<div data-testid='editor-content' className={className} />
	),
	BubbleMenu: ({ className, children }: any) => (
		<div data-testid='bubble-menu' className={className}>
			{children}
		</div>
	),
	useEditor: jest.fn(),
}));

describe('RichTextEditor – rendering and actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		let didCreate = false;
		(TipTap.useEditor as jest.Mock).mockImplementation((config) => {
			if (!didCreate) {
				config?.onCreate?.({ editor: mockEditor });
				didCreate = true;
			}
			return mockEditor;
		});
	});

	test('renders editor and toolbar controls', () => {
		render(<RichTextEditor />);

		expect(screen.getByTestId('editor-content')).toBeInTheDocument();
		expect(screen.getByLabelText('Bold')).toBeInTheDocument();
		expect(screen.getByLabelText('Italic')).toBeInTheDocument();
		expect(screen.getByLabelText('Underline')).toBeInTheDocument();
		expect(screen.getByLabelText('Strike')).toBeInTheDocument();
		expect(screen.getByLabelText('Bullet list')).toBeInTheDocument();
		expect(screen.getByLabelText('Inline code')).toBeInTheDocument();
		expect(screen.getByLabelText('Insert image')).not.toBeDisabled();
	});

	test('applies bold format on click', () => {
		render(<RichTextEditor />);

		fireEvent.click(screen.getByLabelText('Bold'));

		expect(mockChain.toggleBold).toHaveBeenCalled();
		expect(mockChain.run).toHaveBeenCalled();
	});

	test('changes heading type from dropdown', () => {
		render(<RichTextEditor headingLevels={[1, 2]} />);

		fireEvent.change(screen.getByLabelText('Text style'), {
			target: { value: 'h1' },
		});

		expect(mockChain.setHeading).toHaveBeenCalledWith({ level: 1 });
	});

	test('hides controls based on hiddenMenu', () => {
		render(
			<RichTextEditor
				hiddenMenu={{ bold: true, italic: true, heading: true, strike: true }}
			/>
		);

		expect(screen.queryByLabelText('Bold')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Italic')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Strike')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Text style')).not.toBeInTheDocument();
	});
});

describe('RichTextEditor – state and callbacks', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		let didCreate = false;
		let didUpdate = false;
		(TipTap.useEditor as jest.Mock).mockImplementation((config) => {
			if (!didCreate) {
				config?.onCreate?.({ editor: mockEditor });
				didCreate = true;
			}
			if (!didUpdate) {
				config?.onUpdate?.({
					editor: {
						getText: () => 'abc',
						getHTML: () => '<p>abc</p>',
					},
				});
				didUpdate = true;
			}
			return mockEditor;
		});
	});

	test('calls setContent on editor update', () => {
		const setContent = jest.fn();
		render(<RichTextEditor setContent={setContent} />);
		expect(setContent).toHaveBeenCalledWith('<p>abc</p>');
	});

	test('shows character count based on maxCharacters', () => {
		render(<RichTextEditor maxCharacters={10} />);
		expect(screen.getByText('7 characters left')).toBeInTheDocument();
	});

	test('applies strike formatting on click', () => {
		render(<RichTextEditor />);
		fireEvent.click(screen.getByLabelText('Strike'));
		expect(mockChain.toggleStrike).toHaveBeenCalled();
	});

	test('applies justify alignment on click', () => {
		render(<RichTextEditor />);
		fireEvent.click(screen.getByLabelText('Justify'));
		expect(mockChain.setTextAlign).toHaveBeenCalledWith('justify');
	});

	test('triggers image callback', () => {
		const onInsertImage = jest.fn();
		render(<RichTextEditor onInsertImage={onInsertImage} />);
		fireEvent.click(screen.getByLabelText('Insert image'));
		expect(onInsertImage).toHaveBeenCalledTimes(1);
	});
});
