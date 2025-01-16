import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { ExpandLess, ExpandMore, Add, Edit, Delete } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import UsersIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';

const mockIcons = {
  dashboard: <DashboardIcon />,
  inventory: <InventoryIcon />,
  settings: <SettingsIcon />,
  category: <CategoryIcon />,
  users: <UsersIcon />,
  history: <HistoryIcon />,
  bar_chart: <BarChartIcon />,
};

const SidebarManager = () => {
  const [config, setConfig] = useState([]);
  const [openGroups, setOpenGroups] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Sidebar Configuration
  const fetchSidebarConfig = async () => {
    return [
      {
        id: 'general',
        title: 'General',
        type: 'group',
        icon: 'history',
        isVisible: true,
        order: 1,
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            icon: 'dashboard',
            path: '/dashboard',
            roles: ['admin', 'editor', 'viewer'],
            canEditRoles: ['admin'],
            tooltip: 'Go to Dashboard',
            badge: {
              count: 5,
              style: 'primary',
            },
            activityLog: true,
            conditions: {
              isEnabled: true,
            },
          },
          {
            id: 'reports',
            title: 'Reports',
            type: 'item',
            icon: 'bar_chart',
            path: '/reports',
            roles: ['admin', 'editor'],
            canEditRoles: ['admin'],
            tooltip: 'View Reports',
            isVisible: true,
            order: 2,
          },
        ],
      },
      {
        id: 'inventory',
        title: 'Inventory',
        type: 'collapse',
        icon: 'inventory',
        path: null,
        roles: ['admin', 'editor'],
        canEditRoles: ['admin'],
        isVisible: true,
        tooltip: 'Manage Inventory',
        collapsed: false,
        children: [
          {
            id: 'products',
            title: 'Products',
            type: 'item',
            icon: 'inventory',
            path: '/inventory/products',
            roles: ['admin', 'editor'],
            canEditRoles: ['admin'],
            tooltip: 'Manage Products',
            badge: {
              count: 3,
              style: 'warning',
            },
          },
          {
            id: 'categories',
            title: 'Categories',
            type: 'item',
            icon: 'category',
            path: '/inventory/categories',
            roles: ['admin'],
            canEditRoles: ['admin'],
            tooltip: 'Manage Categories',
          },
        ],
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'collapse',
        icon: 'settings',
        path: null,
        roles: ['admin'],
        canEditRoles: ['admin'],
        isVisible: true,
        tooltip: 'Manage application settings',
        children: [
          {
            id: 'user-management',
            title: 'User Management',
            type: 'item',
            icon: 'users',
            path: '/settings/users',
            roles: ['admin'],
            canEditRoles: ['admin'],
            tooltip: 'Manage users',
          },
          {
            id: 'audit-log',
            title: 'Audit Log',
            type: 'item',
            icon: 'history',
            path: '/settings/audit-log',
            roles: ['admin'],
            canEditRoles: ['admin'],
            tooltip: 'View Audit Logs',
          },
        ],
      },
    ];
  };

  useEffect(() => {
    const loadConfig = async () => {
      const data = await fetchSidebarConfig();
      setConfig(data);
    };
    loadConfig();
  }, []);

  // Toggle group visibility
  const handleToggleGroup = (groupId) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Open modal for adding or editing items
  const openModal = (type, groupIndex, childIndex = null) => {
    const item =
      childIndex !== null
        ? config[groupIndex].children[childIndex]
        : config[groupIndex];

    setEditingItem({ type, groupIndex, childIndex, data: { ...item } });
    setIsModalOpen(true);
  };

  // Handle delete item
  const handleDeleteItem = (groupIndex, childIndex = null) => {
    const updatedConfig = [...config];
    if (childIndex !== null) {
      updatedConfig[groupIndex].children.splice(childIndex, 1);
    } else {
      updatedConfig.splice(groupIndex, 1);
    }
    setConfig(updatedConfig);
  };

  // Save or update item
  const handleSaveItem = () => {
    const updatedConfig = [...config];
    const { type, groupIndex, childIndex, data } = editingItem;

    if (type === 'group') {
      if (groupIndex !== undefined) {
        updatedConfig[groupIndex] = data;
      } else {
        updatedConfig.push(data);
      }
    } else if (type === 'child') {
      if (childIndex !== undefined) {
        updatedConfig[groupIndex].children[childIndex] = data;
      } else {
        updatedConfig[groupIndex].children.push(data);
      }
    }

    setConfig(updatedConfig);
    closeModal();
  };

  // Close modal
  const closeModal = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  // Render icon selector
  const renderIconSelector = (value, onChange) => (
    <Select value={value} onChange={onChange} fullWidth>
      {Object.keys(mockIcons).map((iconKey) => (
        <MenuItem key={iconKey} value={iconKey}>
          {mockIcons[iconKey]}
        </MenuItem>
      ))}
    </Select>
  );

  // Render role selector
  const renderRoleSelector = (value, onChange) => (
    <Select multiple value={value} onChange={onChange} fullWidth>
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="editor">Editor</MenuItem>
      <MenuItem value="viewer">Viewer</MenuItem>
    </Select>
  );

  const handleAddGroup = () => {
    setEditingItem({
      type: 'group',
      data: { title: '', icon: '', path: '', children: [] },
    });
    setIsModalOpen(true);
  };

  const handleEditItem = (type, groupIndex, childIndex = null) => {
    const item =
      childIndex !== null
        ? config[groupIndex].children[childIndex]
        : config[groupIndex];
    setEditingItem({ type, groupIndex, childIndex, data: { ...item } });
    setIsModalOpen(true);
  };

  return (
    <Box sx={{ width: 500, backgroundColor: '#f5f5f5', padding: 2 }}>
      <List>
        {config
          .filter((group) => group.isVisible)
          .map((group, groupIndex) => (
            <React.Fragment key={group.id}>
              <ListItem
                button
                onClick={() => handleToggleGroup(group.id)}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Tooltip title={group.tooltip} placement="top">
                  <ListItemIcon>{mockIcons[group.icon]}</ListItemIcon>
                </Tooltip>

                <ListItemText primary={group.title} />
                {group.children && group.children.length > 0 && (
                  <Box>
                    <IconButton onClick={() => openModal('group', groupIndex)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteItem(groupIndex)}>
                      <Delete />
                    </IconButton>
                  </Box>
                )}
                {openGroups[group.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openGroups[group.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {group.children
                    .filter((child) => child.isVisible)
                    .map((child, childIndex) => (
                      <ListItem key={child.id} sx={{ pl: 4 }}>
                        <Tooltip title={child.tooltip} placement="top">
                          <ListItemIcon>{mockIcons[child.icon]}</ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={child.title} />
                        <Box>
                          <IconButton
                            onClick={() =>
                              openModal('child', groupIndex, childIndex)
                            }
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleDeleteItem(groupIndex, childIndex)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  <Button
                    startIcon={<Add />}
                    onClick={() => handleEditItem('child', groupIndex)}
                    sx={{ ml: 4 }}
                  >
                    Add Child
                  </Button>
                </List>
              </Collapse>
            </React.Fragment>
          ))}
      </List>

      {/* Add Group Button */}
      <Button startIcon={<Add />} onClick={handleAddGroup} fullWidth>
        Add Group
      </Button>

      {/* Modal for Edit/Add */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{editingItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editingItem?.data?.title || ''}
            onChange={(e) =>
              setEditingItem((prev) => ({
                ...prev,
                data: { ...prev.data, title: e.target.value },
              }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Path"
            fullWidth
            value={editingItem?.data?.path || ''}
            onChange={(e) =>
              setEditingItem((prev) => ({
                ...prev,
                data: { ...prev.data, path: e.target.value },
              }))
            }
            sx={{ marginBottom: 2 }}
          />
          {editingItem && (
            <Box>
              <Box sx={{ marginBottom: 2 }}>
                {renderIconSelector(editingItem?.data?.icon || '', (e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    data: { ...prev.data, icon: e.target.value },
                  })),
                )}
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                {renderRoleSelector(editingItem?.data?.roles || [], (e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    data: { ...prev.data, roles: e.target.value },
                  })),
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSaveItem}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SidebarManager;
