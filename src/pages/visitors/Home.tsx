import React, { useState } from "react";
import { content } from "../../libs/data/contentData";

const Home = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const t = content[language];

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fas fa-hands-helping text-[#D4AF37] text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-[#D4AF37]">Akwabless</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="hover:text-[#D4AF37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.about}
            </a>
            <a
              href="#projects"
              className="hover:text-[#D4AF37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.projects}
            </a>
            <a
              href="#impact"
              className="hover:text-[#D4AF37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.impact}
            </a>
            <a
              href="#join"
              className="hover:text-[#D4AF37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.joinUs}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                language === "en" ? "bg-[#F5F5DC] text-[#228B22]" : ""
              }`}
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                language === "fr" ? "bg-[#F5F5DC] text-[#228B22]" : ""
              }`}
            >
              🇫🇷 FR
            </button>
            <button className="md:hidden text-[#228B22]">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        className="pt-20 relative min-h-[600px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=A%20joyful%20diverse%20African%20community%20gathering%20with%20people%20of%20different%20ages%20smiling%20and%20helping%20each%20other%2C%20showing%20humanitarian%20acts%20of%20kindness%20and%20community%20support%2C%20with%20warm%20sunlight%20creating%20a%20spiritual%20and%20hopeful%20atmosphere%2C%20high%20quality%20photorealistic&width=1440&height=600&seq=hero1&orientation=landscape')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#D4AF37] hover:bg-[#C09B2D] text-white px-6 py-3 rounded-button text-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              {t.hero.joinButton}
            </button>
            <button className="bg-transparent hover:bg-white/20 border-2 border-white text-white px-6 py-3 rounded-button text-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
              {t.hero.exploreButton}
            </button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-16 bg-[#F5F5DC]/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#228B22]">
                {t.about.title}
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                {t.about.description}
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#D4AF37] mb-6">
                <p className="italic text-lg mb-2">{t.about.founderQuote}</p>
                <p className="text-right font-medium">{t.about.founder}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#228B22]">
                Timeline
              </h3>
              <div className="space-y-4">
                {Object.entries(t.about.timeline).map(([year, event]) => (
                  <div key={year} className="flex">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold">
                        {year}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-lg">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Impact Section */}
      <section id="impact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#228B22]">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="text-[#D4AF37] mb-4">
                <i className="fas fa-hand-holding-usd text-5xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                {t.impact.fundsAmount}
              </h3>
              <p className="text-lg text-gray-600">{t.impact.funds}</p>
            </div>
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="text-[#D4AF37] mb-4">
                <i className="fas fa-child text-5xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                {t.impact.childrenAmount}
              </h3>
              <p className="text-lg text-gray-600">{t.impact.children}</p>
            </div>
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="text-[#D4AF37] mb-4">
                <i className="fas fa-home text-5xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                {t.impact.orphanagesAmount}
              </h3>
              <p className="text-lg text-gray-600">{t.impact.orphanages}</p>
            </div>
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="text-[#D4AF37] mb-4">
                <i className="fas fa-plane-departure text-5xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                {t.impact.sponsoredAmount}
              </h3>
              <p className="text-lg text-gray-600">{t.impact.sponsored}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#228B22]">
            {t.projects.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=African%20orphanage%20with%20children%20and%20caretakers%20in%20a%20classroom%20setting%2C%20with%20educational%20materials%20visible%2C%20bright%20and%20clean%20environment%2C%20natural%20lighting%20through%20windows%2C%20children%20engaged%20in%20learning%20activities%2C%20photorealistic%20style&width=600&height=400&seq=project1&orientation=landscape"
                  alt="Sunrise Orphanage"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">
                    {t.projects.project1.title}
                  </h3>
                  <span className="bg-[#F5F5DC] text-[#228B22] text-xs px-2 py-1 rounded-full">
                    {t.projects.project1.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {t.projects.project1.description}
                </p>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#D4AF37] h-2.5 rounded-full"
                      style={{ width: `${t.projects.project1.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>{t.projects.project1.progress}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <button className="w-full bg-[#228B22] hover:bg-[#1A6B1A] text-white py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
                  {t.projects.project1.button}
                </button>
              </div>
            </div>
            {/* Project 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=African%20students%20in%20a%20classroom%20or%20university%20setting%2C%20diverse%20group%20of%20young%20adults%20with%20books%20and%20learning%20materials%2C%20focused%20on%20education%2C%20bright%20environment%20with%20natural%20lighting%2C%20some%20students%20wearing%20traditional%20African%20clothing%2C%20photorealistic%20style&width=600&height=400&seq=project2&orientation=landscape"
                  alt="Scholarship Program"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">
                    {t.projects.project2.title}
                  </h3>
                  <span className="bg-[#F5F5DC] text-[#228B22] text-xs px-2 py-1 rounded-full">
                    {t.projects.project2.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {t.projects.project2.description}
                </p>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#D4AF37] h-2.5 rounded-full"
                      style={{ width: `${t.projects.project2.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>{t.projects.project2.progress}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <button className="w-full bg-[#228B22] hover:bg-[#1A6B1A] text-white py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
                  {t.projects.project2.button}
                </button>
              </div>
            </div>
            {/* Project 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=African%20people%20at%20an%20airport%20or%20embassy%20with%20travel%20documents%2C%20suitcases%20visible%2C%20some%20people%20being%20assisted%20with%20paperwork%20by%20helpers%2C%20professional%20setting%20with%20natural%20lighting%2C%20mix%20of%20traditional%20and%20modern%20clothing%2C%20photorealistic%20style&width=600&height=400&seq=project3&orientation=landscape"
                  alt="Travel Assistance"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">
                    {t.projects.project3.title}
                  </h3>
                  <span className="bg-[#F5F5DC] text-[#228B22] text-xs px-2 py-1 rounded-full">
                    {t.projects.project3.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {t.projects.project3.description}
                </p>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#D4AF37] h-2.5 rounded-full"
                      style={{ width: `${t.projects.project3.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>{t.projects.project3.progress}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <button className="w-full bg-[#228B22] hover:bg-[#1A6B1A] text-white py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
                  {t.projects.project3.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-[#228B22]/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#228B22]">
            {t.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="text-[#D4AF37] opacity-20 absolute top-4 left-4 text-6xl leading-none">
                <i className="fas fa-quote-left"></i>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-[#F5F5DC] flex items-center justify-center">
                  <i className="fas fa-user text-[#D4AF37] text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-bold">
                    {t.testimonials.testimonial1.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.testimonials.testimonial1.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 relative z-10">
                {t.testimonials.testimonial1.quote}
              </p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="text-[#D4AF37] opacity-20 absolute top-4 left-4 text-6xl leading-none">
                <i className="fas fa-quote-left"></i>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-[#F5F5DC] flex items-center justify-center">
                  <i className="fas fa-user text-[#D4AF37] text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-bold">
                    {t.testimonials.testimonial2.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.testimonials.testimonial2.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 relative z-10">
                {t.testimonials.testimonial2.quote}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section
        id="join"
        className="py-16 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 139, 34, 0.8), rgba(34, 139, 34, 0.8)), url('https://readdy.ai/api/search-image?query=African%20community%20members%20with%20hands%20joined%20in%20unity%2C%20diverse%20group%20of%20people%20in%20a%20circle%20showing%20solidarity%20and%20support%2C%20spiritual%20atmosphere%20with%20soft%20lighting%2C%20some%20traditional%20African%20elements%20visible%20in%20background%2C%20photorealistic%20style&width=1440&height=400&seq=cta&orientation=landscape')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.cta.title}</h2>
          <button className="bg-[#D4AF37] hover:bg-[#C09B2D] text-white px-8 py-3 rounded-button text-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
            {t.cta.button}
          </button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#228B22] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About & Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.about}</h3>
              <p className="mb-4">{t.footer.aboutText}</p>
              <h4 className="font-bold mt-6 mb-2">{t.footer.contact}</h4>
              <p className="flex items-center mb-2">
                <i className="fas fa-phone mr-2"></i> {t.footer.phone}
              </p>
              <p className="flex items-center">
                <i className="fas fa-envelope mr-2"></i> {t.footer.email}
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.links}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {t.nav.projects}
                  </a>
                </li>
                <li>
                  <a
                    href="#impact"
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {t.nav.impact}
                  </a>
                </li>
                <li>
                  <a
                    href="#join"
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {t.nav.joinUs}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-[#D4AF37] cursor-pointer"
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#D4AF37] cursor-pointer"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#D4AF37] cursor-pointer"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#D4AF37] cursor-pointer"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer.newsletter}</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder={t.footer.newsletterPlaceholder}
                    className="w-full px-4 py-2 rounded-button text-gray-800 border-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#C09B2D] text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t.footer.subscribe}
                </button>
              </form>
              <div className="mt-6 flex items-center space-x-4">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                    language === "en"
                      ? "bg-white text-[#228B22]"
                      : "bg-[#228B22] border border-white"
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                    language === "fr"
                      ? "bg-white text-[#228B22]"
                      : "bg-[#228B22] border border-white"
                  }`}
                >
                  🇫🇷 FR
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
