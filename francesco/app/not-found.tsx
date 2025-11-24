import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1">404</h1>
      <h2>Page Not Found</h2>
      <p className="lead">LINK NYA SALAH ATAU GA ADA</p>
      <Link href="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}
