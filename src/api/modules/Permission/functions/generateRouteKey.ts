export const generateRouteKey = ({ path, method }: IGenerateRouteKey) => {
	const normalizedPath = path.replace(/\/\d+/g, "/:id");
	return `${method.toUpperCase()}${normalizedPath.replace(/\//g, "_").toLowerCase()}`;
};

interface IGenerateRouteKey {
	path: string;
	method: string;
}

export function formatRouteTitle(routePath: string): string {
	const segments = routePath.replace(/:\w+/g, "").split("/").filter(Boolean);

	const relevantSegments = segments.slice(1);

	const formattedSegments = relevantSegments.map((segment, index) => {
		if (index === relevantSegments.length - 1 && segment.endsWith("s")) {
			return segment.charAt(0).toUpperCase() + segment.slice(1); // Remove o "+ 's'"
		}
		return segment.charAt(0).toUpperCase() + segment.slice(1);
	});

	return formattedSegments.join(" ");
}
