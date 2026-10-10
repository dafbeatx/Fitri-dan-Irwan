import { BankAccount, GalleryPhoto, StoryTimelineItem } from "@/types/wedding";

export const weddingData = {
  couple: {
    bride: {
      fullName: "Fitri Ani Rahayu, S.Mat",
      shortName: "Fitri",
      role: "Mempelai Wanita",
      parents: "Putri dari Bapak Saptoni (Alm) & Ibu Ade Irma Hayati",
      parentOrigin: "Kp. Cemplang, RT 03 RW 09 Cibungbulang, Kab. Bogor",
      avatar: "/images/pas-foto-fitri-transparent.png",
      bio: "Wanita yang teduh hatinya, penuh kehangatan, dan mencintai kebaikan.",
    },
    groom: {
      fullName: "Irwan Supriatna",
      shortName: "Irwan",
      role: "Mempelai Pria",
      parents: "Putra dari Bapak Mairan & Ibu Erun (Almh)",
      parentOrigin: "Kp. Cipeundeuy RT 05 / RW 01",
      avatar: "/images/pas-foto-irwan-transparent.png",
      bio: "Pria yang teguh, berdedikasi, dan siap membimbing keluarga menuju ridho Allah SWT.",
    },
  },

  coupleIntro: "Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan diantara putra-putri kami :",

  quranVerse: {
    surah: "QS. Ar-Rum Ayat 21",
    arabic: "وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ",
    translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
  },

  events: {
    targetDateIso: "2026-10-23T08:00:00+07:00",
    dateFormatted: "Jum'at, 23 Oktober 2026",
    invitationIntro: "Dengan memohon Rahmat dan Ridho Allah SWT. kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri Acara Pernikahan putra-putri kami, yang Insya Allah akan diselenggarakan pada :",
    venueTitle: "Kediaman Mempelai Wanita",
    venueAddress: "Kp. Cemplang, RT 03 RW 09 Cibungbulang, Kab. Bogor",
    akad: {
      title: "Akad Nikah",
      day: "Jum'at",
      date: "23 Oktober 2026",
      time: "Pukul : 08.00 WIB s/d Selesai",
      locationName: "Kediaman Mempelai Wanita",
      address: "Kp. Cemplang, RT 03 RW 09 Cibungbulang, Kab. Bogor",
      notes: "Dimohon hadir tepat waktu untuk menjaga kekhidmatan prosesi ijab qobul.",
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      day: "Jum'at",
      date: "23 Oktober 2026",
      time: "Pukul : 08.00 - 16.00 WIB",
      locationName: "Kediaman Mempelai Wanita",
      address: "Kp. Cemplang, RT 03 RW 09 Cibungbulang, Kab. Bogor",
      notes: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
    },
    locationMap: {
      venueTitle: "Kediaman Mempelai Wanita (Kp. Cemplang)",
      googleMapsUrl: "https://maps.app.goo.gl/psU9hwanQsbheV8h9",
      embedUrl: "https://www.google.com/maps?q=-6.5826667,106.6566389&hl=id&z=17&output=embed",
    },
  },

  closing: {
    gratitude: "Atas kehadiran dan do'a restu Bapak/Ibu/Saudara/i, kami ucapkan terimakasih",
    signer: "Kami Yang Berbahagia",
    names: "Fitri & Irwan",
  },

  loveStory: [
    {
      year: "2021",
      title: "Awal Berjumpa",
      description: "Pertemuan pertama yang mengawali kisah. Sebuah percakapan sederhana yang menumbuhkan rasa saling menghargai dan bertukar pandangan hidup.",
    },
    {
      year: "2023",
      title: "Komitmen Bersama",
      description: "Dengan niat yang tulus dan doa restu kedua keluarga, kami memantapkan langkah untuk saling mendampingi menuju masa depan bersama.",
    },
    {
      year: "2026",
      title: "Hari Pertunangan (Khitbah)",
      description: "Momen sakral saat keluarga besar saling bersilaturahmi dan memantapkan langkah untuk menyatukan dua hati dalam ikatan pernikahan suci.",
    },
    {
      year: "23 Okt 2026",
      title: "Menuju Bahtera Bahagia",
      description: "Insya Allah, ikrar suci akan terucap pada hari Jumat, 23 Oktober 2026. Awal perjalanan baru kami sebagai sepasang suami istri yang sakinah, mawaddah, warahmah.",
    },
  ] as StoryTimelineItem[],

  gallery: [
    {
      id: "gal-1",
      src: "/images/fitri-irwan-asli.png",
      alt: "Foto Asli Fitri dan Irwan",
      caption: "Potret Bahagia Fitri & Irwan",
    },
    {
      id: "gal-2",
      src: "/images/bu-fitri-asli.png",
      alt: "Foto Mempelai Wanita Fitriani",
      caption: "Mempelai Wanita (Fitri)",
    },
    {
      id: "gal-3",
      src: "/images/cover-card.png",
      alt: "Momen Bersama Fitri & Irwan",
      caption: "Menuju Hari Bahagia 23 Oktober 2026",
    },
    {
      id: "gal-4",
      src: "/images/fitri-irwan-asli.png",
      alt: "Kebahagiaan Fitri & Irwan",
      caption: "Tawa dan Rasa Syukur Bersama",
    },
  ] as GalleryPhoto[],

  gifts: {
    intro: "Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menyalurkannya melalui rekening berikut:",
    accounts: [
      {
        bankName: "BCA",
        accountNumber: "7410805477",
        accountHolder: "Irwan Supriatna",
        logoUrl: "/images/bca-logo.svg",
      },
    ] as BankAccount[],
    qris: {
      enabled: false,
      imageSrc: "/images/qris.png",
      title: "QRIS Tanda Kasih",
      description: "Dapat dipindai melalui aplikasi m-Banking atau e-Wallet apapun",
    },
    confirmationPhone: "",
  },

  audio: {
    src: "/audio/spencer-combs-you-are-mine.mp3",
    title: "Spencer Combs (Feat Holley Maher) - You Are Mine",
  },
};

