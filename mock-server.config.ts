import type { MockServerConfig } from "mock-config-server";

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: "/api",
    configs: [
      {
        path: "/signin",
        method: "post",
        routes: [
          {
            data: { error: "invalid_request" },
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(400);
                return data;
              },
            },
          },
          {
            data: { error: "invalid_credentials" },
            entities: {
              body: {
                email: "a@a.a",
              },
            },
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(403);
                return data;
              },
            },
          },
          {
            data: { status: "success" },
            entities: {
              body: {
                email: "a@a.a",
                password: "12345",
              },
            },
            interceptors: {
              response: (data, { appendHeader }) => {
                appendHeader(
                  "Set-Cookie",
                  "token=auth-user-token;Max-Age=3600;Path=/;HttpOnly"
                );
                return data;
              },
            },
          },
        ],
      },
      {
        path: "/session",
        method: "get",
        routes: [
          {
            data: { status: "success" },
            interceptors: {
              response: (data, { request, setStatusCode }) => {
                if (request.headers.cookie === "token=auth-user-token")
                  return data;

                setStatusCode(401);
                return { error: "unauthorized" };
              },
            },
          },
        ],
      },
      {
        path: "/confirm",
        method: "post",
        routes: [
          {
            data: { status: "success" },
            interceptors: {
              response: (data, { appendHeader }) => {
                appendHeader(
                  "Set-Cookie",
                  "token=auth-user-token;Max-Age=3600;Path=/;HttpOnly"
                );
                return data;
              },
            },
          },
        ],
      },
    ],
  },
};

export default mockServerConfig;
