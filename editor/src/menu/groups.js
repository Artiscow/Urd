/**
 * A group's reset and its count of changed settings (0.7.20.5), for the
 * families of the element menu: a group whose settings all stand at their
 * defaults carries no mark and no reset. An absent setting is its default.
 */

/**
 * @param {() => object} props The selected block's props, read when called
 * @param {(name: string, patch: object) => void} setProps Writes several props as one undo step
 */
export function makeGroupHelpers(props, setProps) {
  const changed = (defaults) => Object.entries(defaults).filter(([k, d]) => props()[k] !== undefined && JSON.stringify(props()[k]) !== JSON.stringify(d));
  return {
    /** The patch that brings a group's defaults back as one undo step, or null when nothing differs. */
    groupReset: (id, defaults) => (changed(defaults).length ? () => setProps(id, { ...defaults }) : null),
    /** How many of a group's settings hold their own value, for its closed value. */
    groupChanged: (defaults) => changed(defaults).length,
  };
}
