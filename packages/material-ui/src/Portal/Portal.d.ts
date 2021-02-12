import { PortalUnstyled, PortalUnstyledProps } from '@material-ui/unstyled';

export type PortalProps = PortalUnstyledProps;

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * Demos:
 *
 * - [Portal](https://material-ui.com/components/portal/)
 *
 * API:
 *
 * - [Portal API](https://material-ui.com/api/portal/)
 * - inherits [PortalUnstyled API](https://material-ui.com/api/portal-unstyled/)
 */
export default function Portal(props: PortalProps): ReturnType<typeof PortalUnstyled>;
