"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent } from './card'
import { Input } from './input'
import { Label } from './label'
import { Checkbox } from './checkbox'
import { Mail, Phone, Check, AlertCircle, ChevronDown, Search } from 'lucide-react'
import { isValidPhoneNumber, getCountryCallingCode, parsePhoneNumber, getExampleNumber } from 'libphonenumber-js'
import validator from 'validator'
import { useBooking } from '../../contexts/BookingContext'

interface ContactInformationProps {
  className?: string
}

interface ValidationState {
  isValid: boolean
  message: string
  type: 'success' | 'error' | 'idle'
}

interface CountryOption {
  code: string
  name: string
  flag: string
  callingCode: string
  exampleLength: number
}

// Полный список стран мира с флагами и кодами
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

export function ContactInformation({ className }: ContactInformationProps) {
  const { bookingState, updateContact } = useBooking()
  
  const [formData, setFormData] = useState({
    email: bookingState.contact?.email || '',
    mobilePhone: bookingState.contact?.phone || '',
    receiveOffers: false
  })

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(allCountries[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearchTerm, setCountrySearchTerm] = useState('')
  const [phoneDigitsOnly, setPhoneDigitsOnly] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [emailValidation, setEmailValidation] = useState<ValidationState>({
    isValid: false,
    message: '',
    type: 'idle'
  })

  const [phoneValidation, setPhoneValidation] = useState<ValidationState>({
    isValid: false,
    message: '',
    type: 'idle'
  })

  // Real-time email validation
  useEffect(() => {
    if (!formData.email) {
      setEmailValidation({ isValid: false, message: '', type: 'idle' })
      return
    }

    const validateEmail = () => {
      if (validator.isEmail(formData.email)) {
        const domain = formData.email.split('@')[1]
        const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'mail.ru', 'yandex.ru']
        
        if (commonDomains.includes(domain)) {
          setEmailValidation({ 
            isValid: true, 
            message: 'Valid email address', 
            type: 'success' 
          })
        } else {
          setEmailValidation({ 
            isValid: true, 
            message: 'Email format is valid', 
            type: 'success' 
          })
        }
      } else {
        if (!formData.email.includes('@')) {
          setEmailValidation({ 
            isValid: false, 
            message: 'Email must contain @ symbol', 
            type: 'error' 
          })
        } else if (formData.email.split('@').length > 2) {
          setEmailValidation({ 
            isValid: false, 
            message: 'Email contains too many @ symbols', 
            type: 'error' 
          })
        } else if (!formData.email.split('@')[1]) {
          setEmailValidation({ 
            isValid: false, 
            message: 'Email must have a domain', 
            type: 'error' 
          })
        } else {
          setEmailValidation({ 
            isValid: false, 
            message: 'Please enter a valid email address', 
            type: 'error' 
          })
        }
      }
    }

    const debounceTimer = setTimeout(validateEmail, 300)
    return () => clearTimeout(debounceTimer)
  }, [formData.email])

  // Real-time phone validation
  useEffect(() => {
    if (!phoneDigitsOnly) {
      setPhoneValidation({ isValid: false, message: '', type: 'idle' })
      return
    }

    const validatePhone = () => {
      try {
        const fullNumber = selectedCountry.callingCode + phoneDigitsOnly
        if (isValidPhoneNumber(fullNumber)) {
          setPhoneValidation({ 
            isValid: true, 
            message: 'Valid phone number', 
            type: 'success' 
          })
        } else {
          const expectedLength = selectedCountry.exampleLength
          if (phoneDigitsOnly.length < expectedLength) {
            setPhoneValidation({ 
              isValid: false, 
              message: `Enter ${expectedLength - phoneDigitsOnly.length} more digits`, 
              type: 'error' 
            })
          } else {
            setPhoneValidation({ 
              isValid: false, 
              message: 'Please enter a valid phone number', 
              type: 'error' 
            })
          }
        }
      } catch (error) {
        setPhoneValidation({ 
          isValid: false, 
          message: 'Invalid phone number format', 
          type: 'error' 
        })
      }
    }

    const debounceTimer = setTimeout(validatePhone, 300)
    return () => clearTimeout(debounceTimer)
  }, [phoneDigitsOnly, selectedCountry])

  // Synchronize with BookingContext when form data changes
  const syncContactData = useCallback(() => {
    if (emailValidation.isValid && phoneValidation.isValid) {
      updateContact({
        email: formData.email,
        phone: selectedCountry.callingCode + phoneDigitsOnly,
        countryCode: selectedCountry.code
      })
    }
  }, [formData.email, phoneDigitsOnly, selectedCountry.callingCode, selectedCountry.code, emailValidation.isValid, phoneValidation.isValid, updateContact])

  useEffect(() => {
    syncContactData()
  }, [syncContactData])

  // Обработчик кликов вне dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false)
        setCountrySearchTerm('')
      }
    }

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCountryDropdown])

  const handleEmailChange = (value: string) => {
    setFormData(prev => ({ ...prev, email: value }))
  }

  const handlePhoneChange = (value: string) => {
    // Убираем все кроме цифр
    const digitsOnly = value.replace(/\D/g, '')
    setPhoneDigitsOnly(digitsOnly)
    setFormData(prev => ({ ...prev, mobilePhone: selectedCountry.callingCode + digitsOnly }))
  }

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country)
    setShowCountryDropdown(false)
    // Пересчитываем номер с новым кодом страны
    if (phoneDigitsOnly) {
      setFormData(prev => ({ ...prev, mobilePhone: country.callingCode + phoneDigitsOnly }))
    }
  }

  const formatPhoneDisplay = (digits: string) => {
    if (!digits) return ''
    
    // Простое форматирование для отображения
    if (selectedCountry.code === 'US' || selectedCountry.code === 'CA') {
      // (XXX) XXX-XXXX
      if (digits.length >= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
      } else if (digits.length >= 3) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
      }
    }
    
    // Для других стран простое разделение пробелами
    return digits.replace(/(\d{3})/g, '$1 ').trim()
  }

  const getInputClassName = (validation: ValidationState, baseClass: string) => {
    const base = baseClass
    if (validation.type === 'success') {
      return `${base} border-green-500 focus:border-green-500 focus:ring-green-500/20`
    } else if (validation.type === 'error') {
      return `${base} border-red-500 focus:border-red-500 focus:ring-red-500/20`
    }
    return base
  }

  const ValidationIcon = ({ validation }: { validation: ValidationState }) => {
    if (validation.type === 'success') {
      return <Check className="w-4 h-4 text-green-500" />
    } else if (validation.type === 'error') {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  // Создаем индикатор прогресса ввода
  const renderPhoneProgress = () => {
    const expectedLength = selectedCountry.exampleLength
    const currentLength = phoneDigitsOnly.length
    const progress = Math.min((currentLength / expectedLength) * 100, 100)
    
    return (
      <div className="flex items-center gap-1 mt-1">
        <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              phoneValidation.type === 'success' ? 'bg-green-500' : 
              phoneValidation.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[60px]">
          {currentLength}/{expectedLength}
        </span>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-600 dark:text-white uppercase tracking-wide">
          CONTACT INFORMATION
        </h2>
        </div>
      
      <Card className="shadow-sm border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Contact Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Contact information required to receive the booking confirmation and E-Ticket, as well as flight change SMS notifications
            </p>
          </div>

          {/* Compact layout - inputs in one row on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Smart Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={getInputClassName(emailValidation, "w-full h-12 pr-10 transition-all duration-200 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700")}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ValidationIcon validation={emailValidation} />
                </div>
              </div>
              {emailValidation.message && (
                <div className={`text-xs flex items-center gap-1 transition-all duration-200 ${
                  emailValidation.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {emailValidation.message}
                </div>
              )}
            </div>

            {/* Smart Phone field with integrated country selector */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile Phone
              </Label>
              <div className="relative">
                <div className={getInputClassName(phoneValidation, "w-full h-12 transition-all duration-200 flex items-center border rounded-md bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700")}>
                  {/* Country selector inside input */}
                <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-l-xl transition-colors cursor-pointer"
                    >
                      <span className="text-lg">{selectedCountry.flag}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{selectedCountry.callingCode}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </button>
                    
                    {/* Country dropdown */}
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-hidden">
                        {/* Search input */}
                        <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              value={countrySearchTerm}
                              onChange={(e) => setCountrySearchTerm(e.target.value)}
                              placeholder="Search countries..."
                              className="w-full pl-10 pr-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC5E39] focus:border-transparent"
                              autoFocus
                            />
                          </div>
                        </div>
                        
                        {/* Countries list */}
                        <div className="overflow-y-auto max-h-48">
                          {allCountries
                            .filter(country => 
                              country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
                              country.callingCode.includes(countrySearchTerm)
                            )
                            .map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country)
                                setShowCountryDropdown(false)
                                setCountrySearchTerm('')
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left cursor-pointer"
                            >
                              <span className="text-lg">{country.flag}</span>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{country.name}</div>
                                <div className="text-xs text-gray-500">{country.callingCode}</div>
                              </div>
                            </button>
                          ))}
                          
                          {/* No results message */}
                          {allCountries.filter(country => 
                            country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
                            country.callingCode.includes(countrySearchTerm)
                          ).length === 0 && (
                            <div className="px-3 py-4 text-center text-sm text-gray-500">
                              No countries found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Separator */}
                  <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
                  
                  {/* Phone input */}
                  <input
                    type="tel"
                    value={formatPhoneDisplay(phoneDigitsOnly)}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="flex-1 px-3 py-2 bg-transparent border-none outline-none text-sm placeholder-gray-400 pr-10"
                    placeholder="Enter phone number"
                  />
                </div>
                
                {/* Validation icon positioned absolutely outside the input container */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ValidationIcon validation={phoneValidation} />
                </div>
                
                {/* Progress indicator */}
                {phoneDigitsOnly && renderPhoneProgress()}
                
                {/* Validation message */}
                {phoneValidation.message && (
                  <div className={`text-xs flex items-center gap-1 transition-all duration-200 ${
                    phoneValidation.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {phoneValidation.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkbox for offers */}
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="receiveOffers"
              checked={formData.receiveOffers}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, receiveOffers: checked as boolean }))}
              className="mt-1 data-[state=checked]:bg-[#EC5E39] data-[state=checked]:border-[#EC5E39]"
            />
            <Label 
              htmlFor="receiveOffers" 
              className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer leading-relaxed"
            >
              Send me special offers, travel deals and special discounts.
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}