export function QuoteSection() {
  return (
    <section className="bg-white py-12 md:py-20 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-4 md:mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote>
            <p className="text-2xl md:text-4xl font-semibold text-gray-900 leading-relaxed mb-3 md:mb-4">
              "성공은 매일 반복되는 작은 노력의 합이다"
            </p>
            <p className="text-base md:text-lg text-gray-600">
              - Robert Collier
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
