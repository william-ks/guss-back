import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
	pluginJs.configs.recommended,
	...tsEslint.configs.recommended,
	eslintPluginPrettier,
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],
		languageOptions: {
			globals: globals.node,
			parser: tsEslint.parser,
		},
		rules: {
			eqeqeq: "error",
			"no-unused-vars": "warn",
			"no-console": "warn",
			"no-constant-condition": "warn",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-empty-object-type": "warn",
			"@typescript-eslint/no-unsafe-function-type": "warn",
		},
	},
);
