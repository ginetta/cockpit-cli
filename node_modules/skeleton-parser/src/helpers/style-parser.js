// 'use strict';
//
// const postcss = require('postcss');
// const syntax = require('postcss-scss');
//
// function extractVariables(stylesContents) {
// 	if (stylesContents) {
// 		return postcss([])
// 			.process(stylesContents, {syntax})
// 			.then(tokens => {
// 				return tokens.root.nodes
// 					.filter(node => node.type === 'decl')
// 					.map(variable => {
// 						const value = variable.value.replace(/\s/g, '');
// 						const parsedValue = isValueAMap(value) ?
// 							convertMapStringToObject(value) : value;
// 						return {
// 							name: variable.prop,
// 							value: parsedValue
// 						};
// 					});
// 			});
// 	}
// }
//
// function isValueAMap(value) {
// 	return value[0] === '(' && value[value.length - 1] === ')';
// }
//
// function isNestedMap(map) {
// 	return map.lastIndexOf('(') > 0;
// }
//
// function convertMapStringToObject(map) {
// 	const innerMap = map.slice(1, -1);
// 	if (isNestedMap(innerMap)) {
// 		const nestedProperties = map.split('),').map(m => m + ')');
// 		return nestedProperties.map((s) => {
// 			const delimiter = s.indexOf(':');
// 			const key = s.slice(0, delimiter);
// 			const value = s.slice(delimiter + 1).replace(',)', ')');
// 			if (isValueAMap(value)) {
// 				const converted = convertMapStringToObject(value);
// 				return {key, value: converted};
// 			} else {
// 				return { key, value };
// 			}
// 			return {key, value};
// 		})
// 	} else {
// 		const properties = innerMap.split(',');
// 		return properties.map((s) => {
// 			const delimiter = s.indexOf(':');
// 			const key = s.slice(0, delimiter).split('(').join('');
// 			const value = s.slice(delimiter + 1).split(')').join('');
// 			return { key, value };
// 		});
// 	}
// }
//
// module.exports = {
// 	extractVariables
// };
