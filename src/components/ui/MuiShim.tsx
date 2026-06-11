import React from 'react'

export const Box = ({ children, sx, ...props }: any) => <div {...props}>{children}</div>
export const Typography = ({ children, variant, component, sx, ...props }: any) => {
  const Tag = component || 'p'
  return <Tag {...props}>{children}</Tag>
}
export const Button = ({ children, variant, color, sx, ...props }: any) => <button {...props}>{children}</button>
export const Container = ({ children, maxWidth, sx, ...props }: any) => <div {...props}>{children}</div>
export const Grid = ({ children, container, item, xs, sm, md, lg, xl, spacing, sx, ...props }: any) => <div {...props}>{children}</div>
export const Paper = ({ children, elevation, sx, ...props }: any) => <div {...props}>{children}</div>
export const Stack = ({ children, direction, spacing, sx, ...props }: any) => <div {...props}>{children}</div>
export const IconButton = ({ children, sx, ...props }: any) => <button {...props}>{children}</button>
export const Divider = ({ sx, ...props }: any) => <hr {...props} />
export const CircularProgress = ({ sx, ...props }: any) => <div {...props}>Loading...</div>
export const TextField = ({ sx, ...props }: any) => <input {...props} />
export const Chip = ({ label, sx, ...props }: any) => <span {...props}>{label}</span>
export const Avatar = ({ src, sx, ...props }: any) => <img src={src} {...props} />
export const Alert = ({ children, severity, sx, ...props }: any) => <div {...props}>{children}</div>
export const Dialog = ({ children, open, onClose, sx, ...props }: any) => open ? <div {...props}>{children}</div> : null
export const Tab = ({ label, sx, ...props }: any) => <button {...props}>{label}</button>
export const Tabs = ({ children, value, onChange, sx, ...props }: any) => <div {...props}>{children}</div>
