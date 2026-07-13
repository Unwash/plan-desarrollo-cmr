const axios = require("axios");

jest.mock("axios");

const { analizarIssue } = require("../services/githubModel");

describe("githubModel service", () => {

    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.clearAllMocks();

        process.env = { ...OLD_ENV };

        delete process.env.GITHUB_TOKEN;
        delete process.env.GITHUB_MODEL;
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });


    test("throws if no GITHUB_TOKEN", async () => {

        await expect(
            analizarIssue("titulo", "body")
        ).rejects.toThrow(
            /No existe la variable de entorno GITHUB_TOKEN/
        );

    });


    test("returns content when axios resolves", async () => {

        process.env.GITHUB_TOKEN = "token-123";

        axios.post.mockResolvedValue({
            data: {
                choices: [
                    {
                        message: {
                            content: "resultado"
                        }
                    }
                ]
            }
        });


        const result = await analizarIssue(
            "titulo prueba",
            "descripcion prueba"
        );


        expect(result).toBe("resultado");


        expect(axios.post).toHaveBeenCalled();


        const call = axios.post.mock.calls[0];


        const headers = call[2].headers;


        expect(headers.Authorization)
            .toBe("Bearer token-123");


        expect(headers["Content-Type"])
            .toBe("application/json");


    });


    test("uses default model when GITHUB_MODEL is not defined", async () => {

        process.env.GITHUB_TOKEN = "token-123";


        axios.post.mockResolvedValue({
            data: {
                choices: [
                    {
                        message: {
                            content: "respuesta"
                        }
                    }
                ]
            }
        });


        await analizarIssue(
            "titulo",
            "body"
        );


        const bodyRequest = axios.post.mock.calls[0][1];


        expect(bodyRequest.model)
            .toBe("openai/gpt-4.1");

    });


    test("uses custom model from GITHUB_MODEL", async () => {

        process.env.GITHUB_TOKEN = "token-123";
        process.env.GITHUB_MODEL = "openai/gpt-4o";


        axios.post.mockResolvedValue({
            data: {
                choices: [
                    {
                        message: {
                            content: "respuesta"
                        }
                    }
                ]
            }
        });


        await analizarIssue(
            "titulo",
            "body"
        );


        const bodyRequest = axios.post.mock.calls[0][1];


        expect(bodyRequest.model)
            .toBe("openai/gpt-4o");

    });

});