export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "DevShowcase API",
    version: "1.0.0",
    description: "API para cadastro e avaliação de projetos de desenvolvedores",
  },
  paths: {
    "/api/projects": {
      get: {
        summary: "Lista projetos com filtro por tecnologia e paginação",
        parameters: [
          { name: "technology", in: "query", schema: { type: "string" } },
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
        ],
        responses: { "200": { description: "Lista de projetos" } },
      },
      post: {
        summary: "Cria um novo projeto",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  repoUrl: { type: "string" },
                  profileId: { type: "integer" },
                  technologyIds: { type: "array", items: { type: "integer" } },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Projeto criado" } },
      },
    },
    "/api/projects/{id}/upvote": {
      put: {
        summary: "Incrementa upvote de um projeto",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Upvote incrementado" },
          "404": { description: "Projeto não encontrado" },
        },
      },
    },
    "/api/projects/{id}/feedbacks": {
      post: {
        summary: "Cria um feedback e atualiza a nota média do projeto",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  comment: { type: "string" },
                  rating: { type: "integer", minimum: 1, maximum: 5 },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Feedback criado" },
          "400": { description: "Dados inválidos" },
          "404": { description: "Projeto não encontrado" },
        },
      },
    },
  },
};