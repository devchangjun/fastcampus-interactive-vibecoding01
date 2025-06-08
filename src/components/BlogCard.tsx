"use client";

interface BlogCardProps {
  title: string;
  date: string;
  readTime: string;
  index?: number;
  onClick?: () => void;
}

export default function BlogCard({ title, date, readTime, index = 0, onClick }: BlogCardProps) {
  return (
    <article
      className="blog-item bg-neutral-900 rounded-xl overflow-hidden transition-all duration-500 ease-in-out opacity-0 translate-y-8 hover:-translate-y-2 cursor-pointer"
      style={{ transitionDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <div
        className="h-48"
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        }}
      ></div>
      <div className="p-8">
        <div className="text-sm text-neutral-300 mb-4">
          {date} • {readTime}
        </div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
      </div>
    </article>
  );
}
