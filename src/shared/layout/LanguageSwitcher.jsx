import { useLanguage, setLanguage } from '../i18n/language.js'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function LanguageSwitcher({display}) {
    const lang = useLanguage()

  const handleChange = (event) => {
    setLanguage(event.target.value);
  }
  return (
    <div className={`${display ? "block" : "hidden"} md:block`}>
            <FormControl
            variant='standard'
            sx={{
                color: 'white',
                background: 'transparent',
                border: 'none',
                m: 1,
                minWidth: 120,
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' }, 
                '&:hover:before': { borderBottom: 'none' }
            }}
            >
            <Select
                value={lang}
                onChange={handleChange}
                disableUnderline
                renderValue={(value) => {
                const flagSrc = {
                    AZE: 'https://new.parkcinema.az/icons/az-flag.svg',
                    EN: 'https://new.parkcinema.az/icons/en-flag.svg',
                    RU: 'https://new.parkcinema.az/icons/ru-flag.svg',
                }[value];

                return (
                    <div className="flex items-center gap-2">
                    <img src={flagSrc} alt={value} className="w-5 h-5" />
                    <span>{value}</span>
                    </div>
                );
                }}
                sx={{
                color: 'white',
                backgroundColor: 'transparent',
                '.MuiSelect-icon': {
                            color: 'white', 
                        },
                }}
            >
                <MenuItem value="AZE" className="flex items-center gap-2">
                <img src="https://new.parkcinema.az/icons/az-flag.svg" alt="" className="w-5 h-5" />
                <span>AZE</span>
                </MenuItem>
                <MenuItem value="EN" className="flex items-center gap-2">
                <img src="https://new.parkcinema.az/icons/en-flag.svg" alt="" className="w-5 h-5" />
                <span>EN</span>
                </MenuItem>
                <MenuItem value="RU" className="flex items-center gap-2">
                <img src="https://new.parkcinema.az/icons/ru-flag.svg" alt="" className="w-5 h-5" />
                <span>RU</span>
                </MenuItem>
            </Select>
            </FormControl>
            </div>
  )
}

export default LanguageSwitcher