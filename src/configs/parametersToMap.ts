import { LOCATION } from '../types';
import { isArrayLike } from '../utils/isArrayLike';

export type ExistenceChecker = (entity: unknown) => boolean;
export type Wrapper = (links: HTMLAnchorElement) => HTMLAnchorElement[];

export interface ParameterToMap {
	locationName: LOCATION;
	selector: 'querySelectorAll' | 'querySelector' | void;
	pathToSelect: string | void;
	pathToInsert?: string ;
	existenceChecker: ExistenceChecker | void;
	wrapper: Wrapper | void;
}

const arrayExistenceChecker = (entity: unknown) => (
	isArrayLike(entity) && entity.length > 0
);

const currentUserLocation = window.location.pathname.replace('/', '');

export const parametersToMap: ParameterToMap[] = [
	{
		/*
			https://github.com/kas-elvirov
		*/
		locationName: LOCATION.PINNED_REPOS,
		selector: 'querySelectorAll',
		pathToSelect: '#user-profile-frame .pinned-item-list-item-content span > a',
		pathToInsert: '.wb-break-all',
		existenceChecker: arrayExistenceChecker,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		/*
			https://github.com/torvalds
		*/
		locationName: LOCATION.POPULAR_REPOS,
		selector: 'querySelectorAll',
		pathToSelect: '.js-pinned-items-reorder-container ol li div div div a',
		pathToInsert: '.wb-break-all',
		existenceChecker: arrayExistenceChecker,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.ORGANIZATION,
		selector: 'querySelectorAll',
		pathToSelect: '#org-profile-repositories a[itemprop*="codeRepository"]',
		existenceChecker: arrayExistenceChecker,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.SEARCH,
		selector: 'querySelectorAll',
		pathToSelect: '.codesearch-results ul li a.v-align-middle',
		existenceChecker: arrayExistenceChecker,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.SINGLE,
		selector: 'querySelector',
		pathToSelect: '#repo-title-component > strong > a',
		/*
			for example: https://github.com/kas-elvirov/gloc
		*/
		pathToInsert: '.public',
		existenceChecker: (entity: unknown) => Boolean(entity),
		wrapper: (entity: HTMLAnchorElement) => [entity],
	},
	{
		locationName: LOCATION.EXPLORE,
		selector: 'querySelectorAll',
		pathToSelect: 'article h1 a.text-bold',
		existenceChecker: (entity: unknown) =>
			currentUserLocation === LOCATION.EXPLORE.toLowerCase() && arrayExistenceChecker(entity),
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.TRENDING,
		selector: 'querySelectorAll',
		pathToSelect: 'article h1 a',
		existenceChecker: (entity: unknown) =>
			currentUserLocation === LOCATION.TRENDING.toLowerCase() && arrayExistenceChecker(entity),
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		/*
			https://github.com/kas-elvirov?tab=repositories
		*/
		locationName: LOCATION.USER_REPOSITORIES,
		selector: 'querySelectorAll',
		pathToSelect: '#user-repositories-list ul li h3 a',
		existenceChecker: arrayExistenceChecker,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.LIKED_REPOS,
		selector: 'querySelectorAll',
		pathToSelect: '.page-profile h3 a',
		existenceChecker: arrayExistenceChecker,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.UNKNOWN,
		selector: undefined,
		pathToSelect: undefined,
		existenceChecker: undefined,
		wrapper: undefined,
	},
];
