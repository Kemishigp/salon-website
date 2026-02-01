import React from 'react';

interface ServiceProps {
  image: string;
  title: string;
  price: string | number;
  duration: string | number;
  description: string;
}

const ServiceCard = ({ image, title, price, duration, description }: ServiceProps) => (
  <div className="flex flex-col gap-6 group">
    <div className="overflow-hidden rounded-xl aspect-[4/3]">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
    </div>

    <div className="flex justify-between items-start">
      <h3 className="text-2xl font-serif uppercase tracking-widest leading-tight max-w-[70%] text-white">
        {title}
      </h3>
      <button className="border border-white/40 px-8 py-2 rounded-full text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">
        Select
      </button>
    </div>

    <div className="space-y-4">
      <p className="text-gray-400 text-sm leading-relaxed font-sans font-light">
        {description}
      </p>
      <div className="flex gap-4 text-sm font-medium text-white">
        <span>${price}+</span>
        <span className="text-gray-500">|</span>
        <span>{duration} min</span>
      </div>
      
      <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
         <span className="text-[9px] uppercase font-black tracking-tighter text-white italic">Klarna</span>
         <span className="text-[9px] uppercase font-bold text-white">affirm</span>
         <span className="text-[9px] uppercase font-bold text-white">Afterpay</span>
      </div>
    </div>
  </div>
);

// 2. Keep this as the ONLY default export
export default function ServicesPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 lg:px-16 pb-20">
      <h1 className="text-6xl md:text-8xl font-serif uppercase mb-12 tracking-tighter">
        Services
      </h1>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        <ServiceCard 
          image="/blowout.jpg"
          title="Blowout"
          price="65"
          duration="60"
          description="Come and get your hair washed and styled so you don't have to!"
        />
        <ServiceCard 
          image="/custom-blonding.webp"
          title="Full Custom Blonding"
          price="320"
          duration="270"
          description="This is for anyone wanting to be primarily blonde throughout the whole head! Any tones can be chosen. This package includes everything but a cut."
        />
          <ServiceCard 
          image="/cuts.jpeg"
          title="Women's cut"
          price="65"
          duration="75"
          description=""
        />        
        <ServiceCard 
          image="/extensions.webp"
          title="Hair Extensions"
          price="1450"
          duration="150"
          description="This is 2 beaded weft extensions! You should be able to fullness AND length from this service"
        />              
        <ServiceCard 
          image="/highlights.jpeg"
          title="highlights"
          price="285"
          duration="210"
          description=""
        />
      </div>
    </main>
  );
}