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

export function getCustomPagination(curr, total, limit, hideDisabledPages, customPageList) {
	if (total <= limit) {
		return [...Array(total).keys()].map((page) => {
			return new Page({
				number: hideDisabledPages ? customPageList?.[page]?.pageNumber : page + 1,
				active: page + 1 === curr,
			});
		});
	}

	const pages = [
		new Page({
			number: hideDisabledPages ? customPageList?.[0]?.pageNumber : 1,
		}),
	];

	if (curr - 1 <= limit - 5) {
		for (let i = 1; i <= limit - 5; i++) {
			pages.push(
				new Page({
					number: hideDisabledPages ? customPageList?.[i]?.pageNumber : 1 + i,
					active: 1 + i === curr,
				})
			);
			if (i === limit - 5) {
				pages.push(
					new Page({
						number: hideDisabledPages ? customPageList?.[1 + i]?.pageNumber : 1 + i + 1,
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
						number: hideDisabledPages
							? customPageList?.[total - i - 2]?.pageNumber
							: total - i - 1,
						ellipsis: true,
					})
				);
			}
			pages.push(
				new Page({
					number: hideDisabledPages
						? customPageList?.[total - i - 1]?.pageNumber
						: total - i,
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
						number: hideDisabledPages
							? customPageList?.[first + i - 2]?.pageNumber
							: first + i - 1,
						ellipsis: true,
					})
				);
			}
			pages.push(
				new Page({
					number: hideDisabledPages
						? customPageList?.[first + i - 1]?.pageNumber
						: first + i,
				})
			);
			if (i === limit - 4 - 1) {
				pages.push(
					new Page({
						number: hideDisabledPages
							? customPageList?.[first + i]?.pageNumber
							: first + i + 1,
						ellipsis: true,
					})
				);
			}
		}
	}
	if (total > 7) {
		for (let i = total - 2; i < total; i++) {
			pages.push(
				new Page({
					number: hideDisabledPages ? customPageList?.[i - 1]?.pageNumber : i,
				})
			);
		}
	}
	pages.push(
		new Page({
			number: hideDisabledPages ? customPageList?.[total - 1]?.pageNumber : total,
		})
	);
	return pages;
}
