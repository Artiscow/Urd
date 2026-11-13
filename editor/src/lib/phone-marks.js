/**
 * A block's mark in the editor's pictures of the phone order (the rule's cards and the Phone panel's rows): a picture, a heading, a button, or text.
 * @param {{type: string, props?: object}} block
 * @returns {'pic'|'btn'|'head'|'text'}
 */
export function phoneMark(block) {
  if (['image', 'gallery', 'video', 'map', 'calendar', 'collection', 'product'].includes(block.type)) return 'pic';
  if (block.type === 'button') return 'btn';
  return /^\s*<h[1-6]/i.test(String(block.props?.html ?? '')) ? 'head' : 'text';
}
