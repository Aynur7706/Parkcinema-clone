import { t, useLanguage } from '../../../shared/i18n/language.js';
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const contacts = [
  {
    name: "Park Bulvar",
    hours: "10:00 - 01:00",
    address: "Neftçilər pr-ti 78, Park Bulvar Əyləncə Mərkəzi, 4-cü mərtəbə",
    phone: "055 203 61 22",
  },
  {
    name: "Metro Park",
    hours: "10:00 - 01:00",
    address: "Təbriz küç., 44, Metro Park AVM, 6-cı mərtəbə",
    phone: "055 203 61 26",
  },
  {
    name: "Flame Towers",
    hours: "10:00 - 01:00",
    address: "M. Hüseyn küç., 1 A, Alov qüllələri kompleksi",
    phone: "055 203 61 30",
  },
  {
    name: "Sevinc Mall",
    hours: "10:00 - 01:00",
    address: "Nizami rayonu, 8-ci kilometr qəsəbəsi, Tofiq Abbasov küçəsi, 5",
    phone: "055 203 61 31",
  },
  {
    name: "Shahdag",
    hours: "10:00 - 01:00",
    address: "Qusar r., Laza k., Şahdağ Turistik Kompleksi",
    phone: "+994 12 598 74 14",
  },
  {
    name: "CaspiMayr Hall",
    hours: "20:00 - 01:00",
    address: "Retreat Beach Resort by CaspiMayr",
    phone: "+994 55 222 13 10",
  },
];

function ContactPage() {
  useLanguage();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.message) {
      toast.error(t("Ad, email və mesaj xanalarını doldurun"));
      return;
    }

    toast.success(t("Müraciətiniz qeydə alındı"));
    setForm({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="mt-32 px-3 pb-16 mx-auto w-full md:w-[90%] text-[#D9DADB]">
      <h1 className="text-white text-[32px] font-semibold mb-6">{t("Əlaqə")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((item) => (
          <div key={t(item.name)} className="bg-[#4D4D4D] rounded-xl p-5">
            <h2 className="text-white text-xl font-semibold mb-4">{t(item.name)}</h2>
            <div className="flex flex-col gap-3 text-sm">
              <p className="flex items-center gap-2">
                <FaClock className="text-[#D52B1E]" />
                {item.hours}
              </p>
              <p className="flex items-start gap-2">
                <FaLocationDot className="text-[#D52B1E] mt-1 shrink-0" />
                {item.address}
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#D52B1E]" />
                {item.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-[#4D4D4D] rounded-xl p-5">
          <h2 className="text-white text-xl font-semibold mb-4">{t("Bilet sifarişi üçün")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {contacts.slice(0, 4).map((item) => (
              <p key={t(item.name)}>
                <span className="font-semibold text-white">{t(item.name)}: </span>
                {item.phone}
              </p>
            ))}
          </div>

          <h2 className="text-white text-xl font-semibold mt-8 mb-4">{t(" Reklam yerləşdirilməsi üçün ")}</h2>
          <p>+994 70 780 00 23</p>
          <p>+994 50 255 20 23</p>
          <p>uzeyir@parkcinema.az</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#4D4D4D] rounded-xl p-5 flex flex-col gap-4">
          <h2 className="text-white text-xl font-semibold">{t("Təklif və müraciətlər")}</h2>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="bg-transparent border-b border-white outline-none py-3"
            placeholder="Ad Soyad"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="bg-transparent border-b border-white outline-none py-3"
            placeholder="E-mail"
            type="email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="bg-transparent border-b border-white outline-none py-3"
            placeholder={t("Telefon")}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="bg-transparent border border-white rounded-lg outline-none p-3 min-h-[140px]"
            placeholder={t("Mesaj")}
          />
          <button className="self-end bg-[#D52B1E] hover:bg-[#A81A1A] duration-200 text-white rounded-[20px] px-8 py-2">{t(" Göndər ")}</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
