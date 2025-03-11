export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center p-4 mt-10 w-full flex flex-col items-center justify-center">
        <div className="flex space-x-4 mb-4">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Credit Card Fraud Detection. All rights reserved.</p>
      </footer>
    );
  }