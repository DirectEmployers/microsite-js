const config = {
    buids: [],
    source: "solr",
    filters:[
        {
            key: "militarybases",
            display: "Military Bases",
            name: "militarybases",
            solr_queries:{
                "Des Moines IAP": "location_exact:\"Des Moines, IA\"",
                "Forbes Field ANG": "location_exact:\"Topeka, KS\"",
                "Holston Army Ammunition Plant": "location_exact:\"Hawkins County, TN\"",
                "Holtville Carrier LS": "location_exact:\"Imerial County, CA\"",
                "Marine Corps Air Station Beaufort": "location_exact:\"Beaufort, SC\"",
                "NAVPMOSSP Magna Utah": "location_exact:\"West Valley City, UT\"",
                "NG Bergstrom - (Abia)": "location_exact:\"Austin, TX\"",
                "NG Helena Aviation RC- AASF- C12": "location_exact:\"Helena, MT\"",
                "NG Rio Rancho TS": "location_exact:\"Rio Rancho, NM\"",
                "Naval Base Kitsap – Keyport": "location_exact:\"Kitsap County, WA\"",
                "Runkle Stagefield AL": "location_exact:\"Coffee County, AL\"",
                "Syracuse MCRC": "location_exact:\"Syracuse, NY\"",
                "Volk ANGB": "location_exact:\"Volk Field, WI\""
            }
        }
    ]

}

module.exports = config
