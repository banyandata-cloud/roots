/* eslint-disable max-classes-per-file */
class Page {
	constructor({ number, active = false, ellipsis = false }) {
		this.number = number;
		this.ellipsis = ellipsis;
		this.active = active;
	}
}

export class PaginationList {
	constructor({ curr, total, limit = 7 }) {
		this.pages = getPagination(curr, total, limit);
	}
}

export function getPagination(curr, total, limit) {
	if (total <= limit) {
		return [...Array(total).keys()].map((page) => {
			return new Page({
				number: page + 1,
				active: page + 1 === curr,
			});
		});
	}
	const pages = [
		new Page({
			number: 1,
		}),
	];
	if (curr - 1 <= limit - 3) {
		for (let i = 1; i <= limit - 3; i++) {
			pages.push(
				new Page({
					number: 1 + i,
					active: 1 + i === curr,
				})
			);
			if (i === limit - 3) {
				pages.push(
					new Page({
						number: 1 + i + 1,
						ellipsis: true,
					})
				);
			}
		}
	} else if (total - curr <= limit - 3) {
		for (let i = limit - 3; i > 0; i--) {
			if (i === limit - 3) {
				pages.push(
					new Page({
						number: total - i - 1,
						ellipsis: true,
					})
				);
			}
			pages.push(
				new Page({
					number: total - i,
				})
			);
		}
	} else {
		const mod = (curr - (limit - 2)) % (limit - 4) || limit - 4;
		const first = curr - (mod - 1);
		for (let i = 0; i < limit - 4; i++) {
			if (i === 0) {
				pages.push(
					new Page({
						number: first + i - 1,
						ellipsis: true,
					})
				);
			}
			pages.push(
				new Page({
					number: first + i,
				})
			);
			if (i === limit - 4 - 1) {
				pages.push(
					new Page({
						number: first + i + 1,
						ellipsis: true,
					})
				);
			}
		}
	}
	pages.push(
		new Page({
			number: total,
		})
	);
	return pages;
}

export class CustomPaginationList {
	constructor({ curr, total, limit = 11, hideDisabledPages = false, customPageList = [] }) {
		this.pages = getCustomPagination(curr, total, limit, hideDisabledPages, customPageList);
	}
}

export function getCustomPagination(curr, total, limit) {
	if (total <= limit) {
		return [...Array(total).keys()].map((page) => {
			return new Page({
				number: page + 1,
				active: page + 1 === curr,
			});
		});
	}

	const pages = [
		new Page({
			number: 1,
		}),
	];

	if (curr - 1 <= limit - 5) {
		for (let i = 1; i <= limit - 5; i++) {
			pages.push(
				new Page({
					number: 1 + i,
					active: 1 + i === curr,
				})
			);
			if (i === limit - 5) {
				pages.push(
					new Page({
						number: 1 + i + 1,
						ellipsis: true,
					})
				);
			}
		}
	} else if (total - curr <= limit - 5) {
		for (let i = limit - 5; i > 0; i--) {
			if (i === limit - 5) {
				pages.push(
					new Page({
						number: total - i - 1,
						ellipsis: true,
					})
				);
			}
			pages.push(
				new Page({
					number: total - i,
				})
			);
		}
	} else {
		const mod = (curr - (limit - 4)) % (limit - 6) || limit - 6;
		const first = curr - (mod - 3);
		for (let i = 0; i < limit - 6; i++) {
			if (i === 0) {
				pages.push(
					new Page({
						number: first + i - 3,
						ellipsis: true,
					})
				);
			}
			pages.push(
				new Page({
					number: first + i - 2,
				})
			);
			if (i === limit - 4 - 3) {
				pages.push(
					new Page({
						number: first + i - 1,
						ellipsis: true,
					})
				);
			}
		}
	}

	// Solution 1 is to remove following loop and reduxe last 3 pages to 1
	if (total > 7) {
		for (let i = total - 2; i < total; i++) {
			pages.push(
				new Page({
					number: i,
				})
			);
		}
	}
	pages.push(
		new Page({
			number: total,
		})
	);

	// Solution 2 it to remove redundant pages from the array and return new array
	const pages_set = {};
	return pages.filter((obj) => {
		const value = obj.number;
		if (pages_set[value]) {
			return false;
		} else {
			pages_set[value] = true;
			return true;
		}
	});

	return pages;
}
