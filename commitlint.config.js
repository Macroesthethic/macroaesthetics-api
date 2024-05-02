module.exports = {
	extends : ['@commitlint/config-conventional']
	rules : {
		'import/no-unused-modules' : 'error',
		'no-var' : 'error',
		'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
		'scope-case': [2, 'always', 'lower-case'],
		'subject-case': [2, 'always', 'sentence-case']
	}
}
