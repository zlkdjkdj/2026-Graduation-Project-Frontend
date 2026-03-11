import { Link } from 'react-router';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-gray-800/50 z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-11 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white hover:text-gray-200 transition">
          Learn-Time
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <a href="#" className="text-gray-300 hover:text-white transition">로그인</a>
          <a href="#" className="text-gray-300 hover:text-white transition">기능</a>
          <a href="#" className="text-gray-300 hover:text-white transition">고객지원</a>
        </nav>
      </div>
    </header>
  );
}
