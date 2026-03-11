export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-600">
            © 2026 Learn-Time. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition">이용약관</a>
            <a href="#" className="hover:text-gray-900 transition">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-900 transition">고객지원</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
