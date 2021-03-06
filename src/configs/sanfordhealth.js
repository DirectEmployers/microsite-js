const config = {
    buids: [19424],
    source: "solr", //solr or google-talent
    s3Folder: "sanfordhealth-jobs",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: "61b075f6-ccba-42da-9584-160278788e97",
    company_uuids: [
        "c5cd7a5b-92cf-4460-b73a-196df6723431",
        "5f967c05-cf6c-4010-9824-0fbb0b3fdbb8",
        "05156208-9e91-4d1f-bffb-58c5a3de4298",
    ],
    client_events: true, // Should be extracted to a separate config at some point
    num_items: 2,
    // featured_jobs: {
    //     num_items: 10, //number of items per page.
    //     solr: "reqid:(" + ["R-33091", "R-25218"].join(" OR ") + ")",
    // },
    // force_filters: {
    //     solr:"title_exact:*Sales* OR title_exact:*Retail*"
    // },
    filters: [
        // {
        //     name: "moc",
        //     display: "MOC",
        // },
        // {
        //     name: "company",
        //     display: "Company",
        //     key: {
        //         solr: "company",
        //         google_talent: "employer"
        //     }
        // },
        {
            name: "jobfunction",
            key: "jobfunction",
            display: "Job Functions",
            solr_queries: {
                // "Sanford Health - Nursing Jobs": "text:\"Job Function: Nursing\" OR \"Job Title: Senior Clinical Informatics Analyst, RN\" OR title:\"student nurse\" OR text:\"#nursingcareers\"",
                "Corporate and Business Services":
                    'text:"Job Function: Administrative Support" OR "Job Function: External Affairs" OR "Job Function: Finance" OR "Job Function: General Administration" OR "Job Function: Human Resources" OR "Job Function: Legal and Compliance" OR "Job Function: Marketing and Communications" OR "Job Function: Quality and Risk Management" OR "Job Function: Employee and Occupational Health" OR "Job Function: Corporate Services" OR "Job Function: Financial Services" OR "Job Function: Health Services and Clinic Administrative Leadership" OR "Job Function: Legal & Compliance"  OR "Job Function: Sales, Marketing & Communications" OR "Job Function: Revenue Cycle" OR "Job Function: Sales Marketing and Communications"',
                "Customer Service":
                    'text:("Job Function: Customer Support Services" OR "Job Function: Customer Service")',
                "Health Plan": 'text:"Job Function: Health Plan"',
                "Health Services & Clinic Administration":
                    'text:"Job Function: Health Services & Clinic Administration"',
                "Quality & Risk Management":
                    'text:"Job Function: Quality & Risk Management"',
                "Research": 'text:"Job Function: Research"',
                "Nursing": 'text:"Job Function: Nursing"',
                "Profile": 'text:"Job Function: Profile" OR title:"Profile"',
                "Advanced Practice Provider":
                    'text:"Job Function: Advanced Practice Provider"',
                "Children":
                    'text:"Job Function: Nursing" AND title:("Child" OR "Pediatric" OR "Peds," OR "PICU" OR "NICU")',
                "Clinic Ambulatory Care":
                    'text:"Job Function: Nursing" AND title:"Clinic" OR "Ambulatory"',
                "Critical Care":
                    'text:"Job Function: Nursing" AND title:("Critical" OR "Critical Care" OR "ICU" OR "Emergency" OR "PICU" OR "NICU" OR "cath lab" OR "PACU" OR "Day Unit" OR "Admissions/recovery unit" OR "endoscopy" OR "CCU")',
                "LPN": 'text:"Job Function: Nursing" AND title:"LPN"',
                "Medical Surgical":
                    'text:"Job Function: Nursing" AND title:("Medical Surgical" OR "Medical/Surgical" OR "Dialysis" OR "Clinical Decision Unit" OR "Neuro/surgical" OR "Cardiac Care" OR "Medical Specialty" OR "Oncology" OR "Palliative Care" OR "Orthopedics/Surgical" OR "Rehab" OR "Resource Team" OR "Med/Surg/Ortho" OR "In Patient Rehab" OR "General Med Routine")',
                "Nursing Assistant":
                    'text:"Job Function: Nursing" AND title:("Nursing Assistant" OR "CNA" OR "Patient Care Technician" OR "Nursing Assistant Certified" OR "Certified Nursing Assistant")',
                "Nursing Leadership":
                    'text:("Job Function: Nursing") AND title:("Supervisor" OR "Manager" OR "Director" OR "Vice President" OR "Nursing and Clinical Services Leader") NOT title:("Clinical Care Leader" OR "Case Manager")',
                "Operating Room Interventional":
                    'text:"Job Function: Nursing" AND title:("Operating Room" OR "Surgery" OR "Pre-Experience recovery" OR "PACU" OR "Anesthesia" OR "Interventional" OR "cath lab" OR "PACU" OR "Day Unit" OR "admissions/recovery unit" OR "endoscopy")',
                "Women":
                    'text:"Job Function: Nursing" AND text:("Women" OR "OB/GYN" OR "Birth")',
                "Behavioral Health":
                    'text:"Job Function: Nursing" AND title:("Behavioral" OR "Psych")',
                "Womens and Childrens":
                    'text:"Job Function: Nursing" AND text:("Women" OR "OB/GYN" OR "Birth" OR "Child" OR "Pediatric" OR "Peds" OR "PICU" OR "NICU")',
                "Profile Jobs":
                    'text:"Job Function: Profile" OR title:"Profile"',
                "Allied Health":
                    'text:"Job Function: Allied Health" OR "Job Function: Clinical Care" OR "Job Function: Clinical Support" OR "Job Function: Community Services"',
                "Behavioral Health and Dependency":
                    'text:"Job Function: Behavioral Health and Dependency" OR "Job Function: Care Coordination"',
                "Leadership":
                    'text:"Job Function: Leadership" OR "Job Function: Executive"',
                // "Leadership": '(text:("Job Function: Leadership" OR "Job Function: Executive")) OR (title:("Director" OR "Executive" OR "Vice President" OR "CEO" OR "COO" OR "Chief" OR "Controller" OR "Head" OR "Leader" OR "Consultant" OR "Administrator")) AND -title:"Intern" AND -title:"Administrative Assistant" AND -title:"Lactation Consultant" AND -title:"Database Administrator" AND -title:"Patient Access Representative" AND -title:"Grants Administrator" AND -title:"Senior Compensation Analyst" AND -title:"Inventory Control Assistant" AND -title:"Inventory Control Specialist" AND -title:"Administrative Aide" AND -title:"Radiology Technologist" AND -title:"Senior Server Administrator" AND -title:"Patient Access Specialist" AND -title:"Executive Assistant"',
                "Emergency Medical Services":
                    'text:"Job Function: Emergency Medical Services"',
                "Facilities and Support Services":
                    'text:"Job Function: Facilities and General Services" OR text:"Job Function: Public Safety" OR text:"Job Function: Facilities" OR text:"Job Function: Operations"',
                "Sports Medicine and Wellness":
                    'text:"Job Function: Sports Medicine and Wellness"',
                "Student Services": 'text:"Job Function: Student Services"',
                "RN":
                    '(text:"Job Function: Nursing" AND title:("RN" OR "Registered Nurse")) OR text:"#nursingcareers"',
                "IT - Technology Solutions":
                    'text:"Job Function: Information Technology" OR "Job Function: Data Analytics"',
            },
        },
        {
            name: "schedule",
            key: "schedule",
            display: "Job Schedule",
            solr_queries: {
                "Full-Time": 'text:"Job Schedule: Full-Time"',
                "PRN": 'text:"Job Schedule: PRN"',
                "Part-Time": 'text:"Job Schedule: Part-Time"',
                "Flex": 'text:"Flex"',
            },
        },
        {
            name: "shift",
            display: "Shift",
            solr_queries: {
                Varies: 'text:"Varies"',
                Day: 'text:"Day"',
                Rotating: 'text:"Rotating"',
                Evenings: 'text:"Shift: Evening" OR "- Evening Shift"',
            },
        },
        {
            name: "facility",
            key: "facility",
            display: "Facility",
            solr_queries: {
                "10th & Phillips": 'text:"Facility: 10th & Phillips"',
                "1115 W 41st Child Services":
                    'text:"Facility: 1115 W 41st Child Services"',
                "12th & Kiwanis - HME Huron":
                    'text:"Facility: 12th & Kiwanis - HME Huron"',
                "1711 University Building":
                    'text:"Facility: 1711 University Building"',
                "1717 University Building Clinic":
                    'text:"Facility: 1717 University Building Clinic"',
                "19th & Minnesota Transporation Building":
                    'text:"Facility: 19th & Minnesota Transporation Building"',
                "26th & Sycamore Clinic":
                    'text:"Facility: 26th & Sycamore Clinic"',
                "2801 University Building Clinic":
                    'text:"Facility: 2801 University Building Clinic"',
                "32nd & Ellis Clinic": 'text:"Facility: 32nd & Ellis Clinic"',
                "34th & Kiwanis Clinic":
                    'text:"Facility: 34th & Kiwanis Clinic"',
                "45th St Business Center - IT":
                    'text:"Facility: 45th St Business Center - IT"',
                "45th St Business Center - PFS":
                    'text:"Facility: 45th St Business Center - PFS"',
                "49th & Oxbow Clinic": 'text:"Facility: 49th & Oxbow Clinic"',
                "4th & Sycamore Clinic":
                    'text:"Facility: 4th & Sycamore Clinic"',
                "501 Place Building": 'text:"Facility: 501 Place Building"',
                "69th & Louise Clinic": 'text:"Facility: 69th & Louise Clinic"',
                "69th & Minnesota Clinic":
                    'text:"Facility: 69th & Minnesota Clinic"',
                "700 Building Clinic": 'text:"Facility: 700 Building Clinic"',
                "700 Building Clinic": 'text:"Facility: 700 Building Clinic"',
                "7th & Rosser Clinic": 'text:"Facility: 7th & Rosser Clinic"',
                "7th & Thayer Clinic": 'text:"Facility: 7th & Thayer Clinic"',
                "Aberdeen Clinic": 'text:"Facility: Aberdeen Clinic"',
                "Aberdeen Medical Center":
                    'text:"Facility: Aberdeen Medical Center"',
                "Acute Care Sports Complex":
                    'text:"Facility: Acute Care Sports Complex"',
                "Airport Hangar": 'text:"Facility: Airport Hangar"',
                "Alexandria Broadway Clinic":
                    'text:"Facility: Alexandria Broadway Clinic"',
                "Ann Berdahl Hall Building":
                    'text:"Facility: Ann Berdahl Hall Building"',
                "Annex Building": 'text:"Facility: Annex Building"',
                "Ava\\'s House Building":
                    'text:"Facility: Ava\'s House Building"',
                "Bagley Clinic": 'text:"Facility: Bagley Clinic"',
                "Bagley Medical Center":
                    'text:"Facility: Bagley Medical Center"',
                "Bank Of The West Building":
                    'text:"Facility: Bank Of The West Building"',
                "Bemidji 1611 Clinic": 'text:"Facility: Bemidji 1611 Clinic"',
                "Bemidji Dialysis": 'text:"Facility: Bemidji Dialysis"',
                "Bemidji East Clinic": 'text:"Facility: Bemidji East Clinic"',
                "Bemidji East It Building":
                    'text:"Facility: Bemidji East It Building"',
                "Bemidji Main Clinic": 'text:"Facility: Bemidji Main Clinic"',
                "Bemidji Medical Center":
                    'text:"Facility: Bemidji Medical Center"',
                "Bemidji Occupational Medicine":
                    'text:"Facility: Bemidji Occupational Medicine"',
                "Bemidji Profile": 'text:"Facility: Bemidji Profile"',
                "Bismarck - Airmed": 'text:"Facility: Bismarck - Airmed"',
                "Bismarck Clinic": 'text:"Facility: Bismarck Clinic"',
                "Bismarck Medical Center":
                    'text:"Facility: Bismarck Medical Center"',
                "Bismarck North Clinic":
                    'text:"Facility: Bismarck North Clinic"',
                "Bison Mall": 'text:"Facility: Bison Mall"',
                "Brandon Clinic": 'text:"Facility: Brandon Clinic"',
                "Broadway Clinic": 'text:"Facility: Broadway Clinic"',
                "Broadway Hospital": 'text:"Facility: Broadway Hospital"',
                "Canby Care Center": 'text:"Facility: Canby Care Center"',
                "Canby Clinic": 'text:"Facility: Canby Clinic"',
                "Canby Hentges Building":
                    'text:"Facility: Canby Hentges Building"',
                "Canby Medical Center": 'text:"Facility: Canby Medical Center"',
                "Canby Sylvan Place": 'text:"Facility: Canby Sylvan Place"',
                "Cancer Center Building":
                    'text:"Facility: Cancer Center Building"',
                "Canton-Inwood Medical Center":
                    'text:"Facility: Canton-Inwood Medical Center"',
                "Carufel Building": 'text:"Facility: Carufel Building"',
                "Cass Lake Clinic": 'text:"Facility: Cass Lake Clinic"',
                "Center for Digestive Health":
                    'text:"Facility: Center for Digestive Health"',
                "Central Patient Building":
                    'text:"Facility: Central Patient Building"',
                "Chamberlain Care Center":
                    'text:"Facility: Chamberlain Care Center"',
                "Chamberlain HH & Hospice":
                    'text:"Facility: Chamberlain HH & Hospice"',
                "Chamberlain HME Building":
                    'text:"Facility: Chamberlain HME Building"',
                "Chamberlain Medical Center":
                    'text:"Facility: Chamberlain Medical Center"',
                "Cherapa Place Building":
                    'text:"Facility: Cherapa Place Building"',
                "Child Development Center":
                    'text:"Facility: Child Development Center"',
                "Children\\'s Hospital":
                    'text:"Facility: Children\'s Hospital"',
                "Children\\'s World Clinic Klamath Falls":
                    'text:"Facility: Children\'s World Clinic Klamath Falls"',
                "Clear Lake Medical Center":
                    'text:"Facility: Clear Lake Medical Center"',
                "Clearbrook Clinic": 'text:"Facility: Clearbrook Clinic"',
                "CNA Building": 'text:"Facility: CNA Building"',
                "Dakota Block Building":
                    'text:"Facility: Dakota Block Building"',
                "Dell Rapids Orchard Hills Nursing Home":
                    'text:"Facility: Dell Rapids Orchard Hills Nursing Home"',
                "Detroit Lakes Clinic": 'text:"Facility: Detroit Lakes Clinic"',
                "Detroit Lakes Dialysis":
                    'text:"Facility: Detroit Lakes Dialysis"',
                "Dickinson Airmed": 'text:"Facility: Dickinson Airmed"',
                "Dickinson East Clinic":
                    'text:"Facility: Dickinson East Clinic"',
                "Dickinson Occ Med": 'text:"Facility: Dickinson Occ Med"',
                "Dickinson West Clinic":
                    'text:"Facility: Dickinson West Clinic"',
                "East Broadway Occ Med":
                    'text:"Facility: East Broadway Occ Med"',
                "East Grand Forks Clinic 625 Demers Clinic":
                    'text:"Facility: East Grand Forks Clinic 625 Demers Clinic"',
                "East Mandan Clinic": 'text:"Facility: East Mandan Clinic"',
                "East Patient Building":
                    'text:"Facility: East Patient Building"',
                "Eckroth Plaza": 'text:"Facility: Eckroth Plaza"',
                "Enderlin Clinic": 'text:"Facility: Enderlin Clinic"',
                "Expressway Business Office":
                    'text:"Facility: Expressway Business Office"',
                "Fargo Health Plan": 'text:"Facility: Fargo Health Plan"',
                "Fargo Profile": 'text:"Facility: Fargo Profile"',
                "Fieldhouse Building": 'text:"Facility: Fieldhouse Building"',
                "First International Bank":
                    'text:"Facility: First International Bank"',
                "FM Ambulance": 'text:"Facility: FM Ambulance"',
                "Former Upper Mississippi Building":
                    'text:"Facility: Former Upper Mississippi Building"',
                "FY Dialysis": 'text:"Facility: FY Dialysis"',
                "GSS IA Algona Ctr": 'text:"Facility: GSS IA Algona Ctr"',
                "GSS IA Algona Ctr": 'text:"Facility: GSS IA Algona Ctr"',
                "GSS IA Elk Horn Salem Luth Hm":
                    'text:"Facility: GSS IA Elk Horn Salem Luth Hm"',
                "GSS IA Estherville Ctr":
                    'text:"Facility: GSS IA Estherville Ctr"',
                "GSS IA Fontanelle Ctr":
                    'text:"Facility: GSS IA Fontanelle Ctr"',
                "GSS IA Forest City Ctr":
                    'text:"Facility: GSS IA Forest City Ctr"',
                "GSS IA George Comm Ctr":
                    'text:"Facility: GSS IA George Comm Ctr"',
                "GSS IA Holstein Ctr": 'text:"Facility: GSS IA Holstein Ctr"',
                "GSS IA Indianola": 'text:"Facility: GSS IA Indianola"',
                "GSS IA Lemars": 'text:"Facility: GSS IA Lemars"',
                "GSS IA Manson Ctr": 'text:"Facility: GSS IA Manson Ctr"',
                "GSS IA Newell Ctr": 'text:"Facility: GSS IA Newell Ctr"',
                "GSS IA Ottumwa": 'text:"Facility: GSS IA Ottumwa"',
                "GSS IA Postville Ctr": 'text:"Facility: GSS IA Postville Ctr"',
                "GSS IA Red Oak Ctr": 'text:"Facility: GSS IA Red Oak Ctr"',
                "GSS IA St Ansgar Ctr": 'text:"Facility: GSS IA St Ansgar Ctr"',
                "GSS IA Villisca Ctr": 'text:"Facility: GSS IA Villisca Ctr"',
                "GSS IA Waukon Ctr": 'text:"Facility: GSS IA Waukon Ctr"',
                "GSS IA West Union Ctr":
                    'text:"Facility: GSS IA West Union Ctr"',
                "GSS IL Prophetstown Mnr":
                    'text:"Facility: GSS IL Prophetstown Mnr"',
                "Gss National Campus": 'text:"Facility: Gss National Campus"',
                "Hartford Clinic": 'text:"Facility: Hartford Clinic"',
                "Hartley Clinic": 'text:"Facility: Hartley Clinic"',
                "Hawley Clinic": 'text:"Facility: Hawley Clinic"',
                "Healthcare Accessories 6th St":
                    'text:"Facility: Healthcare Accessories 6th St"',
                "Healthcare Accessories Century":
                    'text:"Facility: Healthcare Accessories Century"',
                "Healthcare Accessories Fargo":
                    'text:"Facility: Healthcare Accessories Fargo"',
                "Healthcare Accessories Fargo":
                    'text:"Facility: Healthcare Accessories Fargo"',
                "Heart Hospital Building":
                    'text:"Facility: Heart Hospital Building"',
                "HESI Building": 'text:"Facility: HESI Building"',
                "Hillsboro Medical Center":
                    'text:"Facility: Hillsboro Medical Center"',
                "Home Care Hospice": 'text:"Facility: Home Care Hospice"',
                "Imagenetics Building": 'text:"Facility: Imagenetics Building"',
                "International Falls Eye Center":
                    'text:"Facility: International Falls Eye Center"',
                "Jackson Hospital": 'text:"Facility: Jackson Hospital"',
                "Jackson Medical Center":
                    'text:"Facility: Jackson Medical Center"',
                "Jamestown Clinic 2nd Ave":
                    'text:"Facility: Jamestown Clinic 2nd Ave"',
                "Joe Lueken Cancer Center":
                    'text:"Facility: Joe Lueken Cancer Center"',
                "Lakefield Clinic": 'text:"Facility: Lakefield Clinic"',
                "Laundry/Maintenance Building":
                    'text:"Facility: Laundry/Maintenance Building"',
                "Lennox Clinic": 'text:"Facility: Lennox Clinic"',
                "Liberty Medical Center":
                    'text:"Facility: Liberty Medical Center"',
                "Liberty Tree Mall A04A":
                    'text:"Facility: Liberty Tree Mall A04A"',
                "Lidgerwood Clinic": 'text:"Facility: Lidgerwood Clinic"',
                "Lisbon Clinic": 'text:"Facility: Lisbon Clinic"',
                "Luverne Clinic": 'text:"Facility: Luverne Clinic"',
                "Luverne Medical Center":
                    'text:"Facility: Luverne Medical Center"',
                "Mallard Pointe Plaza": 'text:"Facility: Mallard Pointe Plaza"',
                "Mayville Clinic": 'text:"Facility: Mayville Clinic"',
                "Mayville Hospital": 'text:"Facility: Mayville Hospital"',
                "Medical Building 2": 'text:"Facility: Medical Building 2"',
                "Medical Building 3": 'text:"Facility: Medical Building 3"',
                "Minot Clinic": 'text:"Facility: Minot Clinic"',
                "Moorhead 28th Ave Clinic":
                    'text:"Facility: Moorhead 28th Ave Clinic"',
                "Moorhead 8th St Clinic":
                    'text:"Facility: Moorhead 8th St Clinic"',
                "North Fargo Clinic": 'text:"Facility: North Fargo Clinic"',
                "North Mandan Clinic": 'text:"Facility: North Mandan Clinic"',
                "North Peds Clinic": 'text:"Facility: North Peds Clinic"',
                "Northern Lights Comm Residence":
                    'text:"Facility: Northern Lights Comm Residence"',
                "Occupational Health Building Clinic":
                    'text:"Facility: Occupational Health Building Clinic"',
                "Ortho & Sports Med Clinic":
                    'text:"Facility: Ortho & Sports Med Clinic"',
                "Osgood Dermatology Clinic":
                    'text:"Facility: Osgood Dermatology Clinic"',
                "Parkers Prairie Clinic":
                    'text:"Facility: Parkers Prairie Clinic"',
                "Pelican Rapids Clinic":
                    'text:"Facility: Pelican Rapids Clinic"',
                "Pentagon Building": 'text:"Facility: Pentagon Building"',
                "Perham Clinic": 'text:"Facility: Perham Clinic"',
                "Perham Hlth": 'text:"Facility: Perham Hlth"',
                "Power Center": 'text:"Facility: Power Center"',
                "Primewest": 'text:"Facility: Primewest"',
                "Professional Building Clinic":
                    'text:"Facility: Professional Building Clinic"',
                "Profile Brookings Clinic":
                    'text:"Facility: Profile Brookings Clinic"',
                "Rapid City Lab": 'text:"Facility: Rapid City Lab"',
                "Red Lake Dialysis": 'text:"Facility: Red Lake Dialysis"',
                "Roger Maris Cancer Center Clinic":
                    'text:"Facility: Roger Maris Cancer Center Clinic"',
                "Sanford Business Center Building":
                    'text:"Facility: Sanford Business Center Building"',
                "Sanford Center Building":
                    'text:"Facility: Sanford Center Building"',
                "Sanford Education Campus Building":
                    'text:"Facility: Sanford Education Campus Building"',
                "Sanford Jamestown Clinic":
                    'text:"Facility: Sanford Jamestown Clinic"',
                "Sanford Medical Center Fargo":
                    'text:"Facility: Sanford Medical Center Fargo"',
                "Sanford Research": 'text:"Facility: Sanford Research"',
                "Sanford Wellness Center":
                    'text:"Facility: Sanford Wellness Center"',
                "Sheldon Care Center": 'text:"Facility: Sheldon Care Center"',
                "Sheldon Clinic": 'text:"Facility: Sheldon Clinic"',
                "Sheldon Medical Center":
                    'text:"Facility: Sheldon Medical Center"',
                "Shops At Lovell Place":
                    'text:"Facility: Shops At Lovell Place"',
                "Sioux Falls Home Health":
                    'text:"Facility: Sioux Falls Home Health"',
                "Sioux Falls Hospice Building":
                    'text:"Facility: Sioux Falls Hospice Building"',
                "South Park Ramp": 'text:"Facility: South Park Ramp"',
                "South University Hospital":
                    'text:"Facility: South University Hospital"',
                "Southpointe Clinic": 'text:"Facility: Southpointe Clinic"',
                "Southwest Clinic": 'text:"Facility: Southwest Clinic"',
                "Spring Creek Village": 'text:"Facility: Spring Creek Village"',
                "State Street Clinic": 'text:"Facility: State Street Clinic"',
                "Stevens Center Building":
                    'text:"Facility: Stevens Center Building"',
                "Surgical Tower": 'text:"Facility: Surgical Tower"',
                "Talley Building": 'text:"Facility: Talley Building"',
                "The Childrens Therapy":
                    'text:"Facility: The Childrens Therapy"',
                "The Gallery": 'text:"Facility: The Gallery"',
                "Thief River Falls Downtown Campus":
                    'text:"Facility: Thief River Falls Downtown Campus"',
                "Thief River Falls Medical Center":
                    'text:"Facility: Thief River Falls Medical Center"',
                "Town Square": 'text:"Facility: Town Square"',
                "Tracy Hospital": 'text:"Facility: Tracy Hospital"',
                "TRF Ambulance Service":
                    'text:"Facility: TRF Ambulance Service"',
                "Twin Valley Clinic": 'text:"Facility: Twin Valley Clinic"',
                "Ulen Clinic": 'text:"Facility: Ulen Clinic"',
                "UND Building": 'text:"Facility: UND Building"',
                "Valley City Clinic": 'text:"Facility: Valley City Clinic"',
                "Van Demark Building": 'text:"Facility: Van Demark Building"',
                "Vascular Center": 'text:"Facility: Vascular Center"',
                "Vermillion Care Center":
                    'text:"Facility: Vermillion Care Center"',
                "Vermillion Clinic": 'text:"Facility: Vermillion Clinic"',
                "Vermillion HH & Hospice":
                    'text:"Facility: Vermillion HH & Hospice"',
                "Vermillion Medical Center":
                    'text:"Facility: Vermillion Medical Center"',
                "Veterans Square": 'text:"Facility: Veterans Square"',
                "Wahpeton Clinic": 'text:"Facility: Wahpeton Clinic"',
                "Walker Clinic": 'text:"Facility: Walker Clinic"',
                "Warehouse": 'text:"Facility: Warehouse"',
                "Waterfall Plaza - 69th & Minnesota Building":
                    'text:"Facility: Waterfall Plaza - 69th & Minnesota Building"',
                "Watertown Clinic": 'text:"Facility: Watertown Clinic"',
                "Watford City Clinic": 'text:"Facility: Watford City Clinic"',
                "Webster Medical Center":
                    'text:"Facility: Webster Medical Center"',
                "West Fargo Clinic": 'text:"Facility: West Fargo Clinic"',
                "West Patient Building":
                    'text:"Facility: West Patient Building"',
                "Westbrook Clinic": 'text:"Facility: Westbrook Clinic"',
                "Westbrook Medical Center":
                    'text:"Facility: Westbrook Medical Center"',
                "Wheaton Medical Center":
                    'text:"Facility: Wheaton Medical Center"',
                "White Earth Dialysis": 'text:"Facility: White Earth Dialysis"',
                "Wichita Profile": 'text:"Facility: Wichita Profile"',
                "Windom Clinic": 'text:"Facility: Windom Clinic"',
                "Womens Health Plaza Building":
                    'text:"Facility: Womens Health Plaza Building"',
                "Woodsedge": 'text:"Facility: Woodsedge"',
                "Worthington Clinic": 'text:"Facility: Worthington Clinic"',
                "Worthington Medical Center":
                    'text:"Facility: Worthington Medical Center"',
                "Worthington Profile": 'text:"Facility: Worthington Profile"',
                "Worthington Sunst Cottage":
                    'text:"Facility: Worthington Sunst Cottage"',
            },
        },
        {
            name: "location",
            key: "state",
            display: "State",
        },
        {
            name: "location",
            key: "city",
            display: "City",
        },
        // {
        //     name: "location",
        //     key: "country_short",
        //     display: "Country",
        // },
        {
            name: "title",
            display: "Job Title",
        },
    ],
}

module.exports = config
