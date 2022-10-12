export default function cloneClass<t>(original: t): t {
  return Object.assign(
    Object.create(Object.getPrototypeOf(original)),
    original
  );
}
