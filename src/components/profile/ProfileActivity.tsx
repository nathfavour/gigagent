"use client";

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  CircularProgress, // Added missing import
  Divider 
} from '@/components/ui/MuiShim';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

// ...existing code...