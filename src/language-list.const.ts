// culture can be just language "en" or language-country "en-us". 
// Based on language RTL should be applied (https://www.w3.org/International/questions/qa-scripts.en)
// Language list is from
// https://help.bing.microsoft.com/#apex/18/en-US/10004/-1
export enum languageDirection {
    'ar-XA' = 'rtl',
    bg = 'ltr',
    hr = 'ltr',
    cs = 'ltr',
    da = 'ltr',
    de = 'ltr',
    el = 'ltr',
    en = 'ltr',
    et = 'ltr',
    es = 'ltr',
    fi = 'ltr',
    fr = 'ltr',
    ga = 'ltr',
    hi = 'ltr',
    hu = 'ltr',
    he = 'rtl',
    it = 'ltr',
    ja = 'ltr',
    ko = 'ltr',
    lv = 'ltr',
    lt = 'ltr',
    nl = 'ltr',
    no = 'ltr',
    pl = 'ltr',
    pt = 'ltr',
    sv = 'ltr',
    ro = 'ltr',
    ru = 'ltr',
    'sr-CS' = 'ltr',
    sk = 'ltr',
    sl = 'ltr',
    th = 'ltr',
    tr = 'ltr',
    'uk-UA' = 'ltr',
    'zh-chs' = 'ltr',
    'zh-cht' = 'ltr'
};

export enum languageCountryDirection {
    'ar-sa' = 'rtl',
    'en-us' = 'ltr',
};