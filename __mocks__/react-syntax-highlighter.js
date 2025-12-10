export const Prism = ({ children }) => <pre>{children}</pre>;
export default Prism;

// any theme imports become simple objects so they don't break Jest
export const coldarkDark = {};
export const coldarkCold = {};
