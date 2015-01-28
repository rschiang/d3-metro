define([
], function () {

    'use strict';

    return {
        stationLines: {
            'BL': {code: 'BL', nme: 'Blue'},
            'GR': {code: 'GR', nme: 'Green'},
            'OR': {code: 'OR', nme: 'Orange'},
            'RD': {code: 'RD', nme: 'Red'},
            'SV': {code: 'SV', nme: 'Silver'},
            'YL': {code: 'YL', nme: 'Yellow'}
        },

        mapCenter: {
            lat: 38.889931,
            lon: -77.009003
        },

        /*
        * Define nodes for force directed graph
        */
        nodes: [
             // RED
            {id: 0, tc: "e", cds: ["RD-A15"], lat: 39.1199273249, lon: -77.1646273343, nme: "Shady Grove"},
            {id: 1, tc: "s", cds: ["RD-A14"], lat: 39.0843216075, lon: -77.1461253392, nme: "Rockville"},
            {id: 2, tc: "s", cds: ["RD-A13"], lat: 39.0624676517, lon: -77.1208179517, nme: "Twinbrook"},
            {id: 3, tc: "s", cds: ["RD-A12"], lat: 39.0481513573, lon: -77.112829859, nme: "White Flint"},
            {id: 4, tc: "s", cds: ["RD-A11"], lat: 39.02926895, lon: -77.10384972, nme: "Grosvenor"},
            {id: 5, tc: "s", cds: ["RD-A10"], lat: 39.0000564843, lon: -77.0969522905, nme: "Medical Center"},
            {id: 6, tc: "s", cds: ["RD-A09"], lat: 38.9843936603, lon: -77.0941291922, nme: "Bethesda"},
            {id: 7, tc: "s", cds: ["RD-A08"], lat: 38.9594838736, lon: -77.084995805, nme: "Friendship Heights"},
            {id: 8, tc: "s", cds: ["RD-A07"], lat: 38.9488514351, lon: -77.0795873255, nme: "Tenleytown"},
            {id: 9, tc: "s", cds: ["RD-A06"], lat: 38.9432652883, lon: -77.0629861805, nme: "Van Ness UDC"},
            {id: 10, tc: "s", cds: ["RD-A05"], lat: 38.9347628908, lon: -77.0580425191, nme: "Cleveland Park"},
            {id: 11, tc: "s", cds: ["RD-A04"], lat: 38.9250851371, lon: -77.0524180207, nme: "Woodley Park Zoo"},
            {id: 12, tc: "s", cds: ["RD-A03"], lat: 38.9095980575, lon: -77.0434143597, nme: "Dupont Circle"},
            {id: 13, tc: "s", cds: ["RD-A02"], lat: 38.9032019462, lon: -77.0397008272, nme: "Farragut North"},
            {id: 14, tc: "m", cds: ["RD-A01", "BL-C01", "OR-C01", "SV-C01"], lat: 38.8983144732, lon: -77.0280779971, nme: "Metro Center"},
            {id: 15, tc: "m", cds: ["RD-B01", "GR-F01", "YL-F01"], lat: 38.8983168097, lon: -77.0219153904, nme: "Gallery Place"},
            {id: 16, tc: "s", cds: ["RD-B02"], lat: 38.8960903176, lon: -77.0166389566, nme: "Judiciary Square"},
            {id: 17, tc: "s", cds: ["RD-B03"], lat: 38.8977660392, lon: -77.0074142921, nme: "Union Station"},
            {id: 18, tc: "s", cds: ["RD-B35"], lat: 38.9070162121, lon: -77.0030204472, nme: "New York Avenue"},
            {id: 19, tc: "s", cds: ["RD-B04"], lat: 38.9210596891, lon: -76.9959369166, nme: "Rhode Island Avenue"},
            {id: 20, tc: "s", cds: ["RD-B05"], lat: 38.9332109913, lon: -76.9945342851, nme: "Brookland"},
            {id: 21, tc: "m", cds: ["RD-B06", "GR-E06", "YL-E06"], lat: 38.9518467675, lon: -77.0022030768, nme: "Fort Totten"},
            {id: 22, tc: "s", cds: ["RD-B07"], lat: 38.976078531, lon: -77.0181766987, nme: "Takoma"},
            {id: 23, tc: "s", cds: ["RD-B08"], lat: 38.9939493747, lon: -77.0310178268, nme: "Silver Spring"},
            {id: 24, tc: "s", cds: ["RD-B09"], lat: 39.0149542752, lon: -77.0429165548, nme: "Forest Glen"},
            {id: 25, tc: "s", cds: ["RD-B10"], lat: 39.0375271436, lon: -77.0501070535, nme: "Wheaton"},
            {id: 26, tc: "e", cds: ["RD-B11"], lat: 39.0617837655, lon: -77.0535573593, nme: "Glenmont"},

            // Blue
            {id: 27, tc: "m", cds: ["BL-J03"], lat: 38.7665218926, lon: -77.1679701804, nme: "Franconia-Springf'ld"},
            {id: 28, tc: "s", cds: ["BL-J02"], lat: 38.799307672, lon: -77.1291115237, nme: "Van Dorn St"},
            {id: 29, tc: "s", cds: ["BL-C13", "YL-C13"], lat: 38.8065861172, lon: -77.0608112085, nme: "King Street"},
            {id: 30, tc: "s", cds: ["BL-C12", "YL-C12"], lat: 38.8141436672, lon: -77.053667574, nme: "Braddock Road"},
            {id: 31, tc: "s", cds: ["BL-C10", "YL-C10"], lat: 38.8534163859, lon: -77.0440422943, nme: "National Arpt"},
            {id: 32, tc: "s", cds: ["BL-C09", "YL-C09"], lat: 38.8579043204, lon: -77.0502898097, nme: "Crystal City"},
            {id: 33, tc: "s", cds: ["BL-C08", "YL-C08"], lat: 38.8618823867, lon: -77.0595389215, nme: "Pentagon City"},
            {id: 34, tc: "m", cds: ["BL-C07", "YL-C07"], lat: 38.8694627012, lon: -77.0537156734, nme: "Pentagon"},
            {id: 35, tc: "s", cds: ["BL-C06"], lat: 38.8846868585, lon: -77.0628101291, nme: "Arlington Cemetery"},
            {id: 36, tc: "m", cds: ["BL-C05", "OR-C05", "SV-C05"], lat: 38.8959790962, lon: -77.0709086853, nme: "Rosslyn"},
            {id: 37, tc: "s", cds: ["BL-C04", "OR-C04", "SV-C04"], lat: 38.9006980092, lon: -77.050277739, nme: "Foggy Bottom"},
            {id: 38, tc: "s", cds: ["BL-C03", "OR-C05", "SV-C03"], lat: 38.9013128941, lon: -77.0406954151, nme: "Farragut West"},
            {id: 39, tc: "s", cds: ["BL-C02", "OR-C02", "SV-C02"], lat: 38.9013327968, lon: -77.0336341721, nme: "McPherson Square"},
            {id: 40, tc: "s", cds: ["BL-D01", "OR-D01", "SV-D01"], lat: 38.8931808718, lon: -77.0281319984, nme: "Federal Triangle"},
            {id: 41, tc: "s", cds: ["BL-D02", "OR-D02", "SV-D02"], lat: 38.888018702, lon: -77.0280662342, nme: "Smithsonian"},
            {id: 42, tc: "m", cds: ["BL-D03", "OR-D03", "SV-D03", "GR-F03", "YL-F03"], lat: 38.8848377279, lon: -77.021908484, nme: "L'Enfant Plaza"},
            {id: 43, tc: "s", cds: ["BL-D04", "OR-D04", "SV-D04"], lat: 38.8850723551, lon: -77.0158682169, nme: "Federal Center SW"},
            {id: 44, tc: "s", cds: ["BL-D05", "OR-D05", "SV-D05"], lat: 38.8850625009, lon: -77.0051394199, nme: "Capitol South"},
            {id: 45, tc: "s", cds: ["BL-D06", "OR-D06", "SV-D06"], lat: 38.8846222608, lon: -76.9960011267, nme: "Eastern Market"},
            {id: 46, tc: "s", cds: ["BL-D07", "OR-D07", "SV-D06"], lat: 38.8812632736, lon: -76.9854953196, nme: "Potomac Avenue"},
            {id: 47, tc: "m", cds: ["BL-D08", "OR-D08", "SV-D08"], lat: 38.8867090898, lon: -76.9770889014, nme: "Stadium Armory"},
            {id: 48, tc: "s", cds: ["BL-G01", "SV-G01"], lat: 38.890975676, lon: -76.9383648681, nme: "Benning Road"},
            {id: 49, tc: "s", cds: ["BL-G02", "SV-G02"], lat: 38.8894658568, lon: -76.9118081145, nme: "Capitol Heights"},
            {id: 50, tc: "s", cds: ["BL-G03", "SV-G03"], lat: 38.8867478168, lon: -76.89410791, nme: "Addison Road"},
            {id: 51, tc: "s", cds: ["BL-G04", "SV-G04"], lat: 38.8938349282, lon: -76.8680747681, nme: "Morgan Blvd"},
            {id: 52, tc: "s", cds: ["BL-G05", "SV-G05"], lat: 38.9050688072, lon: -76.8420375202, nme: "Largo Town Center"},
 
            //Green
            {id: 53, tc: "e", cds: ["GR-F11"], lat: 38.8264463483, lon: -76.9114642177, nme: "Branch Avenue"},
            {id: 54, tc: "s", cds: ["GR-F10"], lat: 38.8439645544, lon: -76.9318701589, nme: "Suitland"},
            {id: 55, tc: "s", cds: ["GR-F09"], lat: 38.8513013835, lon: -76.9562627094, nme: "Naylor Road"},
            {id: 56, tc: "s", cds: ["GR-F08"], lat: 38.8410857803, lon: -76.9750541388, nme: "Southern Ave"},
            {id: 57, tc: "s", cds: ["GR-F07"], lat: 38.8456577028, lon: -76.9885119326, nme: "Congress Height"},
            {id: 58, tc: "s", cds: ["GR-F06"], lat: 38.8629631168, lon: -76.9953707387, nme: "Anacostia"},
            {id: 59, tc: "s", cds: ["GR-F05"], lat: 38.8764810849, lon: -77.0050856513, nme: "Navy Yard"},
            {id: 60, tc: "s", cds: ["GR-F04"], lat: 38.8764618668, lon: -77.0175052088, nme: "Waterfront"},
            {id: 61, tc: "s", cds: ["GR-F02", "YL-F02"], lat: 38.8936652235, lon: -77.0219143879, nme: "Archives"},
            {id: 62, tc: "s", cds: ["GR-E01", "YL-E01"], lat: 38.9064368149, lon: -77.0219143803, nme: "Mt Vernon Sq"},
            {id: 63, tc: "s", cds: ["GR-E02", "YL-E02"], lat: 38.9134768711, lon: -77.0219117007, nme: "Shaw"},
            {id: 64, tc: "s", cds: ["GR-E03", "YL-E03"], lat: 38.9170023992, lon: -77.0274958929, nme: "U Street"},
            {id: 65, tc: "s", cds: ["GR-E04", "YL-E04"], lat: 38.9278379675, lon: -77.0325521177, nme: "Columbia Heights"},
            {id: 66, tc: "s", cds: ["GR-E05", "YL-E05"], lat: 38.9374346301, lon: -77.023460904, nme: "Georgia Avenue"},
            {id: 67, tc: "s", cds: ["GR-E07"], lat: 38.9550401707, lon: -76.9695766751, nme: "West Hyattsville"},
            {id: 68, tc: "s", cds: ["GR-E08"], lat: 38.9653854458, lon: -76.9558815078, nme: "Prince Georges Plaza"},
            {id: 69, tc: "s", cds: ["GR-E09"], lat: 38.9786336339, lon: -76.9281249818, nme: "College Park"},
            {id: 70, tc: "e", cds: ["GR-E10"], lat: 39.0111458605, lon: -76.9110575731, nme: "Greenbelt"},

		//Yellow
            {id: 71, tc: "e", cds: ["YL-C15"], lat: 38.7939158529, lon: -77.0752057891, nme: "Huntington"},
            {id: 72, tc: "s", cds: ["YL-C14"], lat: 38.8004254497, lon: -77.0708743893, nme: "Eisenhower Avenue"},

            //Orange
            {id: 73, tc: "e", cds: ["OR-K08"], lat: 38.8776011238, lon: -77.2726222569, nme: "Vienna"},
            {id: 74, tc: "s", cds: ["OR-K07"], lat: 38.8836251359, lon: -77.2271606721, nme: "Dunn Loring"},
            {id: 75, tc: "s", cds: ["OR-K06"], lat: 38.900780551, lon: -77.1890948225, nme: "W Falls Church"},
            {id: 76, tc: "s", cds: ["OR-K05", "SV-K05"], lat: 38.8859531663, lon: -77.1568830199, nme: "E Falls Church"},
            {id: 77, tc: "s", cds: ["OR-K04", "SV-K04"], lat: 38.8821828738, lon: -77.113168835, nme: "Ballston"},
            {id: 78, tc: "s", cds: ["OR-K03", "SV-K03"], lat: 38.8833661518, lon: -77.1029772942, nme: "Virginia Square"},
            {id: 79, tc: "s", cds: ["OR-K02", "SV-K02"], lat: 38.886704839, lon: -77.0953940983, nme: "Clarendon"},
            {id: 80, tc: "s", cds: ["OR-K01", "SV-K01"], lat: 38.8901755312, lon: -77.087131231, nme: "Court House"},
            {id: 81, tc: "s", cds: ["OR-D09"], lat: 38.899191223, lon: -76.9467477336, nme: "Minnesota Avenue"},
            {id: 82, tc: "s", cds: ["OR-D10"], lat: 38.9081784965, lon: -76.935256783, nme: "Deanwood"},
            {id: 83, tc: "s", cds: ["OR-D11"], lat: 38.9166318546, lon: -76.916628044, nme: "Cheverly"},
            {id: 84, tc: "s", cds: ["OR-D12"], lat: 38.9335062344, lon: -76.8911979676, nme: "Landover"},
            {id: 85, tc: "e", cds: ["OR-D13"], lat: 38.9477848558, lon: -76.8718412865, nme: "New Carrollton"},
 
            // Silver
            {id: 86, tc: "e", cds: ["SV-N06"], lat: 38.94778, lon: -77.34027, nme: "Wiehle-Reston East"},
            {id: 87, tc: "s", cds: ["SV-N04"], lat: 38.928872, lon: -77.241472, nme: "Spring Hill"},
            {id: 88, tc: "s", cds: ["SV-N03"], lat: 38.921732, lon: -77.234607, nme: "Greensboro"},
            {id: 89, tc: "s", cds: ["SV-N02"], lat: 38.920496, lon: -77.222262, nme: "Tysons Corner"},
            {id: 90, tc: "s", cds: ["SV-N01"], lat: 38.924432, lon: -77.210295, nme: "McLean"}
        ],

        links: [
            // Red
            {source: 0, target: 1},
            {source: 1, target: 2},
            {source: 2, target: 3},

            {source: 3, target: 4},
             
            {source: 4, target: 5},
            {source: 5, target: 6},
            {source: 6, target: 7},
            {source: 7, target: 8},
            {source: 8, target: 9,},
            {source: 9, target: 10},
            {source: 10, target: 11},
            {source: 11, target: 12},
            {source: 12, target: 13},
            {source: 13, target: 14},
            {source: 14, target: 15},
            {source: 15, target: 16},
            {source: 16, target: 17},
            {source: 17, target: 18},
            {source: 18, target: 19},
            {source: 19, target: 20},
            {source: 20, target: 21},
            {source: 21, target: 22},
            {source: 22, target: 23},
            {source: 23, target: 24},
            {source: 24, target: 25},
            {source: 25, target: 26},

            // Blue
            {source: 27, target: 28},
            {source: 28, target: 29},
            {source: 29, target: 30},
            {source: 30, target: 31},
            {source: 31, target: 32},
            {source: 32, target: 33},
            {source: 33, target: 34},
            {source: 34, target: 35},
            {source: 35, target: 36},
            {source: 36, target: 37},
            {source: 37, target: 38},
            {source: 38, target: 39},
            {source: 39, target: 14},
            {source: 14, target: 40},
            {source: 40, target: 41},
            {source: 41, target: 42},
            {source: 42, target: 43},
            {source: 43, target: 44},
            {source: 44, target: 45},
            {source: 45, target: 46},
            {source: 46, target: 47},
            {source: 47, target: 48},
            {source: 48, target: 49},
            {source: 49, target: 50},
            {source: 50, target: 51},
            {source: 51, target: 52},

            //Green
            {source: 53, target: 54},
            {source: 54, target: 55},
            {source: 55, target: 56},
            {source: 56, target: 57},
            {source: 57, target: 58},
            {source: 58, target: 59},
            {source: 59, target: 60},
            {source: 60, target: 42},
            {source: 42, target: 61},
            {source: 61, target: 15},
            {source: 15, target: 62},
            {source: 62, target: 63},
            {source: 63, target: 64},
            {source: 64, target: 65},
            {source: 65, target: 66},
            {source: 66, target: 21},
            {source: 21, target: 67},
            {source: 67, target: 68},
            {source: 68, target: 69},
            {source: 69, target: 70},

            //Yellow
            {source: 71, target: 72},
            {source: 72, target: 29},
            
            //Orange
            {source: 73, target: 74},
            {source: 74, target: 75},
            {source: 75, target: 76},
            {source: 76, target: 77},
            {source: 77, target: 78},
            {source: 78, target: 79},
            {source: 79, target: 80},
            {source: 80, target: 36},
            {source: 47, target: 81},
            {source: 81, target: 82},
            {source: 82, target: 83},
            {source: 83, target: 84},
            {source: 84, target: 85},
 
            // Silver
            {source: 86, target: 87},
            {source: 87, target: 88},
            {source: 88, target: 89},
            {source: 89, target: 90},
            {source: 90, target: 76},

            {source: 34, target: 42},
        ],

        /*
        * Metro route map. Defines station codes by line together with
        * distances to previous and next stations. Primarily for use by
        * RoutePlanner to determine shortest routes between two stations
        */
        routeMap: {
            // RED
            'RD-A15': {id: 0, paths: {'RD-A14': 14151}},
            'RD-A14': {id: 1, paths: {'RD-A15': 14151, 'RD-A13': 10586}},
            'RD-A13': {id: 2, paths: {'RD-A14': 10586, 'RD-A12': 5895}},
            'RD-A12': {id: 3, paths: {'RD-A13': 5895, 'RD-A11': 7309}},
            'RD-A11': {id: 4, paths: {'RD-A12': 7309, 'RD-A10': 11821}},
            'RD-A10': {id: 5, paths: {'RD-A11': 11821, 'RD-A09': 5530}},
            'RD-A09': {id: 6, paths: {'RD-A10': 5530, 'RD-A08': 9095}},
            'RD-A08': {id: 7, paths: {'RD-A09': 9095, 'RD-A07': 4135}},
            'RD-A07': {id: 8, paths: {'RD-A08': 4135, 'RD-A06': 5841}},
            'RD-A06': {id: 9, paths: {'RD-A07': 5841, 'RD-A05': 5841}},
            'RD-A05': {id: 10, paths: {'RD-A06': 5841, 'RD-A04': 3740}},
            'RD-A04': {id: 11, paths: {'RD-A05': 3740, 'RD-A03': 6304}},
            'RD-A03': {id: 12, paths: {'RD-A04': 6304, 'RD-A02': 2487}},
            'RD-A02': {id: 13, paths: {'RD-A03': 2487, 'RD-A01': 4178}},
            'RD-A01': {id: 14, paths: {'RD-A02': 4178, 'RD-B01': 1505, 'BL-C01': 90000, 'YL-F01': 90000}},
            'RD-B01': {id: 15, paths: {'RD-A01': 1505, 'RD-B02': 1967,}},
            'RD-B02': {id: 16, paths: {'RD-B01': 1967, 'RD-B03': 3446}},
            'RD-B03': {id: 17, paths: {'RD-B02': 3446, 'RD-B35': 3548}},
            'RD-B35': {id: 18, paths: {'RD-B03': 3548, 'RD-B04': 5771}},
            'RD-B04': {id: 19, paths: {'RD-B35': 5771, 'RD-B05': 4553}},
            'RD-B05': {id: 20, paths: {'RD-B04': 4553, 'RD-B06': 7378}},
            'RD-B06': {id: 21, paths: {'RD-B05': 7378, 'RD-B07': 10026, 'GR-E06': 90000, 'YL-E06': 90000}},
            'RD-B07': {id: 22, paths: {'RD-B06': 10026, 'RD-B08': 7484}},
            'RD-B08': {id: 23, paths: {'RD-B07': 7484, 'RD-B09': 8871}},
            'RD-B09': {id: 24, paths: {'RD-B08': 8871, 'RD-B10': 8484}},
            'RD-B10': {id: 25, paths: {'RD-B09': 8484, 'RD-B11': 9334}},
            'RD-B11': {id: 26, paths: {'RD-B10': 9334}},

            //BLUE
            'BL-J03': {id: 27, paths: {'BL-J02': 18695}},
            'BL-J02': {id: 28, paths: {'BL-J03': 18695, 'BL-C13': 20158}},
            'BL-C13': {id: 29, paths: {'BL-J02': 20158, 'BL-C12': 3453, 'YL-C13': 9000}},
            'BL-C12': {id: 30, paths: {'BL-C13': 3453, 'BL-C10': 16108}},
            'BL-C10': {id: 31, paths: {'BL-C12': 16108, 'BL-C09': 2939}},
            'BL-C09': {id: 32, paths: {'BL-C10': 2939, 'BL-C08': 4068}},
            'BL-C08': {id: 33, paths: {'BL-C09': 4068, 'BL-C07': 3216}},
            'BL-C07': {id: 34, paths: {'BL-C08': 3216, 'BL-C06': 7036}},
            'BL-C06': {id: 35, paths: {'BL-C07': 7036, 'BL-C05': 4936}},
            'BL-C05': {id: 36, paths: {'BL-C06': 4936, 'BL-C04': 6993, 'OR-C05': 90000, 'SV-C05': 9000}},
            'BL-C04': {id: 37, paths: {'BL-C05': 6993, 'BL-C03': 2783}},
            'BL-C03': {id: 38, paths: {'BL-C04': 2783, 'BL-C02': 2001}},
            'BL-C02': {id: 39, paths: {'BL-C03': 2001, 'BL-C01': 2359, 'RD-A01': 90000}},
            'BL-C01': {id: 14, paths: {'BL-C02': 2359, 'BL-D01': 1561}},
            'BL-D01': {id: 40, paths: {'BL-C01': 1561, 'BL-D02': 2016}},
            'BL-D02': {id: 41, paths: {'BL-D01': 2016, 'BL-D03': 2643}},
            'BL-D03': {id: 42, paths: {'BL-D02': 2643, 'BL-D04': 1757, 'GR-F03': 90000, 'OR-D03': 90000, 'YL-F03': 90000}},
            'BL-D04': {id: 43, paths: {'BL-D03': 1757, 'BL-D05': 3052}},
            'BL-D05': {id: 44, paths: {'BL-D04': 3052, 'BL-D06': 2703}},
            'BL-D06': {id: 45, paths: {'BL-D05': 2703, 'BL-D07': 3289}},
            'BL-D07': {id: 46, paths: {'BL-D06': 3289, 'BL-D08': 3750}},
            'BL-D08': {id: 47, paths: {'BL-D07': 3750, 'BL-G01': 12162, 'OR-D08': 90000, 'SV-D08': 90000}},
            'BL-G01': {id: 48, paths: {'BL-D08': 12162, 'BL-G02': 7779}},
            'BL-G02': {id: 49, paths: {'BL-G01': 7779, 'BL-G03': 5215}},
            'BL-G03': {id: 50, paths: {'BL-G02': 5215, 'BL-G04': 7960}},
            'BL-G04': {id: 51, paths: {'BL-G03': 7960, 'BL-G05': 7256}},
            'BL-G05': {id: 52, paths: {'BL-G04': 7256}},

            //GREEN
            'GR-F11': {id: 53, paths: {'GR-F10': 9144}},
            'GR-F10': {id: 54, paths: {'GR-F11': 9144, 'GR-F09': 7658}},
            'GR-F09': {id: 55, paths: {'GR-F10': 7658, 'GR-F08': 6612}},
            'GR-F08': {id: 56, paths: {'GR-F09': 6612, 'GR-F07': 5508}},
            'GR-F07': {id: 57, paths: {'GR-F08': 5508, 'GR-F06': 6851}},
            'GR-F06': {id: 58, paths: {'GR-F07': 6851, 'GR-F05': 6254}},
            'GR-F05': {id: 59, paths: {'GR-F06': 6254, 'GR-F04': 3326}},
            'GR-F04': {id: 60, paths: {'GR-F05': 3326, 'GR-F03': 4158}},
            'GR-F03': {id: 42, paths: {'GR-F04': 4158, 'GR-F02': 2950, 'OR-D03': 90000, 'BL-D03': 90000, 'SV-D02': 9000}},
            'GR-F02': {id: 61, paths: {'GR-F03': 2950, 'GR-F01': 1879}},
            'GR-F01': {id: 15, paths: {'GR-F02': 1879, 'GR-E01': 2985, 'RD-B01': 90000}},
            'GR-E01': {id: 62, paths: {'GR-F01': 2985, 'GR-E02': 2527}},
            'GR-E02': {id: 63, paths: {'GR-E01': 2527, 'GR-E03': 2555}},
            'GR-E03': {id: 64, paths: {'GR-E02': 2555, 'GR-E04': 4715}},
            'GR-E04': {id: 65, paths: {'GR-E03': 4715, 'GR-E05': 4717}},
            'GR-E05': {id: 66, paths: {'GR-E04': 4717, 'GR-E06': 8348}},
            'GR-E06': {id: 21, paths: {'GR-E05': 8348, 'GR-E07': 10406, 'YL-E06': 9000, 'RD-B06': 90000}},
            'GR-E07': {id: 67, paths: {'GR-E06': 10406, 'GR-E08': 6670}},
            'GR-E08': {id: 68, paths: {'GR-E07': 6670, 'GR-E09': 10368}},
            'GR-E09': {id: 69, paths: {'GR-E08': 10368, 'GR-E10': 12981}},
            'GR-E10': {id: 70, paths: {'GR-E09': 12981}},
 
            //ORANGE
            'OR-K08': {id: 73, paths: {'OR-K07': 13165}},
            'OR-K07': {id: 74, paths: {'OR-K08': 13165, 'OR-K06': 12638}},
            'OR-K06': {id: 75, paths: {'OR-K07': 12638, 'OR-K05': 10918}},
            'OR-K05': {id: 76, paths: {'OR-K06': 10918, 'OR-K04': 13156, 'SV-K05': 9000}},
            'OR-K04': {id: 77, paths: {'OR-K05': 13156, 'OR-K03': 2980}},
            'OR-K03': {id: 78, paths: {'OR-K04': 2980, 'OR-K02': 2473}},
            'OR-K02': {id: 79, paths: {'OR-K03': 2473, 'OR-K01': 2687}},
            'OR-K01': {id: 80, paths: {'OR-K02': 2687, 'OR-C05': 5807}},
            'OR-C05': {id: 36, paths: {'OR-K01': 5807, 'OR-C06': 6993, 'BL-C05': 90000, 'SV-C05': 9000}},
            'OR-C04': {id: 37, paths: {'OR-C05': 6993, 'OR-C03': 2783}},
            'OR-C03': {id: 38, paths: {'OR-C04': 2783, 'OR-C02': 2001}},
            'OR-C02': {id: 39, paths: {'OR-C03': 2001, 'OR-C01': 2359}},
            'OR-C01': {id: 14, paths: {'OR-C02': 2359, 'OR-D01': 156100, 'RD-A01': 1505}},
            'OR-D01': {id: 40, paths: {'OR-C01': 1561, 'OR-D02': 2016}},
            'OR-D02': {id: 41, paths: {'OR-D01': 2016, 'OR-D03': 2643}},
            'OR-D03': {id: 42, paths: {'OR-D02': 2643, 'OR-D04': 1757, 'YL-F03': 90000}},
            'OR-D04': {id: 43, paths: {'OR-D03': 1757, 'OR-D05': 3052}},
            'OR-D05': {id: 44, paths: {'OR-D04': 3052, 'OR-D06': 2703}},
            'OR-D06': {id: 45, paths: {'OR-D05': 2703, 'OR-D07': 3289}},
            'OR-D07': {id: 46, paths: {'OR-D06': 3289, 'OR-D08': 3750}},
            'OR-D08': {id: 47, paths: {'OR-D07': 3750, 'OR-D09': 11080, 'BL-D08': 90000, 'SV-D08': 90000}},
            'OR-D09': {id: 81, paths: {'OR-D08': 11080, 'OR-D10': 4723}},
            'OR-D10': {id: 82, paths: {'OR-D09': 4723, 'OR-D11': 6149}},
            'OR-D11': {id: 83, paths: {'OR-D10': 6149, 'OR-D12': 9665}},
            'OR-D12': {id: 84, paths: {'OR-D11': 9665, 'OR-D13': 7655}},
            'OR-D13': {id: 85, paths: {'OR-D12': 7655}},
  
            //YELLOW
            'YL-C15': {id: 71, paths: {'YL-C14': 2770}},
            'YL-C14': {id: 72, paths: {'YL-C15': 2770, 'YL-C13': 3734}},
            'YL-C13': {id: 29, paths: {'YL-C14': 3734, 'YL-C12': 3453, 'BL-C13': 9000}},
            'YL-C12': {id: 30, paths: {'YL-C13': 3453, 'YL-C10': 16108}},
            'YL-C10': {id: 31, paths: {'YL-C12': 16108, 'YL-C09': 2939}},
            'YL-C09': {id: 32, paths: {'YL-C10': 2939, 'YL-C08': 4068,}},
            'YL-C08': {id: 33, paths: {'YL-C09': 4068, 'YL-C07': 3216}},
            'YL-C07': {id: 34, paths: {'YL-C08': 3216, 'YL-F03': 12524}},
            'YL-F03': {id: 42, paths: {'YL-C07': 12524, 'YL-F02': 2950, 'GR-F03': 9000, 'BL-D03': 9000, 'OR-D03': 9000}},
            'YL-F02': {id: 61, paths: {'YL-F03': 2950, 'YL-F01': 1879}},
            'YL-F01': {id: 15, paths: {'YL-F02': 1879, 'YL-E01': 2985, 'RD-B01': 9000}},
            'YL-E01': {id: 62, paths: {'YL-F01': 2985, 'YL-E02': 2527}},
            'YL-E02': {id: 63, paths: {'YL-E01': 2527, 'YL-E03': 2555}},
            'YL-E03': {id: 64, paths: {'YL-E02': 2555, 'YL-E04': 4715}},
            'YL-E04': {id: 65, paths: {'YL-E03': 4715, 'YL-E05': 4717}},
            'YL-E05': {id: 66, paths: {'YL-E04': 4717, 'YL-E06': 8348}},

            //SILVER
            'SV-N06': {id: 86, paths: {'SV-N04': 30867}},
            'SV-N04': {id: 87, paths: {'SV-N06': 30867, 'SV-N03': 3634}},
            'SV-N03': {id: 88, paths: {'SV-N04': 3634, 'SV-N02': 10918}},
            'SV-N02': {id: 89, paths: {'SV-N03': 3902, 'SV-N01': 13156}},
            'SV-N01': {id: 90, paths: {'SV-N02': 3440, 'SV-K05': 2980}},
            'SV-K05': {id: 76, paths: {'SV-N01': 24745, 'SV-K04': 2473, 'OR-K05': 9000}},
            'SV-K04': {id: 77, paths: {'SV-K05': 13156, 'SV-K03': 2687}},
            'SV-K03': {id: 78, paths: {'SV-K04': 2980, 'SV-K02': 5807}},
            'SV-K02': {id: 79, paths: {'SV-K03': 2473, 'SV-K01': 6993}},
            'SV-K01': {id: 80, paths: {'SV-K02': 2687, 'SV-C05': 2783, 'BL-C05': 9000, 'OR-C05': 9000}},
            'SV-C05': {id: 36, paths: {'SV-K01': 4936, 'SV-C04': 2001}},
            'SV-C04': {id: 37, paths: {'SV-C05': 6993, 'SV-C03': 2359}},
            'SV-C03': {id: 38, paths: {'SV-C04': 2783, 'SV-C02': 1561}},
            'SV-C02': {id: 39, paths: {'SV-C03': 2001, 'SV-C01': 2016}},
            'SV-C01': {id: 14, paths: {'SV-C02': 2359, 'SV-D01': 2643, 'RD-A01': 1505}},
            'SV-D01': {id: 40, paths: {'SV-C01': 1561, 'SV-D02': 2643}},
            'SV-D02': {id: 41, paths: {'SV-D01': 2016, 'SV-D03': 1757}},
            'SV-D03': {id: 42, paths: {'SV-D02': 2643, 'SV-D04': 1757}},
            'SV-D04': {id: 43, paths: {'SV-D03': 1757, 'SV-D05': 3052}},
            'SV-D05': {id: 44, paths: {'SV-D04': 3052, 'SV-D06': 2703}},
            'SV-D06': {id: 45, paths: {'SV-D05': 2703, 'SV-D07': 3289}},
            'SV-D07': {id: 46, paths: {'SV-D06': 3289, 'SV-D08': 3750}},
            'SV-D08': {id: 47, paths: {'SV-D07': 3750, 'SV-G01': 11080, 'BL-D08': 90000, 'SV-D08': 90000}},
            'SV-G01': {id: 48, paths: {'SV-D08': 12162, 'SV-G02': 4723}},
            'SV-G02': {id: 49, paths: {'SV-G01': 7779, 'SV-G03': 6149}},
            'SV-G03': {id: 50, paths: {'SV-G02': 5215, 'SV-G04': 9665}},
            'SV-G04': {id: 51, paths: {'SV-G03': 7960, 'SV-G05': 7655}},
            'SV-G05': {id: 52, paths: {'SV-G04': 7256}}
        }
    };
});