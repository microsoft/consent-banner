// culture can be just language "en" or language-country "en-us". 
// Based on language RTL should be applied (https://www.w3.org/International/questions/qa-scripts.en)
// Locale IDs are from
// https://help.bing.microsoft.com/#apex/18/en-US/10004/-1
// https://docs.microsoft.com/en-us/openspecs/office_standards/ms-oe376/6c085406-a698-4e12-9d4d-c3b0ee3dbc4a
export enum rtlLanguage {
    ar = 'rtl',
    he = 'rtl',
    ps = 'rtl',
    ur = 'rtl',
    fa = 'rtl',
    pa = 'rtl',
    sd = 'rtl',
    tk = 'rtl',
    ug = 'rtl',
    yi = 'rtl',
    syr = 'rtl',
    'ks-arab' = 'rtl'     // Kashmiri (Arabic) is rtl
};
