'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { CheckCircle2, AlertCircle, User, Calendar, CreditCard, Plane, X, Check, Plus, Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { Label } from './label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from './drawer'
import { useBooking } from '@/contexts/BookingContext'

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

// Validation schema
// Enhanced validation schema with smart rules
const passengerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  gender: z.string().min(1, 'Gender is required'),
  firstName: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  birthDay: z.string().min(1, 'Day is required'),
  birthMonth: z.string().min(1, 'Month is required'),
  birthYear: z.string().min(1, 'Year is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  passportNumber: z.string()
    .min(1, 'Passport number is required')
    .min(6, 'Passport number must be at least 6 characters')
    .max(15, 'Passport number must be less than 15 characters')
    .regex(/^[A-Z0-9]+$/, 'Passport number can only contain uppercase letters and numbers'),
  expiryDay: z.string().min(1, 'Day is required'),
  expiryMonth: z.string().min(1, 'Month is required'),
  expiryYear: z.string().min(1, 'Year is required'),
  frequentFlyerNumber: z.string()
    .optional()
    .refine((value) => {
      if (!value || value === '') return true
      return /^[A-Z0-9]{6,15}$/.test(value)
    }, 'Frequent flyer number must be 6-15 characters with only letters and numbers'),
}).refine((data) => {
  // Validate birth date only if all fields are filled
  if (!data.birthDay || !data.birthMonth || !data.birthYear) return true
  
  const birthDate = new Date(parseInt(data.birthYear), parseInt(data.birthMonth) - 1, parseInt(data.birthDay))
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  return age >= 0 && age <= 120 && birthDate <= today
}, {
  message: 'Please enter a valid birth date',
  path: ['birthDay']
}).refine((data) => {
  // Validate expiry date only if all fields are filled
  if (!data.expiryDay || !data.expiryMonth || !data.expiryYear) return true
  
  const expiryDate = new Date(parseInt(data.expiryYear), parseInt(data.expiryMonth) - 1, parseInt(data.expiryDay))
  const today = new Date()
  return expiryDate > today
}, {
  message: 'Passport must not be expired',
  path: ['expiryDay']
})

type PassengerFormData = z.infer<typeof passengerSchema>

// Searchable Nationality Select Component
interface SearchableNationalitySelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

