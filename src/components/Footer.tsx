import Link from 'next/link';
import FriendLinks from './FriendLinks';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TransferFiles</h3>
            <p>Transfer files between any devices without installation. Secure, encrypted P2P sharing works across networks.</p>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <a href="https://github.com/CoderLim/transfer-files" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/security">Security</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Friends</h3>
            <FriendLinks />
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TransferFiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
