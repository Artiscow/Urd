/**
 * A group's defaults, its reset and its count of changed settings
 * (0.7.20.5), for the families of the element menu: a group whose settings
 * all stand at their defaults carries no mark and no reset. An absent
 * setting is its default. From 0.7.20.7 the group also tells each setting
 * in it whether it holds the block's own value (`own`), and puts one setting
 * back (`resetKey`), for the marks the Setting rows draw.
 */

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * @param {() => object} props The selected block's props, read when called
 * @param {(name: string, patch: object) => void} setProps Writes several props as one undo step
 */
export function makeGroupHelpers(props, setProps) {
  const changed = (defaults) => Object.entries(defaults).filter(([k, d]) => props()[k] !== undefined && !same(props()[k], d));
  return {
    /** The patch that brings a group's defaults back as one undo step, or null when nothing differs. */
    groupReset: (id, defaults) => (changed(defaults).length ? () => setProps(id, { ...defaults }) : null),
    /** How many of a group's settings hold their own value, for its closed value. */
    groupChanged: (defaults) => changed(defaults).length,
    /** The group as MenuGroup takes it: its id and defaults, its reset, and what each setting in it needs. */
    groupOf: (id, defaults) => ({
      id,
      defaults,
      reset: changed(defaults).length ? () => setProps(id, { ...defaults }) : null,
      own: (key) => key in defaults && props()[key] !== undefined && !same(props()[key], defaults[key]),
      resetKey: (key) => setProps(`${id}:${key}`, { [key]: defaults[key] }),
    }),
  };
}
