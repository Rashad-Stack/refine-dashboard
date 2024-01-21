import { GraphQLFormattedError } from "graphql";

type Error = {
	message: string;
	statusCode: string;
};

const customFetch = async (url: string, options: RequestInit) => {
	const accessToken = localStorage.getItem("access_token");

	const headers = options.headers as Record<string, string>;

	return await fetch(url, {
		...options,
		headers: {
			...headers,
			Authorization: headers?.Authorization || `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			"Apollo-Require-Preflight": "true",
		},
	});
};

const getGraphQLErrors = (
	body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
	if (!body.errors) {
		return {
			message: "Unknown error",
			statusCode: "INTERNAL_SERVER_ERROR",
		};
	}

	if ("errors" in body) {
		const errors = body.errors;
		const code = errors?.[0]?.extensions?.code;
		const message = errors?.map((error) => error.message).join("\n");

		return {
			message: message || JSON.stringify(errors),
			statusCode: code || "500",
		};
	}

	return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
	const response = await customFetch(url, options);

	const clonedResponse = response.clone();
	const body = await clonedResponse.json();

	const error = getGraphQLErrors(body);

	if (error) {
		throw error;
	}

	return response;
};
