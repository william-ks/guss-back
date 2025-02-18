module.exports = function (plop) {
	// Criação de um gerador para componentes
	plop.setGenerator("Module", {
		description: "Gera um novo modulo (Repository, model, routes)",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Nome do modulo (Coloque o nome no singular):",
			},
		],
		actions: [
			{
				type: "add", // Adiciona uma nova rota
				path: "src/api/modules/{{pascalCase name}}/{{camelCase name}}.routes.ts",
				templateFile: "plop_templates/module/module.routes.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo model
				path: "src/api/modules/{{pascalCase name}}/model/{{pascalCase name}}.ts",
				templateFile: "plop_templates/module/module.Model.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo repository
				path: "src/api/modules/{{pascalCase name}}/repository/{{pascalCase name}}Repository.ts",
				templateFile: "plop_templates/module/module.Repository.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo repository interface
				path: "src/api/modules/{{pascalCase name}}/repository/I{{pascalCase name}}Repository.ts",
				templateFile: "plop_templates/module/module.IRepository.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo controller
				path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/create{{pascalCase name}}.controller.ts",
				templateFile: "plop_templates/module/module.controller.ts.hbs",
			},
			// {
			// 	type: "add", // Adiciona um novo controller test
			// 	path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/tests/create{{pascalCase name}}.controller.test.ts",
			// 	templateFile:
			// 		"plop_templates/module/module.controller.test.ts.hbs",
			// },
			{
				type: "add", // Adiciona um novo service
				path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/create{{pascalCase name}}.service.ts",
				templateFile: "plop_templates/module/module.service.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo service test
				path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/tests/create{{pascalCase name}}.service.test.ts",
				templateFile:
					"plop_templates/module/module.service.test.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo DTO
				path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/entities/create{{pascalCase name}}.DTO.ts",
				templateFile: "plop_templates/module/module.DTO.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo SCHEMA
				path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/entities/create{{pascalCase name}}.schema.ts",
				templateFile: "plop_templates/module/module.schema.ts.hbs",
			},
			// {
			// 	type: "add", // Adiciona um novo ZOD
			// 	path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/entities/create{{pascalCase name}}.zod.ts",
			// 	templateFile: "plop_templates/module/module.zod.ts.hbs",
			// },
			{
				type: "add", // Adiciona um novo index
				path: "src/api/modules/{{pascalCase name}}/useCases/create{{pascalCase name}}/index.ts",
				templateFile: "plop_templates/module/module.index.ts.hbs",
			},
		],
	});

	plop.setGenerator("useCase", {
		description: "Gera um novo useCase",
		prompts: [
			{
				type: "input",
				name: "useCaseName",
				message: "Nome do useCase:",
			},
			{
				type: "input",
				name: "moduleName",
				message: "Nome do modulo (Coloque o nome no singular):",
			},
		],
		actions: [
			{
				type: "add", // Adiciona um novo service
				path: "src/api/modules/{{pascalCase moduleName}}/useCases/{{camelCase useCaseName}}/{{camelCase useCaseName}}.service.ts",
				templateFile: "plop_templates/useCases/useCases.service.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo controller
				path: "src/api/modules/{{pascalCase moduleName}}/useCases/{{camelCase useCaseName}}/{{camelCase useCaseName}}.controller.ts",
				templateFile:
					"plop_templates/useCases/useCases.controller.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo DTO
				path: "src/api/modules/{{pascalCase moduleName}}/useCases/{{camelCase useCaseName}}/entities/{{camelCase useCaseName}}.DTO.ts",
				templateFile: "plop_templates/useCases/useCases.DTO.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo index
				path: "src/api/modules/{{pascalCase moduleName}}/useCases/{{camelCase useCaseName}}/index.ts",
				templateFile: "plop_templates/useCases/useCases.index.ts.hbs",
			},
			{
				type: "add", // Adiciona um novo schema
				path: "src/api/modules/{{pascalCase moduleName}}/useCases/{{camelCase useCaseName}}/entities/{{camelCase useCaseName}}.schema.ts",
				templateFile: "plop_templates/useCases/useCases.schema.ts.hbs",
			},
			// {
			// 	type: "add", // Adiciona um novo controller test
			// 	path: "src/api/modules/{{pascalCase moduleName}}/useCases/{{camelCase useCaseName}}/tests/{{camelCase useCaseName}}.controller.test.ts",
			// 	templateFile:
			// 		"plop_templates/useCases/useCases.controller.test.ts.hbs",
			// },
			{
				type: "add", // Adiciona um novo service test
				path: "src/api/modules/{{pascalCase moduleName}}/useCases/{{camelCase useCaseName}}/tests/{{camelCase useCaseName}}.service.test.ts",
				templateFile:
					"plop_templates/useCases/useCases.service.test.ts.hbs",
			},
		],
	});
};