function SearchableNationalitySelect({ value, onChange, className }: SearchableNationalitySelectProps) {
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
          <span className="text-muted-foreground">Select nationality</span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-60 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
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
          <div className="max-h-48 overflow-y-auto">
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

interface PassengerDetailsProps {
  passengerNumber: number
}

export default function PassengerDetails({ passengerNumber }: PassengerDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasBeenOpened, setHasBeenOpened] = useState(false)
  const { bookingState, updatePassenger, getPassenger } = useBooking()

  // Get existing passenger data or use defaults
  const existingPassenger = getPassenger(passengerNumber)

  const { control, handleSubmit, watch, formState: { errors } } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      title: existingPassenger?.title || '',
      gender: existingPassenger?.gender || '',
      firstName: existingPassenger?.firstName || '',
      lastName: existingPassenger?.lastName || '',
      birthDay: existingPassenger?.birthDay || '',
      birthMonth: existingPassenger?.birthMonth || '',
      birthYear: existingPassenger?.birthYear || '',
      nationality: existingPassenger?.nationality || '',
      passportNumber: existingPassenger?.passportNumber || '',
      expiryDay: existingPassenger?.expiryDay || '',
      expiryMonth: existingPassenger?.expiryMonth || '',
      expiryYear: existingPassenger?.expiryYear || '',
      frequentFlyerNumber: existingPassenger?.frequentFlyerNumber || '',
    },
    mode: 'onChange'
  })

  useEffect(() => {
    if (isModalOpen && !hasBeenOpened) {
      setHasBeenOpened(true)
    }
  }, [isModalOpen, hasBeenOpened])

  // Handle keyboard navigation and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      // Block body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      document.addEventListener('keydown', handleKeyDown)
      // Focus the first input when modal opens
      setTimeout(() => {
        const firstInput = document.querySelector('input, select') as HTMLElement
        firstInput?.focus()
      }, 100)
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Ensure body scroll is restored on cleanup
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  // Smart input formatting functions
  const formatPassportNumber = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  }

  const formatName = (value: string) => {
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/[^a-zA-Z\s'-]/g, '')
  }

  const formatFrequentFlyerNumber = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  }

  // Get field validation state
  const getFieldValidationState = (fieldName: keyof PassengerFormData) => {
    const value = watch(fieldName)
    const error = errors[fieldName]
    
    if (error) return 'error'
    if (value && value !== '') return 'success'
    return 'default'
  }

  // Enhanced validation icon with animations - redesigned for internal placement
  const ValidationIcon = ({ fieldName }: { fieldName: keyof PassengerFormData }) => {
    const validation = getFieldValidationState(fieldName)
    
    if (validation === 'success') {
      return <Check className="w-4 h-4 text-green-500" />
    } else if (validation === 'error') {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  // Error message component
  const ErrorMessage = ({ fieldName }: { fieldName: keyof PassengerFormData }) => {
    const error = errors[fieldName]
    
    if (!error) return null
    
    return (
      <div className="animate-in slide-in-from-top-1 duration-300 mt-1">
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error.message}
        </p>
      </div>
    )
  }

  // Enhanced input styling function with modern 2025 design
  const getInputClassName = (fieldName: keyof PassengerFormData, baseClass: string = '') => {
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

  // Get empty fields count for progress tracking
  const getEmptyFieldsCount = () => {
    const values = watch()
    const requiredFields: (keyof PassengerFormData)[] = [
      'title', 'gender', 'firstName', 'lastName', 'birthDay', 'birthMonth', 'birthYear',
      'nationality', 'passportNumber', 'expiryDay', 'expiryMonth', 'expiryYear'
    ]
    return requiredFields.filter(field => !values[field] || values[field] === '').length
  }

  // Check if form is complete
  const isFormComplete = () => {
    return getEmptyFieldsCount() === 0
  }

  // Get passenger name for display
  const getPassengerName = () => {
    const values = watch()
    if (values.firstName && values.lastName) {
      return `${values.firstName} ${values.lastName}`
    }
    return 'Adult Passenger'
  }

  // Get passenger initials
  const getPassengerInitials = () => {
    const values = watch()
    if (values.firstName && values.lastName) {
      return `${values.firstName[0]}${values.lastName[0]}`
    }
    return 'AP'
  }

  // Handle form submission
  const onSubmit = (data: PassengerFormData) => {
    console.log('Passenger data:', data)
    
    // Save passenger data to global state
    updatePassenger(passengerNumber, {
      id: passengerNumber,
      ...data
    })
    
    // Add a small delay to show the success state
    setTimeout(() => {
      setIsModalOpen(false)
    }, 500)
  }

  const emptyFieldsCount = getEmptyFieldsCount()
  const totalRequiredFields = 12

  return (
    <>
      {/* Passenger card */}
      <div 
        className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:border-[#EC5E39] hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Background gradient effect - removed */}
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#0fbab5] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {getPassengerInitials()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#EC5E39] transition-colors duration-300">
                  {getPassengerName()}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Passenger {passengerNumber}
                </p>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center space-x-2">
              {isFormComplete() ? (
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Complete</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {emptyFieldsCount} field{emptyFieldsCount !== 1 ? 's' : ''} remaining
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {totalRequiredFields - emptyFieldsCount}/{totalRequiredFields}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${((totalRequiredFields - emptyFieldsCount) / totalRequiredFields) * 100}%`,
                  backgroundColor: '#0abab5'
                }}
              />
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {hasBeenOpened ? 'Click to edit details' : 'Click to add passenger details'}
            </div>
            <div className="flex items-center text-[#0fbab5] group-hover:translate-x-1 transition-transform duration-300">
              <span className="text-sm font-medium mr-1">
                {isFormComplete() ? 'Edit' : 'Add Details'}
              </span>
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Adult Passenger Details
                </DrawerTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Please fill in all required information
                </p>
                </div>
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
          <div className="overflow-y-auto flex-1">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="space-y-6">
                {/* Title and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</Label>
                    <div className="relative">
                      <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={getInputClassName('title', 'h-12 text-base')}>
                              <SelectValue placeholder="Select title" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
                              <SelectItem value="Mr" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Mr</SelectItem>
                              <SelectItem value="Mrs" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Mrs</SelectItem>
                              <SelectItem value="Ms" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Ms</SelectItem>
                              <SelectItem value="Miss" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Miss</SelectItem>
                              <SelectItem value="Dr" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Dr</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ValidationIcon fieldName="title" />
                      </div>
                    </div>
                    <ErrorMessage fieldName="title" />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</Label>
                    <div className="relative">
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={getInputClassName('gender', 'h-12 text-base')}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
                              <SelectItem value="Male" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Male</SelectItem>
                              <SelectItem value="Female" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Female</SelectItem>
                              <SelectItem value="Other" className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ValidationIcon fieldName="gender" />
                      </div>
                    </div>
                    <ErrorMessage fieldName="gender" />
                  </div>
                </div>

                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</Label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Enter first name"
                            className={getInputClassName('firstName', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <ValidationIcon fieldName="firstName" />
                          </div>
                        </div>
                      )}
                    />
                    <ErrorMessage fieldName="firstName" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</Label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Enter last name"
                            className={getInputClassName('lastName', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <ValidationIcon fieldName="lastName" />
                          </div>
                        </div>
                      )}
                    />
                    <ErrorMessage fieldName="lastName" />
                  </div>
                </div>

                {/* Date of birth */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <Controller
                        name="birthDay"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={getInputClassName('birthDay', 'h-12 text-base')}>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ValidationIcon fieldName="birthDay" />
                      </div>
                    </div>
                    <div className="relative">
                      <Controller
                        name="birthMonth"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={getInputClassName('birthMonth', 'h-12 text-base')}>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                'January', 'February', 'March', 'April', 'May', 'June',
                                'July', 'August', 'September', 'October', 'November', 'December'
                              ].map((month, index) => (
                                <SelectItem key={index + 1} value={(index + 1).toString()}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ValidationIcon fieldName="birthMonth" />
                      </div>
                    </div>
                    <div className="relative">
                      <Controller
                        name="birthYear"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={getInputClassName('birthYear', 'h-12 text-base')}>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ValidationIcon fieldName="birthYear" />
                      </div>
                    </div>
                  </div>
                  <ErrorMessage fieldName="birthDay" />
                  <ErrorMessage fieldName="birthMonth" />
                  <ErrorMessage fieldName="birthYear" />
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nationality</Label>
                  <div className="relative">
                    <Controller
                      name="nationality"
                      control={control}
                      render={({ field }) => (
                        <SearchableNationalitySelect 
                          value={field.value} 
                          onChange={field.onChange}
                          className={getInputClassName('nationality', 'h-12 text-base')}
                        />
                      )}
                    />
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ValidationIcon fieldName="nationality" />
                    </div>
                  </div>
                  <ErrorMessage fieldName="nationality" />
                </div>

                {/* Passport details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Passport Details
                  </h3>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Passport Number</Label>
                    <Controller
                      name="passportNumber"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Enter passport number"
                            className={getInputClassName('passportNumber', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <ValidationIcon fieldName="passportNumber" />
                          </div>
                        </div>
                      )}
                    />
                    <ErrorMessage fieldName="passportNumber" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="relative">
                        <Controller
                          name="expiryDay"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={getInputClassName('expiryDay', 'h-12 text-base')}>
                                <SelectValue placeholder="Day" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                  <SelectItem key={day} value={day.toString()}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ValidationIcon fieldName="expiryDay" />
                        </div>
                      </div>
                      <div className="relative">
                        <Controller
                          name="expiryMonth"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={getInputClassName('expiryMonth', 'h-12 text-base')}>
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  'January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'
                                ].map((month, index) => (
                                  <SelectItem key={index + 1} value={(index + 1).toString()}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ValidationIcon fieldName="expiryMonth" />
                        </div>
                      </div>
                      <div className="relative">
                        <Controller
                          name="expiryYear"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={getInputClassName('expiryYear', 'h-12 text-base')}>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ValidationIcon fieldName="expiryYear" />
                        </div>
                      </div>
                    </div>
                    <ErrorMessage fieldName="expiryDay" />
                    <ErrorMessage fieldName="expiryMonth" />
                    <ErrorMessage fieldName="expiryYear" />
                  </div>
                </div>

                {/* Additional information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Additional Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Frequent Flyer Number (Optional)</Label>
                    <Controller
                      name="frequentFlyerNumber"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Enter frequent flyer number"
                            className={getInputClassName('frequentFlyerNumber', 'h-12 text-base pr-12 placeholder:text-gray-400')}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <ValidationIcon fieldName="frequentFlyerNumber" />
                          </div>
                        </div>
                      )}
                    />
                    <ErrorMessage fieldName="frequentFlyerNumber" />
                  </div>
                </div>

                {/* Save Button - Sticky at bottom */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 mt-6">
                  <Button
                    type="submit"
                    className={cn(
                      "w-full py-3 text-base font-semibold transition-all duration-300",
                      isFormComplete() 
                        ? "bg-[#EC5E39] hover:bg-[#d54e2a] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    )}
                    disabled={!isFormComplete()}
                  >
                    <div className="flex items-center justify-center">
                      <span>Save Passenger Details</span>
                      {isFormComplete() && (
                        <Check className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                      )}
                    </div>
                  </Button>
                  
                  {/* Progress indicator */}
                  {!isFormComplete() && (
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete {emptyFieldsCount} more field{emptyFieldsCount !== 1 ? 's' : ''} to continue
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}