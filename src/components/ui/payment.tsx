"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { Label } from './label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from './drawer'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

interface CountryOption {
  code: string
  name: string
  flag: string
  callingCode: string
  exampleLength: number
}

// Полный список стран мира с флагами
const allCountries: CountryOption[] = [
  // Популярные страны (сверху)
  { code: 'US', name: 'United States', flag: '🇺🇸', callingCode: '+1', exampleLength: 10 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', callingCode: '+44', exampleLength: 10 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', callingCode: '+49', exampleLength: 11 },
  { code: 'FR', name: 'France', flag: '🇫🇷', callingCode: '+33', exampleLength: 10 },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', callingCode: '+7', exampleLength: 10 },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', callingCode: '+380', exampleLength: 9 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', callingCode: '+1', exampleLength: 10 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', callingCode: '+61', exampleLength: 9 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', callingCode: '+81', exampleLength: 10 },
  { code: 'CN', name: 'China', flag: '🇨🇳', callingCode: '+86', exampleLength: 11 },
  
  // Все остальные страны (по алфавиту)
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', callingCode: '+376', exampleLength: 6 },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', callingCode: '+971', exampleLength: 9 },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', callingCode: '+93', exampleLength: 9 },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', callingCode: '+1', exampleLength: 10 },
  { code: 'AI', name: 'Anguilla', flag: '🇦🇮', callingCode: '+1', exampleLength: 10 },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', callingCode: '+355', exampleLength: 9 },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', callingCode: '+374', exampleLength: 8 },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', callingCode: '+244', exampleLength: 9 },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', callingCode: '+54', exampleLength: 10 },
  { code: 'AS', name: 'American Samoa', flag: '🇦🇸', callingCode: '+1', exampleLength: 10 },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', callingCode: '+43', exampleLength: 10 },
  { code: 'AW', name: 'Aruba', flag: '🇦🇼', callingCode: '+297', exampleLength: 7 },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', callingCode: '+994', exampleLength: 9 },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', callingCode: '+387', exampleLength: 8 },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', callingCode: '+1', exampleLength: 10 },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', callingCode: '+880', exampleLength: 10 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', callingCode: '+32', exampleLength: 9 },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', callingCode: '+226', exampleLength: 8 },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', callingCode: '+359', exampleLength: 9 },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', callingCode: '+973', exampleLength: 8 },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', callingCode: '+257', exampleLength: 8 },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', callingCode: '+229', exampleLength: 8 },
  { code: 'BM', name: 'Bermuda', flag: '🇧🇲', callingCode: '+1', exampleLength: 10 },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', callingCode: '+673', exampleLength: 7 },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', callingCode: '+591', exampleLength: 8 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', callingCode: '+55', exampleLength: 11 },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', callingCode: '+1', exampleLength: 10 },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', callingCode: '+975', exampleLength: 8 },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', callingCode: '+267', exampleLength: 8 },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', callingCode: '+375', exampleLength: 9 },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', callingCode: '+501', exampleLength: 7 },
  { code: 'CD', name: 'Congo (DRC)', flag: '🇨🇩', callingCode: '+243', exampleLength: 9 },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', callingCode: '+236', exampleLength: 8 },
  { code: 'CG', name: 'Congo', flag: '🇨🇬', callingCode: '+242', exampleLength: 9 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', callingCode: '+41', exampleLength: 9 },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', callingCode: '+225', exampleLength: 10 },
  { code: 'CK', name: 'Cook Islands', flag: '🇨🇰', callingCode: '+682', exampleLength: 5 },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', callingCode: '+56', exampleLength: 9 },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', callingCode: '+237', exampleLength: 9 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', callingCode: '+57', exampleLength: 10 },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', callingCode: '+506', exampleLength: 8 },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', callingCode: '+53', exampleLength: 8 },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', callingCode: '+238', exampleLength: 7 },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', callingCode: '+357', exampleLength: 8 },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', callingCode: '+420', exampleLength: 9 },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', callingCode: '+253', exampleLength: 8 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', callingCode: '+45', exampleLength: 8 },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', callingCode: '+1', exampleLength: 10 },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', callingCode: '+1', exampleLength: 10 },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', callingCode: '+213', exampleLength: 9 },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', callingCode: '+593', exampleLength: 9 },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', callingCode: '+372', exampleLength: 8 },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', callingCode: '+20', exampleLength: 10 },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', callingCode: '+291', exampleLength: 7 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', callingCode: '+34', exampleLength: 9 },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', callingCode: '+251', exampleLength: 9 },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', callingCode: '+358', exampleLength: 9 },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', callingCode: '+679', exampleLength: 7 },
  { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰', callingCode: '+500', exampleLength: 5 },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', callingCode: '+691', exampleLength: 7 },
  { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴', callingCode: '+298', exampleLength: 6 },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', callingCode: '+241', exampleLength: 8 },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', callingCode: '+1', exampleLength: 10 },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', callingCode: '+995', exampleLength: 9 },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫', callingCode: '+594', exampleLength: 9 },
  { code: 'GG', name: 'Guernsey', flag: '🇬🇬', callingCode: '+44', exampleLength: 10 },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', callingCode: '+233', exampleLength: 9 },
  { code: 'GI', name: 'Gibraltar', flag: '🇬🇮', callingCode: '+350', exampleLength: 8 },
  { code: 'GL', name: 'Greenland', flag: '🇬🇱', callingCode: '+299', exampleLength: 6 },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', callingCode: '+220', exampleLength: 7 },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', callingCode: '+224', exampleLength: 9 },
  { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵', callingCode: '+590', exampleLength: 9 },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', callingCode: '+240', exampleLength: 9 },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', callingCode: '+30', exampleLength: 10 },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', callingCode: '+502', exampleLength: 8 },
  { code: 'GU', name: 'Guam', flag: '🇬🇺', callingCode: '+1', exampleLength: 10 },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', callingCode: '+245', exampleLength: 7 },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', callingCode: '+592', exampleLength: 7 },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', callingCode: '+852', exampleLength: 8 },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', callingCode: '+504', exampleLength: 8 },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', callingCode: '+385', exampleLength: 9 },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', callingCode: '+509', exampleLength: 8 },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', callingCode: '+36', exampleLength: 9 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', callingCode: '+62', exampleLength: 10 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', callingCode: '+353', exampleLength: 9 },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', callingCode: '+972', exampleLength: 9 },
  { code: 'IM', name: 'Isle of Man', flag: '🇮🇲', callingCode: '+44', exampleLength: 10 },
  { code: 'IN', name: 'India', flag: '🇮🇳', callingCode: '+91', exampleLength: 10 },
  { code: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴', callingCode: '+246', exampleLength: 7 },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', callingCode: '+964', exampleLength: 10 },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', callingCode: '+98', exampleLength: 10 },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', callingCode: '+354', exampleLength: 7 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', callingCode: '+39', exampleLength: 10 },
  { code: 'JE', name: 'Jersey', flag: '🇯🇪', callingCode: '+44', exampleLength: 10 },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', callingCode: '+1', exampleLength: 10 },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', callingCode: '+962', exampleLength: 9 },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', callingCode: '+254', exampleLength: 9 },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', callingCode: '+996', exampleLength: 9 },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', callingCode: '+855', exampleLength: 9 },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', callingCode: '+686', exampleLength: 8 },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', callingCode: '+269', exampleLength: 7 },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', callingCode: '+1', exampleLength: 10 },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵', callingCode: '+850', exampleLength: 8 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', callingCode: '+82', exampleLength: 10 },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', callingCode: '+965', exampleLength: 8 },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', callingCode: '+1', exampleLength: 10 },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', callingCode: '+7', exampleLength: 10 },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', callingCode: '+856', exampleLength: 9 },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', callingCode: '+961', exampleLength: 8 },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', callingCode: '+1', exampleLength: 10 },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', callingCode: '+423', exampleLength: 7 },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', callingCode: '+94', exampleLength: 9 },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', callingCode: '+231', exampleLength: 8 },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', callingCode: '+266', exampleLength: 8 },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', callingCode: '+370', exampleLength: 8 },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', callingCode: '+352', exampleLength: 9 },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', callingCode: '+371', exampleLength: 8 },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', callingCode: '+218', exampleLength: 9 },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', callingCode: '+212', exampleLength: 9 },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', callingCode: '+377', exampleLength: 8 },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', callingCode: '+373', exampleLength: 8 },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', callingCode: '+382', exampleLength: 8 },
  { code: 'MF', name: 'Saint Martin', flag: '🇲🇫', callingCode: '+590', exampleLength: 9 },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', callingCode: '+261', exampleLength: 9 },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', callingCode: '+692', exampleLength: 7 },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', callingCode: '+389', exampleLength: 8 },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', callingCode: '+223', exampleLength: 8 },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', callingCode: '+95', exampleLength: 9 },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', callingCode: '+976', exampleLength: 8 },
  { code: 'MO', name: 'Macau', flag: '🇲🇴', callingCode: '+853', exampleLength: 8 },
  { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵', callingCode: '+1', exampleLength: 10 },
  { code: 'MQ', name: 'Martinique', flag: '🇲🇶', callingCode: '+596', exampleLength: 9 },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', callingCode: '+222', exampleLength: 8 },
  { code: 'MS', name: 'Montserrat', flag: '🇲🇸', callingCode: '+1', exampleLength: 10 },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', callingCode: '+356', exampleLength: 8 },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', callingCode: '+230', exampleLength: 8 },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', callingCode: '+960', exampleLength: 7 },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', callingCode: '+265', exampleLength: 9 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', callingCode: '+52', exampleLength: 10 },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', callingCode: '+60', exampleLength: 9 },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', callingCode: '+258', exampleLength: 9 },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', callingCode: '+264', exampleLength: 9 },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨', callingCode: '+687', exampleLength: 6 },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', callingCode: '+227', exampleLength: 8 },
  { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫', callingCode: '+672', exampleLength: 6 },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', callingCode: '+234', exampleLength: 10 },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', callingCode: '+505', exampleLength: 8 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', callingCode: '+31', exampleLength: 9 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', callingCode: '+47', exampleLength: 8 },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', callingCode: '+977', exampleLength: 10 },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', callingCode: '+674', exampleLength: 7 },
  { code: 'NU', name: 'Niue', flag: '🇳🇺', callingCode: '+683', exampleLength: 4 },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', callingCode: '+64', exampleLength: 9 },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', callingCode: '+968', exampleLength: 8 },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', callingCode: '+507', exampleLength: 8 },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', callingCode: '+51', exampleLength: 9 },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫', callingCode: '+689', exampleLength: 8 },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', callingCode: '+675', exampleLength: 8 },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', callingCode: '+63', exampleLength: 10 },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', callingCode: '+92', exampleLength: 10 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', callingCode: '+48', exampleLength: 9 },
  { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲', callingCode: '+508', exampleLength: 6 },
  { code: 'PN', name: 'Pitcairn Islands', flag: '🇵🇳', callingCode: '+64', exampleLength: 9 },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', callingCode: '+1', exampleLength: 10 },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', callingCode: '+970', exampleLength: 9 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', callingCode: '+351', exampleLength: 9 },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', callingCode: '+680', exampleLength: 7 },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', callingCode: '+595', exampleLength: 9 },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', callingCode: '+974', exampleLength: 8 },
  { code: 'RE', name: 'Réunion', flag: '🇷🇪', callingCode: '+262', exampleLength: 9 },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', callingCode: '+40', exampleLength: 9 },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', callingCode: '+381', exampleLength: 9 },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', callingCode: '+250', exampleLength: 9 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', callingCode: '+966', exampleLength: 9 },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', callingCode: '+677', exampleLength: 7 },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', callingCode: '+248', exampleLength: 7 },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', callingCode: '+249', exampleLength: 9 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', callingCode: '+46', exampleLength: 9 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', callingCode: '+65', exampleLength: 8 },
  { code: 'SH', name: 'Saint Helena', flag: '🇸🇭', callingCode: '+290', exampleLength: 4 },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', callingCode: '+386', exampleLength: 8 },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯', callingCode: '+47', exampleLength: 8 },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', callingCode: '+421', exampleLength: 9 },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', callingCode: '+232', exampleLength: 8 },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', callingCode: '+378', exampleLength: 10 },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', callingCode: '+221', exampleLength: 9 },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', callingCode: '+252', exampleLength: 8 },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', callingCode: '+597', exampleLength: 7 },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', callingCode: '+211', exampleLength: 9 },
  { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹', callingCode: '+239', exampleLength: 7 },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', callingCode: '+503', exampleLength: 8 },
  { code: 'SX', name: 'Sint Maarten', flag: '🇸🇽', callingCode: '+1', exampleLength: 10 },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', callingCode: '+963', exampleLength: 9 },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', callingCode: '+268', exampleLength: 8 },
  { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨', callingCode: '+1', exampleLength: 10 },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', callingCode: '+235', exampleLength: 8 },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', callingCode: '+228', exampleLength: 8 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', callingCode: '+66', exampleLength: 9 },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', callingCode: '+992', exampleLength: 9 },
  { code: 'TK', name: 'Tokelau', flag: '🇹🇰', callingCode: '+690', exampleLength: 4 },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', callingCode: '+670', exampleLength: 8 },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', callingCode: '+993', exampleLength: 8 },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', callingCode: '+216', exampleLength: 8 },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', callingCode: '+676', exampleLength: 5 },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', callingCode: '+90', exampleLength: 10 },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', callingCode: '+1', exampleLength: 10 },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', callingCode: '+688', exampleLength: 5 },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', callingCode: '+886', exampleLength: 9 },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', callingCode: '+255', exampleLength: 9 },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', callingCode: '+256', exampleLength: 9 },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', callingCode: '+598', exampleLength: 8 },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', callingCode: '+998', exampleLength: 9 },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦', callingCode: '+39', exampleLength: 10 },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', callingCode: '+1', exampleLength: 10 },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', callingCode: '+58', exampleLength: 10 },
  { code: 'VG', name: 'British Virgin Islands', flag: '🇻🇬', callingCode: '+1', exampleLength: 10 },
  { code: 'VI', name: 'U.S. Virgin Islands', flag: '🇻🇮', callingCode: '+1', exampleLength: 10 },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', callingCode: '+84', exampleLength: 9 },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', callingCode: '+678', exampleLength: 7 },
  { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫', callingCode: '+681', exampleLength: 6 },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', callingCode: '+685', exampleLength: 7 },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', callingCode: '+967', exampleLength: 9 },
  { code: 'YT', name: 'Mayotte', flag: '🇾🇹', callingCode: '+262', exampleLength: 9 },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', callingCode: '+27', exampleLength: 9 },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', callingCode: '+260', exampleLength: 9 },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', callingCode: '+263', exampleLength: 9 },
]

