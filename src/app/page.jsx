import Link from "next/link";
import Image from "next/image";
import { FaBaby, FaUserNurse, FaHandHoldingHeart, FaQuoteLeft, FaCheckCircle, FaUsers, FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-10">

      {/* Hero / Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 px-8 py-20 md:py-32 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Compassionate Care,<br /> Right When You Need It
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-blue-50">
            Professional caregivers for your loved ones. From babies to the elderly, we ensure safety, comfort, and peace of mind.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/find" className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-none shadow-md">
              Find a Caregiver
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Redesigned */}
      <section className="py-12 bg-gray-50 rounded-3xl">
        <div className="text-center max-w-3xl mx-auto px-6 mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-3">
            Our Mission
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Driven by Compassion, <br /> Defined by Quality
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At Care.IO, we bridge the gap between families and professional caregivers. We exist to ensure that every hire is safe, every care is genuine, and every family finds peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12">
          <FeatureCard
            icon={<FaCheckCircle className="text-3xl text-green-500" />}
            title="Verified Pros"
            desc="Every caregiver undergoes a rigorous background check."
          />
          <FeatureCard
            icon={<FaUserNurse className="text-3xl text-blue-500" />}
            title="24/7 Support"
            desc="Our team is always available to assist with your needs."
          />
          <FeatureCard
            icon={<FaHandHoldingHeart className="text-3xl text-pink-500" />}
            title="Secure Payments"
            desc="Hassle-free, transparent, and secure transaction process."
          />
          <FeatureCard
            icon={<FaStar className="text-3xl text-yellow-500" />}
            title="Top Rated"
            desc="Only high-quality service providers make it to our platform."
          />
        </div>
      </section>

      {/* Services Overview */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600">
            Tailored care solutions for every stage of life. Choose the service that fits your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <ServiceCard
            icon={<FaBaby className="text-4xl text-pink-500" />}
            title="Baby Care"
            desc="Experienced nannies and babysitters to keep your little ones safe and happy."
            color="bg-pink-50"
          />
          {/* Service 2 */}
          <ServiceCard
            icon={<FaUserNurse className="text-4xl text-blue-500" />}
            title="Elderly Care"
            desc="Compassionate support for seniors, including medical assistance and companionship."
            color="bg-blue-50"
          />
          {/* Service 3 */}
          <ServiceCard
            icon={<FaHandHoldingHeart className="text-4xl text-purple-500" />}
            title="Special Needs"
            desc="Specialized care for sick or recovering individuals requiring extra attention."
            color="bg-purple-50"
          />
        </div>
      </section>

      {/* Testimonials / Metrics */}
      <section className="bg-gray-900 rounded-3xl p-8 md:p-16 text-white text-center">
        <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-700">
          <Metric number="500+" label="Verified Caregivers" icon={<FaUsers />} />
          <Metric number="12,000+" label="Hours of Care" icon={<FaCheckCircle />} />
          <Metric number="4.9/5" label="Average Rating" icon={<FaStar />} />
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl relative">
          <FaQuoteLeft className="absolute top-4 left-4 text-4xl text-gray-600" />
          <p className="text-xl md:text-2xl font-medium italic relative z-10">
            "Finding a reliable nurse for my father was a nightmare until I found Care.IO. The process was seamless and the caregiver was an angel."
          </p>
          <div className="mt-6">
            <p className="font-bold text-lg">Sarah Jenkins</p>
            <p className="text-gray-400">Mother & Daughter</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ready to find the perfect care?</h2>
        <Link href="/find" className="btn btn-primary btn-wide rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
          Get Started Now
        </Link>
      </section>

    </div>
  );
}

function ServiceCard({ icon, title, desc, color }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group">
      <div className={`w-20 h-20 rounded-full ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function Metric({ number, label, icon }) {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="text-blue-400 text-3xl mb-4 opacity-80">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
      <div className="text-gray-400 font-medium">{label}</div>
    </div>
  )
}
function FeatureCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-gray-50 rounded-full">
                {icon}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}
