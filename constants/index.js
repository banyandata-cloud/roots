// BASE URLS
const auth = process.env.REACT_APP_AUTH_BASE_URL;
const encs = process.env.REACT_APP_ENCS_BASE_URL;
const scos = process.env.REACT_APP_SCOS_BASE_URL;
const aws = process.env.REACT_APP_AWS_BASE_URL;
const gcp = process.env.REACT_APP_GCP_BASE_URL;
const oci = process.env.REACT_APP_OCI_BASE_URL;
const pgsql = process.env.REACT_APP_PGSQL_BASE_URL;
const mysql = process.env.REACT_APP_MYSQL_BASE_URL;
const oracle = process.env.REACT_APP_ORACLE_BASE_URL;
const lmosGcp = process.env.REACT_APP_AUDIT_LOG_GCP_BASE_URL;
const lmosAws = process.env.REACT_APP_AUDIT_LOG_AWS_BASE_URL;

export const BASE_URLS = {
	auth,
	encs,
	scos,
	aws,
	gcp,
	oci,
	'lmos-aws': lmosAws,
	'lmos-gcp': lmosGcp,
	pgsql,
	mysql,
	oracle,
};

export const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const FULL_MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
