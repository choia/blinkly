import * as React from 'react'
import { SVGProps } from 'react'
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M22 3.667V22H2V3.667h2.5V4.5c0 .92.747 1.667 1.667 1.667.919 0 1.666-.748 1.666-1.667v-.833h8.334V4.5c0 .92.747 1.667 1.666 1.667.92 0 1.667-.748 1.667-1.667v-.833H22Zm-1.667 5H3.667v11.666h16.666V8.667Zm-1.666-5.834a.833.833 0 1 0-1.667 0V4.5a.833.833 0 1 0 1.667 0V2.833ZM7 4.5a.833.833 0 1 1-1.667 0V2.833a.833.833 0 1 1 1.667 0V4.5Zm5.572 11.235c0-.668-.348-1.19-.924-1.412.44-.22.697-.673.697-1.253 0-1.122-1.093-1.79-2.15-1.79-1.232 0-2.16.77-2.217 2.302H9.35c-.011-.635.226-1.096.854-1.096.375 0 .778.226.778.724 0 .628-.68.718-1.306.664v1.067c.89 0 1.42.056 1.42.82 0 .604-.457.874-.91.874-.684 0-.965-.512-.99-1.21h-1.36c-.027 1.577.927 2.408 2.368 2.408 1.285 0 2.37-.785 2.37-2.098Zm3.595 2.098v-6.431h-1.16c-.144.961-.83 1.242-1.81 1.216v1.121h1.544v4.094h1.426Z"
      fill="currentColor"
    />
  </svg>
)
export default SvgCalendar
