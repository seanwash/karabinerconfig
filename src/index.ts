// https://github.com/evan-liu/karabiner.ts

import { FromModifiers, map, rule, writeToProfile } from 'karabiner.ts';

const hyperFromModifiers: FromModifiers = {
	mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
};

writeToProfile('seanwashbot', [
	rule('caps_lock to hyper').manipulators([
		// Without optional modifiers, holding a modifier (e.g. command) before holding
		// caps_lock would cause caps_lock to be triggered instead of hyper.
		map({ key_code: 'caps_lock', modifiers: { optional: ['any'] } })
			.toHyper()
			.toIfAlone('escape'),
	]),

	rule('hyper modifiers').manipulators([
		...hyperVimArrowKeyMappings(),
		...rsiMappings(),
		...appMappings(),
		...appleShortcutMappings(),
		...codingShortcutMappings(),
	]),

	rule('hold tab for control').manipulators([
		map({ key_code: 'tab', modifiers: { optional: ['any'] } })
			.to('left_control')
			.toIfAlone('tab'),
	]),
]);

function hyperVimArrowKeyMappings() {
	return [
		map({ key_code: 'h', modifiers: hyperFromModifiers }).to('left_arrow'),
		map({ key_code: 'j', modifiers: hyperFromModifiers }).to('down_arrow'),
		map({ key_code: 'k', modifiers: hyperFromModifiers }).to('up_arrow'),
		map({ key_code: 'l', modifiers: hyperFromModifiers }).to('right_arrow'),
	];
}

function rsiMappings() {
	return [
		map({ key_code: 'semicolon', modifiers: hyperFromModifiers }).to('return_or_enter'),
		map({ key_code: 'quote', modifiers: hyperFromModifiers }).to('delete_or_backspace'),
	];
}

// Use `find /Applications -iname '*NAME*.app'` to find the name of an application.
function appMappings() {
	return [
		map({ key_code: 'b', modifiers: hyperFromModifiers }).toApp('Safari'),
		map({ key_code: 'c', modifiers: hyperFromModifiers }).toApp('Visual Studio Code'),
		map({ key_code: 'z', modifiers: hyperFromModifiers }).toApp('Windsurf'),
		map({ key_code: 'w', modifiers: hyperFromModifiers }).toApp('TablePlus'),
		map({ key_code: 'n', modifiers: hyperFromModifiers }).toApp('Notes'),
		map({ key_code: 's', modifiers: hyperFromModifiers }).toApp('Slack'),
		map({ key_code: 'g', modifiers: hyperFromModifiers }).toApp('Tower'),
		map({ key_code: 'x', modifiers: hyperFromModifiers }).toApp('Ghostty'),
		map({ key_code: 't', modifiers: hyperFromModifiers }).toApp('Things3'),
		map({ key_code: 'a', modifiers: hyperFromModifiers }).toApp('ChatGpt'),
	];
}

function appleShortcutMappings() {
	return [
		map({ key_code: 'y', modifiers: hyperFromModifiers }).to$('shortcuts run "Daybook Note"'),
	];
}

function codingShortcutMappings() {
	return [
		// ->
		map({ key_code: 'hyphen', modifiers: hyperFromModifiers })
			.to('hyphen')
			.to({
				key_code: 'period',
				modifiers: ['left_shift'],
			}),

		// =>
		map({ key_code: 'equal_sign', modifiers: hyperFromModifiers })
			.to('equal_sign')
			.to({
				key_code: 'period',
				modifiers: ['left_shift'],
			}),

		// ()
		map({ key_code: '0', modifiers: hyperFromModifiers })
			.to({
				key_code: '9',
				modifiers: ['left_shift'],
			})
			.to({
				key_code: '0',
				modifiers: ['left_shift'],
			}),
	];
}