// Компонент для поиска и выбора страны
interface SearchableCountrySelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

function SearchableCountrySelect({ value, onChange, placeholder = "Select country", className }: SearchableCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  
  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const selectedCountry = allCountries.find(country => country.code === value)
  
  const handleSelect = (countryCode: string) => {
    onChange(countryCode)
    setIsOpen(false)
    setSearchTerm('')
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
          className
        )}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-60 flex flex-col">
          {/* Search input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </div>
          
          {/* Countries list */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country.code)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left cursor-pointer"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

import { 
  Plane, 
  Clock, 
  MapPin, 
  ChevronRight,
  X,
  Info,
  CreditCard,
  User,
  Calendar,
  Globe,
  FileText,
  UserCheck,
  MapPinIcon,
  Building2,
  Mail,
  Search,
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react'
import { useBooking, PassengerData } from '@/contexts/BookingContext'

interface PaymentProps {
  className?: string
  onEditFlight?: () => void
  onEditContact?: () => void
  onEditPassenger?: () => void
}

// Mock data - в реальном приложении это будет приходить из props или состояния
const mockFlightData = {
  route: "Dubai to London",
  date: "Mon, 27 Oct 2025",
  departure: {
    time: "05:20 AM",
    city: "Dubai",
    airport: "Dubai International Airport (DXB)"
  },
  layover: {
    duration: "1h 15m",
    flight: "QR1003 - Boeing 787-9",
    operator: "Operated by Qatar Airways"
  },
  arrival: {
    time: "05:35 AM",
    city: "Doha",
    airport: "Hamad International Airport (DOH)"
  },
  transit: {
    duration: "2h 5m transit in Doha",
    airport: "Hamad International Airport",
    description: "More than just an airport. Get ready to experience the best in shopping, dining and lounges."
  }
}

const mockPassengersData = [
  {
    id: 1,
    title: "Mr",
    firstName: "John",
    lastName: "Doe",
    birthDate: "15 Jan 1990",
    nationality: "United States",
    nationalityFlag: "🇺🇸",
    passportNumber: "A12345678",
    passportExpiry: "15 Jan 2030"
  },
  {
    id: 2,
    title: "Mrs",
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "22 Mar 1992",
    nationality: "United States",
    nationalityFlag: "🇺🇸",
    passportNumber: "B87654321",
    passportExpiry: "22 Mar 2031"
  }
]

export function Payment({ className, onEditFlight, onEditContact, onEditPassenger }: PaymentProps) {
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false)
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false)
  const [selectedPassenger, setSelectedPassenger] = useState<number | null>(null)
  
  // Get data from BookingContext
  const { bookingState } = useBooking()
  const passengers = bookingState.passengers
  
  // Billing form state
  const [billingData, setBillingData] = useState({
    streetAddress: '',
    country: '',
    stateRegion: '',
    city: '',
    zipCode: ''
  })

  // Credit card state
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: ''
  })

  // Handle card input changes
  const handleCardInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    
    let formattedValue = value
    
    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19)
    }
    
    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
      if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5)
    }
    
    // Format CVC
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length > 4) formattedValue = formattedValue.substring(0, 4)
    }
    
    setCardData(prev => ({ ...prev, [name]: formattedValue }))
  }

  // Handle card input focus
  const handleCardInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, focus: evt.target.name }))
  }

  // Validation function for billing fields
  const getFieldValidationState = (fieldName: keyof typeof billingData): 'success' | 'error' | 'idle' => {
    const value = billingData[fieldName]
    
    if (!value || value.trim() === '') {
      return 'idle'
    }
    
    // Basic validation rules
    switch (fieldName) {
      case 'streetAddress':
        return value.length >= 5 ? 'success' : 'error'
      case 'country':
        return value.length > 0 ? 'success' : 'error'
      case 'stateRegion':
        return value.length >= 2 ? 'success' : 'error'
      case 'city':
        return value.length >= 2 ? 'success' : 'error'
      case 'zipCode':
        return /^[0-9A-Za-z\s-]{3,10}$/.test(value) ? 'success' : 'error'
      default:
        return 'idle'
    }
  }

  // Enhanced validation function for card fields with Luhn algorithm
  const getCardFieldValidationState = (fieldName: keyof typeof cardData): 'success' | 'error' | 'idle' => {
    const value = cardData[fieldName]
    
    if (!value || value.trim() === '') {
      return 'idle'
    }
    
    switch (fieldName) {
      case 'number':
        // Remove spaces and validate card number
        const cleanNumber = value.replace(/\s/g, '')
        if (cleanNumber.length < 13 || cleanNumber.length > 19) return 'error'
        if (!/^\d+$/.test(cleanNumber)) return 'error'
        
        // Luhn algorithm check for card number validation
        const luhnCheck = (num: string) => {
          let sum = 0
          let isEven = false
          for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num[i])
            if (isEven) {
              digit *= 2
              if (digit > 9) digit -= 9
            }
            sum += digit
            isEven = !isEven
          }
          return sum % 10 === 0
        }
        return luhnCheck(cleanNumber) ? 'success' : 'error'
        
      case 'expiry':
        // Enhanced expiry validation with date checking
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        if (!expiryRegex.test(value)) return 'error'
        
        const [month, year] = value.split('/').map(Number)
        if (month < 1 || month > 12) return 'error'
        
        // Check if card is not expired
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1
        if (year < currentYear || (year === currentYear && month < currentMonth)) return 'error'
        
        return 'success'
        
      case 'cvc':
        // CVC validation (3-4 digits)
        if (!/^\d{3,4}$/.test(value)) return 'error'
        return 'success'
        
      case 'name':
        // Cardholder name validation
        if (value.length < 2) return 'error'
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'error'
        return 'success'
        
      default:
        return 'idle'
    }
  }

  // Validation icon component
  const ValidationIcon = ({ fieldName }: { fieldName: keyof typeof billingData }) => {
    const validation = getFieldValidationState(fieldName)
    
    if (validation === 'success') {
      return <Check className="w-4 h-4 text-green-500" />
    } else if (validation === 'error') {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  // Card validation icon component
  const CardValidationIcon = ({ fieldName }: { fieldName: keyof typeof cardData }) => {
    const validation = getCardFieldValidationState(fieldName)
    
    if (validation === 'success') {
      return <Check className="w-4 h-4 text-green-500" />
    } else if (validation === 'error') {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  // Enhanced input styling function with modern 2025 design
  const getInputClassName = (fieldName: keyof typeof billingData, baseClass: string = '') => {
    const validation = getFieldValidationState(fieldName)
    const baseStyles = 'transition-all duration-200 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700'
    
    if (validation === 'success') {
      return cn(baseStyles, 'border-green-500 focus:border-green-500 focus:ring-green-500/20', baseClass)
    } else if (validation === 'error') {
      return cn(baseStyles, 'border-red-500 focus:border-red-500 focus:ring-red-500/20', baseClass)
    } else {
      return cn(baseStyles, baseClass)
    }
  }

  // Enhanced input styling function for card fields
  const getCardInputClassName = (fieldName: keyof typeof cardData, baseClass: string = '') => {
    const validation = getCardFieldValidationState(fieldName)
    const baseStyles = 'transition-all duration-200 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700'
    
    if (validation === 'success') {
      return cn(baseStyles, 'border-green-500 focus:border-green-500 focus:ring-green-500/20', baseClass)
    } else if (validation === 'error') {
      return cn(baseStyles, 'border-red-500 focus:border-red-500 focus:ring-red-500/20', baseClass)
    } else {
      return cn(baseStyles, baseClass)
    }
  }

  // Get passenger initials
  const getPassengerInitials = (passenger: PassengerData) => {
    if (passenger?.firstName && passenger?.lastName) {
      return `${passenger.firstName[0]}${passenger.lastName[0]}`
    }
    return 'AP'
  }

  // Get passenger name
  const getPassengerName = (passenger: PassengerData) => {
    if (passenger?.firstName && passenger?.lastName) {
      return `${passenger.firstName} ${passenger.lastName}`
    }
    return 'Adult Passenger'
  }

  // Open passenger modal
  const openPassengerModal = (passengerId: number) => {
    setSelectedPassenger(passengerId)
    setIsPassengerModalOpen(true)
  }

  // Get selected passenger data
  const getSelectedPassengerData = () => {
    return passengers.find(p => p.id === selectedPassenger) || passengers[0]
  }

  // Format birth date from separate fields
  const formatBirthDate = (passenger: PassengerData) => {
    if (passenger?.birthDay && passenger?.birthMonth && passenger?.birthYear) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthName = months[parseInt(passenger.birthMonth) - 1]
      return `${passenger.birthDay} ${monthName} ${passenger.birthYear}`
    }
    return 'Not specified'
  }

  // Format passport expiry date from separate fields
  const formatPassportExpiry = (passenger: PassengerData) => {
    if (passenger?.expiryDay && passenger?.expiryMonth && passenger?.expiryYear) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthName = months[parseInt(passenger.expiryMonth) - 1]
      return `${passenger.expiryDay} ${monthName} ${passenger.expiryYear}`
    }
    return 'Not specified'
  }

  // Country data mapping
  const countryData: { [key: string]: { name: string; flag: string } } = {
    'US': { name: 'United States', flag: '🇺🇸' },
    'GB': { name: 'United Kingdom', flag: '🇬🇧' },
    'DE': { name: 'Germany', flag: '🇩🇪' },
    'FR': { name: 'France', flag: '🇫🇷' },
    'RU': { name: 'Russia', flag: '🇷🇺' },
    'UA': { name: 'Ukraine', flag: '🇺🇦' },
    'CA': { name: 'Canada', flag: '🇨🇦' },
    'AU': { name: 'Australia', flag: '🇦🇺' },
    'JP': { name: 'Japan', flag: '🇯🇵' },
    'CN': { name: 'China', flag: '🇨🇳' },
    'MD': { name: 'Moldova', flag: '🇲🇩' },
    'AD': { name: 'Andorra', flag: '🇦🇩' },
    'AE': { name: 'United Arab Emirates', flag: '🇦🇪' },
    'AF': { name: 'Afghanistan', flag: '🇦🇫' },
    'AG': { name: 'Antigua and Barbuda', flag: '🇦🇬' },
    'AI': { name: 'Anguilla', flag: '🇦🇮' },
    'AL': { name: 'Albania', flag: '🇦🇱' },
    'AM': { name: 'Armenia', flag: '🇦🇲' },
    'AO': { name: 'Angola', flag: '🇦🇴' },
    'AR': { name: 'Argentina', flag: '🇦🇷' },
    'AS': { name: 'American Samoa', flag: '🇦🇸' },
    'AT': { name: 'Austria', flag: '🇦🇹' },
    'AW': { name: 'Aruba', flag: '🇦🇼' },
    'AZ': { name: 'Azerbaijan', flag: '🇦🇿' },
    'BA': { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    'BB': { name: 'Barbados', flag: '🇧🇧' },
    'BD': { name: 'Bangladesh', flag: '🇧🇩' },
    'BE': { name: 'Belgium', flag: '🇧🇪' },
    'BF': { name: 'Burkina Faso', flag: '🇧🇫' },
    'BG': { name: 'Bulgaria', flag: '🇧🇬' },
    'BH': { name: 'Bahrain', flag: '🇧🇭' },
    'BI': { name: 'Burundi', flag: '🇧🇮' },
    'BJ': { name: 'Benin', flag: '🇧🇯' },
    'BM': { name: 'Bermuda', flag: '🇧🇲' },
    'BN': { name: 'Brunei', flag: '🇧🇳' },
    'BO': { name: 'Bolivia', flag: '🇧🇴' },
    'BR': { name: 'Brazil', flag: '🇧🇷' },
    'BS': { name: 'Bahamas', flag: '🇧🇸' },
    'BT': { name: 'Bhutan', flag: '🇧🇹' },
    'BW': { name: 'Botswana', flag: '🇧🇼' },
    'BY': { name: 'Belarus', flag: '🇧🇾' },
    'BZ': { name: 'Belize', flag: '🇧🇿' },
    'CD': { name: 'Congo (DRC)', flag: '🇨🇩' },
    'CF': { name: 'Central African Republic', flag: '🇨🇫' },
    'CG': { name: 'Congo', flag: '🇨🇬' },
    'CH': { name: 'Switzerland', flag: '🇨🇭' },
    'CI': { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    'CK': { name: 'Cook Islands', flag: '🇨🇰' },
    'CL': { name: 'Chile', flag: '🇨🇱' },
    'CM': { name: 'Cameroon', flag: '🇨🇲' },
    'CO': { name: 'Colombia', flag: '🇨🇴' },
    'CR': { name: 'Costa Rica', flag: '🇨🇷' },
    'CU': { name: 'Cuba', flag: '🇨🇺' },
    'CV': { name: 'Cape Verde', flag: '🇨🇻' },
    'CY': { name: 'Cyprus', flag: '🇨🇾' },
    'CZ': { name: 'Czech Republic', flag: '🇨🇿' },
    'DJ': { name: 'Djibouti', flag: '🇩🇯' },
    'DK': { name: 'Denmark', flag: '🇩🇰' },
    'DM': { name: 'Dominica', flag: '🇩🇲' },
    'DO': { name: 'Dominican Republic', flag: '🇩🇴' },
    'DZ': { name: 'Algeria', flag: '🇩🇿' },
    'EC': { name: 'Ecuador', flag: '🇪🇨' },
    'EE': { name: 'Estonia', flag: '🇪🇪' },
    'EG': { name: 'Egypt', flag: '🇪🇬' },
    'ER': { name: 'Eritrea', flag: '🇪🇷' },
    'ES': { name: 'Spain', flag: '🇪🇸' },
    'ET': { name: 'Ethiopia', flag: '🇪🇹' },
    'FI': { name: 'Finland', flag: '🇫🇮' },
    'FJ': { name: 'Fiji', flag: '🇫🇯' },
    'FK': { name: 'Falkland Islands', flag: '🇫🇰' },
    'FM': { name: 'Micronesia', flag: '🇫🇲' },
    'FO': { name: 'Faroe Islands', flag: '🇫🇴' },
    'GA': { name: 'Gabon', flag: '🇬🇦' },
    'GD': { name: 'Grenada', flag: '🇬🇩' },
    'GE': { name: 'Georgia', flag: '🇬🇪' },
    'GF': { name: 'French Guiana', flag: '🇬🇫' },
    'GG': { name: 'Guernsey', flag: '🇬🇬' },
    'GH': { name: 'Ghana', flag: '🇬🇭' },
    'GI': { name: 'Gibraltar', flag: '🇬🇮' },
    'GL': { name: 'Greenland', flag: '🇬🇱' },
    'GM': { name: 'Gambia', flag: '🇬🇲' },
    'GN': { name: 'Guinea', flag: '🇬🇳' },
    'GP': { name: 'Guadeloupe', flag: '🇬🇵' },
    'GQ': { name: 'Equatorial Guinea', flag: '🇬🇶' },
    'GR': { name: 'Greece', flag: '🇬🇷' },
    'GT': { name: 'Guatemala', flag: '🇬🇹' },
    'GU': { name: 'Guam', flag: '🇬🇺' },
    'GW': { name: 'Guinea-Bissau', flag: '🇬🇼' },
    'GY': { name: 'Guyana', flag: '🇬🇾' },
    'HK': { name: 'Hong Kong', flag: '🇭🇰' },
    'HN': { name: 'Honduras', flag: '🇭🇳' },
    'HR': { name: 'Croatia', flag: '🇭🇷' },
    'HT': { name: 'Haiti', flag: '🇭🇹' },
    'HU': { name: 'Hungary', flag: '🇭🇺' },
    'ID': { name: 'Indonesia', flag: '🇮🇩' },
    'IE': { name: 'Ireland', flag: '🇮🇪' },
    'IL': { name: 'Israel', flag: '🇮🇱' },
    'IM': { name: 'Isle of Man', flag: '🇮🇲' },
    'IN': { name: 'India', flag: '🇮🇳' },
    'IO': { name: 'British Indian Ocean Territory', flag: '🇮🇴' },
    'IQ': { name: 'Iraq', flag: '🇮🇶' },
    'IR': { name: 'Iran', flag: '🇮🇷' },
    'IS': { name: 'Iceland', flag: '🇮🇸' },
    'IT': { name: 'Italy', flag: '🇮🇹' },
    'JE': { name: 'Jersey', flag: '🇯🇪' },
    'JM': { name: 'Jamaica', flag: '🇯🇲' },
    'JO': { name: 'Jordan', flag: '🇯🇴' },
    'KE': { name: 'Kenya', flag: '🇰🇪' },
    'KG': { name: 'Kyrgyzstan', flag: '🇰🇬' },
    'KH': { name: 'Cambodia', flag: '🇰🇭' },
    'KI': { name: 'Kiribati', flag: '🇰🇮' },
    'KM': { name: 'Comoros', flag: '🇰🇲' },
    'KN': { name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
    'KP': { name: 'North Korea', flag: '🇰🇵' },
    'KR': { name: 'South Korea', flag: '🇰🇷' },
    'KW': { name: 'Kuwait', flag: '🇰🇼' },
    'KY': { name: 'Cayman Islands', flag: '🇰🇾' },
    'KZ': { name: 'Kazakhstan', flag: '🇰🇿' },
    'LA': { name: 'Laos', flag: '🇱🇦' },
    'LB': { name: 'Lebanon', flag: '🇱🇧' },
    'LC': { name: 'Saint Lucia', flag: '🇱🇨' },
    'LI': { name: 'Liechtenstein', flag: '🇱🇮' },
    'LK': { name: 'Sri Lanka', flag: '🇱🇰' },
    'LR': { name: 'Liberia', flag: '🇱🇷' },
    'LS': { name: 'Lesotho', flag: '🇱🇸' },
    'LT': { name: 'Lithuania', flag: '🇱🇹' },
    'LU': { name: 'Luxembourg', flag: '🇱🇺' },
    'LV': { name: 'Latvia', flag: '🇱🇻' },
    'LY': { name: 'Libya', flag: '🇱🇾' },
    'MA': { name: 'Morocco', flag: '🇲🇦' },
    'MC': { name: 'Monaco', flag: '🇲🇨' },
    'ME': { name: 'Montenegro', flag: '🇲🇪' },
    'MF': { name: 'Saint Martin', flag: '🇲🇫' },
    'MG': { name: 'Madagascar', flag: '🇲🇬' },
    'MH': { name: 'Marshall Islands', flag: '🇲🇭' },
    'MK': { name: 'North Macedonia', flag: '🇲🇰' },
    'ML': { name: 'Mali', flag: '🇲🇱' },
    'MM': { name: 'Myanmar', flag: '🇲🇲' },
    'MN': { name: 'Mongolia', flag: '🇲🇳' },
    'MO': { name: 'Macao', flag: '🇲🇴' },
    'MP': { name: 'Northern Mariana Islands', flag: '🇲🇵' },
    'MQ': { name: 'Martinique', flag: '🇲🇶' },
    'MR': { name: 'Mauritania', flag: '🇲🇷' },
    'MS': { name: 'Montserrat', flag: '🇲🇸' },
    'MT': { name: 'Malta', flag: '🇲🇹' },
    'MU': { name: 'Mauritius', flag: '🇲🇺' },
    'MV': { name: 'Maldives', flag: '🇲🇻' },
    'MW': { name: 'Malawi', flag: '🇲🇼' },
    'MX': { name: 'Mexico', flag: '🇲🇽' },
    'MY': { name: 'Malaysia', flag: '🇲🇾' },
    'MZ': { name: 'Mozambique', flag: '🇲🇿' },
    'NA': { name: 'Namibia', flag: '🇳🇦' },
    'NC': { name: 'New Caledonia', flag: '🇳🇨' },
    'NE': { name: 'Niger', flag: '🇳🇪' },
    'NF': { name: 'Norfolk Island', flag: '🇳🇫' },
    'NG': { name: 'Nigeria', flag: '🇳🇬' },
    'NI': { name: 'Nicaragua', flag: '🇳🇮' },
    'NL': { name: 'Netherlands', flag: '🇳🇱' },
    'NO': { name: 'Norway', flag: '🇳🇴' },
    'NP': { name: 'Nepal', flag: '🇳🇵' },
    'NR': { name: 'Nauru', flag: '🇳🇷' },
    'NU': { name: 'Niue', flag: '🇳🇺' },
    'NZ': { name: 'New Zealand', flag: '🇳🇿' },
    'OM': { name: 'Oman', flag: '🇴🇲' },
    'PA': { name: 'Panama', flag: '🇵🇦' },
    'PE': { name: 'Peru', flag: '🇵🇪' },
    'PF': { name: 'French Polynesia', flag: '🇵🇫' },
    'PG': { name: 'Papua New Guinea', flag: '🇵🇬' },
    'PH': { name: 'Philippines', flag: '🇵🇭' },
    'PK': { name: 'Pakistan', flag: '🇵🇰' },
    'PL': { name: 'Poland', flag: '🇵🇱' },
    'PM': { name: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
    'PN': { name: 'Pitcairn Islands', flag: '🇵🇳' },
    'PR': { name: 'Puerto Rico', flag: '🇵🇷' },
    'PS': { name: 'Palestine', flag: '🇵🇸' },
    'PT': { name: 'Portugal', flag: '🇵🇹' },
    'PW': { name: 'Palau', flag: '🇵🇼' },
    'PY': { name: 'Paraguay', flag: '🇵🇾' },
    'QA': { name: 'Qatar', flag: '🇶🇦' },
    'RE': { name: 'Réunion', flag: '🇷🇪' },
    'RO': { name: 'Romania', flag: '🇷🇴' },
    'RS': { name: 'Serbia', flag: '🇷🇸' },
    'RW': { name: 'Rwanda', flag: '🇷🇼' },
    'SA': { name: 'Saudi Arabia', flag: '🇸🇦' },
    'SB': { name: 'Solomon Islands', flag: '🇸🇧' },
    'SC': { name: 'Seychelles', flag: '🇸🇨' },
    'SD': { name: 'Sudan', flag: '🇸🇩' },
    'SE': { name: 'Sweden', flag: '🇸🇪' },
    'SG': { name: 'Singapore', flag: '🇸🇬' },
    'SH': { name: 'Saint Helena', flag: '🇸🇭' },
    'SI': { name: 'Slovenia', flag: '🇸🇮' },
    'SJ': { name: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
    'SK': { name: 'Slovakia', flag: '🇸🇰' },
    'SL': { name: 'Sierra Leone', flag: '🇸🇱' },
    'SM': { name: 'San Marino', flag: '🇸🇲' },
    'SN': { name: 'Senegal', flag: '🇸🇳' },
    'SO': { name: 'Somalia', flag: '🇸🇴' },
    'SR': { name: 'Suriname', flag: '🇸🇷' },
    'SS': { name: 'South Sudan', flag: '🇸🇸' },
    'ST': { name: 'São Tomé and Príncipe', flag: '🇸🇹' },
    'SV': { name: 'El Salvador', flag: '🇸🇻' },
    'SX': { name: 'Sint Maarten', flag: '🇸🇽' },
    'SY': { name: 'Syria', flag: '🇸🇾' },
    'SZ': { name: 'Eswatini', flag: '🇸🇿' },
    'TC': { name: 'Turks and Caicos Islands', flag: '🇹🇨' },
    'TD': { name: 'Chad', flag: '🇹🇩' },
    'TG': { name: 'Togo', flag: '🇹🇬' },
    'TH': { name: 'Thailand', flag: '🇹🇭' },
    'TJ': { name: 'Tajikistan', flag: '🇹🇯' },
    'TK': { name: 'Tokelau', flag: '🇹🇰' },
    'TL': { name: 'Timor-Leste', flag: '🇹🇱' },
    'TM': { name: 'Turkmenistan', flag: '🇹🇲' },
    'TN': { name: 'Tunisia', flag: '🇹🇳' },
    'TO': { name: 'Tonga', flag: '🇹🇴' },
    'TR': { name: 'Turkey', flag: '🇹🇷' },
    'TT': { name: 'Trinidad and Tobago', flag: '🇹🇹' },
    'TV': { name: 'Tuvalu', flag: '🇹🇻' },
    'TW': { name: 'Taiwan', flag: '🇹🇼' },
    'TZ': { name: 'Tanzania', flag: '🇹🇿' },
    'UG': { name: 'Uganda', flag: '🇺🇬' },
    'UY': { name: 'Uruguay', flag: '🇺🇾' },
    'UZ': { name: 'Uzbekistan', flag: '🇺🇿' },
    'VA': { name: 'Vatican City', flag: '🇻🇦' },
    'VC': { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
    'VE': { name: 'Venezuela', flag: '🇻🇪' },
    'VG': { name: 'British Virgin Islands', flag: '🇻🇬' },
    'VI': { name: 'U.S. Virgin Islands', flag: '🇻🇮' },
    'VN': { name: 'Vietnam', flag: '🇻🇳' },
    'VU': { name: 'Vanuatu', flag: '🇻🇺' },
    'WF': { name: 'Wallis and Futuna', flag: '🇼🇫' },
    'WS': { name: 'Samoa', flag: '🇼🇸' },
    'YE': { name: 'Yemen', flag: '🇾🇪' },
    'YT': { name: 'Mayotte', flag: '🇾🇹' },
    'ZA': { name: 'South Africa', flag: '🇿🇦' },
    'ZM': { name: 'Zambia', flag: '🇿🇲' },
    'ZW': { name: 'Zimbabwe', flag: '🇿🇼' }
  }

  // Get country name from code
  const getCountryName = (countryCode: string) => {
    return countryData[countryCode]?.name || countryCode
  }

  // Get nationality flag from country code
  const getNationalityFlag = (countryCode: string) => {
    return countryData[countryCode]?.flag || '🏳️'
  }

  return (
    <>
      <div className={cn("space-y-6", className)}>
        {/* Section title */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-600 dark:text-white uppercase tracking-wide">
            TRIP DETAILS
          </h2>
        </div>

        {/* Flight Information - как в первом шаге */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-[#EC5E39]"
          onClick={() => setIsFlightModalOpen(true)}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-4 h-4 text-[#EC5E39]" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {mockFlightData.route}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{mockFlightData.departure.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{mockFlightData.date}</span>
                  </div>
                </div>
                
                <Badge variant="secondary" className="mt-2 text-xs">
                  1 stop • {mockFlightData.layover.duration}
                </Badge>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Passengers - как в первом шаге */}
        <Card className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-[#EC5E39]" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">PASSENGERS ({passengers.length})</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {passengers.map((passenger, index) => (
              <div 
                key={passenger.id}
                className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-[#EC5E39] hover:shadow-sm cursor-pointer transition-all"
                onClick={() => openPassengerModal(passenger.id)}
              >
                <div className="w-8 h-8 bg-[#0fbab5] rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {getPassengerInitials(passenger)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{getPassengerName(passenger)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Passenger {index + 1}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
            ))}
          </div>
        </Card>

        {/* Billing Information Section */}
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-600 dark:text-white uppercase tracking-wide">
              BILLING INFORMATION
            </h2>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-5 h-5 text-[#EC5E39]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Billing Details
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Street Address */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    Street Address
                  </Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your street address"
                      value={billingData.streetAddress}
                      onChange={(e) => setBillingData(prev => ({ ...prev, streetAddress: e.target.value }))}
                      className={getInputClassName('streetAddress', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <ValidationIcon fieldName="streetAddress" />
                    </div>
                  </div>
                </div>

                {/* Country and State/Region Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Globe className="w-4 h-4 text-gray-500" />
                      Country
                    </Label>
                    <div className="relative">
                      <SearchableCountrySelect
                        value={billingData.country}
                        onChange={(value) => setBillingData(prev => ({ ...prev, country: value }))}
                        placeholder="Select Country"
                        className={getInputClassName('country', 'h-12 text-base')}
                      />
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ValidationIcon fieldName="country" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      State/Region
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter state or region"
                        value={billingData.stateRegion}
                        onChange={(e) => setBillingData(prev => ({ ...prev, stateRegion: e.target.value }))}
                        className={getInputClassName('stateRegion', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <ValidationIcon fieldName="stateRegion" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* City and Zip Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      City
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter city"
                        value={billingData.city}
                        onChange={(e) => setBillingData(prev => ({ ...prev, city: e.target.value }))}
                        className={getInputClassName('city', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <ValidationIcon fieldName="city" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Zip Code
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter zip code"
                        value={billingData.zipCode}
                        onChange={(e) => setBillingData(prev => ({ ...prev, zipCode: e.target.value }))}
                        className={getInputClassName('zipCode', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <ValidationIcon fieldName="zipCode" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Card Information Section */}
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm mt-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#0fbab5] rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    PAYMENT INFORMATION
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter your credit card details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Credit Card Preview */}
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <Cards
                       number={cardData.number}
                       expiry={cardData.expiry}
                       cvc={cardData.cvc}
                       name={cardData.name}
                       focused={cardData.focus as any}
                       placeholders={{
                         name: 'CARDHOLDER NAME'
                       }}
                       locale={{
                         valid: 'VALID THRU'
                       }}
                     />
                  </div>
                </div>

                {/* Credit Card Form */}
                <div className="space-y-4">
                  {/* Card Number */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      Card Number
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        name="number"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={handleCardInputChange}
                        onFocus={handleCardInputFocus}
                        className={getCardInputClassName('number', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                        maxLength={19}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CardValidationIcon fieldName="number" />
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User className="w-4 h-4 text-gray-500" />
                      Cardholder Name
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={cardData.name}
                        onChange={handleCardInputChange}
                        onFocus={handleCardInputFocus}
                        className={getCardInputClassName('name', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CardValidationIcon fieldName="name" />
                      </div>
                    </div>
                  </div>

                  {/* Expiry and CVC Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        Expiry Date
                      </Label>
                      <div className="relative">
                        <Input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={handleCardInputChange}
                          onFocus={handleCardInputFocus}
                          className={getCardInputClassName('expiry', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                          maxLength={5}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CardValidationIcon fieldName="expiry" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <AlertCircle className="w-4 h-4 text-gray-500" />
                        CVC
                      </Label>
                      <div className="relative">
                        <Input
                          type="text"
                          name="cvc"
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={handleCardInputChange}
                          onFocus={handleCardInputFocus}
                          className={getCardInputClassName('cvc', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                          maxLength={4}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CardValidationIcon fieldName="cvc" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 rounded-lg border" style={{ backgroundColor: '#0fbab5', borderColor: '#0fbab5' }}>
                    <Info className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-white font-medium">
                        Secure Payment
                      </p>
                      <p className="text-white/90 mt-1">
                        Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Flight Details Drawer */}
      <Drawer open={isFlightModalOpen} onOpenChange={setIsFlightModalOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Flight Details
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Route Header */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {mockFlightData.route}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {mockFlightData.date}
              </p>
            </div>

            {/* Flight Timeline */}
            <div className="space-y-6">
              {/* Departure */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#EC5E39] rounded-full" />
                  <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {mockFlightData.departure.time}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Departure
                    </Badge>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {mockFlightData.departure.city}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mockFlightData.departure.airport}
                  </p>
                </div>
              </div>

              {/* Flight Info */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <Plane className="w-4 h-4 text-[#EC5E39]" />
                  <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">
                    {mockFlightData.layover.duration}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mockFlightData.layover.flight}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {mockFlightData.layover.operator}
                  </p>
                </div>
              </div>

              {/* Arrival */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#0ABAB5] rounded-full" />
                  <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {mockFlightData.arrival.time}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Arrival
                    </Badge>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {mockFlightData.arrival.city}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mockFlightData.arrival.airport}
                  </p>
                </div>
              </div>

              {/* Transit Info */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <Info className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">
                    {mockFlightData.transit.duration}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {mockFlightData.transit.airport}
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {mockFlightData.transit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Passenger Details Drawer */}
      <Drawer open={isPassengerModalOpen} onOpenChange={setIsPassengerModalOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Passenger Details
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          {/* Content */}
          <div className="p-4 space-y-4 overflow-y-auto">
            {/* Passenger Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0fbab5] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-3">
                {getPassengerInitials(getSelectedPassengerData())}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {getPassengerName(getSelectedPassengerData())}
              </h3>
              <Badge variant="secondary" className="text-xs">
                Passenger {mockPassengersData.findIndex(p => p.id === selectedPassenger) + 1}
              </Badge>
            </div>

            {/* Personal Information Card */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="w-4 h-4 text-[#EC5E39]" />
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">Personal Information</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Title & Name</label>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {getSelectedPassengerData().title} {getSelectedPassengerData().firstName} {getSelectedPassengerData().lastName}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatBirthDate(getSelectedPassengerData())}</p>
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Nationality</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getNationalityFlag(getSelectedPassengerData().nationality)}</span>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{getCountryName(getSelectedPassengerData().nationality)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passport Information Card */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-[#EC5E39]" />
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">Passport Details</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Passport Number</label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                      {getSelectedPassengerData().passportNumber}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Expiry Date</label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatPassportExpiry(getSelectedPassengerData())}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}