import React from 'react';
const div = ({ children, sx, ...props }: any) => <div {...props}>{children}</div>;
const IconPlaceholder = (props: any) => <div {...props}>■</div>;
export const Box = div; export const Container = div; export const Grid = div; export const Paper = div; export const Stack = div;
export const AppBar = div; export const Toolbar = div; export const ToolbarProps = {} as any;
export const Typography = ({ children, variant, component, sx, ...props }: any) => { const Tag = component || 'p'; return <Tag {...props}>{children}</Tag>; };
export const Button = ({ children, variant, color, sx, ...props }: any) => <button {...props}>{children}</button>;
export const IconButton = ({ children, sx, ...props }: any) => <button {...props}>{children}</button>;
export const Fab = div; export const Divider = ({ sx, ...props }: any) => <hr {...props} />;
export const CircularProgress = ({ sx, ...props }: any) => <div {...props}>Loading...</div>;
export const TextField = ({ sx, ...props }: any) => <input {...props} />;
export const Chip = ({ label, sx, ...props }: any) => <span {...props}>{label}</span>;
export const Avatar = ({ src, sx, ...props }: any) => <img src={src} {...props} />;
export const Alert = ({ children, severity, sx, ...props }: any) => <div {...props}>{children}</div>;
export const Dialog = ({ children, open, onClose, sx, ...props }: any) => open ? <div {...props}>{children}</div> : null;
export const DialogContent = div; export const DialogTitle = div; export const DialogActions = div;
export const Tab = ({ label, sx, ...props }: any) => <button {...props}>{label}</button>;
export const Tabs = ({ children, value, onChange, sx, ...props }: any) => <div {...props}>{children}</div>;
export const Tooltip = ({ children, title, ...props }: any) => <div {...props} title={title}>{children}</div>;
export const Menu = div; export const MenuItem = div; export const List = div; export const ListItem = div;
export const ListItemText = div; export const ListItemIcon = div; export const ListItemAvatar = div; export const ListItemButton = div;
export const Switch = ({ checked, onChange, ...props }: any) => <input type='checkbox' checked={checked} onChange={onChange} {...props} />;
export const Checkbox = ({ checked, onChange, ...props }: any) => <input type='checkbox' checked={checked} onChange={onChange} {...props} />;
export const FormControlLabel = ({ label, control, ...props }: any) => <label {...props}>{control}{label}</label>;
export const Input = ({ sx, ...props }: any) => <input {...props} />;
export const Snackbar = div;
export const Fade = ({ children, in: v }: any) => v ? children : null;
export const Slide = ({ children, in: v }: any) => v ? children : null;
export const Collapse = ({ children, in: v }: any) => v ? children : null;
export const Popper = div; export const ClickAwayListener = div; export const MenuList = div;
export const Drawer = div; export const Badge = div; export const BottomNavigation = div; export const BottomNavigationAction = div;
export const Skeleton = div; export const Breadcrumbs = div; export const Link = ({ children, ...props }: any) => <a {...props}>{children}</a>;
export const Card = div; export const CardContent = div; export const CardHeader = div; export const CardActions = div; export const CardMedia = div;
export const CardActionArea = div; export const InputAdornment = div; export const InputLabel = div; export const FormControl = div;
export const Select = div; export const FormHelperText = div; export const Autocomplete = div; export const Backdrop = div;
export const LinearProgress = div; export const Table = div; export const TableBody = div; export const TableCell = div;
export const TableContainer = div; export const TableHead = div; export const TableRow = div;
export const ThemeProvider = ({ children }: any) => <>{children}</>;
export const CssBaseline = () => null;
export const useTheme = () => ({ 
  palette: { mode: 'dark', primary: { main: '#8B5CF6' }, background: { paper: '#0A0908', default: '#000000' }, grey: { 500: '#888' }, text: { primary: '#fff' } }, 
  breakpoints: { up: () => false, down: () => false, values: { xs:0, sm:600, md:900, lg:1200, xl:1536 }, between: () => false, only: () => false, not: () => false }, 
  transitions: { create: () => '' }, 
  zIndex: { drawer: 1200 } 
});
export const useMediaQuery = () => false;
export const styled = (c: any) => (p: any) => c;
export const alpha = (c: string, o: number) => c;
export const createTheme = () => ({});
export const responsiveFontSizes = (t: any) => t;
export type Theme = any; export type SxProps = any;
export const Notifications = IconPlaceholder; export const Search = IconPlaceholder; export const Dashboard = IconPlaceholder;
export const Work = IconPlaceholder; export const Bookmarks = IconPlaceholder; export const Storefront = IconPlaceholder;
export const Person = IconPlaceholder; export const People = IconPlaceholder; export const Groups = IconPlaceholder;
export const CampaignIcon = IconPlaceholder; export const ErrorOutline = IconPlaceholder; export const ChatBubbleOutlineIcon = IconPlaceholder;
export const InfoOutlinedIcon = IconPlaceholder; export const ScheduleIcon = IconPlaceholder; export const PublicIcon = IconPlaceholder;
export const WorkOutlineIcon = IconPlaceholder; export const PeopleOutlineIcon = IconPlaceholder; export const StarOutlineIcon = IconPlaceholder;
