module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/recommended', 'plugin:vue/strongly-recommended', '@vue/airbnb', '@vue/standard', 'plugin:vue-types/strongly-recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'el'] }],
        'import/no-extraneous-dependencies': 'off',
        'vue/attribute-hyphenation': [
            2, 'never',
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'object-curly-spacing': ['error', 'always'],
        semi: ['error', 'never'],
        'max-len': [
            'error',
            {
                comments: 180,
                code: 180,
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
            },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/prop-name-casing': 'error',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    overrides: [
        {
            files: ['**/*.spec.js'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
                'no-console': 'off',
                'no-debugger': 'off',
            },
            env: {
                jest: true,
            },
        },
    ],
}
