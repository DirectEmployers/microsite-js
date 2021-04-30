import {trim, trimEnd, pick} from "lodash"
import {blank} from "./helpers"

export let states = {
    AK: "Alaska",
    AL: "Alabama",
    AZ: "Arizona",
    AR: "Arkansas",
    AA: "Armed Forces Americas",
    AE: "Armed Forces Others",
    AP: "Armed Forces Pacific",
    AS: "American Samoa",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DC: "District Of Columbia",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    GU: "Guam",
    HI: "Hawaii",
    IA: "Iowa",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    MA: "Massachusetts",
    MD: "Maryland",
    ME: "Maine",
    MI: "Michigan",
    MN: "Minnesota",
    MO: "Missouri",
    MS: "Mississippi",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    MP: "Northern Mariana Islands",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    PR: "Puerto Rico",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UM: "United States Minor Outlying Islands",
    UT: "Utah",
    VA: "Virginia",
    VI: "Virgin Islands",
    VT: "Vermont",
    WA: "Washington",
    WI: "Wisconsin",
    WV: "West Virginia",
    WY: "Wyoming",
}

export let provinces = {
    AB: "Alberta",
    BC: "British Columbia",
    MB: "Manitoba",
    NB: "New Brunswick",
    NL: "Newfoundland",
    NW: "Northwest Territories",
    NS: "Nova Scotia",
    NU: "Territory of Nunavut",
    ON: "Ontario",
    PE: "Prince Edward Island",
    QC: "Quebec",
    SK: "Saskatchewan",
    YT: "Yukon Territory",
}

export let countries = {
    ABW: "Aruba",
    AFG: "Afghanistan",
    AGO: "Angola",
    AIA: "Anguilla",
    ALB: "Albania",
    AND: "Andorra",
    ARE: "United Arab Emirates",
    ARG: "Argentina",
    ARM: "Armenia",
    ASI: "Multiple Asian Countries",
    ASM: "American Samoa",
    ATA: "Antartica",
    ATG: "Antigua and Barbuda",
    AUS: "Australia",
    AUT: "Austria",
    AZE: "Azerbaijan",
    BDI: "Burundi",
    BEL: "Belgium",
    BEN: "Benin",
    BFA: "Burkina Faso",
    BGD: "Bangladesh",
    BGR: "Bulgaria",
    BHR: "Bahrain",
    BHS: "Bahamas",
    BIH: "Bosnia",
    BLR: "Belarus",
    BLZ: "Belize",
    BMU: "Bermuda",
    BOL: "Bolivia",
    BRA: "Brazil",
    BRB: "Barbados",
    BRN: "Brunei Darussalam",
    BTN: "Bhutan",
    BWA: "Botswana",
    CAF: "Central African Republic",
    CAN: "Canada",
    CHE: "Switzerland",
    CHL: "Chile",
    CHN: "China",
    CIV: "Cote D'Ivoire",
    CMR: "Cameroon",
    COD: "Congo (The Democratic Republic of the)",
    COG: "Congo",
    COK: "Cook Islands",
    COL: "Colombia",
    COM: "Comoros",
    CPV: "Cape Verde",
    CRI: "Costa Rica",
    CUB: "Cuba",
    CYM: "Cayman Islands",
    CYP: "Cyprus",
    CZE: "Czech Republic",
    DEU: "Germany",
    DJI: "Djibouti",
    DMA: "Dominica",
    DNK: "Denmark",
    DOM: "Dominican Republic",
    DZA: "Algeria",
    ECU: "Ecuador",
    EGY: "Egypt",
    ERI: "Eritrea",
    ESH: "Western Sahara",
    ESP: "Spain",
    EST: "Estonia",
    ETH: "Ethiopia",
    ETM: "East Timor",
    EUR: "Multiple European Countries",
    FIN: "Finland",
    FJI: "Fiji",
    FLK: "Falkland Islands",
    FRA: "France",
    FRO: "Faroe Islands",
    FSM: "Micronesia",
    GAB: "Gabon",
    GBR: "United Kingdom",
    GEO: "Georgia",
    GHA: "Ghana",
    GIB: "Gibraltar",
    GIN: "Guinea",
    GLP: "Guadeloupe",
    GMB: "Gambia",
    GNB: "Guinea-bissau",
    GNQ: "Equatorial Guinea",
    GRC: "Greece",
    GRD: "Grenada",
    GRL: "Greenland",
    GTM: "Guatemala",
    GUF: "French Guiana",
    GUY: "Guyana",
    HKG: "Hong Kong",
    HND: "Honduras",
    HRV: "Croatia",
    HTI: "Haiti",
    HUN: "Hungary",
    IDN: "Indonesia",
    IND: "India",
    IRL: "Ireland",
    IRN: "Iran",
    IRQ: "Iraq",
    ISL: "Iceland",
    ISR: "Israel",
    ITA: "Italy",
    JAM: "Jamaica",
    JOR: "Jordan",
    JPN: "Japan",
    KAZ: "Kazakhstan",
    KEN: "Kenya",
    KGZ: "Kyrgyzstan",
    KHM: "Cambodia",
    KNA: "Saint Kitts and Nevis",
    KOR: "South Korea",
    KWT: "Kuwait",
    LAO: "Laos",
    LBN: "Lebanon",
    LBR: "Liberia",
    LBY: "Libyan Arab Jamahiriya",
    LIE: "Liechtenstein",
    LKA: "Sri Lanka",
    LSO: "Lesotho",
    LTU: "Lithuania",
    LUX: "Luxembourg ",
    LVA: "Latvia",
    MAC: "Macau",
    MAR: "Morocco",
    MCO: "Monaco",
    MDA: "Moldova",
    MDG: "Madagascar",
    MDV: "Maldives",
    MEX: "Mexico",
    MHL: "Marshall Islands",
    MKD: "Macedonia",
    MLI: "Mali",
    MLT: "Malta",
    MMR: "Myanmar",
    MNG: "Mongolia",
    MNP: "Northern Mariana Islands",
    MOZ: "Mozambique",
    MRT: "Mauritania",
    MSR: "Montserrat",
    MTQ: "Martinique",
    MUS: "Mauritius",
    MWI: "Malawi",
    MYS: "Malaysia",
    NAM: "Namibia",
    NER: "Niger",
    NGA: "Nigeria",
    NIC: "Nicaragua",
    NLD: "Netherlands",
    NOR: "Norway",
    NPL: "Nepal",
    NZL: "New Zealand",
    OMN: "Oman",
    PAK: "Pakistan",
    PAL: "Palestine",
    PAN: "Panama",
    PER: "Peru",
    PHL: "Philippines",
    PLW: "Palau",
    PNG: "Papua New Guinea",
    POL: "Poland",
    PRK: "North Korea",
    PRT: "Portugal",
    PRY: "Paraguay",
    PYF: "French Polynesia",
    QAT: "Qatar",
    REU: "Reunion Island",
    ROM: "Romania",
    RUS: "Russia",
    RWA: "Rwanda",
    SAU: "Saudi Arabia",
    SCG: "Serbia and Montenegro",
    SDN: "Sudan",
    SEN: "Senegal",
    SGP: "Singapore",
    SLE: "Sierra Leone",
    SLV: "El Salvador",
    SMR: "San Marino",
    SOM: "Somalia",
    STP: "Sao Tome and Principe",
    SUR: "Suriname",
    SVK: "Slovak Republic",
    SVN: "Slovenia",
    SWE: "Sweden",
    SWZ: "Swaziland",
    SYC: "Seychelles",
    SYR: "Syria",
    TCA: "Turks and Caicos Islands",
    TCD: "Chad",
    TGO: "Togo",
    THA: "Thailand",
    TJK: "Tajikistan",
    TKM: "Turkmenistan",
    TTO: "Trinidad and Tobago",
    TUN: "Tunisia",
    TUR: "Turkey",
    TUV: "Tuvalu",
    TWN: "Taiwan",
    TZA: "Tanzania",
    UGA: "Uganda",
    UKR: "Ukraine",
    UMI: "US Minor Outlying Islands",
    URY: "Uruguay",
    USA: "United States",
    UZB: "Uzbekistan",
    VAT: "The Vatican",
    VEN: "Venezuela",
    VGB: "Virgin Islands (British)",
    VIR: "Virgin Islands (US)",
    VNM: "Vietnam",
    WSM: "Samoa",
    YEM: "Yemen",
    YUG: "Yugoslavia",
    ZAF: "South Africa",
    ZMB: "Zambia",
    ZWE: "Zimbabwe",
}

