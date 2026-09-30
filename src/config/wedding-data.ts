import { BankAccount, GalleryPhoto, StoryTimelineItem } from "@/types/wedding";

export const weddingData = {
  couple: {
    bride: {
      fullName: "Fitriani Nurul Hidayah, S.Pd.",
      shortName: "Fitri",
      role: "Mempelai Wanita",
      parents: "Putri kedua dari Bpk. H. Ahmad Subagio & Ibu Hj. Siti Maryam",
      instagram: "fitriani.hidayah",
      avatar: "/images/bride.jpg",
      bio: "Wanita yang teduh hatinya, penuh kehangatan, dan mencintai dunia pendidikan.",
    },
    groom: {
      fullName: "Irwan Kurniawan, S.Kom.",
      shortName: "Irwan",
      role: "Mempelai Pria",
      parents: "Putra pertama dari Bpk. H. Bambang Sudirman & Ibu Hj. Nurhayati",
      instagram: "irwan.kurniawan",
      avatar: "/images/groom.jpg",
      bio: "Pria yang teguh, berdedikasi, dan siap membimbing keluarga menuju ridho Allah SWT.",
    },
  },

  quranVerse: {
    surah: "QS. Ar-Rum Ayat 21",
    arabic: "وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ",
    translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
  },

  events: {
    targetDateIso: "2026-12-12T08:00:00+07:00",
    dateFormatted: "Sabtu, 12 Desember 2026",
    akad: {
      title: "Akad Nikah",
      day: "Sabtu",
      date: "12 Desember 2026",
      time: "08.00 - 10.00 WIB",
      locationName: "Masjid Raya & Ballroom Graha Harmony",
      address: "Jl. Taman Cempaka No. 88, Kebayoran Baru, Jakarta Selatan",
      notes: "Dimohon hadir tepat waktu untuk menjaga kekhidmatan prosesi ijab qobul.",
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      day: "Sabtu",
      date: "12 Desember 2026",
      time: "11.00 - 14.30 WIB",
      locationName: "Grand Ballroom Graha Harmony",
      address: "Jl. Taman Cempaka No. 88, Kebayoran Baru, Jakarta Selatan",
      notes: "Drescode: Busana Formal bernuansa Sage Green, Earth Tone, atau Batik.",
    },
    locationMap: {
      venueTitle: "Graha Harmony Ballroom",
      googleMapsUrl: "https://maps.google.com/?q=Jakarta+Selatan",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28298717878!2d106.74438318464161!3d-6.262590240974868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a26d787799%3A0x301576d14fedac0!2sJakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000",
    },
  },

  loveStory: [
    {
      year: "2021",
      title: "Awal Berjumpa",
      description: "Pertemuan pertama dalam sebuah forum kepemudaan. Sebuah percakapan sederhana yang mengawali rasa saling menghargai dan bertukar pandangan hidup.",
    },
    {
      year: "2023",
      title: "Komitmen Bersama",
      description: "Dengan niat yang lurus dan restu dari kedua keluarga, kami memutuskan untuk saling mendampingi dan mempersiapkan diri menuju jenjang yang lebih berkah.",
    },
    {
      year: "2026",
      title: "Hari Pertunangan (Khitbah)",
      description: "Momen sakral saat keluarga besar saling bersilaturahmi dan memantapkan langkah untuk menyatukan dua hati dalam ikatan pernikahan suci.",
    },
    {
      year: "12 Des 2026",
      title: "Menuju Bahtera Bahagia",
      description: "Insya Allah, ikrar suci akan terucap. Awal perjalanan baru kami sebagai sepasang suami istri untuk saling menyayangi hingga akhir hayat.",
    },
  ] as StoryTimelineItem[],

  gallery: [
    {
      id: "gal-1",
      src: "/images/gallery-1.jpg",
      alt: "Momen Bahagia Fitri dan Irwan",
      caption: "Kehangatan dalam senyuman bersama",
    },
    {
      id: "gal-2",
      src: "/images/gallery-2.jpg",
      alt: "Foto Prewedding Outdoor",
      caption: "Menatap masa depan dengan penuh rasa syukur",
    },
    {
      id: "gal-3",
      src: "/images/gallery-3.jpg",
      alt: "Momen Prosesi Khitbah",
      caption: "Langkah awal mengikat janji suci",
    },
    {
      id: "gal-4",
      src: "/images/gallery-4.jpg",
      alt: "Potret Bersama di Bawah Pepohonan",
      caption: "Teduh dan penuh ketenangan dalam kebersamaan",
    },
    {
      id: "gal-5",
      src: "/images/gallery-5.jpg",
      alt: "Cincin Pengikat Janji",
      caption: "Simbol komitmen suci dua insan",
    },
    {
      id: "gal-6",
      src: "/images/gallery-6.jpg",
      alt: "Tawa dan Keceriaan Bersama",
      caption: "Kebahagiaan yang sederhana namun bermakna mendalam",
    },
  ] as GalleryPhoto[],

  gifts: {
    intro: "Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menyalurkannya melalui rekening berikut:",
    accounts: [
      {
        bankName: "BCA",
        accountNumber: "5420189281",
        accountHolder: "Fitriani Nurul Hidayah",
      },
      {
        bankName: "Bank Mandiri",
        accountNumber: "1370019283719",
        accountHolder: "Irwan Kurniawan",
      },
    ] as BankAccount[],
    qris: {
      enabled: true,
      imageSrc: "/images/qris.png",
      title: "QRIS Tanda Kasih",
      description: "Dapat dipindai melalui aplikasi m-Banking atau e-Wallet apapun (GoPay, OVO, Dana, ShopeePay)",
    },
    confirmationPhone: "6281234567890",
  },

  audio: {
    src: "/audio/wedding-melody.mp3",
    title: "Acoustic Wedding Serenade",
  },
};
