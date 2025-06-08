"use client";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({ icon, title, description, index = 0 }: ServiceCardProps) {
  return (
    <div
      className="service-item text-center py-10 px-5 rounded-xl transition-all duration-500 ease-in-out opacity-0 translate-y-8 hover:bg-white/[0.02] hover:-translate-y-2"
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div
        className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center text-3xl"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-5">{title}</h3>
      <p className="text-neutral-300 leading-relaxed">{description}</p>
    </div>
  );
}
