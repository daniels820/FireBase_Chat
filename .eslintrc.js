module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "jquery": true
    },
    "rules": {
        "indent": [0,4, { "SwitchCase": 1 }],
        "max-len": ["error", 99999],
        "jsx-a11y/no-static-element-interactions": "off",
        'no-return-assign': 'warn'
    },
    "plugins": [
        "jsx-a11y",
        "import"
    ]
};