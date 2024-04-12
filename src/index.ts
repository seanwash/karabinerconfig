import {
    FromModifiers,
    map,
    rule,
    writeToProfile,
} from 'karabiner.ts'

const hyperModifiers: FromModifiers = {
    mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
    optional: ['any']
}

writeToProfile('seanwashbot', [
    rule('caps_lock to hyper').manipulators([
        map('caps_lock').toHyper().toIfAlone('escape')
    ]),

    rule('hyper hjkl to arrows').manipulators([
        map({key_code: 'h', modifiers: hyperModifiers}).to('left_arrow'),
        map({key_code: 'j', modifiers: hyperModifiers}).to('down_arrow'),
        map({key_code: 'k', modifiers: hyperModifiers}).to('up_arrow'),
        map({key_code: 'l', modifiers: hyperModifiers}).to('right_arrow'),
        map({key_code: 'semicolon', modifiers: hyperModifiers}).to('return_or_enter'),
        map({key_code: 'b', modifiers: hyperModifiers}).to('delete_or_backspace'),

        map({key_code: 'r', modifiers: hyperModifiers}).to({
            key_code: 'r',
            modifiers: ['left_shift', 'left_control'],
        }),

        // ->
        map({key_code: 'hyphen', modifiers: hyperModifiers}).to('hyphen').to({
            key_code: 'period',
            modifiers: ['left_shift']
        }),

        // =>
        map({key_code: 'equal_sign', modifiers: hyperModifiers}).to('equal_sign').to({
            key_code: 'period',
            modifiers: ['left_shift']
        }),

        // ()
        map({key_code: '0', modifiers: hyperModifiers}).to({
            key_code: '9',
            modifiers: ['left_shift']
        }).to({
            key_code: '0',
            modifiers: ['left_shift']
        }),
    ]),

    rule('hold tab for control').manipulators([
        map({key_code: 'tab', modifiers: {optional: ["any"]}}).to('left_control').toIfAlone('tab'),
    ]),
])
