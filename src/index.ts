import { cors } from "hono/cors";
import { z, OpenAPIHono, createRoute } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.use("/*", cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/users/{id}",
    request: {
      params: z.object({
        id: z
          .string()
          .min(3)
          .openapi({
            param: {
              name: "id",
              in: "path",
            },
            example: "1212121",
          }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .object({
                id: z.string().openapi({
                  example: "123",
                }),
                name: z.string().openapi({
                  example: "John Doe",
                }),
                age: z.number().openapi({
                  example: 42,
                }),
              })
              .openapi("User"),
          },
        },
        description: "Retrieve the user",
      },
    },
  }),
  (c) => {
    const { id } = c.req.valid("param");
    return c.json({
      id,
      age: 20,
      name: "Ultra-man",
    });
  }
);

// The OpenAPI documentation will be available at /doc
app.doc31("/doc", {
  openapi: "3.1.0",
  servers: [{ url: "http://localhost:3000" }],
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

export { app };
