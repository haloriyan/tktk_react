const config = {
    // baseUrl: 'http://172.20.10.3:8000',
    // baseUrl: 'https://app.dailyhotels.id',
    app_name: "Takotoko",
    baseUrl: 'http://127.0.0.1:8000',
    primaryColor: '#2196f3',
    google_api_key: "AIzaSyAjDwk9KS9IQBm4FFoATMlZzw_ciH5UvIg",
    google_client_id: "332936812920-khr78bv7meit1vovvsbug97ptl43sgts.apps.googleusercontent.com",
    google_client_secret: "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",
    rajaongkir: "c568e39b6403b4bfa2f41284c2f85d30",
    colors: {
        green: '#2ecc71',
        grey: '#ddd',
        red: '#e74c3c',
        redDark: '#c0392b',
        yellow: '#fcd840',
        text: '#001F33'
    },
    organizer_types: [
        'Brand', 'Cafe & Resto', 'Co-working Space', 'Community', 'Corporate', 'Digital Agency', 'Entertainment',
        'Event Organizer', 'Government', 'Hospital', 'Hotel', 'Media', 'Music', 'School', 'Startup', 'Travel Agency',
        'University'
    ],
    organizer_interests: [
        'Accommodation', 'Attraction & Themepark', 'Competition', 'Concert', 'Conference',
        'Exhibition', 'Festival & Fair', 'Meetup & Gathering', 'Seminar & Talkshow',
        'Show & Performance', 'Workshop'
    ],
    event_topics: [
        "Anak, Keluarga", "Bisnis", "Desain, Foto, Video", "Fashion, Kecantikan",
        "Film, Sinema", "Game, E-Sports", "Hobi, Kerajinan Tangan", "Investasi, Saham", "Karir, Pengembangan Diri",
        "Kesehatan, Kebugaran", "Keuangan, Finansial", "Lingkungan Hidup", "Lifestyle", "Makanan, Minuman",
        "Marketing", "Musik", "Olahraga", "Otomotif", "Sains, Teknologi", "Seni, Budaya", "Wisata, Liburan",
        "Lainnya"
    ],
    sponsor_typesss: [
        'a_Platinum', 'b_Gold', 'c_Silver', 'd_Bronze'
    ],
    sponsor_types: [
        {
            name: "a_Platinum",
            background: "#E5E4E2",
            color: "#333"
        },
        {
            name: "b_Gold",
            background: "#fcd840",
            color: "#333"
        },
        {
            name: "c_Silver",
            background: "#C0C0C0",
            color: "#333"
        },
        {
            name: "d_Bronze",
            background: "#CD7F32",
            color: "#fff"
        }
    ],
    event_categories: [
        {
            name: "Exhibition",
            synonim: "Expo, Pameran",
            image: "Exhibition.jpg",
        },
        {
            name: "Workshop",
            synonim: "Pelatihan, Training",
            image: "Workshop.jpg",
        },
        {
            name: "Conference",
            synonim: "Konferensi, MICE",
            image: "Conference.jpg",
        },
        {
            name: "Live Music & Concert",
            synonim: "Konser",
            image: "Concert.jpg",
        },
        {
            name: "Festival",
            synonim: "Fair, Bazar",
            image: "Festival_Fair.jpg",
        },
        {
            name: "Show & Performance",
            synonim: "Konferensi, MICE",
            image: "Show_Performance.jpg",
        },
        {
            name: "Attraction",
            synonim: "Wahana, Destinasi Wisata",
            image: "Attraction.jpg",
        },
        {
            name: "Akomodasi",
            synonim: "Hotel, Villa, Resort",
            image: "Accommodation.jpg",
        },
        {
            name: "Show & Performance",
            synonim: "Konferensi, MICE",
            image: "Show_Performance.jpg",
        },
        {
            name: "Seminar",
            synonim: "Talkshow, Webinar",
            image: "Seminar_Talkshow.jpg",
        },
        {
            name: "Meetup",
            synonim: "Gathering, Arisan",
            image: "Meetup_Gathering.jpg",
        },
        {
            name: "Competition",
            synonim: "Lomba, Turnamen",
            image: "Competition.jpg",
        },
        {
            name: "Lainnya",
            synonim: "",
            image: "Conference.jpg",
        },
    ]
}

module.exports = config;
