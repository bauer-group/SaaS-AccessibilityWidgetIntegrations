'use client';
import {
  AccessibilityWidget,
  type AccessibilityWidgetProps,
} from '@bauer-group/accessibility-widget-react';

/**
 * Drop into app/layout.tsx — by default the widget loads from the CDN `v1` tag,
 * so no props are required:
 *
 *   import { AccessibilityWidgetClient } from '@bauer-group/accessibility-widget-nextjs';
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="de">
 *         <body>
 *           {children}
 *           <AccessibilityWidgetClient config={{ locale: 'auto' }} />
 *         </body>
 *       </html>
 *     );
 *   }
 */
export function AccessibilityWidgetClient(props: AccessibilityWidgetProps) {
  return <AccessibilityWidget {...props} />;
}
