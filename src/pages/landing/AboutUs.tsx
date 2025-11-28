import React from 'react';
import { Users, Award, Calendar, Target, ArrowRight } from 'lucide-react';

function AboutUs() {
  return (
    <div className="min-h-screen mt-12 bg-white">
      {/* Hero Section */}
      <div className="bg-[#004D40] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">About D'EventMatcha</h1>
          <p className="text-xl max-w-2xl">Your premier destination for exceptional event services and unforgettable experiences. We bring dreams to life with sophistication and style.</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#004D40]">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At D'EventMatcha, we're passionate about creating seamless connections between event service providers and those seeking extraordinary experiences. Our platform serves as the bridge that brings together expertise and aspirations, ensuring every event becomes a masterpiece.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-[#FF5722] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Network</h3>
              <p className="text-gray-600">Access to a curated network of professional event service providers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Award className="w-12 h-12 text-[#FF5722] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Quality Assured</h3>
              <p className="text-gray-600">Verified providers and consistent service excellence</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Calendar className="w-12 h-12 text-[#FF5722] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-gray-600">Streamlined booking process and event management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Target className="w-12 h-12 text-[#FF5722] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Custom Solutions</h3>
              <p className="text-gray-600">Tailored services to match your specific event needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#004D40]">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
              alt="CEO"
              className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Vicent Oke</h3>
            <p className="text-gray-600">Chief Executive Officer</p>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
              alt="COO"
              className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Adesola Oladejo</h3>
            <p className="text-gray-600">Chief Executive Officer</p>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
              alt="CTO"
              className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">John Deo</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#004D40] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Perfect Event?</h2>
          <p className="text-xl mb-8">Join D'EventMatcha today and discover the difference</p>
          <button className="bg-[#FF5722] text-white px-8 py-3 rounded-full font-semibold flex items-center mx-auto hover:bg-[#F4511E] transition-colors">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;