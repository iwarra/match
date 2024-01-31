import { isObject } from "../utils/helperFunctions.js";

function toEmbed(input) {
	return Object.entries(input).map((section) => {
		const [title, text] = section;
		const capitalizedTitle = title.toUpperCase() + " SECTION";
		//console.log(`${capitalizedTitle}: ${text}`);
		return `${capitalizedTitle}: ${text}`;
	});
}

function transformNested(object) {
	function digDeeper(values) {
		if (!isObject(values)) return values;
		return digDeeper(Object.values(values));
	}

	const keys = Object.keys(object);
	return keys.reduce((transformed, key) => {
		let values;

		if (!isObject(object[key])) {
			values = object[key];
		} else
			values = Object.values(object[key])
				.flat()
				.filter((val) => Boolean(val));

		return {
			...transformed,
			[key]: String(values),
		};
	}, {});
}

function mergeChildren(children) {
	const keys = Object.keys(children);

	const labels = new Set(
		keys.flatMap((part) => {
			return Object.keys(children[part]);
		}),
	);

	const collection = Array.from(labels).reduce((collection, label) => {
		const values = keys
			.flatMap((type) => {
				const value = children[type][label];
				return value.map((entry) => {
					if (isObject(entry)) return entry.label;
					return entry;
				});
			})
			.join();

		return {
			...collection,
			[label]: values,
		};
	}, {});

	return collection;
}

export { toEmbed, mergeChildren, transformNested };