/**
 * Remove country abbreviation from end of given value.
 */
export function removeCountry(value, only = ["USA", "CAN"]) {
    if (blank(value)) {
        return value
    }
    let i
    let keys = Object.keys(pick(countries, only))
    let total = keys.length
    let result = trim(value.toString())

    for (i = 0; i < total; i++) {
        if (result.endsWith(keys[i])) {
            result = trimEnd(result, keys[i])
            break
        }
    }
    return trimEnd(trim(result), ",")
}

/**
 * Remove state abbreviation from end of given value.
 */
export function removeState(value) {
    if (blank(value)) {
        return value
    }
    let i
    let keys = Object.keys(states)
    let total = keys.length
    let result = trim(value.toString())

    for (i = 0; i < total; i++) {
        if (result.endsWith(keys[i])) {
            result = trimEnd(result, keys[i])
            break
        }
    }
    return trimEnd(trim(result), ",")
}

/**
 * Expand a code value to full state name.
 */
export function fullState(code) {
    if (blank(code)) {
        return code
    }
    let result = trim(code.toString())

    if (Object.prototype.hasOwnProperty.call(states, result.toUpperCase())) {
        return states[result.toUpperCase()]
    }

    if (Object.prototype.hasOwnProperty.call(provinces, result.toUpperCase())) {
        return provinces[result.toUpperCase()]
    }

    return result
}

/**
 * Return true if the given value is a code that exists in ONE of
 * the location objects at the top of this module.
 */
export function isLocationCode(code) {
    let result = trim(code.toString())

    if (Object.prototype.hasOwnProperty.call(states, result.toUpperCase())) {
        return true
    }

    if (Object.prototype.hasOwnProperty.call(provinces, result.toUpperCase())) {
        return true
    }
    if (Object.prototype.hasOwnProperty.call(countries, result.toUpperCase())) {
        return true
    }

    return false
}
