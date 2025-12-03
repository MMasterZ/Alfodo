const levelExp = [
  {
    exp: "20",
    tier: "iron-1"
  },

  // Start Level 1
  {
    exp: "15000",
    tier: "iron-1"
  },
  {
    exp: "15020",
    tier: "iron-1"
  },
  {
    exp: "15040",
    tier: "iron-1"
  },
  {
    exp: "15060",
    tier: "iron-1"
  },
  {
    exp: "15080",
    tier: "iron-1"
  },
  {
    exp: "15100",
    tier: "iron-1"
  },
  {
    exp: "15120",
    tier: "iron-1"
  },
  {
    exp: "15140",
    tier: "iron-1"
  },
  {
    exp: "15160",
    tier: "iron-1"
  },
  {
    exp: "15180",
    tier: "iron-2"
  },
  {
    exp: "15210",
    tier: "iron-2"
  },
  {
    exp: "15240",
    tier: "iron-2"
  },
  {
    exp: "15270",
    tier: "iron-2"
  },
  {
    exp: "15300",
    tier: "iron-2"
  },
  {
    exp: "15330",
    tier: "iron-2"
  },
  {
    exp: "15360",
    tier: "iron-2"
  },
  {
    exp: "15390",
    tier: "iron-2"
  },
  {
    exp: "15420",
    tier: "iron-2"
  },
  {
    exp: "15450",
    tier: "iron-2"
  },
  {
    exp: "15480",
    tier: "iron-3"
  },
  {
    exp: "15520",
    tier: "iron-3"
  },
  {
    exp: "15560",
    tier: "iron-3"
  },
  {
    exp: "15600",
    tier: "iron-3"
  },
  {
    exp: "15640",
    tier: "iron-3"
  },
  {
    exp: "15680",
    tier: "iron-3"
  },
  {
    exp: "15720",
    tier: "iron-3"
  },
  {
    exp: "15760",
    tier: "iron-3"
  },
  {
    exp: "15800",
    tier: "iron-3"
  },
  {
    exp: "15840",
    tier: "iron-3"
  },
  {
    exp: "15880",
    tier: "iron-4"
  },
  {
    exp: "15930",
    tier: "iron-4"
  },
  {
    exp: "15980",
    tier: "iron-4"
  },
  {
    exp: "16030",
    tier: "iron-4"
  },
  {
    exp: "16080",
    tier: "iron-4"
  },
  {
    exp: "16130",
    tier: "iron-4"
  },
  {
    exp: "16180",
    tier: "iron-4"
  },
  {
    exp: "16230",
    tier: "iron-4"
  },
  {
    exp: "16280",
    tier: "iron-4"
  },
  {
    exp: "16330",
    tier: "iron-4"
  },
  {
    exp: "16380",
    tier: "bronze-1"
  },
  {
    exp: "16440",
    tier: "bronze-1"
  },
  {
    exp: "16500",
    tier: "bronze-1"
  },
  {
    exp: "16560",
    tier: "bronze-1"
  },
  {
    exp: "16620",
    tier: "bronze-1"
  },
  {
    exp: "16680",
    tier: "bronze-1"
  },
  {
    exp: "16740",
    tier: "bronze-1"
  },
  {
    exp: "16800",
    tier: "bronze-1"
  },
  {
    exp: "16860",
    tier: "bronze-1"
  },
  {
    exp: "16920",
    tier: "bronze-1"
  },
  {
    exp: "16980",
    tier: "bronze-2"
  },
  {
    exp: "17050",
    tier: "bronze-2"
  },
  {
    exp: "17120",
    tier: "bronze-2"
  },
  {
    exp: "17190",
    tier: "bronze-2"
  },
  {
    exp: "17260",
    tier: "bronze-2"
  },
  {
    exp: "17330",
    tier: "bronze-2"
  },
  {
    exp: "17400",
    tier: "bronze-2"
  },
  {
    exp: "17470",
    tier: "bronze-2"
  },
  {
    exp: "17540",
    tier: "bronze-2"
  },
  {
    exp: "17610",
    tier: "bronze-2"
  },
  {
    exp: "17680",
    tier: "bronze-3"
  },
  {
    exp: "17760",
    tier: "bronze-3"
  },
  {
    exp: "17840",
    tier: "bronze-3"
  },
  {
    exp: "17920",
    tier: "bronze-3"
  },
  {
    exp: "18000",
    tier: "bronze-3"
  },
  {
    exp: "18080",
    tier: "bronze-3"
  },
  {
    exp: "18160",
    tier: "bronze-3"
  },
  {
    exp: "18240",
    tier: "bronze-3"
  },
  {
    exp: "18320",
    tier: "bronze-3"
  },
  {
    exp: "18400",
    tier: "bronze-3"
  },
  {
    exp: "18480",
    tier: "bronze-4"
  },
  {
    exp: "18570",
    tier: "bronze-4"
  },
  {
    exp: "18660",
    tier: "bronze-4"
  },
  {
    exp: "18750",
    tier: "bronze-4"
  },
  {
    exp: "18840",
    tier: "bronze-4"
  },
  {
    exp: "18930",
    tier: "bronze-4"
  },
  {
    exp: "19020",
    tier: "bronze-4"
  },
  {
    exp: "19110",
    tier: "bronze-4"
  },
  {
    exp: "19200",
    tier: "bronze-4"
  },
  {
    exp: "19290",
    tier: "bronze-4"
  },
  {
    exp: "19380",
    tier: "silver-1"
  },
  {
    exp: "19480",
    tier: "silver-1"
  },
  {
    exp: "19580",
    tier: "silver-1"
  },
  {
    exp: "19680",
    tier: "silver-1"
  },
  {
    exp: "19780",
    tier: "silver-1"
  },
  {
    exp: "19880",
    tier: "silver-1"
  },
  {
    exp: "19980",
    tier: "silver-1"
  },
  {
    exp: "20080",
    tier: "silver-1"
  },
  {
    exp: "20180",
    tier: "silver-1"
  },
  {
    exp: "20280",
    tier: "silver-1"
  },
  {
    exp: "20380",
    tier: "silver-2"
  },
  {
    exp: "20480",
    tier: "silver-2"
  },
  {
    exp: "20580",
    tier: "silver-2"
  },
  {
    exp: "20680",
    tier: "silver-2"
  },
  {
    exp: "20780",
    tier: "silver-2"
  },
  {
    exp: "20880",
    tier: "silver-2"
  },
  {
    exp: "20980",
    tier: "silver-2"
  },
  {
    exp: "21080",
    tier: "silver-2"
  },
  {
    exp: "21180",
    tier: "silver-2"
  },
  {
    exp: "21280",
    tier: "silver-2"
  },
  {
    exp: "21380",
    tier: "silver-3"
  },
  {
    exp: "21480",
    tier: "silver-3"
  },
  {
    exp: "21580",
    tier: "silver-3"
  },
  {
    exp: "21680",
    tier: "silver-3"
  },
  {
    exp: "21780",
    tier: "silver-3"
  },
  {
    exp: "21880",
    tier: "silver-3"
  },
  {
    exp: "21980",
    tier: "silver-3"
  },
  {
    exp: "22080",
    tier: "silver-3"
  },
  {
    exp: "22180",
    tier: "silver-3"
  },
  {
    exp: "22280",
    tier: "silver-3"
  },
  {
    exp: "22380",
    tier: "silver-4"
  },
  {
    exp: "22480",
    tier: "silver-4"
  },
  {
    exp: "22580",
    tier: "silver-4"
  },
  {
    exp: "22680",
    tier: "silver-4"
  },
  {
    exp: "22780",
    tier: "silver-4"
  },
  {
    exp: "22880",
    tier: "silver-4"
  },
  {
    exp: "22980",
    tier: "silver-4"
  },
  {
    exp: "23080",
    tier: "silver-4"
  },
  {
    exp: "23180",
    tier: "silver-4"
  },
  {
    exp: "23280",
    tier: "silver-4"
  },
  {
    exp: "23380",
    tier: "gold-1"
  },
  {
    exp: "23480",
    tier: "gold-1"
  },
  {
    exp: "23580",
    tier: "gold-1"
  },
  {
    exp: "23680",
    tier: "gold-1"
  },
  {
    exp: "23780",
    tier: "gold-1"
  },
  {
    exp: "23880",
    tier: "gold-1"
  },
  {
    exp: "23980",
    tier: "gold-1"
  },
  {
    exp: "24080",
    tier: "gold-1"
  },
  {
    exp: "24180",
    tier: "gold-1"
  },
  {
    exp: "24280",
    tier: "gold-1"
  },
  {
    exp: "24380",
    tier: "gold-2"
  },
  {
    exp: "24480",
    tier: "gold-2"
  },
  {
    exp: "24580",
    tier: "gold-2"
  },
  {
    exp: "24680",
    tier: "gold-2"
  },
  {
    exp: "24780",
    tier: "gold-2"
  },
  {
    exp: "24880",
    tier: "gold-2"
  },
  {
    exp: "24980",
    tier: "gold-2"
  },
  {
    exp: "25080",
    tier: "gold-2"
  },
  {
    exp: "25180",
    tier: "gold-2"
  },
  {
    exp: "25280",
    tier: "gold-2"
  },
  {
    exp: "25380",
    tier: "gold-3"
  },
  {
    exp: "25480",
    tier: "gold-3"
  },
  {
    exp: "25580",
    tier: "gold-3"
  },
  {
    exp: "25680",
    tier: "gold-3"
  },
  {
    exp: "25780",
    tier: "gold-3"
  },
  {
    exp: "25880",
    tier: "gold-3"
  },
  {
    exp: "25980",
    tier: "gold-3"
  },
  {
    exp: "26080",
    tier: "gold-3"
  },
  {
    exp: "26180",
    tier: "gold-3"
  },
  {
    exp: "26280",
    tier: "gold-3"
  },
  {
    exp: "26380",
    tier: "gold-4"
  },
  {
    exp: "26480",
    tier: "gold-4"
  },
  {
    exp: "26580",
    tier: "gold-4"
  },
  {
    exp: "26680",
    tier: "gold-4"
  },
  {
    exp: "26780",
    tier: "gold-4"
  },
  {
    exp: "26880",
    tier: "gold-4"
  },
  {
    exp: "26980",
    tier: "gold-4"
  },
  {
    exp: "27080",
    tier: "gold-4"
  },
  {
    exp: "27180",
    tier: "gold-4"
  },
  {
    exp: "27280",
    tier: "gold-4"
  },
  {
    exp: "27380",
    tier: "emerald-1"
  },
  {
    exp: "27580",
    tier: "emerald-1"
  },
  {
    exp: "27780",
    tier: "emerald-1"
  },
  {
    exp: "27980",
    tier: "emerald-1"
  },
  {
    exp: "28180",
    tier: "emerald-1"
  },
  {
    exp: "28380",
    tier: "emerald-1"
  },
  {
    exp: "28580",
    tier: "emerald-1"
  },
  {
    exp: "28780",
    tier: "emerald-1"
  },
  {
    exp: "28980",
    tier: "emerald-1"
  },
  {
    exp: "29180",
    tier: "emerald-1"
  },
  {
    exp: "29380",
    tier: "emerald-2"
  },
  {
    exp: "29590",
    tier: "emerald-2"
  },
  {
    exp: "29800",
    tier: "emerald-2"
  },
  {
    exp: "30010",
    tier: "emerald-2"
  },
  {
    exp: "30220",
    tier: "emerald-2"
  },
  {
    exp: "30430",
    tier: "emerald-2"
  },
  {
    exp: "30640",
    tier: "emerald-2"
  },
  {
    exp: "30850",
    tier: "emerald-2"
  },
  {
    exp: "31060",
    tier: "emerald-2"
  },
  {
    exp: "31270",
    tier: "emerald-2"
  },
  {
    exp: "31480",
    tier: "emerald-3"
  },
  {
    exp: "31700",
    tier: "emerald-3"
  },
  {
    exp: "31920",
    tier: "emerald-3"
  },
  {
    exp: "32140",
    tier: "emerald-3"
  },
  {
    exp: "32360",
    tier: "emerald-3"
  },
  {
    exp: "32580",
    tier: "emerald-3"
  },
  {
    exp: "32800",
    tier: "emerald-3"
  },
  {
    exp: "33020",
    tier: "emerald-3"
  },
  {
    exp: "33240",
    tier: "emerald-3"
  },
  {
    exp: "33680",
    tier: "emerald-3"
  },
  {
    exp: "33460",
    tier: "emerald-4"
  },
  {
    exp: "33910",
    tier: "emerald-4"
  },
  {
    exp: "34140",
    tier: "emerald-4"
  },
  {
    exp: "34370",
    tier: "emerald-4"
  },
  {
    exp: "34600",
    tier: "emerald-4"
  },
  {
    exp: "34830",
    tier: "emerald-4"
  },
  {
    exp: "35060",
    tier: "emerald-4"
  },
  {
    exp: "35290",
    tier: "emerald-4"
  },
  {
    exp: "35520",
    tier: "emerald-4"
  },
  {
    exp: "35750",
    tier: "emerald-4"
  },
  {
    exp: "35980",
    tier: "platinum-1"
  },
  {
    exp: "36220",
    tier: "platinum-1"
  },
  {
    exp: "36460",
    tier: "platinum-1"
  },
  {
    exp: "36700",
    tier: "platinum-1"
  },
  {
    exp: "36940",
    tier: "platinum-1"
  },
  {
    exp: "37180",
    tier: "platinum-1"
  },
  {
    exp: "37420",
    tier: "platinum-1"
  },
  {
    exp: "37660",
    tier: "platinum-1"
  },
  {
    exp: "37900",
    tier: "platinum-1"
  },
  {
    exp: "38140",
    tier: "platinum-1"
  },
  {
    exp: "38380",
    tier: "platinum-2"
  },
  {
    exp: "38620",
    tier: "platinum-2"
  },
  {
    exp: "38860",
    tier: "platinum-2"
  },
  {
    exp: "39100",
    tier: "platinum-2"
  },
  {
    exp: "39340",
    tier: "platinum-2"
  },
  {
    exp: "39580",
    tier: "platinum-2"
  },
  {
    exp: "39820",
    tier: "platinum-2"
  },
  {
    exp: "40060",
    tier: "platinum-2"
  },
  {
    exp: "40300",
    tier: "platinum-2"
  },
  {
    exp: "40540",
    tier: "platinum-2"
  },
  {
    exp: "40780",
    tier: "platinum-3"
  },
  {
    exp: "41020",
    tier: "platinum-3"
  },
  {
    exp: "41260",
    tier: "platinum-3"
  },
  {
    exp: "41500",
    tier: "platinum-3"
  },
  {
    exp: "41740",
    tier: "platinum-3"
  },
  {
    exp: "41980",
    tier: "platinum-3"
  },
  {
    exp: "42220",
    tier: "platinum-3"
  },
  {
    exp: "42460",
    tier: "platinum-3"
  },
  {
    exp: "42700",
    tier: "platinum-3"
  },
  {
    exp: "42940",
    tier: "platinum-3"
  },
  {
    exp: "43180",
    tier: "platinum-4"
  },
  {
    exp: "43420",
    tier: "platinum-4"
  },
  {
    exp: "43660",
    tier: "platinum-4"
  },
  {
    exp: "43900",
    tier: "platinum-4"
  },
  {
    exp: "44140",
    tier: "platinum-4"
  },
  {
    exp: "44380",
    tier: "platinum-4"
  },
  {
    exp: "44620",
    tier: "platinum-4"
  },
  {
    exp: "44860",
    tier: "platinum-4"
  },
  {
    exp: "45100",
    tier: "platinum-4"
  },
  {
    exp: "45340",
    tier: "platinum-4"
  },
  {
    exp: "45580",
    tier: "crimson-1"
  },
  {
    exp: "45820",
    tier: "crimson-1"
  },
  {
    exp: "46060",
    tier: "crimson-1"
  },
  {
    exp: "46300",
    tier: "crimson-1"
  },
  {
    exp: "46540",
    tier: "crimson-1"
  },
  {
    exp: "46780",
    tier: "crimson-1"
  },
  {
    exp: "47020",
    tier: "crimson-1"
  },
  {
    exp: "47260",
    tier: "crimson-1"
  },
  {
    exp: "47500",
    tier: "crimson-1"
  },
  {
    exp: "47740",
    tier: "crimson-1"
  },
  {
    exp: "47980",
    tier: "crimson-2"
  },
  {
    exp: "48220",
    tier: "crimson-2"
  },
  {
    exp: "48460",
    tier: "crimson-2"
  },
  {
    exp: "48700",
    tier: "crimson-2"
  },
  {
    exp: "48940",
    tier: "crimson-2"
  },
  {
    exp: "49180",
    tier: "crimson-2"
  },
  {
    exp: "49420",
    tier: "crimson-2"
  },
  {
    exp: "49660",
    tier: "crimson-2"
  },
  {
    exp: "49900",
    tier: "crimson-2"
  },
  {
    exp: "50140",
    tier: "crimson-2"
  },
  {
    exp: "50380",
    tier: "crimson-3"
  },
  {
    exp: "50620",
    tier: "crimson-3"
  },
  {
    exp: "50860",
    tier: "crimson-3"
  },
  {
    exp: "51100",
    tier: "crimson-3"
  },
  {
    exp: "51340",
    tier: "crimson-3"
  },
  {
    exp: "51580",
    tier: "crimson-3"
  },
  {
    exp: "51820",
    tier: "crimson-3"
  },
  {
    exp: "52060",
    tier: "crimson-3"
  },
  {
    exp: "52300",
    tier: "crimson-3"
  },
  {
    exp: "52540",
    tier: "crimson-3"
  },
  {
    exp: "52780",
    tier: "crimson-4"
  },
  {
    exp: "53020",
    tier: "crimson-4"
  },
  {
    exp: "53260",
    tier: "crimson-4"
  },
  {
    exp: "53500",
    tier: "crimson-4"
  },
  {
    exp: "53740",
    tier: "crimson-4"
  },
  {
    exp: "53980",
    tier: "crimson-4"
  },
  {
    exp: "54220",
    tier: "crimson-4"
  },
  {
    exp: "54460",
    tier: "crimson-4"
  },
  {
    exp: "54700",
    tier: "crimson-4"
  },
  {
    exp: "54940",
    tier: "crimson-4"
  },
  {
    exp: "55180",
    tier: "amethyst-1"
  },
  {
    exp: "55420",
    tier: "amethyst-1"
  },
  {
    exp: "55660",
    tier: "amethyst-1"
  },
  {
    exp: "55900",
    tier: "amethyst-1"
  },
  {
    exp: "56140",
    tier: "amethyst-1"
  },
  {
    exp: "56380",
    tier: "amethyst-1"
  },
  {
    exp: "56620",
    tier: "amethyst-1"
  },
  {
    exp: "56860",
    tier: "amethyst-1"
  },
  {
    exp: "57100",
    tier: "amethyst-1"
  },
  {
    exp: "57340",
    tier: "amethyst-1"
  },
  {
    exp: "57580",
    tier: "amethyst-2"
  },
  {
    exp: "57820",
    tier: "amethyst-2"
  },
  {
    exp: "58060",
    tier: "amethyst-2"
  },
  {
    exp: "58300",
    tier: "amethyst-2"
  },
  {
    exp: "58540",
    tier: "amethyst-2"
  },
  {
    exp: "58780",
    tier: "amethyst-2"
  },
  {
    exp: "59020",
    tier: "amethyst-2"
  },
  {
    exp: "59260",
    tier: "amethyst-2"
  },
  {
    exp: "59500",
    tier: "amethyst-2"
  },
  {
    exp: "59740",
    tier: "amethyst-2"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-3"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "amethyst-4"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-1"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-2"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-3"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-1"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-2"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-3"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "grand-master-4"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-1"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-2"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-3"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "legendary-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-1"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-2"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-3"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  },
  {
    exp: "59980",
    tier: "chosen-one-4"
  }
]

export default levelExp
