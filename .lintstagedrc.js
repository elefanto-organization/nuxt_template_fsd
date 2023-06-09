module.exports = {
	"*.{vue,ts}": (filenames) => {
		return filenames.length > 5 ? ['eslint --ext .ts,.vue . --ignore-path .gitignore --fix .', 'yarn test']
			: `eslint ${filenames.join(' ')} --fix`;
	}
}