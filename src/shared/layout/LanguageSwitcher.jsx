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
    <div className={`${display ? "block" : "hidden"} lg:block`}>
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
                    AZE: `${import.meta.env.BASE_URL}images/navigation/az-flag.svg`,
                    EN: `${import.meta.env.BASE_URL}images/navigation/en-flag.svg`,
                    RU: `${import.meta.env.BASE_URL}images/navigation/ru-flag.svg`,
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
                <img src={`${import.meta.env.BASE_URL}images/navigation/az-flag.svg`} alt="" className="w-5 h-5" />
                <span>AZE</span>
                </MenuItem>
                <MenuItem value="EN" className="flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}images/navigation/en-flag.svg`} alt="" className="w-5 h-5" />
                <span>EN</span>
                </MenuItem>
                <MenuItem value="RU" className="flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}images/navigation/ru-flag.svg`} alt="" className="w-5 h-5" />
                <span>RU</span>
                </MenuItem>
            </Select>
            </FormControl>
            </div>
  )
}

export default LanguageSwitcher
