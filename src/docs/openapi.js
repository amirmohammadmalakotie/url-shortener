const configs = require("./../../configs/configs")
const swaggerDocument = {
    openapi: "3.0.0",

    info: {
        title: "URL Shortener API",
        version: "1.0.0",
        description: "API documentation for URL Shortener project"
    },

    servers: [
        {
            url: `${configs.protocol}://${configs.host}:${configs.port}`,
            description: "Local server"
        }
    ],

    tags: [
        {
            name: "Authentication",
            description: "User authentication and account management"
        },
        {
            name: "URL",
            description: "Short URL management"
        }
    ],

    components: {
        securitySchemes: {
            AccessToken: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Enter your access token"
            },
            RefreshToken: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Enter your refresh token"
            }
        },

        schemas: {
            Register: {
                type: "object",
                required: [
                    "firstName",
                    "lastName",
                    "email",
                    "password",
                    "confirmPassword"
                ],
                properties: {
                    firstName: {
                        type: "string",
                        maxLength: 255,
                        example: "Amir"
                    },
                    lastName: {
                        type: "string",
                        maxLength: 255,
                        example: "Mohammadi"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "amir@example.com"
                    },
                    password: {
                        type: "string",
                        minLength: 8,
                        example: "Password123!"
                    },
                    confirmPassword: {
                        type: "string",
                        example: "Password123!"
                    }
                }
            },

            Login: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                        example: "amir@example.com"
                    },
                    password: {
                        type: "string",
                        example: "Password123!"
                    }
                }
            },

            CreateUrl: {
                type: "object",
                required: ["mainUrl"],
                properties: {
                    mainUrl: {
                        type: "string",
                        format: "uri",
                        maxLength: 2048,
                        example: "https://www.google.com"
                    }
                }
            }
        }
    },

    paths: {
        // AUTHENTICATION

        "/auth/register": {
            post: {
                tags: ["Authentication"],
                summary: "Register a new user",

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Register"
                            }
                        }
                    }
                },

                responses: {
                    201: {
                        description: "User registered successfully"
                    },
                    409: {
                        description: "An account with this email already exists"
                    },
                    400: {
                        description: "Validation error"
                    }
                }
            }
        },

        "/auth/login": {
            post: {
                tags: ["Authentication"],
                summary: "Login user",

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Login"
                            }
                        }
                    }
                },

                responses: {
                    200: {
                        description: "Login successful",

                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        accessToken: {
                                            type: "string"
                                        },
                                        refreshToken: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Invalid email or password"
                    }
                }
            }
        },

        "/auth/refresh-token": {
            post: {
                tags: ["Authentication"],
                summary: "Generate new access and refresh tokens",

                security: [
                    {
                        RefreshToken: []
                    }
                ],

                responses: {
                    200: {
                        description: "Tokens refreshed successfully",

                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        accessToken: {
                                            type: "string"
                                        },
                                        refreshToken: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Refresh token is required or invalid"
                    },
                    404: {
                        description: "Please login"
                    }
                }
            }
        },

        "/auth/me": {
            post: {
                tags: ["Authentication"],
                summary: "Get current user URLs",

                security: [
                    {
                        AccessToken: []
                    }
                ],

                responses: {
                    201: {
                        description: "User URLs retrieved successfully",

                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        shortUrls: {
                                            type: "array",
                                            items: {
                                                type: "object"
                                            }
                                        },
                                        deletedUrls: {
                                            type: "array",
                                            items: {
                                                type: "object"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Unauthorized"
                    }
                }
            }
        },

        // URL

        "/url/create": {
            post: {
                tags: ["URL"],
                summary: "Create a short URL",

                security: [
                    {
                        AccessToken: []
                    }
                ],

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateUrl"
                            }
                        }
                    }
                },

                responses: {
                    201: {
                        description: "Short URL generated successfully",

                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Your short url generated successfully"
                                        },
                                        shortUrl: {
                                            type: "string",
                                            example: "http://localhost:5000/url/a1b2c3"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid URL"
                    },
                    401: {
                        description: "Unauthorized"
                    }
                }
            }
        },

        "/url/remove/{id}": {
            post: {
                tags: ["URL"],
                summary: "Delete a short URL",

                security: [
                    {
                        AccessToken: []
                    }
                ],

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1
                        },
                        example: 1
                    }
                ],

                responses: {
                    201: {
                        description: "Short URL deleted successfully"
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    404: {
                        description: "URL not found"
                    }
                }
            }
        },

        "/url/recover/{id}": {
            post: {
                tags: ["URL"],
                summary: "Recover a deleted short URL",

                security: [
                    {
                        AccessToken: []
                    }
                ],

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1
                        },
                        example: 1
                    }
                ],

                responses: {
                    201: {
                        description: "URL recovered or has not been deleted"
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    404: {
                        description: "URL not found"
                    }
                }
            }
        },

        "/url/{key}": {
            post: {
                tags: ["URL"],
                summary: "Redirect to the original URL",

                parameters: [
                    {
                        name: "key",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        },
                        example: "a1b2c3"
                    }
                ],

                responses: {
                    302: {
                        description: "Redirect to original URL"
                    },
                    404: {
                        description: "Short URL not found"
                    }
                }
            }
        }
    }
};

module.exports = swaggerDocument;
